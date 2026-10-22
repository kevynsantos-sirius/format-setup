# Campos Altos — inventário estrutural sanitizado

Snapshot original, não estado atual do projeto. Valores da massa e textos literais foram omitidos; expressões sanitizadas não são executáveis.

```json
{
  "sourceHash": "fb07a0beebb2aaad2c891930fb0ec0a8934a6c9d227457eb3a2da9a0a1ec23e2",
  "totals": {
    "document": 2,
    "image": 3,
    "campoSaida": 27,
    "text": 5,
    "barcode": 1
  },
  "documents": [
    {
      "index": 0,
      "name": "Capa",
      "condition": "IF ( _ContRep = 1  )",
      "counts": {
        "document": 1,
        "image": 1,
        "campoSaida": 7
      },
      "records": [
        {
          "nativePath": "$.documentos[0]",
          "pointer": "/listaDocumentos/0",
          "type": "document",
          "parentNativePath": null,
          "settings": {
            "size": {
              "width": 209.97333333333333,
              "height": 296.926
            },
            "documentSize": {
              "width": 209.97333333333333,
              "height": 296.926
            },
            "orientation": "portrait",
            "paperType": null,
            "printMode": "duplex-vertical",
            "jdeName": null,
            "marginTop": 0,
            "marginLeft": 0,
            "spacingHorizontal": 0,
            "spacingVertical": 0,
            "ignorePrinterMargins": false,
            "documentGroupCount": 1,
            "documentsHorizontal": 1,
            "documentsVertical": 1,
            "documentSequence": "next-right",
            "fillPageWithFacsimile": true,
            "name": "Capa",
            "docPrinc": false,
            "docOverflow": false,
            "documentExpression": "IF ( _ContRep = 1  )",
            "overflowExpression": "",
            "numberingExpression": "2",
            "overlayConfig": {
              "scope": "none",
              "condition": "",
              "resolution": 300,
              "number": 1,
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "fileName": "",
              "imageType": "BMP",
              "overlays": [],
              "enabled": false,
              "processingImageFileReference": "",
              "imageFileReference": ""
            },
            "condDocOverflow": "",
            "documentOverflowExpression": "",
            "documentOverflow": false
          },
          "condition": "IF ( _ContRep = 1  )"
        },
        {
          "nativePath": "$.documentos[0].listaLogo[0]",
          "pointer": "/listaDocumentos/0/layout/0",
          "type": "image",
          "parentNativePath": "$.documentos[0]",
          "settings": {
            "type": "<literal omitido: 5 caracteres>",
            "x": 0,
            "y": 0,
            "width": 209.97333333333333,
            "height": 296.926,
            "orientation": 0,
            "alignment": 0,
            "imageType": "PS",
            "sizingType": "stretch",
            "dpiImg": 300,
            "protectedField": false
          },
          "condition": "",
          "resource": {
            "nativePath": "$.documentos[0].listaLogo[0]",
            "name": "CAMPOS ALTOS_D.A_2026 - Máscara_Page_1.png",
            "provided": true,
            "matchedByPageMarker": true,
            "sha256": "dbf79539f7e0ca75ba5839ca09a134ba36721b03664b675f6368ee8bf6fc7e11",
            "note": "Nome com acento no ZIP tem codificação inconsistente; conferir resolução por nome no motor.",
            "x": 0,
            "y": 0,
            "width": 209.97333333333333,
            "height": 296.926
          }
        },
        {
          "nativePath": "$.documentos[0].listaCpoSai[0]",
          "pointer": "/listaDocumentos/0/layout/1",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[0]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 164.25333333333333,
            "y": 156.63333333333333,
            "width": 29.633333333333333,
            "height": 4.741333333333333,
            "font": {
              "family": "Arial",
              "size": 11,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Mascara( GetStr( UltCad( _FileName, \"<literal omitido: 14 caracteres>\"99/99/9999\" )",
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
          "condition": "",
          "expression": "Mascara( GetStr( UltCad( _FileName, \"<literal omitido: 14 caracteres>\"99/99/9999\" )"
        },
        {
          "nativePath": "$.documentos[0].listaCpoSai[1]",
          "pointer": "/listaDocumentos/0/layout/2",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[0]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 32.08866666666667,
            "y": 155.78666666666666,
            "width": 111.16733333333333,
            "height": 6.688666666666665,
            "font": {
              "family": "ECTPostnet",
              "size": 16,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "\"<literal omitido: 1 caracteres>\" | Mascara( ValNum( CEPCUC ), \"<número literal omitido>\" ) | WModCep( ValNum( CEPCUC ) ) | \"<literal omitido: 1 caracteres>\"",
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
          "condition": "",
          "expression": "\"<literal omitido: 1 caracteres>\" | Mascara( ValNum( CEPCUC ), \"<número literal omitido>\" ) | WModCep( ValNum( CEPCUC ) ) | \"<literal omitido: 1 caracteres>\""
        },
        {
          "nativePath": "$.documentos[0].listaCpoSai[2]",
          "pointer": "/listaDocumentos/0/layout/3",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[0]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 26.924,
            "y": 167.21666666666664,
            "width": 165.60799999999998,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Rtrimm( NOMEFANTA )",
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
          "condition": "",
          "expression": "Rtrimm( NOMEFANTA )"
        },
        {
          "nativePath": "$.documentos[0].listaCpoSai[3]",
          "pointer": "/listaDocumentos/0/layout/4",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[0]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 31.496,
            "y": 172.974,
            "width": 160.86666666666665,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Rtrimm( ENDCUC ) | \", \" | Rtrimm( NUMENDCUC ) | \", \" | Rtrimm( COMPLCUC )",
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
          "condition": "",
          "expression": "Rtrimm( ENDCUC ) | \", \" | Rtrimm( NUMENDCUC ) | \", \" | Rtrimm( COMPLCUC )"
        },
        {
          "nativePath": "$.documentos[0].listaCpoSai[4]",
          "pointer": "/listaDocumentos/0/layout/5",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[0]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 27.262666666666664,
            "y": 178.05399999999997,
            "width": 165.01533333333333,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Rtrimm( BAIRROCUC )",
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
          "condition": "",
          "expression": "Rtrimm( BAIRROCUC )"
        },
        {
          "nativePath": "$.documentos[0].listaCpoSai[5]",
          "pointer": "/listaDocumentos/0/layout/6",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[0]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 28.955999999999996,
            "y": 183.47266666666667,
            "width": 163.576,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Rtrimm( CIDADECUC ) | \" - \" | Rtrimm( ESTADOCUC )",
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
          "condition": "",
          "expression": "Rtrimm( CIDADECUC ) | \" - \" | Rtrimm( ESTADOCUC )"
        },
        {
          "nativePath": "$.documentos[0].listaCpoSai[6]",
          "pointer": "/listaDocumentos/0/layout/7",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[0]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 24.892,
            "y": 189.14533333333333,
            "width": 167.64,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Mascara( ValNum( CEPCUC ), \"<número literal omitido>-999\" )",
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
          "condition": "",
          "expression": "Mascara( ValNum( CEPCUC ), \"<número literal omitido>-999\" )"
        }
      ]
    },
    {
      "index": 1,
      "name": "Carne",
      "condition": "IF ( _ContRep = 2  )",
      "counts": {
        "document": 1,
        "image": 2,
        "text": 5,
        "campoSaida": 20,
        "barcode": 1
      },
      "records": [
        {
          "nativePath": "$.documentos[1]",
          "pointer": "/listaDocumentos/1",
          "type": "document",
          "parentNativePath": null,
          "settings": {
            "size": {
              "width": 209.97333333333333,
              "height": 296.926
            },
            "documentSize": {
              "width": 209.97333333333333,
              "height": 296.926
            },
            "orientation": "portrait",
            "paperType": null,
            "printMode": "duplex-vertical",
            "jdeName": null,
            "marginTop": 0,
            "marginLeft": 0,
            "spacingHorizontal": 0,
            "spacingVertical": 0,
            "ignorePrinterMargins": false,
            "documentGroupCount": 1,
            "documentsHorizontal": 1,
            "documentsVertical": 1,
            "documentSequence": "next-right",
            "fillPageWithFacsimile": true,
            "name": "Carne",
            "docPrinc": true,
            "docOverflow": false,
            "documentExpression": "IF ( _ContRep = 2  )",
            "overflowExpression": "",
            "numberingExpression": "2",
            "overlayConfig": {
              "scope": "none",
              "condition": "",
              "resolution": 300,
              "number": 1,
              "x": 0,
              "y": 0,
              "width": 0,
              "height": 0,
              "fileName": "",
              "imageType": "BMP",
              "overlays": [],
              "enabled": false,
              "processingImageFileReference": "",
              "imageFileReference": ""
            },
            "condDocOverflow": "",
            "documentOverflowExpression": "",
            "documentOverflow": false
          },
          "condition": "IF ( _ContRep = 2  )"
        },
        {
          "nativePath": "$.documentos[1].listaLogo[0]",
          "pointer": "/listaDocumentos/1/layout/0",
          "type": "image",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 5 caracteres>",
            "x": 125.05266666666665,
            "y": 45.211999999999996,
            "width": 31.072666666666667,
            "height": 5.334,
            "orientation": 0,
            "alignment": 0,
            "imageType": "PS",
            "sizingType": "stretch",
            "dpiImg": 300,
            "protectedField": false
          },
          "condition": "",
          "resource": {
            "nativePath": "$.documentos[1].listaLogo[0]",
            "name": "BRANCO.jpg",
            "provided": false,
            "matchedByPageMarker": false,
            "x": 125.05266666666665,
            "y": 45.211999999999996,
            "width": 31.072666666666667,
            "height": 5.334
          }
        },
        {
          "nativePath": "$.documentos[1].listaLogo[1]",
          "pointer": "/listaDocumentos/1/layout/1",
          "type": "image",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 5 caracteres>",
            "x": 0,
            "y": 0,
            "width": 209.97333333333333,
            "height": 296.926,
            "orientation": 0,
            "alignment": 0,
            "imageType": "PS",
            "sizingType": "stretch",
            "dpiImg": 300,
            "protectedField": false
          },
          "condition": "",
          "resource": {
            "nativePath": "$.documentos[1].listaLogo[1]",
            "name": "CAMPOS ALTOS_D.A_2026 - Máscara_Page_2.png",
            "provided": true,
            "matchedByPageMarker": true,
            "sha256": "aac9ea48e6d105f0f8f76b71287cacad0850ee41579883da29eec633292d2628",
            "note": "Nome com acento no ZIP tem codificação inconsistente; conferir resolução por nome no motor.",
            "x": 0,
            "y": 0,
            "width": 209.97333333333333,
            "height": 296.926
          }
        },
        {
          "nativePath": "$.documentos[1].listaTextField[0]",
          "pointer": "/listaDocumentos/1/layout/2",
          "type": "text",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 4 caracteres>",
            "x": 19.049999999999997,
            "y": 52.49333333333333,
            "width": 64.60066666666667,
            "height": 9.567333333333332,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": null,
              "textAlign": "left",
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "conditional": "",
            "alignment": 0,
            "lineHeight": 0,
            "lineSpacing": 0,
            "fontExpression": "",
            "hasBorder": false,
            "borderThickness": 0,
            "borderPadding": 0,
            "respectLogoHeight": false,
            "protectedField": false,
            "textEdited": false,
            "legacyTextPosX": 225,
            "legacyTextY": 620,
            "legacyTextWidth": 763,
            "legacyTextHeight": 113,
            "legacyBorderThickness": 0,
            "legacyBorderPadding": 0
          },
          "condition": "",
          "contentStructure": [
            {
              "index": 0,
              "type": "campoSaida",
              "expression": "Rtrimm( ENDCUC ) | \" \" | Rtrimm( NUMENDCUC ) | \" \" |  Rtrimm( COMPLCUC )",
              "settings": {
                "type": "<literal omitido: 10 caracteres>",
                "expressao": "Rtrimm( ENDCUC ) | \" \" | Rtrimm( NUMENDCUC ) | \" \" |  Rtrimm( COMPLCUC )",
                "width": 1520,
                "mask": "",
                "autoLF": false,
                "rtrim": false,
                "font": {
                  "family": "Arial Narrow",
                  "size": 10,
                  "weight": 400,
                  "color": "#000000",
                  "style": "normal",
                  "textAlign": null,
                  "italico": false,
                  "sublinhado": false,
                  "tachado": false
                }
              }
            },
            {
              "index": 1,
              "type": "text",
              "literalCharacters": 1
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaTextField[1]",
          "pointer": "/listaDocumentos/1/layout/3",
          "type": "text",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 4 caracteres>",
            "x": 87.46066666666667,
            "y": 53.00133333333333,
            "width": 33.10466666666666,
            "height": 9.567333333333332,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": null,
              "textAlign": "left",
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "conditional": "",
            "alignment": 0,
            "lineHeight": 0,
            "lineSpacing": 0,
            "fontExpression": "",
            "hasBorder": false,
            "borderThickness": 0,
            "borderPadding": 0,
            "respectLogoHeight": false,
            "protectedField": false,
            "textEdited": false,
            "legacyTextPosX": 1033,
            "legacyTextY": 626,
            "legacyTextWidth": 391,
            "legacyTextHeight": 113,
            "legacyBorderThickness": 0,
            "legacyBorderPadding": 0
          },
          "condition": "",
          "contentStructure": [
            {
              "index": 0,
              "type": "campoSaida",
              "expression": "Rtrimm( BAIRROCUC )",
              "settings": {
                "type": "<literal omitido: 10 caracteres>",
                "expressao": "Rtrimm( BAIRROCUC )",
                "width": 790,
                "mask": "",
                "autoLF": false,
                "rtrim": false,
                "font": {
                  "family": "Arial Narrow",
                  "size": 10,
                  "weight": 400,
                  "color": "#000000",
                  "style": "normal",
                  "textAlign": null,
                  "italico": false,
                  "sublinhado": false,
                  "tachado": false
                }
              }
            },
            {
              "index": 1,
              "type": "text",
              "literalCharacters": 1
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaTextField[2]",
          "pointer": "/listaDocumentos/1/layout/4",
          "type": "text",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 4 caracteres>",
            "x": 123.61333333333332,
            "y": 53.00133333333333,
            "width": 33.10466666666666,
            "height": 9.567333333333332,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": null,
              "textAlign": "left",
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "conditional": "",
            "alignment": 0,
            "lineHeight": 0,
            "lineSpacing": 0,
            "fontExpression": "",
            "hasBorder": false,
            "borderThickness": 0,
            "borderPadding": 0,
            "respectLogoHeight": false,
            "protectedField": false,
            "textEdited": false,
            "legacyTextPosX": 1460,
            "legacyTextY": 626,
            "legacyTextWidth": 391,
            "legacyTextHeight": 113,
            "legacyBorderThickness": 0,
            "legacyBorderPadding": 0
          },
          "condition": "",
          "contentStructure": [
            {
              "index": 0,
              "type": "campoSaida",
              "expression": "Rtrimm( CIDADECUC ) | \" - \" | Rtrimm( ESTADOCUC )",
              "settings": {
                "type": "<literal omitido: 10 caracteres>",
                "expressao": "Rtrimm( CIDADECUC ) | \" - \" | Rtrimm( ESTADOCUC )",
                "width": 790,
                "mask": "",
                "autoLF": false,
                "rtrim": false,
                "font": {
                  "family": "Arial Narrow",
                  "size": 10,
                  "weight": 400,
                  "color": "#000000",
                  "style": "normal",
                  "textAlign": null,
                  "italico": false,
                  "sublinhado": false,
                  "tachado": false
                }
              }
            },
            {
              "index": 1,
              "type": "text",
              "literalCharacters": 1
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaTextField[3]",
          "pointer": "/listaDocumentos/1/layout/5",
          "type": "text",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 4 caracteres>",
            "x": 152.654,
            "y": 72.47466666666666,
            "width": 41.23266666666667,
            "height": 9.567333333333332,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": null,
              "textAlign": "right",
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "conditional": "",
            "alignment": 1,
            "lineHeight": 0,
            "lineSpacing": 0,
            "fontExpression": "",
            "hasBorder": false,
            "borderThickness": 0,
            "borderPadding": 0,
            "respectLogoHeight": false,
            "protectedField": false,
            "textEdited": false,
            "legacyTextPosX": 1803,
            "legacyTextY": 856,
            "legacyTextWidth": 487,
            "legacyTextHeight": 113,
            "legacyBorderThickness": 0,
            "legacyBorderPadding": 0
          },
          "condition": "",
          "contentStructure": [
            {
              "index": 0,
              "type": "campoSaida",
              "expression": "Rtrimm( EXERCICIO )",
              "settings": {
                "type": "<literal omitido: 10 caracteres>",
                "expressao": "Rtrimm( EXERCICIO )",
                "width": 870,
                "mask": "",
                "autoLF": false,
                "rtrim": false,
                "font": {
                  "family": "Arial Narrow",
                  "size": 10,
                  "weight": 400,
                  "color": "#000000",
                  "style": "normal",
                  "textAlign": null,
                  "italico": false,
                  "sublinhado": false,
                  "tachado": false
                }
              }
            },
            {
              "index": 1,
              "type": "text",
              "literalCharacters": 1
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaTextField[4]",
          "pointer": "/listaDocumentos/1/layout/6",
          "type": "text",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 4 caracteres>",
            "x": 18.880666666666663,
            "y": 160.61266666666666,
            "width": 91.18599999999999,
            "height": 9.567333333333332,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": null,
              "textAlign": "left",
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "conditional": "",
            "alignment": 0,
            "lineHeight": 0,
            "lineSpacing": 0,
            "fontExpression": "",
            "hasBorder": false,
            "borderThickness": 0,
            "borderPadding": 0,
            "respectLogoHeight": false,
            "protectedField": false,
            "textEdited": false,
            "legacyTextPosX": 223,
            "legacyTextY": 1897,
            "legacyTextWidth": 1077,
            "legacyTextHeight": 113,
            "legacyBorderThickness": 0,
            "legacyBorderPadding": 0
          },
          "condition": "",
          "contentStructure": [
            {
              "index": 0,
              "type": "campoSaida",
              "expression": "Rtrimm( MSGGUIA )",
              "settings": {
                "type": "<literal omitido: 10 caracteres>",
                "expressao": "Rtrimm( MSGGUIA )",
                "width": 2100,
                "mask": "",
                "autoLF": false,
                "rtrim": false,
                "font": {
                  "family": "Arial Narrow",
                  "size": 10,
                  "weight": 400,
                  "color": "#000000",
                  "style": "normal",
                  "textAlign": null,
                  "italico": false,
                  "sublinhado": false,
                  "tachado": false
                }
              }
            },
            {
              "index": 1,
              "type": "text",
              "literalCharacters": 1
            }
          ]
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[0]",
          "pointer": "/listaDocumentos/1/layout/7",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 130.89466666666667,
            "y": 18.626666666666665,
            "width": 56.557333333333325,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm( GUIA )",
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
          "condition": "",
          "expression": "Rtrimm( GUIA )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[1]",
          "pointer": "/listaDocumentos/1/layout/8",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 42.672,
            "y": 176.53,
            "width": 125.30666666666667,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "IF ( Rtrimm( CODIGOBARRA ) != \" \" ) Mascara( ValNum( CODIGOBARRA ), \"<número literal omitido>-9 <número literal omitido>-9 <número literal omitido>-9 <número literal omitido>-9\" )",
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
          "condition": "",
          "expression": "IF ( Rtrimm( CODIGOBARRA ) != \" \" ) Mascara( ValNum( CODIGOBARRA ), \"<número literal omitido>-9 <número literal omitido>-9 <número literal omitido>-9 <número literal omitido>-9\" )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[2]",
          "pointer": "/listaDocumentos/1/layout/9",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 17.779999999999998,
            "y": 190.33066666666664,
            "width": 174.32866666666666,
            "height": 16.848666666666666,
            "font": {
              "family": "0128",
              "size": 40,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "IF ( Rtrimm( CODIGOBARRA ) != \" \" ) I2OF5( Rtrimm( GetStr( CODIGOBARRA, 1, 11 ) | GetStr( CODIGOBARRA, 13, 11 ) | GetStr( CODIGOBARRA, 25, 11 ) | GetStr( CODIGOBARRA, 37, 11 ) ), 44 )",
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
          "condition": "",
          "expression": "IF ( Rtrimm( CODIGOBARRA ) != \" \" ) I2OF5( Rtrimm( GetStr( CODIGOBARRA, 1, 11 ) | GetStr( CODIGOBARRA, 13, 11 ) | GetStr( CODIGOBARRA, 25, 11 ) | GetStr( CODIGOBARRA, 37, 11 ) ), 44 )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[3]",
          "pointer": "/listaDocumentos/1/layout/10",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 19.049999999999997,
            "y": 35.983333333333334,
            "width": 127.33866666666667,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Rtrimm( NOMEFANTA )",
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
          "condition": "",
          "expression": "Rtrimm( NOMEFANTA )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[4]",
          "pointer": "/listaDocumentos/1/layout/11",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 150.45266666666666,
            "y": 35.983333333333334,
            "width": 42.672,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm( CGCCPF )",
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
          "condition": "",
          "expression": "Rtrimm( CGCCPF )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[5]",
          "pointer": "/listaDocumentos/1/layout/12",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 160.61266666666666,
            "y": 48.00599999999999,
            "width": 32.766,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm( CEPCUC )",
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
          "condition": "",
          "expression": "Rtrimm( CEPCUC )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[6]",
          "pointer": "/listaDocumentos/1/layout/13",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 19.049999999999997,
            "y": 67.30999999999999,
            "width": 40.132,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Rtrimm( INSCRICAO )",
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
          "condition": "",
          "expression": "Rtrimm( INSCRICAO )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[7]",
          "pointer": "/listaDocumentos/1/layout/14",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 63.246,
            "y": 67.30999999999999,
            "width": 40.386,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm( NUMCUC )",
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
          "condition": "",
          "expression": "Rtrimm( NUMCUC )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[8]",
          "pointer": "/listaDocumentos/1/layout/15",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 107.78066666666666,
            "y": 67.30999999999999,
            "width": 40.386,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm( NumPROC )",
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
          "condition": "",
          "expression": "Rtrimm( NumPROC )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[9]",
          "pointer": "/listaDocumentos/1/layout/16",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 19.049999999999997,
            "y": 82.55,
            "width": 113.45333333333333,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 0,
            "expressao": "Rtrimm( ENDIMOVEL )",
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
          "condition": "",
          "expression": "Rtrimm( ENDIMOVEL )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[10]",
          "pointer": "/listaDocumentos/1/layout/17",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 136.3133333333333,
            "y": 82.55,
            "width": 24.55333333333333,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm( QUADRA )",
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
          "condition": "",
          "expression": "Rtrimm( QUADRA )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[11]",
          "pointer": "/listaDocumentos/1/layout/18",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 165.60799999999998,
            "y": 82.55,
            "width": 23.28333333333333,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Rtrimm( LOTE )",
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
          "condition": "",
          "expression": "Rtrimm( LOTE )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[12]",
          "pointer": "/listaDocumentos/1/layout/19",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 129.87866666666665,
            "y": 99.05999999999999,
            "width": 62.738,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Mascara( ValNum( VLRPARCELA ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )",
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
          "condition": "",
          "expression": "Mascara( ValNum( VLRPARCELA ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[13]",
          "pointer": "/listaDocumentos/1/layout/20",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 129.87866666666665,
            "y": 105.83333333333333,
            "width": 62.738,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Mascara( ValNum( VLRMULTA ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )",
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
          "condition": "",
          "expression": "Mascara( ValNum( VLRMULTA ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[14]",
          "pointer": "/listaDocumentos/1/layout/21",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 129.87866666666665,
            "y": 112.52199999999999,
            "width": 62.738,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Mascara( ValNum( VLRJUROS ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )",
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
          "condition": "",
          "expression": "Mascara( ValNum( VLRJUROS ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[15]",
          "pointer": "/listaDocumentos/1/layout/22",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 129.87866666666665,
            "y": 119.38,
            "width": 62.738,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Mascara( ValNum( VLRCORRECAO ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )",
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
          "condition": "",
          "expression": "Mascara( ValNum( VLRCORRECAO ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[16]",
          "pointer": "/listaDocumentos/1/layout/23",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 129.87866666666665,
            "y": 126.492,
            "width": 62.738,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Mascara( ValNum( TXEXPEDIENTE ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )",
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
          "condition": "",
          "expression": "Mascara( ValNum( TXEXPEDIENTE ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[17]",
          "pointer": "/listaDocumentos/1/layout/24",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 129.87866666666665,
            "y": 133.35,
            "width": 62.738,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Mascara( ValNum( VLRDESCONTO ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )",
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
          "condition": "",
          "expression": "Mascara( ValNum( VLRDESCONTO ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[18]",
          "pointer": "/listaDocumentos/1/layout/25",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 129.87866666666665,
            "y": 139.86933333333332,
            "width": 62.738,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 1,
            "expressao": "Mascara( ValNum( VLRTOTAL ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )",
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
          "condition": "",
          "expression": "Mascara( ValNum( VLRTOTAL ), \"ZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZZ.ZZ9,99\" )"
        },
        {
          "nativePath": "$.documentos[1].listaCpoSai[19]",
          "pointer": "/listaDocumentos/1/layout/26",
          "type": "campoSaida",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 10 caracteres>",
            "x": 165.35399999999998,
            "y": 156.88733333333332,
            "width": 26.924,
            "height": 4.148666666666666,
            "font": {
              "family": "Arial Narrow",
              "size": 10,
              "weight": 400,
              "color": "#000000",
              "style": "normal",
              "textAlign": null,
              "italico": false,
              "sublinhado": false,
              "tachado": false
            },
            "orientation": 0,
            "alignment": 2,
            "expressao": "Rtrimm( VENCIMENTO )",
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
          "condition": "",
          "expression": "Rtrimm( VENCIMENTO )"
        },
        {
          "nativePath": "$.documentos[1].listaBarCode[0]",
          "pointer": "/listaDocumentos/1/layout/27",
          "type": "barcode",
          "parentNativePath": "$.documentos[1]",
          "settings": {
            "type": "<literal omitido: 7 caracteres>",
            "x": 21.166666666666668,
            "y": 204.63933333333333,
            "width": 88.22266666666665,
            "height": 10.16,
            "orientation": 0,
            "alignment": 0,
            "tipoMPS": 1,
            "barcodeType": 1,
            "numChar": 44,
            "protectedField": false
          },
          "condition": "",
          "expression": "Rtrimm( CODIGOBARRA )"
        }
      ]
    }
  ],
  "inputFields": [
    {
      "posicao": 1,
      "tamanho": 10,
      "nome": "NumPROC",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 12,
      "tamanho": 25,
      "nome": "INSCRICAO",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 38,
      "tamanho": 100,
      "nome": "ENTIDADE",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 139,
      "tamanho": 20,
      "nome": "CGCENT",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 160,
      "tamanho": 60,
      "nome": "ENDENT",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 221,
      "tamanho": 10,
      "nome": "NUMENT",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 232,
      "tamanho": 20,
      "nome": "COMPLEENT",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 253,
      "tamanho": 60,
      "nome": "BAIRROENT",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 314,
      "tamanho": 10,
      "nome": "CEPENT",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 325,
      "tamanho": 100,
      "nome": "CIDADEENT",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 426,
      "tamanho": 2,
      "nome": "UFENT",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 429,
      "tamanho": 10,
      "nome": "NUMCUC",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 440,
      "tamanho": 60,
      "nome": "RAZAOSOCIAL",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 501,
      "tamanho": 60,
      "nome": "NOMEFANTA",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 562,
      "tamanho": 20,
      "nome": "CGCCPF",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 583,
      "tamanho": 60,
      "nome": "ENDCUC",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 644,
      "tamanho": 10,
      "nome": "NUMENDCUC",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 655,
      "tamanho": 20,
      "nome": "COMPLCUC",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 676,
      "tamanho": 60,
      "nome": "BAIRROCUC",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 737,
      "tamanho": 10,
      "nome": "CEPCUC",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 748,
      "tamanho": 60,
      "nome": "CIDADECUC",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 809,
      "tamanho": 2,
      "nome": "ESTADOCUC",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 812,
      "tamanho": 60,
      "nome": "MSGGUIA",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 873,
      "tamanho": 10,
      "nome": "QTDPARCELAS",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 884,
      "tamanho": 10,
      "nome": "GUIA",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 895,
      "tamanho": 10,
      "nome": "VENCIMENTO",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 906,
      "tamanho": 15,
      "nome": "NUMPARCELA",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 922,
      "tamanho": 25,
      "nome": "VLRPARCELA",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 948,
      "tamanho": 25,
      "nome": "VLRTOTAL",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 974,
      "tamanho": 25,
      "nome": "VLRMULTA",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 1000,
      "tamanho": 25,
      "nome": "VLRJUROS",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 1026,
      "tamanho": 25,
      "nome": "VLRCORRECAO",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 1052,
      "tamanho": 25,
      "nome": "VLRDESCONTO",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 1078,
      "tamanho": 25,
      "nome": "TXEXPEDIENTE",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 1104,
      "tamanho": 48,
      "nome": "CODIGOBARRA",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 1153,
      "tamanho": 10,
      "nome": "QUADRA",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 1164,
      "tamanho": 10,
      "nome": "LOTE",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 1175,
      "tamanho": 10,
      "nome": "LOTEAMENTO",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 1186,
      "tamanho": 60,
      "nome": "EXERCICIO",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    },
    {
      "posicao": 1247,
      "tamanho": 100,
      "nome": "ENDIMOVEL",
      "indice": 0,
      "grupo": 0,
      "chaveRecuperacao": false
    }
  ],
  "csvSchema": [
    {
      "alias": "Num_PROC",
      "start": 1,
      "length": 10,
      "option": 0
    },
    {
      "alias": "INSCRICAO",
      "start": 12,
      "length": 25,
      "option": 0
    },
    {
      "alias": "ENTIDADE",
      "start": 38,
      "length": 100,
      "option": 0
    },
    {
      "alias": "CGCENT",
      "start": 139,
      "length": 20,
      "option": 0
    },
    {
      "alias": "ENDENT",
      "start": 160,
      "length": 60,
      "option": 0
    },
    {
      "alias": "NUMENT",
      "start": 221,
      "length": 10,
      "option": 0
    },
    {
      "alias": "COMPLEENT",
      "start": 232,
      "length": 20,
      "option": 0
    },
    {
      "alias": "BAIRROENT",
      "start": 253,
      "length": 60,
      "option": 0
    },
    {
      "alias": "CEPENT",
      "start": 314,
      "length": 10,
      "option": 0
    },
    {
      "alias": "CIDADEENT",
      "start": 325,
      "length": 100,
      "option": 0
    },
    {
      "alias": "UFENT",
      "start": 426,
      "length": 2,
      "option": 0
    },
    {
      "alias": "NUMCUC",
      "start": 429,
      "length": 10,
      "option": 0
    },
    {
      "alias": "RAZAOSOCIAL",
      "start": 440,
      "length": 60,
      "option": 0
    },
    {
      "alias": "NOMEFANTA",
      "start": 501,
      "length": 60,
      "option": 0
    },
    {
      "alias": "CGCCPF",
      "start": 562,
      "length": 20,
      "option": 0
    },
    {
      "alias": "ENDCUC",
      "start": 583,
      "length": 60,
      "option": 0
    },
    {
      "alias": "NUMENDCUC",
      "start": 644,
      "length": 10,
      "option": 0
    },
    {
      "alias": "COMPLCUC",
      "start": 655,
      "length": 20,
      "option": 0
    },
    {
      "alias": "BAIRROCUC",
      "start": 676,
      "length": 60,
      "option": 0
    },
    {
      "alias": "CEPCUC",
      "start": 737,
      "length": 10,
      "option": 0
    },
    {
      "alias": "CIDADECUC",
      "start": 748,
      "length": 60,
      "option": 0
    },
    {
      "alias": "ESTADOCUC",
      "start": 809,
      "length": 2,
      "option": 0
    },
    {
      "alias": "MSGGUIA",
      "start": 812,
      "length": 60,
      "option": 0
    },
    {
      "alias": "QTD_PARCELAS",
      "start": 873,
      "length": 10,
      "option": 0
    },
    {
      "alias": "GUIA",
      "start": 884,
      "length": 10,
      "option": 0
    },
    {
      "alias": "DATA_VENCIMENTO",
      "start": 895,
      "length": 10,
      "option": 0
    },
    {
      "alias": "NRO_PARCELA",
      "start": 906,
      "length": 15,
      "option": 0
    },
    {
      "alias": "VLR_PARCELA",
      "start": 922,
      "length": 25,
      "option": 0
    },
    {
      "alias": "VLR_TOTAL",
      "start": 948,
      "length": 25,
      "option": 0
    },
    {
      "alias": "VLR_MULTA",
      "start": 974,
      "length": 25,
      "option": 0
    },
    {
      "alias": "VLR_JUROS",
      "start": 1000,
      "length": 25,
      "option": 0
    },
    {
      "alias": "VLR_CORREÇÃO",
      "start": 1026,
      "length": 25,
      "option": 0
    },
    {
      "alias": "VLR_DESCONTO",
      "start": 1052,
      "length": 25,
      "option": 0
    },
    {
      "alias": "TAXA EXPEDIENTE",
      "start": 1078,
      "length": 25,
      "option": 0
    },
    {
      "alias": "CODIGOBARRA",
      "start": 1104,
      "length": 48,
      "option": 0
    },
    {
      "alias": "QUADRA",
      "start": 1153,
      "length": 10,
      "option": 0
    },
    {
      "alias": "LOTE",
      "start": 1164,
      "length": 10,
      "option": 0
    },
    {
      "alias": "LOTEAMENTO",
      "start": 1175,
      "length": 10,
      "option": 0
    },
    {
      "alias": "EXERCICIO",
      "start": 1186,
      "length": 60,
      "option": 0
    },
    {
      "alias": "ENDEREÇ0_IMOVEL",
      "start": 1247,
      "length": 100,
      "option": 0
    }
  ],
  "dataConfig": {
    "recordSize": 1355,
    "useHeader": false,
    "headerSize": 0,
    "fileName": "<caminho de recurso omitido>",
    "askName": false,
    "recordFormat": "fixed",
    "fieldDelimiter": "<enum legado omitido>",
    "recordDelimiter": "\\n",
    "limitedByFieldCount": false,
    "masterFieldCount": 0,
    "detailFieldCount": 0
  },
  "functionDeclarations": {
    "functions": [
      "WMOD10",
      "WMOD11",
      "WDVM11",
      "GETSTR",
      "ADDSTR",
      "SUBSTR",
      "ASC",
      "CHR",
      "LTRIMM",
      "RTRIMM",
      "TRIMM",
      "ULTCAD",
      "MASCARADIR",
      "MASCARA",
      "BARC128TT",
      "VALNUM",
      "WMODCEP",
      "I2OF5",
      "TRIMMZERO"
    ],
    "functionDetails": [
      {
        "name": "WMOD10",
        "exportName": "WMOD10",
        "parameterCount": 1
      },
      {
        "name": "WMOD11",
        "exportName": "WMOD11",
        "parameterCount": 1
      },
      {
        "name": "WDVM11",
        "exportName": "WDVM11",
        "parameterCount": 1
      },
      {
        "name": "GETSTR",
        "exportName": "GETSTR",
        "parameterCount": 3
      },
      {
        "name": "ADDSTR",
        "exportName": "ADDSTR",
        "parameterCount": 3
      },
      {
        "name": "SUBSTR",
        "exportName": "SUBSTR",
        "parameterCount": 3
      },
      {
        "name": "ASC",
        "exportName": "ASC",
        "parameterCount": 1
      },
      {
        "name": "CHR",
        "exportName": "CHR",
        "parameterCount": 1
      },
      {
        "name": "LTRIMM",
        "exportName": "LTRIMM",
        "parameterCount": 1
      },
      {
        "name": "RTRIMM",
        "exportName": "RTRIMM",
        "parameterCount": 1
      },
      {
        "name": "TRIMM",
        "exportName": "TRIMM",
        "parameterCount": 1
      },
      {
        "name": "ULTCAD",
        "exportName": "ULTCAD",
        "parameterCount": 2
      },
      {
        "name": "MASCARADIR",
        "exportName": "MASCARADIR",
        "parameterCount": 2
      },
      {
        "name": "MASCARA",
        "exportName": "MASCARA",
        "parameterCount": 2
      },
      {
        "name": "BARC128TT",
        "exportName": "BARC128TT",
        "parameterCount": 3
      },
      {
        "name": "VALNUM",
        "exportName": "VALNUM",
        "parameterCount": 1
      },
      {
        "name": "WMODCEP",
        "exportName": "WMODCEP",
        "parameterCount": 1
      },
      {
        "name": "I2OF5",
        "exportName": "I2OF5",
        "parameterCount": 2
      },
      {
        "name": "TRIMMZERO",
        "exportName": "TRIMMZERO",
        "parameterCount": 2
      }
    ],
    "dllName": "Sirius32.dll"
  },
  "resources": [
    {
      "nativePath": "$.documentos[0].listaLogo[0]",
      "name": "CAMPOS ALTOS_D.A_2026 - Máscara_Page_1.png",
      "provided": true,
      "matchedByPageMarker": true,
      "sha256": "dbf79539f7e0ca75ba5839ca09a134ba36721b03664b675f6368ee8bf6fc7e11",
      "note": "Nome com acento no ZIP tem codificação inconsistente; conferir resolução por nome no motor.",
      "x": 0,
      "y": 0,
      "width": 209.97333333333333,
      "height": 296.926
    },
    {
      "nativePath": "$.documentos[1].listaLogo[0]",
      "name": "BRANCO.jpg",
      "provided": false,
      "matchedByPageMarker": false,
      "x": 125.05266666666665,
      "y": 45.211999999999996,
      "width": 31.072666666666667,
      "height": 5.334
    },
    {
      "nativePath": "$.documentos[1].listaLogo[1]",
      "name": "CAMPOS ALTOS_D.A_2026 - Máscara_Page_2.png",
      "provided": true,
      "matchedByPageMarker": true,
      "sha256": "aac9ea48e6d105f0f8f76b71287cacad0850ee41579883da29eec633292d2628",
      "note": "Nome com acento no ZIP tem codificação inconsistente; conferir resolução por nome no motor.",
      "x": 0,
      "y": 0,
      "width": 209.97333333333333,
      "height": 296.926
    }
  ],
  "dependencies": [
    {
      "nativePath": "$.documentos[0].listaCpoSai[1]",
      "fields": [
        "CEPCUC"
      ]
    },
    {
      "nativePath": "$.documentos[0].listaCpoSai[2]",
      "fields": [
        "NOMEFANTA"
      ]
    },
    {
      "nativePath": "$.documentos[0].listaCpoSai[3]",
      "fields": [
        "ENDCUC",
        "NUMENDCUC",
        "COMPLCUC"
      ]
    },
    {
      "nativePath": "$.documentos[0].listaCpoSai[4]",
      "fields": [
        "BAIRROCUC"
      ]
    },
    {
      "nativePath": "$.documentos[0].listaCpoSai[5]",
      "fields": [
        "CIDADECUC",
        "ESTADOCUC"
      ]
    },
    {
      "nativePath": "$.documentos[0].listaCpoSai[6]",
      "fields": [
        "CEPCUC"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaTextField[0]",
      "fields": [
        "ENDCUC",
        "NUMENDCUC",
        "COMPLCUC"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaTextField[1]",
      "fields": [
        "BAIRROCUC"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaTextField[2]",
      "fields": [
        "CIDADECUC",
        "ESTADOCUC"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaTextField[3]",
      "fields": [
        "EXERCICIO"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaTextField[4]",
      "fields": [
        "MSGGUIA"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[0]",
      "fields": [
        "GUIA"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[1]",
      "fields": [
        "CODIGOBARRA"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[2]",
      "fields": [
        "CODIGOBARRA"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[3]",
      "fields": [
        "NOMEFANTA"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[4]",
      "fields": [
        "CGCCPF"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[5]",
      "fields": [
        "CEPCUC"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[6]",
      "fields": [
        "INSCRICAO"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[7]",
      "fields": [
        "NUMCUC"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[8]",
      "fields": [
        "NumPROC"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[9]",
      "fields": [
        "ENDIMOVEL"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[10]",
      "fields": [
        "QUADRA"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[11]",
      "fields": [
        "LOTE"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[12]",
      "fields": [
        "VLRPARCELA"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[13]",
      "fields": [
        "VLRMULTA"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[14]",
      "fields": [
        "VLRJUROS"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[15]",
      "fields": [
        "VLRCORRECAO"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[16]",
      "fields": [
        "TXEXPEDIENTE"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[17]",
      "fields": [
        "VLRDESCONTO"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[18]",
      "fields": [
        "VLRTOTAL"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaCpoSai[19]",
      "fields": [
        "VENCIMENTO"
      ]
    },
    {
      "nativePath": "$.documentos[1].listaBarCode[0]",
      "fields": [
        "CODIGOBARRA"
      ]
    }
  ]
}
```
