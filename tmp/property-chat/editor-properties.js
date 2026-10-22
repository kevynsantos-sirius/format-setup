const normalize=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const COLORS={azul:'#0057B8',verde:'#198754',vermelho:'#DC3545',preto:'#000000',branco:'#FFFFFF',cinza:'#6C757D',laranja:'#FD7E14',roxo:'#6F42C1',amarelo:'#FFFF00',rosa:'#FFC0CB'};
// Semantic aliases choose among fields actually exposed by the current native record.
const SPECS=[
 ['font/family','Fonte',/\b(?:familia\s+da\s+fonte|fonte)\b/g,'font'],
 ['font/size','Tamanho da fonte',/\b(?:tamanho(?:\s+da\s+fonte)?|corpo(?:\s+da\s+fonte)?)\b/g,'number'],
 ['x','Posição X',/\b(?:posicao\s+(?:horizontal|x)|coordenada\s+x|x)\b/g,'length'],
 ['y','Posição Y',/\b(?:posicao\s+(?:vertical|y)|coordenada\s+y|y)\b/g,'length'],
 [['width','documentSize/width'],'Largura',/\blargura\b/g,'length'],[['height','documentSize/height'],'Altura',/\baltura\b/g,'length'],
 ['orientation','Rotação/orientação',/\b(?:rotacao|orientacao)\b/g,'orientation'],
 ['font/weight','Negrito',/\bnegrito\b/g,'weight'],
 ['font/italico','Itálico',/\bitalico\b/g,'toggle'],
 ['font/sublinhado','Sublinhado',/\bsublinhado\b/g,'toggle'],
 ['font/tachado','Tachado',/\btachado\b/g,'toggle'],
 [['hasBorder','moldurado'],'Com borda',/\b(?:com\s+borda|sem\s+borda|borda\s+(?:visivel|ativada|desativada))\b/g,'toggle'],
 ['borderThickness','Espessura da borda',/\bespessura\s+da\s+borda\b/g,'length'],
 ['borderPadding','Distância da borda',/\bdistancia\s+da\s+borda\b/g,'length'],
 [['espessura','borderThickness'],'Espessura',/\bespessura\b(?!\s+da\s+borda)/g,'length'],
 ['lineHeight','Altura da linha',/\baltura\s+da\s+linha\b/g,'length'],
 ['lineSpacing','Espaçamento de linhas',/\b(?:entrelinha|espacamento\s+(?:de|entre)\s+linhas)\b/g,'length'],
 ['protectedField','Campo protegido',/\b(?:campo\s+protegido|proteger|desproteger)\b/g,'toggle'],
 ['respectLogoHeight','Respeitar altura da imagem',/\brespeitar\s+altura\s+da\s+imagem\b/g,'boolean'],
 ['usaDetIndexado','Usa detalhe indexado',/\b(?:usa|usar)\s+detalhe\s+indexado\b/g,'boolean'],
 ['cabecVisivel','Cabeçalho visível',/\bcabecalho\s+visivel\b/g,'boolean'],
 ['rodVisivel','Rodapé visível',/\brodape\s+visivel\b/g,'boolean'],
 ['sumVisivel','Sumário visível',/\bsumario\s+visivel\b/g,'boolean'],
 ['ratio','Proporção',/\bproporcao\b/g,'number'],
 ['numChar','Quantidade de caracteres',/\bquantidade\s+de\s+caracteres\b/g,'number'],
 [['mask','mascara'],'Máscara',/\bmascara\b/g,'string'],
 ['occurrence','Referência da imagem',/\breferencia\s+da\s+imagem\b/g,'string'],
 ['marginLeft','Margem esquerda',/\bmargem\s+esquerda\b/g,'length'],
 ['marginTop','Margem superior',/\bmargem\s+superior\b/g,'length'],
 ['spacingHorizontal','Espaçamento horizontal',/\bespacamento\s+horizontal\b/g,'length'],
 ['spacingVertical','Espaçamento vertical',/\bespacamento\s+vertical\b/g,'length'],
 ['documentGroupCount','Quantidade de documentos',/\bquantidade\s+de\s+documentos\b/g,'number'],
 [['conditional','documentExpression','expressaoCondicao'],'Condição',/\bcondicao\b(?!\s+(?:de\s+)?(?:impressao|quebra|selecao))/g,'string'],
 ['condDet','Condição de impressão',/\bcondicao\s+(?:de\s+)?impressao\b/g,'string'],
 ['condQuebra','Condição de quebra',/\bcondicao\s+(?:de\s+)?quebra\b/g,'string'],
 ['expressaoCondicao','Condição de seleção',/\bcondicao\s+(?:de\s+)?selecao\b/g,'string'],
 ['opacidade','Opacidade',/\bopacidade\b/g,'number'],
 ['sombra','Sombra',/\bsombra\b/g,'native'],
 ['alignment','Alinhamento',/\balinhamento\b(?!\s+vertical)/g,'native'],
 ['alinVertical','Alinhamento vertical',/\balinhamento\s+vertical\b/g,'native'],
 ['permitirLinhasVazias','Permitir linhas vazias',/\bpermitir\s+linhas\s+vazias\b/g,'boolean'],
 ['removerLinhasVazias','Remover linhas vazias',/\bremover\s+linhas\s+vazias\b/g,'boolean'],
 ['overlap','Sobreposição',/\bsobreposicao\b/g,'native'],
 ['tamVerCab','Altura do cabeçalho',/\baltura\s+(?:do\s+)?cabecalho\b/g,'length'],
 ['tamVerDet','Altura do detalhe',/\baltura\s+(?:do\s+)?detalhe\b/g,'length'],
 ['tamVerRod','Altura do rodapé',/\baltura\s+(?:do\s+)?rodape\b/g,'length'],
 ['tamVerSum','Altura do sumário',/\baltura\s+(?:do\s+)?sumario\b/g,'length'],
 ['docOverflow','Documento de continuação',/\bdocumento\s+de\s+continuacao\b/g,'boolean'],
 ['ignorePrinterMargins','Ignorar margens da impressora',/\bignorar\s+margens\s+da\s+impressora\b/g,'boolean'],
 ['fillPageWithFacsimile','Preencher página com fac-símile',/\bpreencher\s+pagina\s+com\s+fac-simile\b/g,'boolean'],
];
const own=(o,k)=>Object.hasOwn(o||{},k);
function valueOf(raw,kind,quotes=[]){
 let s=normalize(raw).replace(/^\s*(?:(?:para|em|de|igual\s+a)\s+|[=:]\s*)/,'').trim();
 // "de 10 para 20" specifies the destination, never the old value.
 s=s.replace(/^-?\d+(?:[.,]\d+)?\s*(?:mm|cm|pt|pontos|pol(?:egadas)?|in|graus|°)?\s+para\s+/,'');
 const quoted=/^§(\d+)§/.exec(s),literal=quoted?quotes[Number(quoted[1])]:undefined;
 if(kind==='string'||kind==='font'){
  if(literal!==undefined)return {value:literal};
  if(kind==='font'){const m=/^(?!(?:e|ou|para|tamanho|maior|menor|melhor|bonita|diferente)\b)([a-z][\w-]*(?:\s+(?!(?:e|ou|para|tamanho|cor|posicao|largura|altura|no|na|do|da|nesse|neste|selecionado)\b)[a-z][\w-]*){0,4})/i.exec(s);if(m&&!/^\s+ou\b/.test(s.slice(m[0].length)))return {value:m[1].replace(/\b\w/g,c=>c.toUpperCase())};}
  return {};
 }
 if(kind==='toggle'||kind==='weight'||kind==='boolean'){
  const m=/^(sim|true|verdadeiro|ativad[oa]|nao|false|falso|desativad[oa])\b/.exec(s);
  if(m){const b=/^(sim|true|verdadeiro|ativad)/.test(m[1]);return {value:kind==='weight'?(b?700:400):b};}return {};
 }
 if(kind==='orientation'){const m=/^(retrato|paisagem|portrait|landscape)\b/.exec(s);if(m)return {value:/^(retrato|portrait)$/.test(m[1])?'portrait':'landscape'};}
 const m=/^(-?\d+(?:[.,]\d+)?)(?:\s*(mm|cm|pol(?:egadas)?|in|pt|pontos|graus|°))?(?![\w])/i.exec(s);
 if(!m||/^\s+ou\b/.test(s.slice(m[0].length)))return {};
 let value=Number(m[1].replace(',','.'));
 if(kind==='length'&&m[2])value*=({mm:1,cm:10,pol:25.4,polegadas:25.4,in:25.4,pt:25.4/72,pontos:25.4/72}[m[2]]??NaN);
 return Number.isFinite(value)?{value}:{};
}
function scan(message){
 const quotes=[];const source=normalize(message.replace(/["'“]([^"'”]*)["'”]/g,(_,value)=>`§${quotes.push(value)-1}§`));
 const requests=[];
 for(const [keys,label,pattern,kind]of SPECS){pattern.lastIndex=0;for(const match of source.matchAll(pattern)){
  // Specific phrases own their longer property, never also width/height/font.
  if(keys==='font/family'&&/da\s+$/.test(source.slice(0,match.index)))continue;
  if(Array.isArray(keys)&&keys.includes('height')&&/^\s+(?:(?:da|do)\s+)?(?:linha|imagem|cabecalho|detalhe|rodape|sumario)/.test(source.slice(match.index+match[0].length)))continue;
  const tail=source.slice(match.index+match[0].length);let result=valueOf(tail,kind,quotes);
  if((kind==='toggle'||kind==='weight')&&!own(result,'value')){
   const before=source.slice(Math.max(0,match.index-30),match.index);
   const off=/\b(?:sem|remova|remover|retire|retirar|desative|desativar)\s+(?:o\s+)?$/.test(before)||/sem\s+borda|desativada|desproteger/.test(match[0]);
   const on=/\b(?:com|em|coloque|aplique|ativar|ative)\s+(?:o\s+)?$/.test(before)||/com\s+borda|proteger/.test(match[0])||/\b(?:deixe|aplique|coloque)\b/.test(source);
   if(off||on)result={value:kind==='weight'?(off?400:700):!off};
  }
  requests.push({keys:Array.isArray(keys)?keys:[keys],label,kind,...(kind==='native'?{raw:tail,quotes}:result)});
 }}
 // A family supplied directly is sufficient: "para Arial, tamanho 12".
 if(!requests.some(r=>r.keys.includes('font/family'))){const m=/\b(?:em|para)\s+(arial|calibri|tahoma|verdana|helvetica|times new roman|courier new)\b/.exec(source);if(m)requests.push({keys:['font/family'],label:'Fonte',kind:'font',...valueOf(m[1],'font')});}
 const colors=source.match(/#[0-9a-f]{6}\b|\b(?:azul|verde|vermelho|preto|branco|cinza|laranja|roxo|amarelo|rosa)\b/g)||[];
 if(/\bcor\b/.test(source)||colors.length){const destinations=[...source.matchAll(/\bpara\s+(?:a\s+cor\s+)?(#[0-9a-f]{6}\b|azul|verde|vermelho|preto|branco|cinza|laranja|roxo|amarelo|rosa)\b/g)];const dest=destinations.at(-1),alternative=dest&&/\bou\b/.test(source.slice(dest.index+dest[0].length));const vals=[...new Set(colors.map(c=>COLORS[c]||c.toUpperCase()))];const value=dest&&!alternative?(COLORS[dest[1]]||dest[1].toUpperCase()):vals.length===1?vals[0]:undefined;requests.push({keys:['font/color','cor'],label:'Cor',kind:'color',...(value?{value}:{})});}
 if(/\bposicao\b/.test(source)&&!requests.some(r=>['x','y'].some(k=>r.keys.includes(k)))){for(const key of ['x','y'])requests.push({keys:[key],label:'Posição '+key.toUpperCase(),kind:'length'});}
 // Every scalar native field is available by its exact key, without inventing a schema.
 for(const m of source.matchAll(/\bpropriedade\s+(§\d+§|[a-z][\w/]*)\s*(?:para|=|:)?\s*/g)){
  const token=/^§(\d+)§$/.exec(m[1]);const key=token?quotes[Number(token[1])]:m[1];requests.push({keys:[key],label:key,kind:'native',raw:message.replace(/["'“]([^"'”]*)["'”]/g,(_,v)=>`§${quotes.indexOf(v)}§`).slice(m.index+m[0].length),quotes});
 }
 return requests;
}
function mergeRequests(previous,next){const merged=[...(previous||[])];for(const r of next){const index=merged.findIndex(p=>p.keys.some(k=>r.keys.includes(k)));if(index<0)merged.push(r);else merged[index]=r;}return merged;}
function resolveRequests(requests,target){
 const changes={},missing={},unsupported=[];
 for(const request of requests||[]){const key=request.keys.find(k=>own(target.fields,k));if(!key){unsupported.push(request.label);continue;}
  let result=request;
  if(request.kind==='native'&&!own(request,'value'))result={...request,...valueOf(request.raw,typeof target.fields[key]==='number'?'number':typeof target.fields[key]==='boolean'?'boolean':'string',request.quotes)};
  if(!own(result,'value')){missing[key]=target.fields[key];continue;}
  let value=result.value;if(key==='cor'&&typeof value==='string'&&/^#[\dA-F]{6}$/i.test(value)){const [r,g,b]=value.slice(1).match(/../g).map(x=>parseInt(x,16));value=r|(g<<8)|(b<<16);}
  if(typeof value!==typeof target.fields[key]){missing[key]=target.fields[key];continue;}
  changes[key]=value;
 }
 return {changes,missing,unsupported};
}
function fillAnswer(requests,message,target){
 const unresolved=(requests||[]).filter(r=>{const key=r.keys.find(k=>own(target.fields,k));return key&&!own(resolveRequests([r],target).changes,key);});
 if(unresolved.length!==1||scan(message).length)return requests;
 const request=unresolved[0],key=request.keys.find(k=>own(target.fields,k));
 const kind=request.kind==='native'?(typeof target.fields[key]==='number'?'number':typeof target.fields[key]==='boolean'?'boolean':'string'):request.kind;
 let result=kind==='color'?scan('cor '+message)[0]:{...valueOf(message,kind)};
 if(!result||!own(result,'value'))return requests;
 return mergeRequests(requests,[{...request,value:result.value}]);
}
module.exports={scan,mergeRequests,resolveRequests,fillAnswer};
