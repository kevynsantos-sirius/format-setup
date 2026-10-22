# Fontes legadas tecnicas do Format

Esta base registra como o conhecimento legado esta sendo tratado no modo desenvolvedor.

## Arquivos C/H

A base tecnica inclui arquivos legados dentro de `C:\workspace\format-local\format`, especialmente:

- `Defines.h`
- `FORMSYM.C`
- `ObjFPS_Old.h`
- `Typedefs.h`
- `Form_tf1.c`

Esses arquivos sao conhecimento tecnico. Eles podem ajudar a reconhecer nomes, tipos, constantes, estruturas antigas e comportamentos herdados do Format/Ponto F. Eles nao devem ser expostos diretamente ao usuario final.

## Manual atual em docs

A pasta `C:\workspace\format-local\format\docs` possui:

- `manual-usuario-format-web.md`
- `manual-usuario-format-web.html`

Esse material descreve o Format Web e pode alimentar tanto a base tecnica quanto material filtrado para usuario final.

## Ajuda desktop CHM

O arquivo `C:\workspace\format-local\format\Formpor.chm` foi extraido para:

```text
C:\workspace\format\format-agent\legacy-help\Formpor
```

O conteudo extraido vem da versao desktop do Format. Ele e rico para entender conceitos historicos, nomes de campos, funcoes e operacoes legadas. Deve ser usado com cuidado, porque nem tudo da versao desktop necessariamente existe igual no Format Web.

Regra: usar a ajuda desktop como referencia de conceito legado, nao como verdade final da interface web atual.

## Separacao de modos

- Modo desenvolvedor: pode consultar C/H, manuais tecnicos, ajuda desktop extraida e codigo.
- Modo usuario final: deve receber apenas conhecimento destilado, com linguagem de interface/produto, sem arquivos, codigo ou detalhes internos.
