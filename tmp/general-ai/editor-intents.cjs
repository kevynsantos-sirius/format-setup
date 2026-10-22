const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const TYPES=[['janela detalhe','detalhe'],['janela de detalhe','detalhe'],['campo de saida','campoSaida'],['campo saida','campoSaida'],['bloco de enderecamento','blocoEnderecamento'],['bloco endereco','blocoEnderecamento'],['qr code','qrcode'],['qrcode','qrcode'],['codigo de barras','barcode'],['barcode','barcode'],['cabecalho','band'],['rodape','band'],['sumario','band'],['banda','band'],['documento','document'],['imagem','image'],['logotipo','image'],['texto','text'],['linha','fio'],['retangulo','fio'],['elipse','fio'],['fio','fio']];
const quote=(s,re)=>re.exec(s)?.[1];
function parse(message){
 const n=normalize(message),changes={};let action=/\b(crie|criar|adicione|adicionar|insira|inserir|novo|nova)\b/.test(n)?'create':/\b(duplique|duplicar|copie|copiar)\b/.test(n)?'duplicate':/\b(remova|remover|exclua|excluir|apague|apagar)\b/.test(n)?'remove':'edit';
 let type=TYPES.find(([word])=>n.includes(word))?.[1];
 // A qualifier is not the object type: "texto no documento" still identifies text.
 if(/\b(texto|campo texto)\b/.test(n))type='text';if(/\b(imagem|logotipo)\b/.test(n))type='image';
 const selector=quote(message,/(?:cont[eé]m|contendo|in[ií]cio(?:\s+do\s+conte[uú]do)?|come[cç]a\s+com)\s*["'“]([^"'”]+)["'”]/i);
 const document=quote(message,/(?:no|do|ao|para o)\s+documento\s+["'“]([^"'”]+)["'”]/i)||quote(message,/(?:no|do|ao|para o)\s+documento\s+([\w-]+)/i);
 let name=quote(message,/(?:chamad[oa]|nome|identificad[oa](?:\s+como)?)\s*["'“]([^"'”]+)["'”]/i);
 if(!name&&type==='detalhe')name=quote(message,/\b(?:janela(?:\s+(?:de\s+)?detalhe)?|detalhe)\s+["'“]?([A-Za-z]+\d+)["'”]?/i);
 let destination=quote(message,/(?:na|da|para a)\s+janela\s+["'“]?([\w-]+)["'”]?/i);
 const bandKind=/\bcabecalho\b/.test(n)?'cabecalho':/\brodape\b/.test(n)?'rodape':/\bsumario\b/.test(n)?'sumario':/\bbanda\s+(?:de\s+)?detalhe\b/.test(n)?'detalhe':null;
 const numeric={x:/(?:posi[cç][aã]o\s*)?\bX\s*(?:=|:|para|em)?\s*(-?\d+(?:[.,]\d+)?)/i,y:/(?:posi[cç][aã]o\s*)?\bY\s*(?:=|:|para|em)?\s*(-?\d+(?:[.,]\d+)?)/i,width:/\blargura\s*(?:=|:|para|de)?\s*(\d+(?:[.,]\d+)?)/i,height:/\baltura\s*(?:=|:|para|de)?\s*(\d+(?:[.,]\d+)?)/i,'font/size':/\btamanho\s*(?:da fonte\s*)?(?:=|:|para|de)?\s*(\d+(?:[.,]\d+)?)/i,orientation:/\b(?:rotacao|rota[cç][aã]o|orienta[cç][aã]o)\s*(?:=|:|para|de)?\s*(0|90|180|270)/i};
 const instruction=message.replace(selector||/$^/,'').replace(document||/$^/,'');for(const [key,re]of Object.entries(numeric)){const m=re.exec(instruction);if(m)changes[key]=Number(m[1].replace(',','.'));}
 const family=/(?:fonte|em|para)\s*(Arial|Calibri|Tahoma|Verdana|Helvetica|Times New Roman|Courier New)\b/i.exec(instruction);if(family)changes['font/family']=family[1];const color=/(#[0-9a-f]{6})\b/i.exec(instruction);if(color)changes['font/color']=color[1].toUpperCase();
 const condition=quote(message,/(?:condi[cç][aã]o(?:\s+(?:de\s+)?(?:impress[aã]o|quebra|sele[cç][aã]o))?)\s*(?:para|=|:)?\s*["'“]([^"'”]*)["'”]/i);
 if(condition!==undefined)changes[/impressao/.test(n)?'condDet':/quebra/.test(n)?'condQuebra':type==='document'?'documentExpression':type==='band'?'expressaoCondicao':'conditional']=condition;
 const rename=quote(message,/(?:renomeie|renomear|nome)\s+(?:para\s*)?["'“]([^"'”]+)["'”]/i);if(rename&&action==='edit')changes[type==='document'?'name':'nome']=rename;
 const content=quote(message,/(?:conte[uú]do|express[aã]o|texto)\s*(?:=|:|para|com)?\s*["'“]([^"'”]*)["'”]/i);
 const data={};for(const [key,v]of Object.entries(changes)){if(key.startsWith('font/')){data.font??={family:'Arial',size:10,color:'#000000'};data.font[key.slice(5)]=v;}else data[key]=v;}
 if(name)data[type==='document'?'name':'nome']=name;if(condition!==undefined&&type==='document')data.documentExpression=condition;
 if(content!==undefined&&!selector){if(type==='text')data.content=[{type:'text',content}];else if(type==='image')data.occurrence=content;else data.expressao=content;}
 if(type==='fio'){data.tipoFio=/retangulo/.test(n)?'FIO_MOLDURA':/elipse/.test(n)?'FIO_ELIPSE':'FIO_HORIZONTAL';data.espessura=.2;data.cor=0;}
 if(type==='band'){data.kind=bandKind||'detalhe';data.defined=true;data.expressaoCondicao=condition||'';}
 return {action,type,selector,document,name,destination,bandKind,changes,data,selected:/\b(selecionad[oa]|este|esta)\b/.test(n)};
}
function resolveEditor(body){
 const inventory=body.inventory;if(!Array.isArray(inventory)||inventory.length>25000)throw Error('Inventário nativo obrigatório');
 const message=String(body.message||'').trim();if(!message||message.length>8000)throw Error('Informe o pedido');
 const intent=body.intent?structuredClone(body.intent):parse(message);
 if(body.followup&&!body.intent){Object.assign(intent.changes,parse(body.followup).changes);Object.assign(intent.data,parse(body.followup).data);}
 let candidates=inventory;
 const selected=new Set(Array.isArray(body.selectedIds)?body.selectedIds:[]);
 if(intent.action==='create'){
  if(intent.type==='document')candidates=inventory.filter(x=>x.id===body.currentDocumentId);
  else if(intent.type==='band')candidates=inventory.filter(x=>x.type==='detalhe'&&(!intent.destination||normalize(x.name)===normalize(intent.destination)));
  else if(intent.destination||intent.bandKind)candidates=inventory.filter(x=>x.type==='band'&&(!intent.bandKind||normalize(x.name).includes(intent.bandKind)||x.bandKind===intent.bandKind)&&(!intent.destination||inventory.find(p=>p.id===x.parentId)?.name===intent.destination));
  else candidates=inventory.filter(x=>x.id===body.currentBandId||(!body.currentBandId&&x.id===body.currentDocumentId));
 }else{
  if(selected.size)candidates=candidates.filter(x=>selected.has(x.id));
  if(intent.type)candidates=candidates.filter(x=>x.type===intent.type);
  if(intent.name)candidates=candidates.filter(x=>normalize(x.name)===normalize(intent.name));
  if(intent.selector)candidates=candidates.filter(x=>normalize(x.excerpt).includes(normalize(intent.selector)));
 }
 if(intent.document)candidates=candidates.filter(x=>normalize(x.documentName)===normalize(intent.document));
 if(body.chosenId){if(!candidates.some(x=>x.id===body.chosenId))return {status:'clarify',message:'A opção não pertence aos candidatos atuais. Refaça o pedido.',intent,candidates:[]};candidates=candidates.filter(x=>x.id===body.chosenId);}
 if(!intent.type&&intent.action==='create')return {status:'clarify',message:'O que deseja criar: texto, saída calculada, imagem, código de barras, QR code, fio, bloco de endereço, documento, janela detalhe ou banda?',intent,candidates:[],suggestions:TYPES.map(x=>x[0])};
 if(!candidates.length)return {status:'clarify',message:selected.size?'O pedido não corresponde à seleção. Confira o item selecionado ou descreva outro alvo após desmarcá-lo.':'Não encontrei o alvo ou destino no .f. Informe tipo, nome, trecho, documento ou janela.',intent,candidates:[]};
 if(candidates.length>1)return {status:'clarify',message:`Encontrei ${candidates.length} candidatos confirmados no .f. Qual deles? Nenhum item foi alterado.`,intent,candidates};
 const target=candidates[0];
 if(intent.action==='edit'){
  const bad=Object.keys(intent.changes).filter(k=>!Object.hasOwn(target.fields,k));
  if(bad.length||!Object.keys(intent.changes).length)return {status:'clarify',message:'Confirme a propriedade e o valor desejado para este alvo. Você também pode explicar o pedido com mais detalhes.',intent,target,candidates:[],fieldEditor:target.fields};
 }
 const operation={action:intent.action,targetId:target.id};
 if(intent.action==='create'){
  operation.parentId=target.id;operation.type=intent.type;operation.data=intent.data;
  const missing=intent.type==='document'?['name','documentExpression'].filter(k=>!operation.data[k]):intent.type==='band'?['height'].filter(k=>!operation.data[k]):['x','y','width','height'].filter(k=>operation.data[k]===undefined);
  if(intent.type==='text'&&!intent.data.content)missing.push('content');if(intent.type==='image'&&!intent.data.occurrence)missing.push('occurrence');if(['barcode','qrcode','campoSaida'].includes(intent.type)&&!intent.data.expressao)missing.push('expressao');if(intent.type==='detalhe'&&!intent.data.nome)missing.push('nome');
  if(missing.length)return {status:'clarify',message:'Informe os dados da criação; o destino já foi identificado.',intent,target,candidates:[],creationFields:missing};
  if(intent.type==='text')operation.data.font??={family:'Arial',size:10,color:'#000000'};
  if(intent.type==='detalhe'){operation.data.bandas=[{id:1,nome:'DET1',kind:'detalhe',defined:true,height:operation.data.height,expressaoCondicao:'',camposSaida:[],camposTexto:[],logos:[],fios:[],barCodes:[],barCodesBi:[]}];operation.data.nDet=1;operation.data.tamVerDet=operation.data.height;}
 }else if(intent.action==='duplicate')operation.data=intent.data;
 else if(intent.action==='edit')operation.changes=intent.changes;
 return {status:'resolved',intent,target,operation,message:'Alvo identificado no inventário nativo. Confira a proposta antes de aplicar.'};
}
module.exports={parse,resolveEditor};
