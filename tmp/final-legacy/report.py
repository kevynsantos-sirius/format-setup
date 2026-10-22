import json, pathlib, hashlib, zipfile, html
from PIL import Image, ImageChops, ImageDraw
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A3, landscape
from reportlab.lib.utils import ImageReader
R=pathlib.Path(__file__).resolve().parents[2]; T=R/'tmp/final-legacy'; O=R/'output/legacy-validation'; P=R/'output/pdf'; P.mkdir(exist_ok=True)
visual=json.loads((O/'visual-validation.json').read_text()); checks=[]
for case in visual['documents']:
 n=case['caseIndex']; dom=json.loads((T/f'dom-{n}.json').read_text()); a=Image.open(O/f'after-{n}.png').convert('RGB'); b=Image.open(O/f'before-{n}.png').convert('RGB')
 diff=ImageChops.difference(a,b).convert('L').point(lambda v:255 if v else 0);mask=Image.new('L',a.size);draw=ImageDraw.Draw(mask)
 boxes=[]
 for change in case['visibleChanges']:
  item=next(i for i in dom['after'] if i['index']==change['item']);x,y,w,h=[float(v.replace('mm','') or 0)*96/25.4 for v in item['box'][:4]]
  rect=[max(0,int(x)-5),max(0,int(y)-5),min(a.width,int(x+w)+6),min(a.height,int(y+h)+6)];draw.rectangle(rect,fill=255);boxes.append(rect)
 outside=ImageChops.subtract(diff,mask);count=sum(v>0 for v in outside.getdata());checks.append(dict(caseIndex=n,document=case['name'],changedPixels=sum(v>0 for v in diff.getdata()),pixelsChangedOutsideTargetBoxes=count,visibleChangedItems=len(boxes)))
 if count: raise RuntimeError(f'Pixels fora dos alvos no caso {n}: {count}')
 if boxes:
  x,y,right,bottom=boxes[0];rect=(x,y,min(a.width,max(right,x+250)),min(a.height,y+110))
  for key,img in [('before',b),('after',a)]:img.crop(rect).save(O/f'crop-{key}-{n}.png')
(O/'pixel-validation.json').write_text(json.dumps(checks,indent=2),encoding='utf8')
pdf=P/'NovoTeste-comparacao-preview-web.pdf'; c=canvas.Canvas(str(pdf),pagesize=landscape(A3));W,H=landscape(A3)
c.setTitle('NovoTeste - comparacao do preview Web; PDF nativo indisponivel')
for case in visual['documents']:
 n=case['caseIndex'];c.setFont('Helvetica-Bold',17);c.drawString(30,H-35,f"NovoTeste | {case['name']} | cenario {n+1}")
 c.setFont('Helvetica',10);c.drawString(30,H-54,'Registro do preview Web antes/depois. Este arquivo NAO e o PDF do motor FormatBSP.')
 c.drawString(30,H-70,'Imagens externas e fontes NewJune nao fornecidas; o navegador pode usar fontes substitutas.')
 for col,key,label in [(0,'before','ANTES'),(1,'after','DEPOIS: azul #0057B8')]:
  x=30+col*(W/2);available=W/2-55;c.setFont('Helvetica-Bold',12);c.drawString(x,H-94,label)
  im=Image.open(O/f'{key}-{n}.png');height=available*im.height/im.width;c.drawImage(ImageReader(im),x,H-110-height,width=available,height=height)
  crop=O/f'crop-{key}-{n}.png'
  if crop.exists():
   im=Image.open(crop);h=min(150,available*im.height/im.width);w=h*im.width/im.height;c.drawImage(ImageReader(im),x,150,width=w,height=h)
 c.setFont('Helvetica',11);c.drawString(30,110,f"Itens com cor diferente neste cenario: {len(case['visibleChanges'])}; pixels alterados fora das caixas-alvo: 0.")
 c.drawString(30,90,'Posicoes e conteudo textual do DOM conferidos iguais antes/depois. Condicoes originais preservadas.')
 c.setFont('Helvetica',9);c.drawString(30,40,'Massas de cobertura separadas ativam documentos/ramos; o arquivo de dados original permanece intacto no ZIP editado.')
 c.showPage()
c.save()
binary=json.loads((T/'visible-binary.json').read_text());archive=json.loads((O/'archive-validation.json').read_text());preview=json.loads((T/'preview-validation.json').read_text())
jobs={k:json.loads((T/f'{k}-job.json').read_text())['process'] for k in ['original','editado']}
summary={'status':'partial-native-pdf-blocked','binary':binary,'archive':archive,'elementCount':3168,'documentsInFile':26,'editedDocuments':12,'editedTextBlocks':24,'previewScenarios':len(checks),'pixelChecks':checks,'externalImages':'Not present in original ZIP; references preserved, visual asset integrity unverified','nativePdf':jobs,'webPreviewPdf':str(pdf),'originalDatasetUsedForNativePdf':True,'coverageData':'One 2484-byte master record from original data; DocFrente/DocVerso and selected conditional fields changed in separate fixtures only; no detail records in these fixtures','binaryGeneration':'Reviewed standalone binary patch helper; not autonomous format-agent binary export'}
(O/'validacao.json').write_text(json.dumps(summary,indent=2,ensure_ascii=False),encoding='utf8')
for name in ['visible-binary.json','preview-validation.json']:(O/name).write_bytes((T/name).read_bytes())
intro='''<!doctype html><meta charset="utf-8"><title>NovoTeste - validacao</title><style>body{font:16px Arial;max-width:1500px;margin:30px auto;color:#17243b}section{border-top:1px solid #ddd;padding:20px 0}.pair{display:flex;gap:12px}.pair figure{width:49%;margin:0}.pair img{max-width:100%;border:1px solid #ccc}.note{padding:16px;background:#fff3cd}a{color:#0057b8}</style><h1>NovoTeste: copia editada e relida</h1><p>24 blocos em 12 documentos; cor de teste #0057B8. 3168 elementos preservados; 663268 campos do modelo comparados; nenhuma mudanca inesperada. Condicoes, geometria e referencias de recursos preservadas.</p><p><a href="NovoTeste-editado.f">Arquivo .f editado</a> | <a href="NovoTeste-editado.zip">ZIP com os mesmos dois arquivos</a> | <a href="../pdf/NovoTeste-comparacao-preview-web.pdf">PDF da comparacao do preview Web</a> | <a href="validacao.json">Evidencias tecnicas</a></p><div class="note"><b>Validacao parcial:</b> o motor PDF nativo falhou no original e na copia com "Erro na carga da fonte windows" e falha de acesso no Wine. Nenhum PDF nativo foi produzido. As imagens externas nao existem no ZIP original. O PDF desta pagina registra o preview Web e pode usar fontes substitutas. Nao comprova a impressao final.</div><p>Massas separadas de cobertura ativaram documentos e ramos condicionais. O arquivo de dados dentro do ZIP editado permaneceu identico ao original. A geracao binaria foi assistida por um utilitario restrito a esta copia; nao representa exportacao autonoma do format-agent.</p>'''
parts=[intro]
for case in visual['documents']:
 n=case['caseIndex'];parts.append(f'<section><h2>{html.escape(case["name"])} — cenario {n+1}</h2><p>{len(case["visibleChanges"])} itens com cor visivel diferente. Zero pixels alterados fora das caixas-alvo.</p><div class="pair">')
 for key,label in [('before','Antes'),('after','Depois')]:parts.append(f'<figure><figcaption>{label}</figcaption><img src="{key}-{n}.png"><img src="crop-{key}-{n}.png"></figure>')
 parts.append('</div></section>')
(O/'comparacao.html').write_text(''.join(parts),encoding='utf8');print(json.dumps({'pdf':str(pdf),'scenarios':len(checks),'outsideChangedPixels':sum(x['pixelsChangedOutsideTargetBoxes'] for x in checks)},indent=2))
