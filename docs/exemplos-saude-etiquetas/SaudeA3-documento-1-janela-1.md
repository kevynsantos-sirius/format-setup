# SaudeA3 — janela PAG3

{
  "nativePath": "$.documentos[1].listaJanelaDetalhe[1]",
  "pointer": "/listaDocumentos/1/layout/1",
  "type": "detalhe",
  "settings": {
    "type": "detalhe",
    "x": 221.82666666666663,
    "y": 294.21666666666664,
    "width": 179.4933333333333,
    "height": 292.18466666666666,
    "orientation": 0,
    "conditional": "",
    "alignment": 0,
    "usaDetIndexado": true,
    "moldurado": false,
    "espessura": 0,
    "sombra": 0,
    "cabecVisivel": false,
    "rodVisivel": false,
    "sumVisivel": true,
    "tamVerCab": 5.08,
    "tamVerDet": 5.08,
    "tamVerRod": 5.08,
    "tamVerSum": 0.8466666666666666,
    "nCab": 0,
    "nDet": 60,
    "nRod": 0,
    "nSum": 1,
    "nome": "PAG3",
    "ocorrenciaIndDet": "TPD",
    "condDet": "",
    "condQuebra": "",
    "tamanhoTotalVertical": 305.6466666666667
  },
  "expressions": [
    {
      "property": "/ocorrenciaIndDet",
      "expression": "TPD",
      "fields": [
        "TPD"
      ]
    }
  ],
  "bands": [
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[20]",
      "settings": {
        "id": 1,
        "nome": "01",
        "kind": "detalhe",
        "defined": true,
        "height": 8.466666666666665,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Detalhe"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[20].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/1/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.926666666666667,
            "width": 178.90066666666664,
            "height": 3.3866666666666663,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[20].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/1/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 0,
            "width": 179.40866666666665,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[20].listaFio[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/1/fios/0",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 8.466666666666665,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[20].listaFio[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/1/fios/1",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0.16933333333333334,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[20].listaFio[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/1/fios/2",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[20].listaFio[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/1/fios/3",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[139]",
      "settings": {
        "id": 3,
        "nome": "SUM1",
        "kind": "sumario",
        "defined": true,
        "height": 0.8466666666666666,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "<nomeBanda omitido; 7 caracteres>"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[139].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/3/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 12.7,
            "height": 5.08,
            "content": "<content omitido; 87 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 12,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "GRAVAJRNGEN (SeqCIF | \"<literal omitido>\" | Jrn | \"<literal omitido>\" | Destinatario, _ContRep, _FileName, _PageNum, 2)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "GRAVAJRNGEN (SeqCIF | \"<literal omitido>\" | Jrn | \"<literal omitido>\" | Destinatario, _ContRep, _FileName, _PageNum, 2)",
              "fields": [
                "SeqCIF",
                "Jrn",
                "Destinatario"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[21]",
      "settings": {
        "id": 4,
        "nome": "02",
        "kind": "detalhe",
        "defined": true,
        "height": 4.2333333333333325,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[21].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/4/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 1.016,
            "y": 3.8099999999999996,
            "width": 178.47733333333332,
            "height": 3.3866666666666663,
            "content": "<content omitido; 4 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 8,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "G1C1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G1C1",
              "fields": [
                "G1C1"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[22]",
      "settings": {
        "id": 5,
        "nome": "03",
        "kind": "detalhe",
        "defined": true,
        "height": 8.466666666666665,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[22].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/5/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0.4233333333333333,
            "y": 6.35,
            "width": 40.97866666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 20 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 8,
              "weight": 400,
              "color": "#FFFFFF",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[22].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/5/camposSaida/1",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 6.35,
            "width": 179.4933333333333,
            "height": 3.8099999999999996,
            "content": "<content omitido; 31 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 9,
              "weight": 700,
              "color": "#FFFFFF",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[22].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/5/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23]",
      "settings": {
        "id": 6,
        "nome": "04",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 4.2333333333333325,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 3 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/camposSaida/1",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 5.926666666666667,
            "y": 4.2333333333333325,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 3 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaCpoSai[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/camposSaida/2",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 11.853333333333333,
            "y": 4.2333333333333325,
            "width": 11.006666666666666,
            "height": 2.54,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaCpoSai[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/camposSaida/3",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 22.86,
            "y": 4.2333333333333325,
            "width": 11.006666666666666,
            "height": 2.54,
            "content": "<content omitido; 3 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaCpoSai[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/camposSaida/4",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 33.86666666666666,
            "y": 4.2333333333333325,
            "width": 16.93333333333333,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaCpoSai[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/camposSaida/5",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 50.8,
            "y": 4.2333333333333325,
            "width": 14.393333333333333,
            "height": 2.54,
            "content": "<content omitido; 11 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaCpoSai[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/camposSaida/6",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 173.56666666666666,
            "y": 4.2333333333333325,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 4 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaCpoSai[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/camposSaida/7",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 159.17333333333332,
            "y": 4.2333333333333325,
            "width": 14.393333333333333,
            "height": 2.54,
            "content": "<content omitido; 12 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaCpoSai[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/camposSaida/8",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 125.476,
            "y": 4.2333333333333325,
            "width": 34.544000000000004,
            "height": 2.54,
            "content": "<content omitido; 4 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaCpoSai[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/camposSaida/9",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 66.03999999999999,
            "y": 4.2333333333333325,
            "width": 61.383333333333326,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "G10C7",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C7",
              "fields": [
                "G10C7"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/0",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 5.926666666666667,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/1",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 11.853333333333333,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/2",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 22.86,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/3",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 33.86666666666666,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/4",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 65.10866666666666,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/5",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 50.88466666666667,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/6",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 125.89933333333333,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/7",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 159.17333333333332,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/8",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 173.56666666666666,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/9",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 5.08,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[10]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/10",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0.16933333333333334,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[11]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/11",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[23].listaFio[12]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/6/fios/12",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24]",
      "settings": {
        "id": 7,
        "nome": "05",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 4.2333333333333325,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C1",
              "fields": [
                "G10C1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/camposSaida/1",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 5.926666666666667,
            "y": 4.2333333333333325,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C2",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C2",
              "fields": [
                "G10C2"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaCpoSai[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/camposSaida/2",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 11.853333333333333,
            "y": 4.2333333333333325,
            "width": 11.006666666666666,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C3",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C3",
              "fields": [
                "G10C3"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaCpoSai[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/camposSaida/3",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 22.86,
            "y": 4.2333333333333325,
            "width": 11.006666666666666,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C4",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C4",
              "fields": [
                "G10C4"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaCpoSai[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/camposSaida/4",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 33.86666666666666,
            "y": 4.2333333333333325,
            "width": 16.93333333333333,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C5",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C5",
              "fields": [
                "G10C5"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaCpoSai[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/camposSaida/5",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 50.8,
            "y": 4.2333333333333325,
            "width": 14.393333333333333,
            "height": 2.54,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaCpoSai[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/camposSaida/6",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 173.56666666666666,
            "y": 4.2333333333333325,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 6 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C10",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C10",
              "fields": [
                "G10C10"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaCpoSai[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/camposSaida/7",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 159.17333333333332,
            "y": 4.2333333333333325,
            "width": 14.393333333333333,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C9",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C9",
              "fields": [
                "G10C9"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaCpoSai[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/camposSaida/8",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 125.13733333333333,
            "y": 4.2333333333333325,
            "width": 34.882666666666665,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C8",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C8",
              "fields": [
                "G10C8"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaCpoSai[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/camposSaida/9",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 66.03999999999999,
            "y": 4.2333333333333325,
            "width": 61.467999999999996,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "G10C7",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C7",
              "fields": [
                "G10C7"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaFio[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/fios/0",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 5.926666666666667,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaFio[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/fios/1",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 11.853333333333333,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaFio[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/fios/2",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 22.86,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaFio[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/fios/3",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 33.86666666666666,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaFio[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/fios/4",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 65.10866666666666,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaFio[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/fios/5",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 50.88466666666667,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaFio[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/fios/6",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 125.89933333333333,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaFio[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/fios/7",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 159.17333333333332,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaFio[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/fios/8",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 173.56666666666666,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaFio[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/fios/9",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 5.08,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaFio[10]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/fios/10",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[24].listaFio[11]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/7/fios/11",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25]",
      "settings": {
        "id": 8,
        "nome": "06",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 1.4393333333333331,
            "y": 4.2333333333333325,
            "width": 71.79733333333333,
            "height": 2.54,
            "content": "<content omitido; 6 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/camposSaida/1",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 101.26133333333333,
            "y": 4.2333333333333325,
            "width": 15.409333333333333,
            "height": 2.54,
            "content": "<content omitido; 14 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaCpoSai[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/camposSaida/2",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 155.78666666666666,
            "y": 4.2333333333333325,
            "width": 23.706666666666667,
            "height": 2.54,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaCpoSai[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/camposSaida/3",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 132.07999999999998,
            "y": 4.2333333333333325,
            "width": 23.706666666666667,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaCpoSai[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/camposSaida/4",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 74.25266666666666,
            "y": 4.2333333333333325,
            "width": 10.668,
            "height": 2.54,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaCpoSai[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/camposSaida/5",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 86.19066666666667,
            "y": 4.2333333333333325,
            "width": 14.054666666666666,
            "height": 2.54,
            "content": "<content omitido; 11 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaCpoSai[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/camposSaida/6",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 117.51733333333334,
            "y": 4.2333333333333325,
            "width": 13.97,
            "height": 2.54,
            "content": "<content omitido; 11 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0.08466666666666667,
            "y": 0,
            "width": 0,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaFio[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/fios/0",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 155.78666666666666,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaFio[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/fios/1",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 132.07999999999998,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaFio[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/fios/2",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 116.83999999999999,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaFio[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/fios/3",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 100.75333333333333,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaFio[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/fios/4",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 85.51333333333334,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaFio[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/fios/5",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 73.66,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaFio[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/fios/6",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0.16933333333333334,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaFio[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/fios/7",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 5.08,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaFio[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/fios/8",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[25].listaFio[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/8/fios/9",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 0,
            "width": 0,
            "height": 5.08,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26]",
      "settings": {
        "id": 9,
        "nome": "07",
        "kind": "detalhe",
        "defined": true,
        "height": 3.3866666666666663,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 1.4393333333333331,
            "y": 2.9633333333333334,
            "width": 71.79733333333333,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Ltrimm (G7C1)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Ltrimm (G7C1)",
              "fields": [
                "G7C1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/camposSaida/1",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 101.43066666666665,
            "y": 2.9633333333333334,
            "width": 14.816666666666666,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G7C4)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G7C4)",
              "fields": [
                "G7C4"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaCpoSai[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/camposSaida/2",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 155.78666666666666,
            "y": 2.9633333333333334,
            "width": 23.02933333333333,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm (G7C7)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G7C7)",
              "fields": [
                "G7C7"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaCpoSai[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/camposSaida/3",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 132.07999999999998,
            "y": 2.9633333333333334,
            "width": 23.114,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm (G7C6)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G7C6)",
              "fields": [
                "G7C6"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaCpoSai[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/camposSaida/4",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 74.25266666666666,
            "y": 2.9633333333333334,
            "width": 10.668,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G7C2)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G7C2)",
              "fields": [
                "G7C2"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaCpoSai[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/camposSaida/5",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 86.19066666666667,
            "y": 2.9633333333333334,
            "width": 14.054666666666666,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G7C3)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G7C3)",
              "fields": [
                "G7C3"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaCpoSai[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/camposSaida/6",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 117.51733333333334,
            "y": 2.9633333333333334,
            "width": 13.97,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G7C5)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G7C5)",
              "fields": [
                "G7C5"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaFio[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/fios/0",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 155.78666666666666,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaFio[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/fios/1",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 132.07999999999998,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaFio[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/fios/2",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 116.83999999999999,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaFio[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/fios/3",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 100.75333333333333,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaFio[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/fios/4",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 85.51333333333334,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaFio[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/fios/5",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 73.66,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaFio[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/fios/6",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaFio[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/fios/7",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[26].listaFio[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/9/fios/8",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 3.3866666666666663,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27]",
      "settings": {
        "id": 10,
        "nome": "08",
        "kind": "detalhe",
        "defined": true,
        "height": 3.3866666666666663,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 1.4393333333333331,
            "y": 2.9633333333333334,
            "width": 71.79733333333333,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Ltrimm (G7C1)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Ltrimm (G7C1)",
              "fields": [
                "G7C1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/camposSaida/1",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 101.43066666666665,
            "y": 2.9633333333333334,
            "width": 14.816666666666666,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G7C4)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G7C4)",
              "fields": [
                "G7C4"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaCpoSai[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/camposSaida/2",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 155.78666666666666,
            "y": 2.9633333333333334,
            "width": 23.02933333333333,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm (G7C7)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G7C7)",
              "fields": [
                "G7C7"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaCpoSai[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/camposSaida/3",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 132.07999999999998,
            "y": 2.9633333333333334,
            "width": 22.944666666666667,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm (G7C6)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G7C6)",
              "fields": [
                "G7C6"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaCpoSai[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/camposSaida/4",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 74.25266666666666,
            "y": 2.9633333333333334,
            "width": 10.668,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G7C2)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G7C2)",
              "fields": [
                "G7C2"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaCpoSai[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/camposSaida/5",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 86.19066666666667,
            "y": 2.9633333333333334,
            "width": 14.054666666666666,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G7C3)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G7C3)",
              "fields": [
                "G7C3"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaCpoSai[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/camposSaida/6",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 117.51733333333334,
            "y": 2.9633333333333334,
            "width": 13.97,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G7C5)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G7C5)",
              "fields": [
                "G7C5"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 0,
            "width": 179.4933333333333,
            "height": 3.471333333333333,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaFio[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/fios/0",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 155.78666666666666,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaFio[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/fios/1",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 132.07999999999998,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaFio[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/fios/2",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 116.83999999999999,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaFio[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/fios/3",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 100.75333333333333,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaFio[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/fios/4",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 85.51333333333334,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaFio[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/fios/5",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 73.66,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaFio[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/fios/6",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaFio[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/fios/7",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaFio[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/fios/8",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0.16933333333333334,
            "width": 179.40866666666665,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[27].listaFio[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/10/fios/9",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 3.3866666666666663,
            "width": 179.40866666666665,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28]",
      "settings": {
        "id": 11,
        "nome": "09",
        "kind": "detalhe",
        "defined": true,
        "height": 8.466666666666665,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.926666666666667,
            "width": 15.239999999999998,
            "height": 2.54,
            "content": "<content omitido; 7 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/1",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 16.086666666666666,
            "y": 5.926666666666667,
            "width": 44.026666666666664,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/2",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 60.11333333333333,
            "y": 3.3866666666666663,
            "width": 13.546666666666665,
            "height": 2.54,
            "content": "<content omitido; 12 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "<bytes legados: requer inspeção do .f>",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "<bytes legados: requer inspeção do .f>",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/3",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 60.11333333333333,
            "y": 5.672666666666666,
            "width": 13.546666666666665,
            "height": 2.54,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/4",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 60.11333333333333,
            "y": 8.043333333333333,
            "width": 13.546666666666665,
            "height": 2.54,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/5",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 73.66,
            "y": 4.2333333333333325,
            "width": 13.546666666666665,
            "height": 2.54,
            "content": "<content omitido; 4 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/6",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 73.66,
            "y": 6.7733333333333325,
            "width": 13.546666666666665,
            "height": 2.54,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/7",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 87.20666666666666,
            "y": 5.926666666666667,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 4 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/8",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 93.13333333333333,
            "y": 4.2333333333333325,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 4 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/9",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 93.13333333333333,
            "y": 6.7733333333333325,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[10]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/10",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 99.05999999999999,
            "y": 5.926666666666667,
            "width": 5.926666666666667,
            "height": 2.2013333333333334,
            "content": "<content omitido; 6 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 5,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[11]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/11",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 104.98666666666666,
            "y": 5.926666666666667,
            "width": 5.926666666666667,
            "height": 2.2013333333333334,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 5,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[12]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/12",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 160.01999999999998,
            "y": 7.619999999999999,
            "width": 19.473333333333333,
            "height": 2.54,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[13]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/13",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 140.54666666666665,
            "y": 7.619999999999999,
            "width": 19.473333333333333,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[14]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/14",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 128.69333333333333,
            "y": 7.619999999999999,
            "width": 11.853333333333333,
            "height": 2.54,
            "content": "<content omitido; 7 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[15]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/15",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 124.46000000000001,
            "y": 3.3866666666666663,
            "width": 4.2333333333333325,
            "height": 2.54,
            "content": "<content omitido; 1 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[16]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/16",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 124.46000000000001,
            "y": 5.672666666666666,
            "width": 4.2333333333333325,
            "height": 2.54,
            "content": "<content omitido; 1 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[17]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/17",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 124.46000000000001,
            "y": 8.043333333333333,
            "width": 4.2333333333333325,
            "height": 2.54,
            "content": "<content omitido; 3 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[18]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/18",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 110.91333333333331,
            "y": 5.926666666666667,
            "width": 13.546666666666665,
            "height": 2.54,
            "content": "<content omitido; 11 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaCpoSai[19]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/camposSaida/19",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 128.69333333333333,
            "y": 3.3866666666666663,
            "width": 50.8,
            "height": 2.54,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0.08466666666666667,
            "y": 0,
            "width": 179.40866666666665,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/0",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 15.239999999999998,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/1",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 128.69333333333333,
            "y": 4.2333333333333325,
            "width": 50.8,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/2",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 160.01999999999998,
            "y": 4.2333333333333325,
            "width": 0,
            "height": 4.2333333333333325,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/3",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 140.54666666666665,
            "y": 4.2333333333333325,
            "width": 0,
            "height": 4.2333333333333325,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/4",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 128.69333333333333,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/5",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 124.46000000000001,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/6",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 110.91333333333331,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/7",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 87.20666666666666,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/8",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 99.05999999999999,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/9",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 93.13333333333333,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[10]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/10",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 104.98666666666666,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[11]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/11",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 73.66,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[12]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/12",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 8.466666666666665,
            "width": 179.40866666666665,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[13]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/13",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0.16933333333333334,
            "width": 179.40866666666665,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[14]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/14",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[28].listaFio[15]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/11/fios/15",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29]",
      "settings": {
        "id": 12,
        "nome": "10",
        "kind": "detalhe",
        "defined": true,
        "height": 2.54,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 2.54,
            "width": 15.239999999999998,
            "height": 2.54,
            "content": "<content omitido; 14 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G14C2)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G14C2)",
              "fields": [
                "G14C2"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/1",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 16.086666666666666,
            "y": 2.54,
            "width": 44.026666666666664,
            "height": 2.54,
            "content": "<content omitido; 14 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Ltrimm (G14C3)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Ltrimm (G14C3)",
              "fields": [
                "G14C3"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/2",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 59.69,
            "y": 2.54,
            "width": 13.462,
            "height": 2.54,
            "content": "<content omitido; 14 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm (G14C4)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G14C4)",
              "fields": [
                "G14C4"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/3",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 73.66,
            "y": 2.54,
            "width": 13.462,
            "height": 2.54,
            "content": "<content omitido; 14 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G14C5)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G14C5)",
              "fields": [
                "G14C5"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/4",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 87.20666666666666,
            "y": 2.54,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 14 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G14C6)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G14C6)",
              "fields": [
                "G14C6"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/5",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 93.13333333333333,
            "y": 2.54,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 14 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G14C7)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G14C7)",
              "fields": [
                "G14C7"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/6",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 99.05999999999999,
            "y": 2.54,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 14 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G14C8)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G14C8)",
              "fields": [
                "G14C8"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/7",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 104.98666666666666,
            "y": 2.54,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 14 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G14C9)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G14C9)",
              "fields": [
                "G14C9"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/8",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 160.01999999999998,
            "y": 2.54,
            "width": 18.965333333333334,
            "height": 2.54,
            "content": "<content omitido; 15 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm (G14C14)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G14C14)",
              "fields": [
                "G14C14"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/9",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 140.462,
            "y": 2.54,
            "width": 18.880666666666663,
            "height": 2.54,
            "content": "<content omitido; 15 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm (G14C13)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G14C13)",
              "fields": [
                "G14C13"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[10]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/10",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 128.69333333333333,
            "y": 2.54,
            "width": 11.937999999999999,
            "height": 2.54,
            "content": "<content omitido; 15 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G14C12)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G14C12)",
              "fields": [
                "G14C12"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[11]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/11",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 124.46000000000001,
            "y": 2.54,
            "width": 4.2333333333333325,
            "height": 2.54,
            "content": "<content omitido; 15 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G14C11)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G14C11)",
              "fields": [
                "G14C11"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaCpoSai[12]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/camposSaida/12",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 110.91333333333331,
            "y": 2.54,
            "width": 13.462,
            "height": 2.54,
            "content": "<content omitido; 15 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G14C10)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G14C10)",
              "fields": [
                "G14C10"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/0",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 15.239999999999998,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/1",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 160.01999999999998,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/2",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 140.54666666666665,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/3",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 128.69333333333333,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/4",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 124.46000000000001,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/5",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 110.91333333333331,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/6",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 87.20666666666666,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/7",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 99.05999999999999,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/8",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 93.13333333333333,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/9",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 104.98666666666666,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[10]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/10",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 73.66,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[11]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/11",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[12]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/12",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[29].listaFio[13]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/12/fios/13",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 2.54,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30]",
      "settings": {
        "id": 13,
        "nome": "11",
        "kind": "detalhe",
        "defined": true,
        "height": 13.546666666666665,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 11.006666666666666,
            "width": 15.239999999999998,
            "height": 2.54,
            "content": "<content omitido; 7 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/camposSaida/1",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 16.002,
            "y": 11.006666666666666,
            "width": 46.90533333333333,
            "height": 2.54,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaCpoSai[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/camposSaida/2",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 125.22199999999998,
            "y": 9.313333333333333,
            "width": 11.43,
            "height": 2.54,
            "content": "<content omitido; 4 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaCpoSai[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/camposSaida/3",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 64.17733333333334,
            "y": 11.006666666666666,
            "width": 46.90533333333333,
            "height": 2.54,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaCpoSai[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/camposSaida/4",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 159.004,
            "y": 12.7,
            "width": 19.72733333333333,
            "height": 2.54,
            "content": "<content omitido; 12 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaCpoSai[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/camposSaida/5",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 137.83733333333333,
            "y": 12.7,
            "width": 19.981333333333332,
            "height": 2.54,
            "content": "<content omitido; 4 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaCpoSai[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/camposSaida/6",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 112.52199999999999,
            "y": 11.853333333333333,
            "width": 11.43,
            "height": 2.54,
            "content": "<content omitido; 6 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaCpoSai[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/camposSaida/7",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 137.922,
            "y": 8.466666666666665,
            "width": 40.809333333333335,
            "height": 2.54,
            "content": "<content omitido; 7 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaCpoSai[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/camposSaida/8",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 112.43733333333333,
            "y": 9.313333333333333,
            "width": 11.43,
            "height": 2.54,
            "content": "<content omitido; 4 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaCpoSai[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/camposSaida/9",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 125.05266666666665,
            "y": 11.853333333333333,
            "width": 11.43,
            "height": 2.54,
            "content": "<content omitido; 7 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaCpoSai[10]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/camposSaida/10",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 179.4933333333333,
            "height": 2.794,
            "content": "<content omitido; 40 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 7,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0.08466666666666667,
            "y": 5.08,
            "width": 179.40866666666665,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/0",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 15.239999999999998,
            "y": 5.08,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/1",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 137.16,
            "y": 9.313333333333333,
            "width": 42.163999999999994,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/2",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 158.32666666666665,
            "y": 9.313333333333333,
            "width": 0,
            "height": 4.2333333333333325,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/3",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 137.16,
            "y": 5.08,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/4",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 124.46000000000001,
            "y": 5.08,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/5",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 111.76,
            "y": 5.08,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/6",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 63.5,
            "y": 5.08,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/7",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 13.546666666666665,
            "width": 179.40866666666665,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/8",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 5.249333333333333,
            "width": 179.40866666666665,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/9",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 5.08,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[10]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/10",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 5.08,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[11]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/11",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 13.546666666666665,
            "width": 179.40866666666665,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[12]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/12",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 5.249333333333333,
            "width": 179.40866666666665,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[13]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/13",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 5.08,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[30].listaFio[14]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/13/fios/14",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 5.08,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31]",
      "settings": {
        "id": 14,
        "nome": "12",
        "kind": "detalhe",
        "defined": true,
        "height": 2.54,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 2.54,
            "width": 15.239999999999998,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G8C2)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G8C2)",
              "fields": [
                "G8C2"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/camposSaida/1",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 16.086666666666666,
            "y": 2.54,
            "width": 47.32866666666666,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Ltrimm (G8C3)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Ltrimm (G8C3)",
              "fields": [
                "G8C3"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaCpoSai[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/camposSaida/2",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 64.09266666666666,
            "y": 2.54,
            "width": 47.58266666666666,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Ltrimm (G8C4)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Ltrimm (G8C4)",
              "fields": [
                "G8C4"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaCpoSai[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/camposSaida/3",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 111.92933333333332,
            "y": 2.54,
            "width": 12.446,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G8C5)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G8C5)",
              "fields": [
                "G8C5"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaCpoSai[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/camposSaida/4",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 124.714,
            "y": 2.54,
            "width": 12.446,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm (G8C6)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G8C6)",
              "fields": [
                "G8C6"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaCpoSai[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/camposSaida/5",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 137.58333333333334,
            "y": 2.54,
            "width": 20.32,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm (G8C7)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G8C7)",
              "fields": [
                "G8C7"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaCpoSai[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/camposSaida/6",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 158.75,
            "y": 2.54,
            "width": 20.150666666666666,
            "height": 2.54,
            "content": "<content omitido; 13 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm (G8C8)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Rtrimm (G8C8)",
              "fields": [
                "G8C8"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaFio[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/fios/0",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaFio[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/fios/1",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaFio[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/fios/2",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 15.239999999999998,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaFio[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/fios/3",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 63.5,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaFio[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/fios/4",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 111.76,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaFio[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/fios/5",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 124.46000000000001,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaFio[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/fios/6",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 137.16,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaFio[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/fios/7",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 158.32666666666665,
            "y": 0,
            "width": 0,
            "height": 2.54,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[31].listaFio[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/14/fios/8",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 2.54,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32]",
      "settings": {
        "id": 15,
        "nome": "13",
        "kind": "detalhe",
        "defined": true,
        "height": 8.466666666666665,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.926666666666667,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C1",
              "fields": [
                "G10C1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/camposSaida/1",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 5.926666666666667,
            "y": 5.926666666666667,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C2",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C2",
              "fields": [
                "G10C2"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaCpoSai[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/camposSaida/2",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 11.853333333333333,
            "y": 3.8099999999999996,
            "width": 11.006666666666666,
            "height": 2.54,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "AplMedica",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "AplMedica",
              "fields": [
                "AplMedica"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaCpoSai[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/camposSaida/3",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 22.86,
            "y": 3.8099999999999996,
            "width": 11.006666666666666,
            "height": 2.54,
            "content": "<content omitido; 6 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaCpoSai[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/camposSaida/4",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 33.86666666666666,
            "y": 5.926666666666667,
            "width": 16.93333333333333,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C5",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C5",
              "fields": [
                "G10C5"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaCpoSai[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/camposSaida/5",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 50.46133333333333,
            "y": 5.926666666666667,
            "width": 14.393333333333333,
            "height": 2.54,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaCpoSai[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/camposSaida/6",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 173.56666666666666,
            "y": 5.926666666666667,
            "width": 5.926666666666667,
            "height": 2.54,
            "content": "<content omitido; 6 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C10",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C10",
              "fields": [
                "G10C10"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaCpoSai[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/camposSaida/7",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 159.17333333333332,
            "y": 5.926666666666667,
            "width": 14.393333333333333,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C9",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C9",
              "fields": [
                "G10C9"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaCpoSai[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/camposSaida/8",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 125.13733333333333,
            "y": 5.926666666666667,
            "width": 34.882666666666665,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "G10C8",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C8",
              "fields": [
                "G10C8"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaCpoSai[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/camposSaida/9",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 66.03999999999999,
            "y": 5.926666666666667,
            "width": 61.467999999999996,
            "height": 2.54,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "G10C7",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G10C7",
              "fields": [
                "G10C7"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaCpoSai[10]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/camposSaida/10",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 11.853333333333333,
            "y": 6.7733333333333325,
            "width": 11.006666666666666,
            "height": 2.54,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "AplDental",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "AplDental",
              "fields": [
                "AplDental"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaCpoSai[11]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/camposSaida/11",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 22.86,
            "y": 6.7733333333333325,
            "width": 11.006666666666666,
            "height": 2.54,
            "content": "<content omitido; 6 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "\"<literal omitido>\"",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\"",
              "fields": []
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 50.88466666666667,
            "y": 0.08466666666666667,
            "width": 14.224,
            "height": 8.382,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaFio[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/fios/0",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 5.926666666666667,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaFio[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/fios/1",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 11.853333333333333,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaFio[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/fios/2",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 22.86,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaFio[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/fios/3",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 33.86666666666666,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaFio[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/fios/4",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 65.10866666666666,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaFio[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/fios/5",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 50.88466666666667,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaFio[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/fios/6",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 125.89933333333333,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaFio[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/fios/7",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 159.17333333333332,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaFio[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/fios/8",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 173.56666666666666,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaFio[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/fios/9",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 8.466666666666665,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaFio[10]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/fios/10",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[32].listaFio[11]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/15/fios/11",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 0,
            "width": 0,
            "height": 8.466666666666665,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[33]",
      "settings": {
        "id": 16,
        "nome": "14",
        "kind": "detalhe",
        "defined": true,
        "height": 3.3866666666666663,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[33].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/16/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 1.6933333333333331,
            "y": 2.9633333333333334,
            "width": 93.13333333333333,
            "height": 2.54,
            "content": "<content omitido; 4 caracteres>",
            "font": {
              "family": "NewJuneLight3",
              "size": 6,
              "weight": 400,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "G1C1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G1C1",
              "fields": [
                "G1C1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[33].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/16/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 0,
            "width": 179.4933333333333,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[33].listaFio[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/16/fios/0",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0.16933333333333334,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[33].listaFio[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/16/fios/1",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 3.3866666666666663,
            "width": 179.4933333333333,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 14 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[33].listaFio[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/16/fios/2",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[33].listaFio[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/16/fios/3",
          "type": "fio",
          "settings": {
            "type": "fio",
            "x": 179.32399999999998,
            "y": 0,
            "width": 0,
            "height": 3.3866666666666663,
            "orientation": 0,
            "alignment": 0,
            "espessura": 0.16933333333333334,
            "cor": 0,
            "tipoFio": "<tipoFio omitido; 12 caracteres>"
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[34]",
      "settings": {
        "id": 17,
        "nome": "15",
        "kind": "detalhe",
        "defined": true,
        "height": 4.2333333333333325,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[34].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/17/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 1.016,
            "y": 3.8099999999999996,
            "width": 178.47733333333332,
            "height": 3.3866666666666663,
            "content": "<content omitido; 4 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 8,
              "weight": 700,
              "color": "#FF0000",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "G1C1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "G1C1",
              "fields": [
                "G1C1"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[35]",
      "settings": {
        "id": 18,
        "nome": "16",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[35].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/18/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[36]",
      "settings": {
        "id": 19,
        "nome": "17",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[36].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/19/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[37]",
      "settings": {
        "id": 20,
        "nome": "18",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[37].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/20/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[38]",
      "settings": {
        "id": 21,
        "nome": "19",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[38].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/21/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39]",
      "settings": {
        "id": 22,
        "nome": "20",
        "kind": "detalhe",
        "defined": true,
        "height": 152.39999999999998,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 16.509999999999998,
            "width": 47.413333333333334,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Seguradora",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Seguradora",
              "fields": [
                "Seguradora"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/1",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 50.8,
            "y": 16.509999999999998,
            "width": 37.25333333333333,
            "height": 3.3866666666666663,
            "content": "<content omitido; 7 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "CNPJSeg",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "CNPJSeg",
              "fields": [
                "CNPJSeg"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[2]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/2",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 88.73066666666666,
            "y": 16.509999999999998,
            "width": 19.388666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Proposta",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Proposta",
              "fields": [
                "Proposta"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[3]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/3",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 108.204,
            "y": 16.509999999999998,
            "width": 10.837333333333333,
            "height": 3.3866666666666663,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Prestacao",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Prestacao",
              "fields": [
                "Prestacao"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[4]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/4",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 119.38,
            "y": 16.509999999999998,
            "width": 21.081999999999997,
            "height": 3.3866666666666663,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Controle",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Controle",
              "fields": [
                "Controle"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[5]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/5",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 141.56266666666664,
            "y": 16.509999999999998,
            "width": 37.93066666666667,
            "height": 3.3866666666666663,
            "content": "<content omitido; 6 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "DtVenc",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "DtVenc",
              "fields": [
                "DtVenc"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[6]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/6",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 22.605999999999998,
            "width": 37.592,
            "height": 3.3866666666666663,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "DtEmissao",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "DtEmissao",
              "fields": [
                "DtEmissao"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[7]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/7",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 40.30133333333333,
            "y": 22.605999999999998,
            "width": 29.379333333333335,
            "height": 3.3866666666666663,
            "content": "<content omitido; 7 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Apolice",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Apolice",
              "fields": [
                "Apolice"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[8]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/8",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 69.85,
            "y": 22.86,
            "width": 25.31533333333333,
            "height": 3.3866666666666663,
            "content": "<content omitido; 7 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Endosso",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Endosso",
              "fields": [
                "Endosso"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[9]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/9",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 95.58866666666665,
            "y": 22.605999999999998,
            "width": 83.90466666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "InfoCompl",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "InfoCompl",
              "fields": [
                "InfoCompl"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[10]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/10",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 28.363333333333333,
            "width": 54.27133333333333,
            "height": 3.3866666666666663,
            "content": "<content omitido; 6 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "PerVig",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "PerVig",
              "fields": [
                "PerVig"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[11]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/11",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 58.75866666666667,
            "y": 28.363333333333333,
            "width": 120.73466666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 7 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "NomeSeg",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "NomeSeg",
              "fields": [
                "NomeSeg"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[12]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/12",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 34.29,
            "width": 19.473333333333333,
            "height": 3.3866666666666663,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Moeda",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Moeda",
              "fields": [
                "Moeda"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[13]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/13",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 23.706666666666667,
            "y": 34.29,
            "width": 35.306,
            "height": 3.3866666666666663,
            "content": "<content omitido; 11 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "PremioTotal",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "PremioTotal",
              "fields": [
                "PremioTotal"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[14]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/14",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 58.58933333333333,
            "y": 34.29,
            "width": 120.73466666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Corretor",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Corretor",
              "fields": [
                "Corretor"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[15]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/15",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 40.21666666666666,
            "width": 32.004,
            "height": 3.3866666666666663,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "AgCedente",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "AgCedente",
              "fields": [
                "AgCedente"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[16]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/16",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 35.221333333333334,
            "y": 40.21666666666666,
            "width": 13.716,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "NrCarteira",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "NrCarteira",
              "fields": [
                "NrCarteira"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[17]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/17",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 48.34466666666666,
            "y": 40.21666666666666,
            "width": 29.633333333333333,
            "height": 3.3866666666666663,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "NossoNum",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "NossoNum",
              "fields": [
                "NossoNum"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[18]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/18",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 76.96199999999999,
            "y": 40.21666666666666,
            "width": 23.02933333333333,
            "height": 3.3866666666666663,
            "content": "<content omitido; 7 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "NrConta",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "NrConta",
              "fields": [
                "NrConta"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[19]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/19",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 99.22933333333333,
            "y": 40.21666666666666,
            "width": 80.264,
            "height": 3.3866666666666663,
            "content": "<content omitido; 5 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Chave",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Chave",
              "fields": [
                "Chave"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[20]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/20",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 42.333333333333336,
            "y": 57.15,
            "width": 137.16,
            "height": 4.148666666666666,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "NewJuneMedium",
              "size": 10,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "CodBarra",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "CodBarra",
              "fields": [
                "CodBarra"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[21]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/21",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 65.61666666666666,
            "width": 139.10733333333332,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "LocalPgto1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "LocalPgto1",
              "fields": [
                "LocalPgto1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[22]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/22",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 69.00333333333333,
            "width": 139.192,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "LocalPgto2",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "LocalPgto2",
              "fields": [
                "LocalPgto2"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[23]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/23",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 141.39333333333332,
            "y": 67.73333333333332,
            "width": 33.86666666666666,
            "height": 4.148666666666666,
            "content": "<content omitido; 7 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 10,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "DtVenc1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "DtVenc1",
              "fields": [
                "DtVenc1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[24]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/24",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 141.39333333333332,
            "y": 75.35333333333334,
            "width": 33.86666666666666,
            "height": 2.794,
            "content": "<content omitido; 26 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 7,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "AgCedente1 | \"/\" | NrConta",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "AgCedente1 | \"/\" | NrConta",
              "fields": [
                "AgCedente1",
                "NrConta"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[25]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/25",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.556,
            "y": 75.35333333333334,
            "width": 139.192,
            "height": 3.3866666666666663,
            "content": "<content omitido; 195 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "<bytes legados: requer inspeção do .f>",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "<bytes legados: requer inspeção do .f>",
              "fields": [
                "Cedente1",
                "CNPJCedente",
                "CEPCedente",
                "NumEndCedent",
                "UFCedente"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[26]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/26",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 81.70333333333333,
            "width": 25.4,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "DtEmissao1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "DtEmissao1",
              "fields": [
                "DtEmissao1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[27]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/27",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 28.701999999999995,
            "y": 81.70333333333333,
            "width": 24.637999999999998,
            "height": 3.3866666666666663,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Proposta",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Proposta",
              "fields": [
                "Proposta"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[28]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/28",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 53.17066666666666,
            "y": 81.70333333333333,
            "width": 17.610666666666667,
            "height": 3.3866666666666663,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Reemissao",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Reemissao",
              "fields": [
                "Reemissao"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[29]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/29",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 70.78133333333332,
            "y": 81.70333333333333,
            "width": 14.562666666666667,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Prestacao1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Prestacao1",
              "fields": [
                "Prestacao1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[30]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/30",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 85.09,
            "y": 81.70333333333333,
            "width": 17.102666666666664,
            "height": 3.3866666666666663,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Apolice1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Apolice1",
              "fields": [
                "Apolice1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[31]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/31",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 103.378,
            "y": 81.70333333333333,
            "width": 18.965333333333334,
            "height": 3.3866666666666663,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Endosso1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Endosso1",
              "fields": [
                "Endosso1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[32]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/32",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 122.08933333333333,
            "y": 81.70333333333333,
            "width": 19.049999999999997,
            "height": 3.3866666666666663,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Controle1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Controle1",
              "fields": [
                "Controle1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[33]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/33",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 141.39333333333332,
            "y": 81.70333333333333,
            "width": 33.86666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 27 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Carteira1 | \"/\" | NossoNum1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Carteira1 | \"/\" | NossoNum1",
              "fields": [
                "Carteira1",
                "NossoNum1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[34]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/34",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 87.63,
            "width": 25.4,
            "height": 3.3866666666666663,
            "content": "<content omitido; 9 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Carteira2",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Carteira2",
              "fields": [
                "Carteira2"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[35]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/35",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 28.701999999999995,
            "y": 87.63,
            "width": 24.637999999999998,
            "height": 3.3866666666666663,
            "content": "<content omitido; 6 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Moeda1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Moeda1",
              "fields": [
                "Moeda1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[36]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/36",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 53.17066666666666,
            "y": 87.63,
            "width": 49.699333333333335,
            "height": 3.3866666666666663,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "QtdMoeda",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "QtdMoeda",
              "fields": [
                "QtdMoeda"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[37]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/37",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 120.22666666666666,
            "width": 97.02799999999999,
            "height": 3.3866666666666663,
            "content": "<content omitido; 6 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Chave1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Chave1",
              "fields": [
                "Chave1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[38]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/38",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 101.43066666666665,
            "y": 120.22666666666666,
            "width": 39.45466666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 3 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "IOF",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "IOF",
              "fields": [
                "IOF"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[39]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/39",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 101.43066666666665,
            "y": 127.42333333333332,
            "width": 76.19999999999999,
            "height": 3.3866666666666663,
            "content": "<content omitido; 52 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | mascara (CNPJCobra, \"99.999.999/9999-99\")",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | mascara (CNPJCobra, \"99.999.999/9999-99\")",
              "fields": [
                "CNPJCobra"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[40]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/40",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 127.42333333333332,
            "width": 97.36666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 8 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "NomeSeg1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "NomeSeg1",
              "fields": [
                "NomeSeg1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[41]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/41",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 130.38666666666666,
            "width": 97.36666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 61 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "EndCobranca | Rtrimm (CidadeCobra) | \"   \" | Rtrimm (UFCobra)",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "EndCobranca | Rtrimm (CidadeCobra) | \"   \" | Rtrimm (UFCobra)",
              "fields": [
                "EndCobranca",
                "CidadeCobra",
                "UFCobra"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[42]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/42",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 133.35,
            "width": 97.36666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 40 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | mascara (CepCobra, \"<número omitido>-999\")",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | mascara (CepCobra, \"<número omitido>-999\")",
              "fields": [
                "CepCobra"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[43]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/43",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 93.55666666666666,
            "width": 138.00666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Instrucao1",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Instrucao1",
              "fields": [
                "Instrucao1"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[44]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/44",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 96.52,
            "width": 138.00666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Instrucao2",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Instrucao2",
              "fields": [
                "Instrucao2"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[45]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/45",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 99.48333333333332,
            "width": 138.00666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Instrucao3",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Instrucao3",
              "fields": [
                "Instrucao3"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[46]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/46",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 102.44666666666666,
            "width": 138.00666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Instrucao4",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Instrucao4",
              "fields": [
                "Instrucao4"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[47]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/47",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 105.41,
            "width": 138.00666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Instrucao5",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Instrucao5",
              "fields": [
                "Instrucao5"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[48]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/48",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 108.37333333333332,
            "width": 138.00666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Instrucao6",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Instrucao6",
              "fields": [
                "Instrucao6"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[49]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/49",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 111.33666666666667,
            "width": 138.00666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Instrucao7",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Instrucao7",
              "fields": [
                "Instrucao7"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[50]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/50",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 3.3866666666666663,
            "y": 114.3,
            "width": 138.00666666666666,
            "height": 3.3866666666666663,
            "content": "<content omitido; 10 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 8,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Instrucao8",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "Instrucao8",
              "fields": [
                "Instrucao8"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[51]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/51",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 141.39333333333332,
            "y": 87.63,
            "width": 33.86666666666666,
            "height": 4.148666666666666,
            "content": "<content omitido; 12 caracteres>",
            "font": {
              "family": "Frutiger Sirius",
              "size": 10,
              "weight": 700,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "ValorCobrado",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "ValorCobrado",
              "fields": [
                "ValorCobrado"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaCpoSai[52]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/camposSaida/52",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 7.112,
            "y": 152.146,
            "width": 166.36999999999998,
            "height": 32.08866666666667,
            "content": "<content omitido; 41 caracteres>",
            "font": {
              "family": "Interleaved 2 of 5",
              "size": 76,
              "weight": 100,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "IF ( Rtrimm (CodBarra2) != \" \") CodBarra2",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 10,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "IF ( Rtrimm (CodBarra2) != \" \") CodBarra2",
              "fields": [
                "CodBarra2"
              ]
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[39].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/22/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[40]",
      "settings": {
        "id": 23,
        "nome": "21",
        "kind": "detalhe",
        "defined": true,
        "height": 8.466666666666665,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[40].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/23/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 147.828,
            "y": 0.254,
            "width": 0,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        },
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[40].listaLogo[1]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/23/logos/1",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 115.40066666666665,
            "y": 0.254,
            "width": 0,
            "height": 0,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[41]",
      "settings": {
        "id": 24,
        "nome": "22",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[41].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/24/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[42]",
      "settings": {
        "id": 25,
        "nome": "23",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[42].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/25/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[43]",
      "settings": {
        "id": 26,
        "nome": "24",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[43].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/26/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[44]",
      "settings": {
        "id": 27,
        "nome": "25",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[44].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/27/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[45]",
      "settings": {
        "id": 28,
        "nome": "26",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[45].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/28/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[46]",
      "settings": {
        "id": 29,
        "nome": "27",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[46].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/29/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[47]",
      "settings": {
        "id": 30,
        "nome": "28",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[47].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/30/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[48]",
      "settings": {
        "id": 31,
        "nome": "29",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[48].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/31/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[49]",
      "settings": {
        "id": 32,
        "nome": "30",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[49].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/32/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[50]",
      "settings": {
        "id": 33,
        "nome": "31",
        "kind": "detalhe",
        "defined": true,
        "height": 52.49333333333333,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[50].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/33/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 50.8,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[51]",
      "settings": {
        "id": 34,
        "nome": "32",
        "kind": "detalhe",
        "defined": true,
        "height": 69.42666666666666,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[51].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/34/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 67.73333333333332,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[52]",
      "settings": {
        "id": 35,
        "nome": "33",
        "kind": "detalhe",
        "defined": true,
        "height": 103.29333333333332,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[52].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/35/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 101.6,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[53]",
      "settings": {
        "id": 36,
        "nome": "34",
        "kind": "detalhe",
        "defined": true,
        "height": 137.16,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[53].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/36/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 135.46666666666664,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[54]",
      "settings": {
        "id": 37,
        "nome": "35",
        "kind": "detalhe",
        "defined": true,
        "height": 171.02666666666667,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[54].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/37/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 169.33333333333334,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[55]",
      "settings": {
        "id": 38,
        "nome": "36",
        "kind": "detalhe",
        "defined": true,
        "height": 204.89333333333332,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[55].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/38/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 203.2,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[56]",
      "settings": {
        "id": 39,
        "nome": "37",
        "kind": "detalhe",
        "defined": true,
        "height": 238.76,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[56].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/39/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 237.06666666666666,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[57]",
      "settings": {
        "id": 40,
        "nome": "38",
        "kind": "detalhe",
        "defined": true,
        "height": 272.6266666666666,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[57].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/40/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 270.9333333333333,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[58]",
      "settings": {
        "id": 41,
        "nome": "39",
        "kind": "detalhe",
        "defined": true,
        "height": 52.49333333333333,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[58].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/41/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 50.8,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[59]",
      "settings": {
        "id": 42,
        "nome": "40",
        "kind": "detalhe",
        "defined": true,
        "height": 69.42666666666666,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[59].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/42/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 67.73333333333332,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[60]",
      "settings": {
        "id": 43,
        "nome": "41",
        "kind": "detalhe",
        "defined": true,
        "height": 103.29333333333332,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[60].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/43/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 101.6,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[61]",
      "settings": {
        "id": 44,
        "nome": "42",
        "kind": "detalhe",
        "defined": true,
        "height": 137.16,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[61].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/44/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 135.46666666666664,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[62]",
      "settings": {
        "id": 45,
        "nome": "43",
        "kind": "detalhe",
        "defined": true,
        "height": 171.02666666666667,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[62].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/45/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 169.33333333333334,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[63]",
      "settings": {
        "id": 46,
        "nome": "44",
        "kind": "detalhe",
        "defined": true,
        "height": 204.89333333333332,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[63].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/46/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 203.2,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[64]",
      "settings": {
        "id": 47,
        "nome": "45",
        "kind": "detalhe",
        "defined": true,
        "height": 238.76,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[64].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/47/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 237.06666666666666,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[65]",
      "settings": {
        "id": 48,
        "nome": "46",
        "kind": "detalhe",
        "defined": true,
        "height": 272.6266666666666,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[65].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/48/logos/0",
          "type": "image",
          "settings": {
            "type": "image",
            "x": 0,
            "y": 1.6933333333333331,
            "width": 179.4933333333333,
            "height": 270.9333333333333,
            "orientation": 0,
            "alignment": 0,
            "imageType": "BMP",
            "sizingType": "original",
            "dpiImg": 300,
            "protectedField": false
          },
          "expressions": []
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[66]",
      "settings": {
        "id": 49,
        "nome": "47",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[66].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/49/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[67]",
      "settings": {
        "id": 50,
        "nome": "48",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[67].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/50/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[68]",
      "settings": {
        "id": 51,
        "nome": "49",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[68].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/51/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[69]",
      "settings": {
        "id": 52,
        "nome": "50",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[69].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/52/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[70]",
      "settings": {
        "id": 53,
        "nome": "51",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[70].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/53/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[71]",
      "settings": {
        "id": 54,
        "nome": "52",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[71].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/54/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[72]",
      "settings": {
        "id": 55,
        "nome": "53",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[72].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/55/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[73]",
      "settings": {
        "id": 56,
        "nome": "54",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[73].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/56/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[74]",
      "settings": {
        "id": 57,
        "nome": "55",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[74].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/57/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[75]",
      "settings": {
        "id": 58,
        "nome": "56",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[75].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/58/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[76]",
      "settings": {
        "id": 59,
        "nome": "57",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[76].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/59/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[77]",
      "settings": {
        "id": 60,
        "nome": "58",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[77].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/60/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[78]",
      "settings": {
        "id": 61,
        "nome": "59",
        "kind": "detalhe",
        "defined": true,
        "height": 5.08,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": false,
        "nomeBanda": "Desconhecido"
      },
      "children": [
        {
          "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[78].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/1/bandas/61/camposSaida/0",
          "type": "campoSaida",
          "settings": {
            "type": "campoSaida",
            "x": 0,
            "y": 5.08,
            "width": 178.816,
            "height": 5.08,
            "content": "<content omitido; 28 caracteres>",
            "font": {
              "family": "Courier New",
              "size": 10,
              "weight": 0,
              "color": "<color omitido; 7 caracteres>",
              "style": "<style omitido; 6 caracteres>",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido>\" | TPD",
            "mask": "",
            "mascara": "",
            "autoLF": false,
            "fontCpi": 0,
            "fontExpression": "",
            "expressaoFonteCondicional": "",
            "recoveryKey": false,
            "chaveRecuperacao": false,
            "protectedField": false,
            "campoProtegido": false,
            "useFont": true,
            "usaFonte": true,
            "indexSummary": false,
            "indiceSumario": false,
            "indexNotebook": false,
            "indiceCaderno": false,
            "micr": false,
            "campoMICR": false,
            "justifyDots": false,
            "justificarPontos": false,
            "justifyHyphens": false,
            "justificarHifens": false,
            "useFontSwitch": false,
            "usaTrocaFontes": false
          },
          "expressions": [
            {
              "property": "/expressao",
              "expression": "\"<literal omitido>\" | TPD",
              "fields": [
                "TPD"
              ]
            }
          ]
        }
      ]
    },
    {
      "nativePath": "$.documentos[1].listaJanelaDetalhe[1].listaDet[79]",
      "settings": {
        "id": 62,
        "nome": "60",
        "kind": "detalhe",
        "defined": true,
        "height": 0.8466666666666666,
        "quantidadeCamposSaida": 0,
        "quantidadeTextFields": 0,
        "quantidadeBarCodes": 0,
        "quantidadeLogos": 0,
        "quantidadeFios": 0,
        "quantidadeGraficos": 0,
        "quantidadeBarCodesBi": 0,
        "expressaoCondicao": "",
        "empty": true,
        "nomeBanda": "Desconhecido"
      },
      "children": []
    }
  ]
}