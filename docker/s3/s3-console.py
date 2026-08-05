#!/usr/bin/env python3
import cgi
import json
import mimetypes
import os
import posixpath
import subprocess
import tempfile
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, quote, unquote, urlparse

PORT = int(os.environ.get("S3_CONSOLE_PORT", "4570"))
MAX_PREVIEW_BYTES = 1024 * 1024


def aws(*args):
    result = subprocess.run(["awslocal", *args], text=True, capture_output=True, check=False)
    if result.returncode != 0:
        message = result.stderr.strip() or result.stdout.strip() or "awslocal command failed"
        raise RuntimeError(message)
    return result.stdout.strip()


def aws_json(*args):
    output = aws(*args, "--output", "json")
    return json.loads(output or "{}")


def normalize_prefix(prefix):
    return (prefix or "").lstrip("/")


def human_size(value):
    size = float(value or 0)
    for unit in ["B", "KB", "MB", "GB"]:
        if size < 1024 or unit == "GB":
            return f"{size:.0f} {unit}" if unit == "B" else f"{size:.1f} {unit}"
        size /= 1024


HTML = r"""<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>LocalStack S3 Console</title>
  <style>
    :root { --line:#d7dce2; --muted:#5f6b7a; --bg:#f5f7fa; --ink:#18212f; --accent:#2563eb; --danger:#b42318; --ok:#087443; }
    * { box-sizing:border-box; }
    body { margin:0; font-family:Arial, Helvetica, sans-serif; color:var(--ink); background:var(--bg); }
    header { height:56px; display:flex; align-items:center; gap:16px; padding:0 20px; background:#111827; color:#fff; }
    header span { color:#cbd5e1; font-size:13px; }
    main { display:grid; grid-template-columns:290px minmax(0, 1fr) 360px; min-height:calc(100vh - 56px); }
    aside, section, .details { padding:16px; border-right:1px solid var(--line); overflow:auto; max-height: 100vh;}
    .details { border-right:0; background:#fff; }
    h2 { font-size:15px; margin:0 0 12px; }
    h3 { font-size:13px; margin:18px 0 8px; color:#344054; }
    button, input, textarea { font:inherit; }
    button { border:1px solid var(--line); background:#fff; border-radius:6px; padding:8px 10px; cursor:pointer; }
    button.primary { background:var(--accent); color:#fff; border-color:var(--accent); }
    button.danger { color:var(--danger); border-color:#f2b8b5; }
    button.ghost { background:transparent; border-color:transparent; padding:4px 0; }
    button:disabled { opacity:.55; cursor:not-allowed; }
    input, textarea { width:100%; border:1px solid var(--line); border-radius:6px; padding:9px 10px; background:#fff; }
    textarea { min-height:170px; resize:vertical; font-family:Consolas, "Courier New", monospace; font-size:12px; }
    .row { display:flex; gap:8px; align-items:center; }
    .row > input { flex:1; }
    .stack { display:grid; gap:8px; }
    .toolbar { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:12px; }
    .crumbs { font-size:13px; color:var(--muted); word-break:break-all; }
    .crumbs button { padding:3px 6px; border:0; color:var(--accent); }
    .bucket { width:100%; text-align:left; margin-bottom:6px; display:flex; justify-content:space-between; gap:8px; }
    .bucket.active { border-color:var(--accent); box-shadow:0 0 0 1px var(--accent) inset; }
    table { width:100%; border-collapse:collapse; background:#fff; border:1px solid var(--line); }
    th, td { padding:10px 12px; border-bottom:1px solid var(--line); text-align:left; font-size:13px; vertical-align:middle; }
    th { background:#f8fafc; color:#475467; font-weight:600; }
    td.key { font-family:Consolas, "Courier New", monospace; word-break:break-all; }
    .pill { display:inline-block; border:1px solid var(--line); border-radius:999px; padding:2px 8px; font-size:12px; color:#475467; }
    .muted { color:var(--muted); }
    .status { min-height:20px; margin:10px 0; font-size:13px; }
    .status.ok { color:var(--ok); }
    .status.err { color:var(--danger); }
    .preview { white-space:pre-wrap; word-break:break-word; max-height:360px; overflow:auto; background:#0b1220; color:#dbeafe; padding:12px; border-radius:6px; font-family:Consolas, "Courier New", monospace; font-size:12px; }
    img.preview-img { max-width:100%; border:1px solid var(--line); border-radius:6px; background:#fff; }
    iframe.preview-frame { width:100%; height:420px; border:1px solid var(--line); border-radius:6px; }
    @media (max-width:1050px) { main { grid-template-columns:1fr; } aside, section, .details { border-right:0; border-bottom:1px solid var(--line); } }
  </style>
</head>
<body>
<header><strong>LocalStack S3 Console</strong><span>endpoint: http://localhost:4566 | console: http://localhost:4570</span></header>
<main>
  <aside>
    <div class="toolbar"><h2>Buckets</h2><button onclick="loadBuckets()">Atualizar</button></div>
    <div class="row"><input id="bucketName" placeholder="novo-bucket"><button class="primary" onclick="createBucket()">Criar</button></div>
    <div id="bucketStatus" class="status"></div>
    <div id="buckets"></div>
  </aside>
  <section>
    <div class="toolbar"><div><h2 id="bucketTitle">Selecione um bucket</h2><div id="crumbs" class="crumbs"></div></div><button onclick="loadObjects()" id="refreshObjects" disabled>Atualizar</button></div>
    <div class="row"><input id="prefixInput" placeholder="prefixo/pasta/"><button onclick="goPrefix()" id="goPrefix" disabled>Abrir</button></div>
    <h3>Objetos</h3>
    <table><thead><tr><th>Nome</th><th>Tamanho</th><th>Alterado</th><th></th></tr></thead><tbody id="objects"><tr><td colspan="4" class="muted">Nenhum bucket selecionado.</td></tr></tbody></table>
  </section>
  <div class="details">
    <h2>Operacoes</h2>
    <div class="stack">
      <input id="objectKey" placeholder="chave/do/objeto.txt">
      <textarea id="objectBody" placeholder="conteudo para criar/atualizar objeto"></textarea>
      <button class="primary" onclick="putTextObject()" id="putText" disabled>Criar objeto texto</button>
      <input id="fileUpload" type="file">
      <button onclick="uploadFile()" id="upload" disabled>Enviar arquivo</button>
    </div>
    <div id="objectStatus" class="status"></div>
    <h3>Detalhes</h3>
    <div id="selectedDetails" class="muted">Selecione um objeto.</div>
    <div id="previewActions" class="row" style="margin:10px 0;"></div>
    <div id="preview"></div>
    <h3>Bucket policy</h3>
    <textarea id="policyText" placeholder='{"Version":"2012-10-17","Statement":[]}'></textarea>
    <div class="row"><button onclick="loadPolicy()" id="loadPolicy" disabled>Carregar</button><button class="primary" onclick="savePolicy()" id="savePolicy" disabled>Salvar</button><button class="danger" onclick="deletePolicy()" id="deletePolicy" disabled>Remover</button></div>
  </div>
</main>
<script>
let currentBucket = "", currentPrefix = "", selectedKey = "";
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function request(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) throw new Error(data.message || response.statusText);
  return data.data;
}
function status(id, message, ok = true) {
  const el = document.getElementById(id); el.textContent = message || ""; el.className = "status " + (message ? (ok ? "ok" : "err") : "");
}
function setBucket(bucket) {
  currentBucket = bucket; currentPrefix = ""; selectedKey = "";
  document.getElementById("bucketTitle").textContent = bucket ? `s3://${bucket}` : "Selecione um bucket";
  ["refreshObjects","goPrefix","putText","upload","loadPolicy","savePolicy","deletePolicy"].forEach(id => document.getElementById(id).disabled = !bucket);
  loadBuckets(); loadObjects(); clearPreview();
}
async function loadBuckets() {
  try {
    const buckets = await request("/api/buckets");
    document.getElementById("buckets").innerHTML = buckets.map(b => `<button class="bucket ${b.name === currentBucket ? "active" : ""}" onclick="setBucket('${esc(b.name)}')"><span>${esc(b.name)}</span><span class="pill">${esc(b.creationDate || "")}</span></button>`).join("") || '<p class="muted">Nenhum bucket.</p>';
  } catch (e) { status("bucketStatus", e.message, false); }
}
async function createBucket() {
  const name = document.getElementById("bucketName").value.trim(); if (!name) return;
  try { await request("/api/buckets", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({name})}); document.getElementById("bucketName").value = ""; status("bucketStatus", `Bucket ${name} criado.`); setBucket(name); }
  catch (e) { status("bucketStatus", e.message, false); }
}
function goPrefix(prefix) { currentPrefix = prefix ?? document.getElementById("prefixInput").value; selectedKey = ""; loadObjects(); clearPreview(); }
function renderCrumbs() {
  const parts = currentPrefix.split("/").filter(Boolean); let built = ""; let html = `<button onclick="goPrefix('')">${esc(currentBucket)}</button>`;
  for (const part of parts) { built += part + "/"; html += ` / <button onclick="goPrefix('${esc(built)}')">${esc(part)}</button>`; }
  document.getElementById("crumbs").innerHTML = currentBucket ? html : ""; document.getElementById("prefixInput").value = currentPrefix;
}
async function loadObjects() {
  if (!currentBucket) return; renderCrumbs();
  try {
    const data = await request("/api/objects?" + new URLSearchParams({bucket:currentBucket, prefix:currentPrefix}));
    const folders = data.prefixes.map(p => `<tr><td class="key"><button class="ghost" onclick="goPrefix('${esc(p.prefix)}')">[dir] ${esc(p.name)}</button></td><td></td><td></td><td></td></tr>`);
    const objects = data.objects.map(o => `<tr><td class="key"><button class="ghost" onclick="selectObject('${esc(o.key)}', ${o.size})">[obj] ${esc(o.name)}</button></td><td>${esc(o.humanSize)}</td><td>${esc(o.lastModified || "")}</td><td><button class="danger" onclick="deleteObject('${esc(o.key)}')">Excluir</button></td></tr>`);
    document.getElementById("objects").innerHTML = [...folders, ...objects].join("") || '<tr><td colspan="4" class="muted">Bucket vazio neste prefixo.</td></tr>';
  } catch (e) { document.getElementById("objects").innerHTML = `<tr><td colspan="4" class="muted">${esc(e.message)}</td></tr>`; }
}
function selectObject(key, size) {
  selectedKey = key;
  document.getElementById("selectedDetails").innerHTML = `<div><b>${esc(key)}</b></div><div class="muted">${size} bytes</div>`;
  document.getElementById("previewActions").innerHTML = `<button onclick="previewObject()">Visualizar</button><a href="/api/object/raw?bucket=${encodeURIComponent(currentBucket)}&key=${encodeURIComponent(key)}" target="_blank"><button>Baixar/Abrir</button></a><button class="danger" onclick="deleteObject('${esc(key)}')">Excluir</button>`;
  document.getElementById("objectKey").value = key;
}
function clearPreview() { document.getElementById("selectedDetails").textContent = "Selecione um objeto."; document.getElementById("previewActions").innerHTML = ""; document.getElementById("preview").innerHTML = ""; }
async function previewObject() {
  if (!selectedKey) return;
  try {
    const data = await request("/api/object?" + new URLSearchParams({bucket:currentBucket, key:selectedKey}));
    if (data.previewType === "image") document.getElementById("preview").innerHTML = `<img class="preview-img" src="${data.url}">`;
    else if (data.previewType === "pdf") document.getElementById("preview").innerHTML = `<iframe class="preview-frame" src="${data.url}"></iframe>`;
    else document.getElementById("preview").innerHTML = `<div class="preview">${esc(data.body)}</div>`;
  } catch (e) { document.getElementById("preview").innerHTML = `<p class="status err">${esc(e.message)}</p>`; }
}
async function putTextObject() {
  const key = document.getElementById("objectKey").value.trim(); if (!key) return;
  try { await request("/api/object", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({bucket:currentBucket, key, body:document.getElementById("objectBody").value})}); status("objectStatus", `Objeto ${key} salvo.`); loadObjects(); }
  catch (e) { status("objectStatus", e.message, false); }
}
async function uploadFile() {
  const file = document.getElementById("fileUpload").files[0]; if (!file) return;
  const form = new FormData(); const key = document.getElementById("objectKey").value.trim() || ((currentPrefix || "") + file.name);
  form.append("bucket", currentBucket); form.append("key", key); form.append("file", file);
  try { await request("/api/upload", {method:"POST", body:form}); status("objectStatus", `Arquivo enviado para ${key}.`); loadObjects(); }
  catch (e) { status("objectStatus", e.message, false); }
}
async function deleteObject(key) {
  if (!confirm(`Excluir ${key}?`)) return;
  try { await request("/api/object?" + new URLSearchParams({bucket:currentBucket, key}), {method:"DELETE"}); status("objectStatus", `Objeto ${key} excluido.`); selectedKey = ""; clearPreview(); loadObjects(); }
  catch (e) { status("objectStatus", e.message, false); }
}
async function loadPolicy() {
  try { const data = await request("/api/policy?bucket=" + encodeURIComponent(currentBucket)); document.getElementById("policyText").value = JSON.stringify(data.policy || {}, null, 2); status("objectStatus", "Policy carregada."); }
  catch (e) { document.getElementById("policyText").value = ""; status("objectStatus", e.message, false); }
}
async function savePolicy() {
  try { JSON.parse(document.getElementById("policyText").value); await request("/api/policy", {method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify({bucket:currentBucket, policy:document.getElementById("policyText").value})}); status("objectStatus", "Policy salva."); }
  catch (e) { status("objectStatus", e.message, false); }
}
async function deletePolicy() {
  if (!confirm(`Remover policy de ${currentBucket}?`)) return;
  try { await request("/api/policy?bucket=" + encodeURIComponent(currentBucket), {method:"DELETE"}); document.getElementById("policyText").value = ""; status("objectStatus", "Policy removida."); }
  catch (e) { status("objectStatus", e.message, false); }
}
loadBuckets();
</script>
</body>
</html>
"""


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        print("s3-console:", fmt % args)

    def send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def ok(self, data=None, message="ok"):
        self.send_json(200, {"success": True, "message": message, "data": data})

    def fail(self, status, message):
        self.send_json(status, {"success": False, "message": str(message).replace("\n", " ")})

    def read_json(self):
        length = int(self.headers.get("Content-Length", "0"))
        return json.loads(self.rfile.read(length).decode("utf-8")) if length > 0 else {}

    def query(self):
        return {key: values[0] for key, values in parse_qs(urlparse(self.path).query).items()}

    def do_GET(self):
        path = urlparse(self.path).path
        try:
            if path == "/":
                self.write_html()
            elif path == "/api/buckets":
                self.list_buckets()
            elif path == "/api/objects":
                self.list_objects()
            elif path == "/api/object":
                self.object_preview()
            elif path == "/api/object/raw":
                self.object_raw()
            elif path == "/api/policy":
                self.get_policy()
            else:
                self.fail(404, "Not found")
        except Exception as error:
            self.fail(500, error)

    def do_POST(self):
        path = urlparse(self.path).path
        try:
            if path == "/api/buckets":
                name = self.read_json().get("name", "").strip()
                if not name:
                    self.fail(400, "Bucket name is required")
                    return
                aws("s3api", "create-bucket", "--bucket", name)
                self.ok({"name": name}, "Bucket created")
            elif path == "/api/object":
                data = self.read_json()
                self.put_body(data.get("bucket", ""), normalize_prefix(data.get("key", "")), data.get("body", "").encode("utf-8"), "text/plain; charset=utf-8")
            elif path == "/api/upload":
                self.upload()
            else:
                self.fail(404, "Not found")
        except Exception as error:
            self.fail(500, error)

    def do_PUT(self):
        try:
            if urlparse(self.path).path != "/api/policy":
                self.fail(404, "Not found")
                return
            data = self.read_json()
            policy = data.get("policy", "")
            json.loads(policy)
            with tempfile.NamedTemporaryFile("w", delete=False, encoding="utf-8") as tmp:
                tmp.write(policy)
                tmp_path = tmp.name
            try:
                aws("s3api", "put-bucket-policy", "--bucket", data.get("bucket", ""), "--policy", f"file://{tmp_path}")
            finally:
                os.unlink(tmp_path)
            self.ok(message="Policy saved")
        except Exception as error:
            self.fail(500, error)

    def do_DELETE(self):
        path = urlparse(self.path).path
        query = self.query()
        try:
            if path == "/api/object":
                aws("s3api", "delete-object", "--bucket", query.get("bucket", ""), "--key", query.get("key", ""))
            elif path == "/api/policy":
                aws("s3api", "delete-bucket-policy", "--bucket", query.get("bucket", ""))
            elif path == "/api/buckets":
                aws("s3api", "delete-bucket", "--bucket", query.get("bucket", ""))
            else:
                self.fail(404, "Not found")
                return
            self.ok(message="Deleted")
        except Exception as error:
            self.fail(500, error)

    def write_html(self):
        body = HTML.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def list_buckets(self):
        data = aws_json("s3api", "list-buckets")
        buckets = [{"name": item.get("Name"), "creationDate": item.get("CreationDate", "")[:19].replace("T", " ")} for item in data.get("Buckets", [])]
        self.ok(buckets)

    def list_objects(self):
        query = self.query()
        bucket = query.get("bucket", "")
        prefix = normalize_prefix(query.get("prefix", ""))
        data = aws_json("s3api", "list-objects-v2", "--bucket", bucket, "--prefix", prefix, "--delimiter", "/")
        prefixes = []
        for item in data.get("CommonPrefixes", []):
            item_prefix = item.get("Prefix", "")
            prefixes.append({"prefix": item_prefix, "name": item_prefix[len(prefix):].rstrip("/") or item_prefix.rstrip("/")})
        objects = []
        for item in data.get("Contents", []):
            key = item.get("Key", "")
            if key == prefix:
                continue
            objects.append({"key": key, "name": key[len(prefix):] if key.startswith(prefix) else key, "size": item.get("Size", 0), "humanSize": human_size(item.get("Size", 0)), "lastModified": item.get("LastModified", "")[:19].replace("T", " ")})
        self.ok({"prefixes": prefixes, "objects": objects})

    def put_body(self, bucket, key, body, content_type):
        if not bucket or not key:
            self.fail(400, "Bucket and key are required")
            return
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp.write(body)
            tmp_path = tmp.name
        try:
            aws("s3api", "put-object", "--bucket", bucket, "--key", key, "--body", tmp_path, "--content-type", content_type)
        finally:
            os.unlink(tmp_path)
        self.ok({"bucket": bucket, "key": key}, "Object saved")

    def upload(self):
        form = cgi.FieldStorage(fp=self.rfile, headers=self.headers, environ={"REQUEST_METHOD": "POST"})
        bucket = form.getfirst("bucket", "")
        key = normalize_prefix(form.getfirst("key", ""))
        file_item = form["file"] if "file" in form else None
        if not bucket or not key or not file_item:
            self.fail(400, "Bucket, key and file are required")
            return
        content_type = mimetypes.guess_type(key)[0] or "application/octet-stream"
        self.put_body(bucket, key, file_item.file.read(), content_type)

    def object_preview(self):
        query = self.query()
        bucket = query.get("bucket", "")
        key = query.get("key", "")
        head = aws_json("s3api", "head-object", "--bucket", bucket, "--key", key)
        content_type = head.get("ContentType") or mimetypes.guess_type(key)[0] or "application/octet-stream"
        raw_url = f"/api/object/raw?bucket={quote(bucket)}&key={quote(key)}"
        if content_type.startswith("image/"):
            self.ok({"previewType": "image", "contentType": content_type, "url": raw_url})
            return
        if content_type == "application/pdf" or key.lower().endswith(".pdf"):
            self.ok({"previewType": "pdf", "contentType": content_type, "url": raw_url})
            return
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp_path = tmp.name
        try:
            aws("s3api", "get-object", "--bucket", bucket, "--key", key, "--range", f"bytes=0-{MAX_PREVIEW_BYTES - 1}", tmp_path)
            with open(tmp_path, "rb") as file:
                body = file.read().decode("utf-8", errors="replace")
        finally:
            os.unlink(tmp_path)
        self.ok({"previewType": "text", "contentType": content_type, "body": body})

    def object_raw(self):
        query = self.query()
        bucket = query.get("bucket", "")
        key = unquote(query.get("key", ""))
        head = aws_json("s3api", "head-object", "--bucket", bucket, "--key", key)
        content_type = head.get("ContentType") or mimetypes.guess_type(key)[0] or "application/octet-stream"
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp_path = tmp.name
        try:
            aws("s3api", "get-object", "--bucket", bucket, "--key", key, tmp_path)
            with open(tmp_path, "rb") as file:
                data = file.read()
        finally:
            os.unlink(tmp_path)
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Content-Disposition", f"inline; filename=\"{posixpath.basename(key) or 'object'}\"")
        self.end_headers()
        self.wfile.write(data)

    def get_policy(self):
        output = aws("s3api", "get-bucket-policy", "--bucket", self.query().get("bucket", ""))
        data = json.loads(output or "{}")
        self.ok({"policy": json.loads(data.get("Policy", "{}"))})


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"s3-console: listening on 0.0.0.0:{PORT}")
    server.serve_forever()
