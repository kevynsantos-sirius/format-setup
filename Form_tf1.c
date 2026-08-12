/* FORM_TF1.C - Editor de Text Field - Formatador
*/

#define   STRICT
#define   NOCOMM

#include  <windows.h>
#include  <windowsx.h>
#include  <stdio.h>
#include  <math.h>

#include  "FORMW.H"
#include  "FORMWIN.H"

#include  "ZOOM.H"
#include  "RTF.H"
#include  "FORMDLG.H"
#include  "FORMAVAL.H"
#include  "FORMLIB.H"
#include  "OBJETOSFPS.H"
#include  "BITMAP.H"
#include  "BMP.H"
#include  "FORM_TF.H"
#include  "FORM_TFC.H"
#include  "IPDSLIB.H"
#include  "IFONTLIB.H"

#include  "GLOBAIS.H"
#include  "BARBIB.H"

#define   NUM_ATU_LINHAS    300

#define   ABS(x)    ((x) < 0 ? -(x) : (x))

/*
  Descrição do texto na estrutura TextField:

  O texto na estrutura TextField é representado por uma cadeia de
  caracteres como um string. As trocas de fontes, os campos de saída
  E OS LOGOS contidos no texto são representados por comandos delimitados
  por dois caracteres 'ESC', um antes e um depois.
  A sintaxe geral destes comandos é a seguinte:

    'ESC' comando, argumento1, argumento2, ... 'ESC'

  A vírgula funciona como separador de argumento. O comando deverá
  ter apenas uma letra (por enquanto) em maiúscula. A ordem dos
  argumentos é importante para a identificação correta dos mesmos.

  A seguir temos o detalhamento dos comandos.

    1 - comando de troca de fonte:

      'ESC'F,nome da fonte,corpo,cor,E,S,num fonte int,FonteW,altura,I,K,NumBold,expressão fonte,So,Su'ESC'

    onde: F - indica comando de troca de Fonte
          nome da fonte - é o nome da fonte
          corpo - o corpo atual da fonte
          E - se é para Expandir a fonte
          S - se é para Sublinhar a fonte
          num fonte int - número da fonte interna
          FonteW - nome da fonte Windows
          altura - altura da fonte Windows
          cor - a cor da fonte ( usada atualmente so para XEROX )
          I - se ela é italica
          K - se ela tem strikeout
          NumBold - intensidade do bold (negrito)
          expressão fonte - expressão para determinar fonte definida via base de dados
          So - fonte sobrescrita
          Su - fonte subescrita

    2 - comando de campo de saída:

      'ESC'C,expressão,máscara,largura,automatic LF,rtrim,nome da fonte,corpo,cor,E,S,num fonte int,FonteW,altura,I,K,NumBold,expressão fonte,So,Su'ESC'

    onde: C - indica comando de campo de saída
          expressão - expressão associada ao campo de saída
          máscara - máscara associada ao campo de saída
          largura - dá a largura m/axima do campo de saída
          automatic LF - indica LF antes do texto do campo
          rtrim - indica de deve ou não fazer um rtrim ao substituir o campo pelo valor da base de dados
          nome da fonte - nome da fonte associada ao campo
          corpo - corpo da fonte associada ao campo
          cor - cor da fonte ( usada atualmente so para XEROX )
          E - se é para Expandir a fonte
          S - se é para Sublinhar a fonte
          num fonte int - número da fonte interna
          FonteW - nome da fonte Windows
          altura - altura da fonte Windows
          I - se ela é italica
          K - se ela tem strikeout
          NumBold - intensidade do bold (negrito)
          expressão fonte - expressão para determinar fonte definida via base de dados
          So - fonte sobrescrita
          Su - fonte subescrita

    3 - comando de logo:

      'ESC'L,expressão,largura,altura,hreduced,vreduced,comprType,resolucao,exptype'ESC'

    onde: L - indica comando de logo
          expressão - expressão associada ao logo
          largura   - largura do logo
          altura    - altura do logo
          hreduced  - compr. hirzontal  // IPDS -> = 1 reduzido e = 0 normal
                                        // IOCA -> varia de 1 a 99
          vreduced  - compr. vertical   // IPDS -> = 1 reduzido e = 0 normal
                                        // IOCA -> varia de 1 a 99
          comprType - tipo de compressao p/ GOCA/IOCA
          resolucao - resolução da imagem
          exptype   - tipo de expansão 0->normal; 1->encaixar; 2->encher

    4 - comando de fio horizontal:

      'ESC'H,expressão,largura,espessura'ESC'

    onde: H - indica comando de fio horizontal
          expressão - expressão associada ao fio
          largura   - largura do fio
          espessura - espessura do fio

    5 - comando de fio vertical:

      'ESC'V,expressão,altura,espessura'ESC'

    onde: V - indica comando de fio vertical
          expressão - expressão associada ao fio
          altura    - altura do fio
          espessura - espessura do fio

  Para este texto ser trabalhado com o editor, ele deverá sofrer uma
  pequena compilação, que tem por finalidade otimizar a edição e a
  composição interativa. Esta compilação consiste em retirar todos os
  comandos contidos no texto e armazená-los em estruturas separadas.

  No local dos comandos serão colocados comandos mais simples que
  apontarão para estas estruturas, onde estarão as demais informações
  do comando. Estes novos comandos consistirão de apenas dois bytes
  delimitados por dois caracteres ESC's. O primeiro byte indica o
  comando, enquanto o segundo é um índice para a estrutura separada.

  Por exemplo:
    ESC,1,10,ESC  - comando fonte, índice 10 da tabela de fontes
    ESC,2,5,ESC   - comando campo, índice 5 da tabela de campos
    ESC,3,4,ESC   - comando logo, índice 4 da tabela de logos

  Obs: as vírgulas não existem, são auxiliares para delimitar os bytes.

*/

// Neste string temos o nome da última fonte selecionada pela função:
//    FonteCriarLOGFONT. Isto é para poder acertar o LoadF para fontes
//    condicionais nos textfield quando imprimindo para impressora
//    que não sejam 'Driver Windows'

static  BOOL    flagTrocouFonte; // indica se trocou a fonte durante a leitura de um .f

static  HWND    hwnd_text;    // handle da janela do editor para Text Field
static  BOOL    flag_para_impressora = FALSE; // indica se é para imprimir para a impressora

static  HDC     hdc_text;         // hdc que deve ser usado para mostrar o texto
static  HDC     hdc_impr = NULL;  // hdc que deve ser usado para compor o texto

static  BOOL    flag_previa_real = FALSE; // indica se é previa real do documento
static  BOOL    gerando_metafile = FALSE;

// variáveis que controlam a lista de fontes usadas
static  struct    TF_tab_fonte  * TF_ptr_tab_fonte = NULL;
static  short int TF_tam_tab_fonte = 0;

// variáveis que controlam a lista de campos de saida usados
static  struct    TF_campo_saida  * TF_ptr_campo_saida = NULL;
static  short int TF_tam_campo_saida = 0;
static  short int TF_tot_campo_saida = 0;

// variáveis que controlam a lista de logos usados
static  struct    TF_logo  * TF_ptr_logo = NULL;
static  short int TF_tam_logo = 0;
static  short int TF_tot_logo = 0;
static  BOOL      fRespeitarDimLogo = FALSE;

// variáveis que controlam a lista de fios usados
static  struct    TF_fio  * TF_ptr_fio = NULL;
static  short int TF_tam_fio = 0;

// ponteiro para uma copia do text field que está sendo editado
static  TEXTFIELD TF_atual = {{ 0 }};

// variáveis que controlam o buffer de texto de edição
static  BYTE  * TF_buffer_texto = NULL;
static  WORD    TF_buf_tatual = 0;
static  WORD    TF_buf_tmax = 0;

static  WORD    TF_ptexto;

// variáveis que controlam a composição do texto
static  struct  TF_linha  * TF_tab_linha = NULL;
static          WORD        TF_tab_linha_tatual = 0;
static          WORD        TF_tab_linha_tmax = 0;
static  unsigned short int  esp_lin_fator;  // espacej lin Susana mai/96


static  void  TFED_determinar_estado_posicao ( WORD pos,
                        struct est_pos * estado );
static  WORD  TFED_determinar_posicao_texto ( int marg, int prof,
                        struct est_pos * estado );
static  WORD  TF_largura_da_palavra ( HDC hdc, BYTE * pal,
                        short int tam_pal, WORD *altura, short int ft );
static  BOOL  TFED_ler_pos_bloco ( WORD *posi, WORD *posf );
static  void  TFED_iniciar_tratamento_marcacao_bloco ( void );
static  void  TFED_apagar_bloco ( void );
static  void  TFED_ajustar_bloco ( WORD pos );

static  WORD  LARGURA_TAB = 0;

static  BOOL  esp_lin_exato = FALSE;

static  BOOL EstourouTextField = FALSE;
/*------------------------------------------------------------------------*/
static  short int   num_espere = 0;
static  HCURSOR     hCurWait = NULL;
static  HCURSOR     hCurSaved;

static  HBITMAP     bmpCopo0 = NULL;     // bitmap para indicar presença de um logo
static  HBITMAP     bmpCopo90 = NULL;
static  HBITMAP     bmpCopo180 = NULL;
static  HBITMAP     bmpCopo270 = NULL;
/*------------------------------------------------------------------------*/
void apresentar_espere ( void )
/*
* mudar o cursor do mouse para a ampulheta
*/
{
  if (ModoBatch == TRUE)
    return;
  if ( num_espere == 0 )
  {
    if ( !hCurWait )
      hCurWait = LoadCursor( NULL, IDC_WAIT );
    if ( !hCurSaved )
    {
//      SetCapture( GetFocus() );
      hCurSaved = SetCursor( hCurWait );
    }
  }
  ++num_espere;
}

/*------------------------------------------------------------------------*/
void apagar_espere ( void )
/*
* Apagar da tela a mensagem de espere
*/
{
  if (ModoBatch == TRUE)
    return;

  if ( num_espere == 0 )
    return;

  if ( --num_espere == 0 )
  {
//    ReleaseCapture();
    SetCursor( hCurSaved );
    hCurSaved = NULL ;
  }
}

/*------------------------------------------------------------------------*/
static void TF_liberar_areas_formatador ( void )
/* liberar todas as areas alocadas pelo formatador
*/
{
  if ( TF_ptr_tab_fonte != NULL )
  {
    short int i;

    for ( i = 0; i < TF_tam_tab_fonte; i++ )
    {
      // liberando as fontes criadas
      if ( TF_ptr_tab_fonte[ i ].hft != NULL )
        DeleteFont( TF_ptr_tab_fonte[ i ].hft );
      if ( TF_ptr_tab_fonte[ i ].hft_vid != NULL )
        DeleteFont( TF_ptr_tab_fonte[ i ].hft_vid );
    }

    GlobalFreePtr( TF_ptr_tab_fonte );

    TF_ptr_tab_fonte = NULL;
    TF_tam_tab_fonte = 0;
  }

  if ( TF_ptr_campo_saida != NULL )
  {
    GlobalFreePtr( TF_ptr_campo_saida );

    TF_ptr_campo_saida = NULL;
    TF_tam_campo_saida = 0;
    TF_tot_campo_saida = 0;
  }

  if ( TF_ptr_logo != NULL )
  {
    short int i;

    for ( i = 0; i < TF_tam_logo; i++ )
    {
      // liberando as imagens criadas
      if ( TF_ptr_logo[ i ].ptr_img != NULL )
        IMG_LiberarImagem( TF_ptr_logo[ i ].ptr_img );
    }

    GlobalFreePtr( TF_ptr_logo );

    TF_ptr_logo = NULL;
    TF_tam_logo = 0;
    TF_tot_logo = 0;
  }

  if ( TF_ptr_fio != NULL )
  {
    GlobalFreePtr( TF_ptr_fio );

    TF_ptr_fio = NULL;
    TF_tam_fio = 0;
  }

  if ( TF_buffer_texto != NULL )
  {
    GlobalFreePtr( TF_buffer_texto );

    TF_buffer_texto = NULL;
    TF_buf_tatual = 0;
    TF_buf_tmax = 0;
  }

  if ( TF_tab_linha != NULL )
  {
    GlobalFreePtr( TF_tab_linha );

    TF_tab_linha = NULL;
    TF_tab_linha_tatual = 0;
    TF_tab_linha_tmax = 0;
  }
}

/*------------------------------------------------------------------------*/
static BOOL TF_aumentar_tabela_de_fontes ( void )
/* iniciar e aumentar a tabela de fontes do formatador
*/
{
  if ( TF_ptr_tab_fonte == NULL )
  {
    TF_tam_tab_fonte = INC_TF_TAB_FONTE;

    TF_ptr_tab_fonte = (struct TF_tab_fonte *)
        GlobalAllocPtr( GHND,
            TF_tam_tab_fonte * sizeof( TF_ptr_tab_fonte[0] ));
  }
  else
  if ( TF_tam_tab_fonte + INC_TF_TAB_FONTE < 255 )
  {
    TF_tam_tab_fonte += INC_TF_TAB_FONTE;

    TF_ptr_tab_fonte = (struct TF_tab_fonte *)
        GlobalReAllocPtr( TF_ptr_tab_fonte,
            TF_tam_tab_fonte * sizeof( TF_ptr_tab_fonte[0] ),
            GMEM_ZEROINIT );
  }
  if (TF_ptr_tab_fonte == NULL)
  {
    erro_mens(67, NULL);  // sem memória disponível
    return FALSE;
  }
  else  return TRUE;
}

/*------------------------------------------------------------------------*/
static BOOL TF_aumentar_tabela_de_campos ( void )
/* iniciar e aumentar a lista de campos de saida do text field corrente
*/
{
  if ( TF_ptr_campo_saida == NULL )
  {
    TF_tam_campo_saida = INC_TF_CPSAI;
    TF_ptr_campo_saida = (struct TF_campo_saida *)
          GlobalAllocPtr( GHND,
            TF_tam_campo_saida * sizeof( TF_ptr_campo_saida[0] ));

    TF_tot_campo_saida = 0;
  }
  else
  if ( TF_tam_campo_saida + INC_TF_CPSAI < 255 )
  {
    TF_tam_campo_saida += INC_TF_CPSAI;
    TF_ptr_campo_saida = (struct TF_campo_saida *)
          GlobalReAllocPtr( TF_ptr_campo_saida,
            TF_tam_campo_saida * sizeof( TF_ptr_campo_saida[0] ),
            GMEM_ZEROINIT );
  }
  if (TF_ptr_campo_saida == NULL)
  {
    erro_mens(67, NULL); // sem memória disponível
    return FALSE;
  }
  else return TRUE;
}

/*------------------------------------------------------------------------*/
static BOOL TF_aumentar_tabela_de_logos ( void )
/* iniciar e aumentar a lista de logos do text field corrente
*/
{
  if ( TF_ptr_logo == NULL )
  {
    TF_tam_logo = INC_TF_LOGO;
    TF_ptr_logo = (struct TF_logo *)
          GlobalAllocPtr( GHND, TF_tam_logo * sizeof( TF_ptr_logo[0] ));
    TF_tot_logo = 0;
  }
  else
  if ( TF_tam_logo + INC_TF_LOGO < 255 )
  {
    TF_tam_logo += INC_TF_LOGO;
    TF_ptr_logo = (struct TF_logo *)
          GlobalReAllocPtr( TF_ptr_logo,
            TF_tam_logo * sizeof( TF_ptr_logo[0] ),GMEM_ZEROINIT );
  }
  if (TF_ptr_logo == NULL)
  {
    erro_mens(67, NULL); // sem memória disponível
    return FALSE;
  }
  else return TRUE;
}

/*------------------------------------------------------------------------*/
static BOOL TF_aumentar_tabela_de_fios ( void )
/* iniciar e aumentar a lista de fios do text field corrente
*/
{
  if ( TF_ptr_fio == NULL )
  {
    TF_tam_fio = INC_TF_FIO;
    TF_ptr_fio = (struct TF_fio *)
          GlobalAllocPtr( GHND, TF_tam_fio * sizeof( TF_ptr_fio[0] ));
  }
  else
  if ( TF_tam_fio + INC_TF_FIO < 255 )
  {
    TF_tam_fio += INC_TF_FIO;
    TF_ptr_fio = (struct TF_fio *)
          GlobalReAllocPtr( TF_ptr_fio,
            TF_tam_fio * sizeof( TF_ptr_fio[0] ),GMEM_ZEROINIT );
  }
  if (TF_ptr_fio == NULL)
  {
    erro_mens(67, NULL); // sem memória disponível
    return FALSE;
  }
  else return TRUE;
}

/*------------------------------------------------------------------------*/
static BOOL TF_aumentar_buffer_de_texto ( void )
/* iniciar e aumentar o buffer de texto do formatador
*/
{
  if ( TF_buffer_texto == NULL )
  {
    TF_buf_tatual = 0;

    TF_buf_tmax = INC_TF_BUFTEX;
    TF_buffer_texto = (BYTE *) GlobalAllocPtr( GHND,
            TF_buf_tmax * sizeof( TF_buffer_texto[0] ));
  }
  else
  // alterado SYLA 23/02/96 trocado de 30L para 60L
  // aceita arquivos de até 60K
  if ( TF_buf_tmax + INC_TF_BUFTEX < (WORD)(60L * 1024) )
  {
    TF_buf_tmax += INC_TF_BUFTEX;

    TF_buffer_texto = (BYTE *) GlobalReAllocPtr( TF_buffer_texto,
            TF_buf_tmax * sizeof( TF_buffer_texto[0] ),
            GMEM_ZEROINIT );
  }
  if (TF_buffer_texto == NULL)
  {
    erro_mens(67, NULL); // sem memória disponível
    return FALSE;
  }
  else return TRUE;
}

/*------------------------------------------------------------------------*/
static BOOL TF_aumentar_tabela_de_linhas ( void )
/* iniciar e aumentar a tabela de linhas do texto formatado
*/
{
#define   INC_NUM_LINHAS    50

  if ( TF_tab_linha == NULL )
  {
    TF_tab_linha_tatual = 0;

    TF_tab_linha_tmax = INC_NUM_LINHAS;

    TF_tab_linha = (struct TF_linha *)
            GlobalAllocPtr( GHND,
            TF_tab_linha_tmax * sizeof( TF_tab_linha[0] ));
  }
  else
  if ( TF_tab_linha_tmax + INC_NUM_LINHAS < 1024 )
  {
    TF_tab_linha_tmax += INC_NUM_LINHAS;
    TF_tab_linha = (struct TF_linha *)
            GlobalReAllocPtr( TF_tab_linha,
            TF_tab_linha_tmax * sizeof( TF_tab_linha[0] ),
            GMEM_ZEROINIT );
  }
  if (TF_tab_linha == NULL)
  {
    erro_mens(67, NULL);  // sem memória disponível
    return FALSE;
  }
  else return TRUE;
}

/*------------------------------------------------------------------------*/
static BOOL TF_inserir_cadeia ( BYTE * ptr, WORD tam, WORD pos )
/* inserir uma cadeia de caracteres no buffer de texto, na posição pos.
*/
{
  BYTE * d, * o;
  WORD desl;

  if ( pos > TF_buf_tatual )
    pos = TF_buf_tatual; // ???? posição inválida

  if ( TF_buf_tatual + tam >= TF_buf_tmax )
  {
    TF_aumentar_buffer_de_texto();

    if ( TF_buf_tatual + tam >= TF_buf_tmax )
    {
      // enviar mensagem de erro ???? Não tem espaço...
      erro_mens ( 114, NULL ); // Text too large
      return ( FALSE );
    }
  }

  // abrindo espaço no buffer para entrar o novo texto
  if ( (desl = TF_buf_tatual - pos) > 0 )
  {
    d = TF_buffer_texto + TF_buf_tatual + tam - 1;
    o = TF_buffer_texto + TF_buf_tatual - 1;

    while ( desl-- > 0 )
      *d-- = *o--;
  }

  TF_buf_tatual += tam;

  // inserindo o texto na posição desejada
  d = TF_buffer_texto + pos;

  while ( tam-- > 0 )
    *d++ = *ptr++;

  return ( TRUE );
}

/*------------------------------------------------------------------------*/
static BOOL TF_apagar_cadeia ( WORD tam, WORD pos )
/* apagar uma cadeia de caracteres no buffer de texto,
*  a partir da posição pos.
*/
{
  BYTE * d, * o;
  WORD desl;

  if ( pos + tam > TF_buf_tatual )
  {
    // ???? posição inválida
    return ( FALSE );
  }

  desl = TF_buf_tatual - tam - pos;

  TF_buf_tatual -= tam;

  // apagando o texto na posição desejada
  o = TF_buffer_texto + pos + tam;
  d = TF_buffer_texto + pos;

  while ( desl-- > 0 )
    *d++ = *o++;

  return ( TRUE );
}

/*------------------------------------------------------------------------*/
static WORD TF_strnchr ( BYTE * ptr, WORD tam, BYTE chr )
/* procurar um caractere em uma cadeia de caracteres
*
* Retorno:
*   0 - se não achou o caractere na cadeia.
* <>0 - posição dentro da cadeia onde o caractere foi encontrado.
*/
{
  WORD pos = 0;

  while ( tam-- > 0 )
  {
    pos++;

    if ( ptr[ 0 ] == chr )
    {
      return ( pos );
    }

    ptr++;
  }

  return ( 0 ); // não encontrado
}

/*------------------------------------------------------------------------*/
static WORD TF_strnchrb ( BYTE * ptr, WORD tam, BYTE chr )
/* procurar um caractere em uma cadeia de caracteres (para trás - back)
*
* Retorno:
*   0 - se não achou o caractere na cadeia.
* <>0 - posição dentro da cadeia onde o caractere foi encontrado.
*/
{
  WORD pos = 0;

  while ( tam-- > 0 )
  {
    pos++;

    if ( ptr[ 0 ] == chr )
    {
      return ( pos );
    }

    ptr--;
  }

  return ( 0 ); // não encontrado
}

/*------------------------------------------------------------------------*/
static void TF_criar_dc_da_impressora ( void )
/* criar o dc da impressora para ser usada na composição do texto
*/
{
  if ( hdc_impr != NULL )   return;

  hdc_impr = Zoom_criar_DC_para_composicao();
}

/*------------------------------------------------------------------------*/
static void TF_liberar_dc_da_impressora ( void )
/* liberar o dc da impressora que foi usada na composição do texto
*/
{
  if ( hdc_impr != NULL )
  {
//    SelectFont( hdc_impr, GetStockObject( SYSTEM_FONT ) );

    DeleteDC( hdc_impr );

    hdc_impr = NULL;
  }
}

/*------------------------------------------------------------------------*/
static HFONT TF_criar_fonte_video ( short int num_fonte )
/* selecionar uma fonte
*/
{
  HFONT     hft;

  LOGFONT   lf;

  FonteCriarLOGFONT( &TF_ptr_tab_fonte[ num_fonte ].f, &lf, flag_previa_real );

  lf.lfEscapement = TF_atual.obj.Orientacao * 10;

nova_fonte:
  hft = CreateFontIndirect( &lf );

  TF_ptr_tab_fonte[ num_fonte ].hft_vid = hft;

  return hft;
}
/*------------------------------------------------------------------------*/
static void TFED_ver_largura_das_letras ( HDC hdc, short int num_fonte )
{
  ABC   abc;
  char  car[2];
  SIZE  dims;

  short int *tl, i, larg;

  tl = TF_ptr_tab_fonte[ num_fonte ].tab_larg;

  for ( i = 0; i < 32; i++ )
    tl[ i ] = 0;

  car[1] = 0;

  if ((gDriverWindows == FALSE )  &&
     (TF_ptr_tab_fonte[ num_fonte ].CpiFonteSel != 0))
  {
    larg = gUMA_POLEGADA / TF_ptr_tab_fonte[ num_fonte ].CpiFonteSel;

    for ( ; i < 256; i++ )
      tl[ i ] = larg;
  }
  else
  {
    for ( ; i < 256; i++ )
    {
      if ( GetCharABCWidths( hdc, i, i, &abc ) == FALSE )
      {
        car[0]  = i;    // alterado em 31/10/96
        GetTextExtentPoint( hdc, car, 1,(SIZE *)&dims );
        tl[ i ] = dims.cx;
      }
      else
        tl[ i ] = abc.abcA + abc.abcB + abc.abcC;
    }
  }
}

/*------------------------------------------------------------------------*/
static void TF_criar_fonte_impressora ( short int num_fonte )
/* selecionar uma fonte
*/
{
  TEXTMETRIC  tm;

  HFONT   hft,
          hft_ant;

  LOGFONT lf;

  FonteCriarLOGFONT( &TF_ptr_tab_fonte[ num_fonte ].f, &lf, flag_previa_real );

  TF_ptr_tab_fonte[ num_fonte ].larg = lf.lfWidth;
  TF_ptr_tab_fonte[ num_fonte ].alt = ABS( lf.lfHeight );
  TF_ptr_tab_fonte[ num_fonte ].CorFonteSel = CorFonteSelecionada;
  TF_ptr_tab_fonte[ num_fonte ].CpiFonteSel = CpiFonteSelecionada;

  hft = CreateFontIndirect( &lf );

  if ( lf.lfWidth == 0 )
  {
    hft_ant = SelectFont( hdc_impr, hft );

    GetTextMetrics( hdc_impr, &tm );

    TFED_ver_largura_das_letras( hdc_impr, num_fonte );

    SelectFont( hdc_impr, hft_ant );

    TF_ptr_tab_fonte[ num_fonte ].larg = tm.tmAveCharWidth;
    TF_ptr_tab_fonte[ num_fonte ].alt = tm.tmHeight;
  }
  else
    TFED_ver_largura_das_letras( hdc_impr, num_fonte );

  TF_ptr_tab_fonte[ num_fonte ].hft_vid = TF_criar_fonte_video( num_fonte );
  TF_ptr_tab_fonte[ num_fonte ].hft = hft;
}
/*------------------------------------------------------------------------*/
static WORD TF_criar_fonte ( struct TF_tab_fonte * pt_ft )
/* criar uma fonte na tabela de fontes tendo as caracteristicas
*  dadas por pt_ft. Caso a fonte já exista retorna o índice da mesma,
*  incrementado o contador de uso. Caso não exista aloca uma entrada,
*  guarda as informações, e retorna o índice da entrada alocada.
*/
{
  struct TF_tab_fonte * tab_ft = TF_ptr_tab_fonte;

  WORD  ind = 0, livre = 0xFFFF;

  while ( ind < TF_tam_tab_fonte )
  {
    if ( tab_ft->contador == 0 )
    {
      if ( livre == 0xFFFF )
        livre = ind;
    }
    else
    // alterado em 21/02/97 ignora case sensitive no nome da fonte
    // alterado SYLA 19/05/98 tirei if ( ind != 0 &&
    if (tab_ft->f.corpo == pt_ft->f.corpo   &&
       tab_ft->f.color  == pt_ft->f.color   &&
       tab_ft->f.Fcpi   == pt_ft->f.Fcpi    &&
       tab_ft->f.Fexp   == pt_ft->f.Fexp    &&
       tab_ft->f.Fund   == pt_ft->f.Fund    &&
       tab_ft->f.Fita   == pt_ft->f.Fita    &&
       tab_ft->f.Fstk   == pt_ft->f.Fstk    &&
       tab_ft->f.Fbold  == pt_ft->f.Fbold   &&
       tab_ft->Fsobre   == pt_ft->Fsobre    &&
       tab_ft->Fsub     == pt_ft->Fsub      &&
       strnicmp( tab_ft->f.FnomeW, pt_ft->f.FnomeW,
                    sizeof( pt_ft->f.FnomeW ) ) == 0 &&
       strnicmp( tab_ft->f.Fnome, pt_ft->f.Fnome,
                    sizeof( pt_ft->f.Fnome ) ) == 0 &&
       strnicmp( tab_ft->f.expressao, pt_ft->f.expressao,
                    sizeof( pt_ft->f.expressao ) ) == 0 )
    {
      tab_ft->contador++;

      return( ind );
    }

    ind++;
    tab_ft++;
  }

  if ( livre == 0xFFFF )
  {
    // se não tem nenhum livre, aloca mais espaço para a tabela
    if (TF_aumentar_tabela_de_fontes() == FALSE)  return livre;
    livre = ind;
  }

  tab_ft = TF_ptr_tab_fonte + livre;

  *tab_ft = *pt_ft;

  TF_criar_fonte_impressora( livre );

  tab_ft->contador = 1;

  return ( livre );
}

/*------------------------------------------------------------------------*/
static WORD TF_ler_fonte ( BYTE *texto, WORD tam_texto )
/* ler o comando de fonte, alocando uma posição na tabela
*  de fontes do editor de texto. Retorna o índice desta tabela
*  onde foi armazenada as informações da fonte.
*/
{
  struct TF_tab_fonte  ft = {{ 0 }};

  WORD i = 0;
  BYTE c;
  char buf [MAXLENSTR];
  short int  sinal = 1;

  // ler o nome da fonte
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    if( i < (sizeof( ft.f.Fnome ) - 1) )
      ft.f.Fnome[i++] = c;
  }

  // lendo o corpo da fonte
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    ft.f.Fcpi = ft.f.Fcpi * 10 + (c - '0');
  }

  // verificar se é fonte expandida
  if ( tam_texto > 0  &&  texto[ 0 ] == 'E' )
  {
    texto++;
    tam_texto--;

    ft.f.Fexp = TRUE;
  }
  else
    ft.f.Fexp = FALSE;

  if ( tam_texto > 0 )
  {
    texto++;
    tam_texto--;
  }

  // verificar se é fonte sublinhada
  if ( tam_texto > 0  &&  texto[ 0 ] == 'S' )
  {
    texto++;
    tam_texto--;

    ft.f.Fund = TRUE;
  }
  else
    ft.f.Fund = FALSE;

  if ( tam_texto > 0 )
  {
    texto++;
    tam_texto--;
  }

  // lendo o número interno da fonte
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == sESC )
    {
      FonteCompatibilizarComWindows( &ft.f );

      goto fim; // versao antiga
    }

    if ( c == DELIMITADOR )
      break;

    ft.ft_int = ft.ft_int * 10 + (c - '0');
  }

  // ler o nome da fonte windows
  i = 0;
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    if( i < (sizeof( ft.f.FnomeW ) - 1) )
      ft.f.FnomeW[ i++ ] = c;
  }

  // lendo a altura da fonte windows, pulando antes o sinal
  if (texto[ 0 ] == '-')
  {
    sinal = -1;
    texto++;
    tam_texto--;
  }

  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    ft.f.corpo = ft.f.corpo * 10 + (c - '0');
  }
  ft.f.corpo *= sinal;

  // lendo a cor da fonte

  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    ft.f.color = ft.f.color * 10 + (c - '0');
  }

  // verificar se é fonte italica
  if ( tam_texto > 0  &&  texto[ 0 ] == 'I' )
  {
    texto++;
    tam_texto--;

    ft.f.Fita = TRUE;
  }
  else
    ft.f.Fita = FALSE;

  if ( tam_texto > 0 )
  {
    texto++;
    tam_texto--;
  }

  // verificar se é fonte tem strikeout
  if ( tam_texto > 0  &&  texto[ 0 ] == 'K' )
  {
    texto++;
    tam_texto--;

    ft.f.Fstk = TRUE;
  }
  else
    ft.f.Fstk = FALSE;

  if ( tam_texto > 0 )
  {
    texto++;
    tam_texto--;
  }

  // lendo a intensidade do bold
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == sESC )
      goto fim; // versao anterior à 7.42

    if ( c == DELIMITADOR )
      break;

    ft.f.Fbold = ft.f.Fbold * 10 + (c - '0');
  }

  // ler a expressão associada à fonte, se estiver especificada
  i = 0;
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == sESC )  // versão sem fonte Sobrescrita/Subescrita
      goto fim;

    if ( c == DELIMITADOR )
      break;

    if( i < (sizeof( ft.f.expressao ) - 1) )
      ft.f.expressao[ i++ ] = c;
  }

  // verificar se é fonte sobrescrita
  if ( tam_texto > 0  &&  texto[ 0 ] == '1' )
  {
    texto++;
    tam_texto--;

    ft.Fsobre = TRUE;
  }

  if ( tam_texto > 0 )
  {
    texto++;
    tam_texto--;
  }

  // verificar se é fonte subescrita
  if ( tam_texto > 0  &&  texto[ 0 ] == '1' )
  {
    texto++;
    tam_texto--;

    ft.Fsub = TRUE;
  }

fim:

//  if ( LeArq == TRUE  && DriverWindows==FALSE && Printer!=HTML && Arq.DriverWindows==1)
  if ( LeArq == TRUE  && gDriverWindows==FALSE )
  {
    if ( FonteAcharIndice ( ft.f.Fnome ) == -1 )
    {
      if ( senhaOper == FALSE )
      {
        BOOL resp;

        resp = trocaFonteTextfield ( NULL, &ft.f );
        if ( resp == FALSE )
        {
          FonteDestravar();
          return (FALSE);
        }
      }
      else
      { // no modo operador aborta a execucao
        sprintf( buf, strload(IDS_MSG_ERRO +80 ), ft.f.Fnome);
        erro_msgtxt( buf, strload(IDS_MSG_ERRO+ 108), (HWND)hwndLeArq );
        return (-1);
      }

      flagTrocouFonte = TRUE;
    }
  }
  if (LeArq)
  {
    if (VerificarExistenciaFonteWindows(ft.f.FnomeW) == FALSE)
      return (-1);
  }

  return ( TF_criar_fonte( &ft ) );
}

/*------------------------------------------------------------------------*/
static WORD TF_expandir_fonte ( BYTE *texto, struct TF_tab_fonte * ft )
/* expande um comando de fonte a partir da estrutura descritiva
*/
{
  WORD  pos = 0;

  texto[ pos++ ] = sESC;
  texto[ pos++ ] = 'F';   // comando
  texto[ pos++ ] = DELIMITADOR;

  strcpy( texto + pos, ft->f.Fnome ); // nome da fonte

  pos += strlen( ft->f.Fnome );

  texto[ pos++ ] = DELIMITADOR;

  itoa( ft->f.Fcpi, texto + pos, 10 );  // cpi

  pos += strlen( texto + pos );

  texto[ pos++ ] = DELIMITADOR;

  if ( ft->f.Fexp )
    texto[ pos++ ] = 'E';

  texto[ pos++ ] = DELIMITADOR;

  if ( ft->f.Fund )
    texto[ pos++ ] = 'S';

  texto[ pos++ ] = DELIMITADOR;

  itoa( ft->ft_int, texto + pos, 10 );  // número da fonte interna

  pos += strlen( texto + pos );

  texto[ pos++ ] = DELIMITADOR;

  strcpy( texto + pos, ft->f.FnomeW );  // nome da fonte windows

  pos += strlen( ft->f.FnomeW );

  texto[ pos++ ] = DELIMITADOR;

  itoa( ft->f.corpo, texto + pos, 10 ); // altura da fonte windows

  pos += strlen( texto + pos );

  texto[ pos++ ] = DELIMITADOR;

  itoa( ft->f.color, texto + pos, 10 ); // cor da fonte

  pos += strlen( texto + pos );

  texto[ pos++ ] = DELIMITADOR;


  if ( ft->f.Fita )
    texto[ pos++ ] = 'I';

  texto[ pos++ ] = DELIMITADOR;

  if ( ft->f.Fstk )
    texto[ pos++ ] = 'K';

  texto[ pos++ ] = DELIMITADOR;

  itoa( ft->f.Fbold, texto + pos, 10 ); // intensidade do bold (negrito)

  pos += strlen( texto + pos );

  texto[ pos++ ] = DELIMITADOR;

  strcpy( texto + pos, ft->f.expressao ); // expressão associada à fonte

  pos += strlen( ft->f.expressao );

  texto[ pos++ ] = DELIMITADOR;

  if ( ft->Fsobre )
    texto[ pos++ ] = '1';

  texto[ pos++ ] = DELIMITADOR;

  if ( ft->Fsub )
    texto[ pos++ ] = '1';

  texto[ pos++ ] = sESC;
  texto[ pos ] = 0;

  return ( pos );
}

/*------------------------------------------------------------------------*/
static WORD TF_criar_campo ( struct TF_campo_saida * pt_cs )
/* criar um campo de saida na tabela de campos tendo as caracteristicas
*  dadas por pt_cs.
*/
{
  struct TF_campo_saida * tab_cs = TF_ptr_campo_saida;

  WORD  ind = 0;

  while ( ind < TF_tam_campo_saida )
  {
    if ( tab_cs->em_uso == FALSE )
      break;

    ind++;
    tab_cs++;
  }

  if ( ind >= TF_tam_campo_saida )
  {
    // se não tem nenhum livre, aloca mais espaço para a tabela
    if (TF_aumentar_tabela_de_campos() == FALSE)
      return 0xFFFF;
  }

  tab_cs = TF_ptr_campo_saida + ind;

  *tab_cs = *pt_cs;

  tab_cs->em_uso = TRUE;

  TF_tot_campo_saida ++;

  return ( ind );
}

/*------------------------------------------------------------------------*/
static WORD TF_expandir_campo ( BYTE *texto, struct TF_campo_saida * cp, struct TF_tab_fonte * ft )
/* expande um comando de campo a partir da estrutura descritiva
*/
{
  WORD  pos = 0;

  texto[ pos++ ] = sESC;
  texto[ pos++ ] = 'C';   // comando
  texto[ pos++ ] = DELIMITADOR;

  strcpy( texto + pos, cp->expressao ); // expressão

  pos += strlen( cp->expressao );

  texto[ pos++ ] = DELIMITADOR;

  strcpy( texto + pos, cp->mascara ); // máscara

  pos += strlen( cp->mascara );

  texto[ pos++ ] = DELIMITADOR;

  itoa( cp->largura, texto + pos, 10 ); // largura

  pos += strlen( texto + pos );

  texto[ pos++ ] = DELIMITADOR;

  itoa( cp->auto_LF, texto + pos, 10 ); // auto LF  Susana  jun/96

  pos += strlen( texto + pos );

  texto[ pos++ ] = DELIMITADOR;

  texto[ pos++ ] = (cp->flag_rtrim) ? '1' :'0'; // flag para rtrim

  texto[ pos++ ] = DELIMITADOR;

  strcpy( texto + pos, ft->f.Fnome );   // nome da fonte

  pos += strlen( ft->f.Fnome );

  texto[ pos++ ] = DELIMITADOR;

  itoa( ft->f.Fcpi, texto + pos, 10 );  // corpo

  pos += strlen( texto + pos );

  texto[ pos++ ] = DELIMITADOR;

  if ( ft->f.Fexp )
    texto[ pos++ ] = 'E';

  texto[ pos++ ] = DELIMITADOR;

  if ( ft->f.Fund )
    texto[ pos++ ] = 'S';

  texto[ pos++ ] = DELIMITADOR;

  itoa( ft->ft_int, texto + pos, 10 );  // número da fonte interna

  pos += strlen( texto + pos );

  texto[ pos++ ] = DELIMITADOR;

  strcpy( texto + pos, ft->f.FnomeW );  // nome da fonte windows

  pos += strlen( ft->f.FnomeW );

  texto[ pos++ ] = DELIMITADOR;

  itoa( ft->f.corpo, texto + pos, 10 ); // altura da fonte windows

  pos += strlen( texto + pos );

  texto[ pos++ ] = DELIMITADOR;

  itoa( ft->f.color, texto + pos, 10 ); // cor da fonte

  pos += strlen( texto + pos );

  texto[ pos++ ] = DELIMITADOR;

  if ( ft->f.Fita )
    texto[ pos++ ] = 'I';

  texto[ pos++ ] = DELIMITADOR;

  if ( ft->f.Fstk )
    texto[ pos++ ] = 'K';

  texto[ pos++ ] = DELIMITADOR;

  itoa( ft->f.Fbold, texto + pos, 10 ); // intensidade do bold (negrito)

  pos += strlen( texto + pos );

  texto[ pos++ ] = DELIMITADOR;

  strcpy( texto + pos, ft->f.expressao ); // expressão associada à fonte

  pos += strlen( ft->f.expressao );

  texto[ pos++ ] = DELIMITADOR;

  if ( ft->Fsobre )
    texto[ pos++ ] = '1';

  texto[ pos++ ] = DELIMITADOR;

  if ( ft->Fsub )
    texto[ pos++ ] = '1';

  texto[ pos++ ] = sESC;
  texto[ pos ] = 0;

  return ( pos );
}

/* ---------------------------------------------------------------------- */
static void TF_LogoCarregarImagem(struct TF_logo *pt_logo)
{
  char *pt = pt_logo->expressao;
  char  cad [MAXLENEXPR];
  int   i, tam;

  if (pt_logo->ptr_img != NULL) return;

  // se não for constante não carregar a figura
  if (pt[0] != '"')   return;
  if (pt[strlen(pt) - 1] != '"') return;

  tam = strlen(pt) - 1;

  for (i = 1; i < tam; i++)
    if (pt[i] == '"')
      return;
    else
      cad[i - 1] = pt[i];

  cad[i - 1] = 0;

  if (i == 1)   return;

  strcpy(cad, RedefinirPastaRecursoImagem(cad));
  pt_logo->ptr_img = IMG_CarregarImagem(cad, TRUE, NULL);

  if (pt_logo->ptr_img != NULL)
  {
    if (gDriverWindows &&
       (pt_logo->expType > 0) &&
       (pt_logo->largura != 0) && (pt_logo->altura != 0))
    {
      int tipo = (pt_logo->expType == 1) ? ZOOM_ENCAIXAR : ZOOM_ENCHER;

      pt_logo->ptr_img = IMG_MudarDimensoes(pt_logo->ptr_img, pt_logo->largura,
                                          pt_logo->altura, tipo);
    }
    else
    {
      int res = (pt_logo->resolucao == 0) ? gDpiImagem : pt_logo->resolucao;

      pt_logo->ptr_img = IMG_MudarResolucao(pt_logo->ptr_img, res, gUMA_POLEGADA);
    }
  }
}
/*------------------------------------------------------------------------*/
static WORD TF_criar_logo ( struct TF_logo * pt_cs )
/* criar um logo na tabela de logos tendo as caracteristicas
*  dadas por pt_cs.
*/
{
  struct TF_logo * tab_cs = TF_ptr_logo;

  WORD  ind = 0;

  while ( ind < TF_tam_logo )
  {
    if ( tab_cs->em_uso == FALSE )
      break;
    ind++;
    tab_cs++;
  }
  if ( ind >= TF_tam_logo )
  {
    // se não tem nenhum livre, aloca mais espaço para a tabela
    if (TF_aumentar_tabela_de_logos() == FALSE)
      return 0xFFFF;
  }
  tab_cs = TF_ptr_logo + ind;
  *tab_cs = *pt_cs;
  tab_cs->em_uso = TRUE;
  TF_LogoCarregarImagem(tab_cs);
  TF_tot_logo ++;
  return ( ind );
}

/*------------------------------------------------------------------------*/
static WORD TF_expandir_logo ( BYTE *texto, struct TF_logo * cp )
/* expande um comando de logo a partir da estrutura descritiva
*/
{
  WORD  pos = 0;

  texto[ pos++ ] = sESC;
  texto[ pos++ ] = 'L';   // comando
  texto[ pos++ ] = DELIMITADOR;
  strcpy( texto + pos, cp->expressao ); // expressão
  pos += strlen( cp->expressao );
  texto[ pos++ ] = DELIMITADOR;
  itoa( cp->largura, texto + pos, 10 ); // largura
  pos += strlen( texto + pos );
  texto[ pos++ ] = DELIMITADOR;

  // Pode ter que converter polegada da largura
  if ( LeArq == TRUE && flagConvPol == TRUE )
    cp->altura = ConvPol ( cp->altura );

  itoa( cp->altura, texto + pos, 10 );  // altura
  pos += strlen( texto + pos );
  texto[ pos++ ] = DELIMITADOR;
  texto[ pos++ ] = cp->hReduced + 0x30; // HReduced
  texto[ pos++ ] = DELIMITADOR;
  texto[ pos++ ] = cp->vReduced + 0x30; // VReduced
  texto[ pos++ ] = DELIMITADOR;
  itoa( cp->comprType, texto + pos, 10 ); // ComprType
  pos += strlen( texto + pos );
  texto[ pos++ ] = DELIMITADOR;
  itoa( cp->resolucao, texto + pos, 10 ); // resolução da imagem
  pos += strlen( texto + pos );
  texto[ pos++ ] = DELIMITADOR;
  itoa( cp->expType, texto + pos, 10 );   // 0->normal; 1->encaixar; 2->encher;
  pos += strlen( texto + pos );
  texto[ pos++ ] = DELIMITADOR;
  texto[ pos++ ] = sESC;
  texto[ pos ] = 0;
  return ( pos );
}

/*------------------------------------------------------------------------*/
static WORD TF_criar_fio ( struct TF_fio * pt_cs )
/* criar um fio na tabela de fios tendo as caracteristicas
*  dadas por pt_cs.
*/
{
  struct TF_fio * tab_cs = TF_ptr_fio;

  WORD  ind = 0;

  while ( ind < TF_tam_fio )
  {
    if ( tab_cs->em_uso == FALSE )
      break;
    ind++;
    tab_cs++;
  }
  if ( ind >= TF_tam_fio )
  {
    // se não tem nenhum livre, aloca mais espaço para a tabela
    if (TF_aumentar_tabela_de_fios() == FALSE)
      return 0xFFFF;
  }
  tab_cs = TF_ptr_fio + ind;
  *tab_cs = *pt_cs;
  tab_cs->em_uso = TRUE;
  return ( ind );
}

/*------------------------------------------------------------------------*/
static WORD TF_expandir_fio ( BYTE *texto, struct TF_fio * cp )
/* expande um comando de fio a partir da estrutura descritiva
*/
{
  WORD  pos = 0;

  texto[ pos++ ] = sESC;
  texto[ pos++ ] = cp->tipo;      // comando (H ou V)
  texto[ pos++ ] = DELIMITADOR;
  strcpy( texto + pos, cp->expressao );   // expressão
  pos += strlen( cp->expressao );
  texto[ pos++ ] = DELIMITADOR;
  itoa( cp->larg_alt, texto + pos, 10 );  // largura / altura
  pos += strlen( texto + pos );
  texto[ pos++ ] = DELIMITADOR;
  itoa( cp->espessura, texto + pos, 10 ); // espessura
  pos += strlen( texto + pos );
  texto[ pos++ ] = sESC;
  texto[ pos ] = 0;
  return ( pos );
}

/*------------------------------------------------------------------------*/
#define   TF_VERIFICAR_SE_CABE()                        \
  if ( tam_texto + tam_copia >= TF_atual.Tmax )         \
  {                                                     \
    HGLOBAL haux;                                       \
    GlobalUnlock( TF_atual.Text );                      \
    haux = GlobalReAlloc( TF_atual.Text,                \
                TF_atual.Tmax + tam_copia,              \
                GMEM_ZEROINIT );                        \
    if ( haux == NULL )                                 \
        goto fim;                                       \
    TF_atual.Tmax += tam_copia;                         \
    TF_atual.Text = haux;                               \
    if ( (texto = (BYTE *)GlobalLock( TF_atual.Text ))  \
                        == NULL )                       \
        goto fim;                                       \
  }

/*------------------------------------------------------------------------*/
static void TF_restaurar_um_texto ( WORD posi, WORD posf )
/* restaurar o texto, entre posi e posf, que estava sendo editado
*/
{
  WORD  tam_pedaco, tam_copia,
        tam_texto = 0,
        tam_ret;

  BYTE  buff[ 512 ];

  struct  TF_campo_saida  campo;
  struct  TF_tab_fonte    fonte;
  struct  TF_logo         logo;
  struct  TF_fio          fio;

  BYTE * texto;

  // alocar area nova para armazenar o resultado final
  // ignora o handle anterior
  TF_atual.Tmax   = 16;
  TF_atual.Tatual = 0;
  if ( (TF_atual.Text = (BYTE *)
            GlobalAlloc( GHND, TF_atual.Tmax )) == NULL )
  {
    TF_atual.Tmax = 0;

    erro_mens(67, NULL);  // sem memória disponível

    return;
  }
  if ( (texto = (BYTE *)GlobalLock( TF_atual.Text )) == NULL )
  {
    GlobalFree( TF_atual.Text );
    TF_atual.Text = NULL;
    TF_atual.Tmax = 0;
    erro_mens( 67, NULL);   // out of memory
    return;   // ??? mensagem de erro?
  }
  if ( posf > TF_buf_tatual )
    posf = TF_buf_tatual;
  while ( posi < posf )
  {
    // procurar um comando
    tam_pedaco = TF_strnchr( TF_buffer_texto + posi, posf - posi, sESC );
    if ( tam_pedaco == 0 )
      tam_copia = posf - posi;
    else
      tam_copia = tam_pedaco - 1;
    // procurar um return no pedaco encontrado
    tam_ret = TF_strnchr( TF_buffer_texto + posi, tam_copia, sRETURN );
    if ( tam_ret > 0 )
    {
      // existe um return antes do escape
      tam_copia = tam_ret - 1;
    }
    // inserindo o final do texto
    if ( tam_copia )
    {
      TF_VERIFICAR_SE_CABE();
      strncpy( texto + tam_texto, TF_buffer_texto + posi, tam_copia );
      posi += tam_copia;
      tam_texto += tam_copia;
    }
    if ( tam_ret > 0 )
    {
      // copiando o return com a tradução
      tam_copia = 2;
      TF_VERIFICAR_SE_CABE();
      texto[ tam_texto++ ] = 0x0d;
      texto[ tam_texto++ ] = 0x0a;
      posi++;
      continue;
    }
    if ( tam_pedaco == 0 )
      break;    // chegou ao final do texto
    switch ( TF_buffer_texto[ posi + 1 ] )
    {
      case TF_CMD_INVALIDO:
      case TF_CMD_CAMPO_FIM:
      case TF_CMD_LOGO_FIM:
        tam_copia = 0;
        break;

      case TF_CMD_FONTE:
        fonte = TF_ptr_tab_fonte[ TF_buffer_texto[ posi + 2 ] ];
        tam_copia = TF_expandir_fonte( buff, &fonte );
        break;

      case TF_CMD_CAMPO_INI:
        // ler as informações do campo atual
        campo = TF_ptr_campo_saida[ TF_buffer_texto[ posi + 2 ] ];
        fonte = TF_ptr_tab_fonte[ campo.fonte ];

        tam_copia = TF_expandir_campo( buff, &campo, &fonte );

        // procurar o fim de campo
        posi += TF_TAM_CMD;
        tam_pedaco = TF_strnchr( TF_buffer_texto + posi,
                          posf - posi, sESC );
        posi += tam_pedaco - 1;
        break;

      case TF_CMD_LOGO_INI:
        // ler as informações do logo
        logo = TF_ptr_logo[ TF_buffer_texto[ posi + 2 ] ];
        tam_copia = TF_expandir_logo ( buff, &logo );
        // procurar o fim do logo
        posi += TF_TAM_CMD;
        tam_pedaco = TF_strnchr ( TF_buffer_texto + posi,
                          posf-posi, sESC );
        posi += tam_pedaco -1;
        break;

      case TF_CMD_FIOH:
      case TF_CMD_FIOV:
        // ler as informações do fio
        fio = TF_ptr_fio[ TF_buffer_texto[ posi + 2 ] ];
        tam_copia = TF_expandir_fio ( buff, &fio );
        break;
    }

    // pular o comando
    posi += TF_TAM_CMD;

    // inserindo o comando traduzido
    if ( tam_copia )
    {
      TF_VERIFICAR_SE_CABE();

      strncpy( texto + tam_texto, buff, tam_copia );

      tam_texto += tam_copia;
    }
  }

fim:
  TF_atual.Tatual = tam_texto;

  texto[ tam_texto ] = 0;

  GlobalUnlock( TF_atual.Text );
}

/*------------------------------------------------------------------------*/
static WORD TF_ler_campo ( BYTE *texto, WORD tam_texto )
/* ler o comando de campo de saida, alocando uma posição na tabela
*  de campos do editor de texto. Retorna o índice desta tabela
*  onde foi armazenada as informações do campo.
*/
{
  struct TF_campo_saida  cs = {{ 0 }};

  WORD i = 0;
  BYTE c;

  // ler a expressão
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    if( i < (sizeof( cs.expressao ) - 1) )
      cs.expressao[ i++ ] = c;
  }

  // ler a máscara
  i = 0;    // alterado SYLA 18/04/95
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    if( i < (sizeof( cs.mascara ) - 1) )
      cs.mascara[ i++ ] = c;
  }

  // lendo a largura do campo
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    cs.largura = cs.largura * 10 + (c - '0');
  }

  // Pode ter que converter polegada da largura
  if ( LeArq == TRUE && flagConvPol == TRUE )
    cs.largura = ConvPol ( cs.largura );


  // Zera auto_LF em arquivos de versões anteriores Susana 11/7/96
  if ( LeArq == TRUE && strcmp ( Arq.Versao, "451" ) < 0 )
    cs.auto_LF = FALSE;

  else  // lendo auto LF do campo   Susana jun/96

    while ( tam_texto > 0 )
    {
      c = texto[ 0 ];
      texto++;
      tam_texto--;

      if ( c == DELIMITADOR )
        break;

      cs.auto_LF = cs.auto_LF * 10 + (c - '0');
    }


  // lendo campo rtrim
  if ((LeArq == TRUE) && (strcmp(Arq.Versao, "803") < 0))
    cs.flag_rtrim = FALSE;
  else
  {
    int f = 0;

    while ( tam_texto > 0 )
    {
      c = texto[ 0 ];
      texto++;
      tam_texto--;

      if ( c == DELIMITADOR )
        break;

      f = f * 10 + (c - '0');
    }
    cs.flag_rtrim = f != 0;
  }

  cs.fonte = TF_ler_fonte( texto, tam_texto );

  // inserido SYLA 09/04/97
  if ( cs.fonte == (int)0xFFFF ) // alterado Syla 09/03/2001
    return(-1);

  return ( TF_criar_campo( &cs ) );
}

/*------------------------------------------------------------------------*/
static WORD TF_ler_logo ( BYTE *texto, WORD tam_texto )
/* ler o comando de logo, alocando uma posição na tabela
*  de logos do editor de texto. Retorna o índice desta tabela
*  onde foi armazenada as informações do logo.
*/
{
  struct TF_logo  lg = {{ 0 }};

  WORD i = 0;
  BYTE c;

  // ler a expressão
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    if( i < (sizeof( lg.expressao ) - 1) )
      lg.expressao[ i++ ] = c;
  }

  // lendo a largura do logo
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    lg.largura = lg.largura * 10 + (c - '0');
  }

  // Pode ter que converter polegada da largura
  if ( LeArq == TRUE && flagConvPol == TRUE )
    lg.largura = ConvPol ( lg.largura );

  // lendo a altura do logo
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    lg.altura = lg.altura * 10 + (c - '0');
  }

  // Pode ter que converter polegada da largura
  if ( LeArq == TRUE && flagConvPol == TRUE )
    lg.altura = ConvPol ( lg.altura );

  // lendo o HReduced
  c = texto[0];
  texto++;
  tam_texto--;
  lg.hReduced = c - '0';
  texto++;
  tam_texto--;

  // lendo o VReduced
  c = texto[0];
  texto++;
  tam_texto--;
  lg.vReduced = c - '0';
  texto++;
  tam_texto--;

  // lendo o comprType
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    lg.comprType = lg.comprType * 10 + (c - '0');
  }

  // lendo a resolução do logo
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR || c == sESC )
      break;

    lg.resolucao = lg.resolucao * 10 + (c - '0');
  }

  // lendo a expType do logo
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR || c == sESC )
      break;

    lg.expType = lg.expType * 10 + (c - '0');
  }

  return ( TF_criar_logo( &lg ) );
}

/*------------------------------------------------------------------------*/
static WORD TF_ler_fio ( BYTE *texto, WORD tam_texto, BYTE tipo )
/* ler o comando de fio, alocando uma posição na tabela
*  de fios do editor de texto. Retorna o índice desta tabela
*  onde foi armazenada as informações do fio.
*/
{
  struct TF_fio  fio = {{ 0 }};

  WORD i = 0;
  BYTE c;

  fio.tipo = tipo;

  // ler a expressão
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    if( i < (sizeof( fio.expressao ) - 1) )
      fio.expressao[ i++ ] = c;
  }

  // lendo a largura/altura do fio
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR )
      break;

    fio.larg_alt = fio.larg_alt * 10 + (c - '0');
  }

  // Pode ter que converter polegada da largura
  if ( LeArq == TRUE && flagConvPol == TRUE )
    fio.larg_alt = ConvPol ( fio.larg_alt );

  // lendo a espessura do fio
  while ( tam_texto > 0 )
  {
    c = texto[ 0 ];

    texto++;
    tam_texto--;

    if ( c == DELIMITADOR || c == sESC )
      break;

    fio.espessura = fio.espessura * 10 + (c - '0');
  }

  // Pode ter que converter polegada da largura
  if ( LeArq == TRUE && flagConvPol == TRUE )
    fio.espessura = ConvPol ( fio.espessura );

  return ( TF_criar_fio( &fio ) );
}

/*------------------------------------------------------------------------*/
static void TF_substituir_campo ( WORD campo, WORD *p_pos )
/* substitui um campo de saida por uma cadeia de caracteres com tamanho
*  aproximado da largura do campo
*/
{
  WORD   tam, pos = *p_pos;
  char * nono;
  char   ch, ch1;
  char   buff [MAXLENSTR];
  enum result_expr resp;

  HFONT hft_ant;
  WORD  ft,alt, pedaco,larg;

  static BYTE nonolil[] =
//    "NOLIL NONO NONOLIL LO LINO NOLI NONO NONOLIL NOLIL NONO LINO";
      "XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz XxYyZz";

  ft = TF_ptr_campo_saida[ campo ].fonte;
  larg = TF_ptr_campo_saida[ campo ].largura;

  if ( flag_previa_real && (resp = CalculaExpr(
        TF_ptr_campo_saida[ campo ].expressao, &nono )) != RE_ERRO )
  {
    if ( resp != RE_FALSE_SEM_VALOR )
    {
      if ( TF_ptr_campo_saida[ campo ].mascara[0] != 0 )
      { // tem mascara de edição
        stredn ( buff, nono, TF_ptr_campo_saida[ campo ].mascara, strlen(nono));
        nono = buff;
      }
      // auto LF Susana jun/96 insere LF
      if ( TF_ptr_campo_saida[ campo ].auto_LF == TRUE )
      {
        TF_inserir_cadeia ( "\n", 1, pos );
        pos +=1;
      }
    }
  }
  else
  {
    ch  = TF_ptr_campo_saida[ campo ].expressao[0];
    tam = strlen(TF_ptr_campo_saida[ campo ].expressao)-1;
    ch1 = TF_ptr_campo_saida[ campo ].expressao[tam];

    nono = ( ( ch >= '0' && ch <= '9') || ( ch == '"' && ch1 == '"' ) ) ?
        TF_ptr_campo_saida[ campo ].expressao :
        (char *) &nonolil[0];
  }

  tam = strlen(nono);

  if ( ch == '"' && ch1 == '"' )
  {          // tira as aspas
    nono++;
    tam -= 2;
  }

  hft_ant = SelectFont( hdc_impr, TF_ptr_tab_fonte[ ft ].hft );

  pedaco = TF_largura_da_palavra( hdc_impr, nono, tam, &alt, ft );

  while ( larg > 0 )
  {
    if ( larg >= pedaco )
    {
      TF_inserir_cadeia( nono, tam, pos );

      pos += tam;

      larg -= pedaco;

      if ( flag_previa_real == TRUE )
        break;
    }
    else
    {
      while( --tam > 0 )
      {
        pedaco = TF_largura_da_palavra( hdc_impr, nono, tam, &alt, ft );

        if ( larg < pedaco )
          continue;

        TF_inserir_cadeia( nono, tam, pos );

        pos += tam;

        break;
      }
      break;
    }
  }

  SelectFont( hdc_impr, hft_ant );

  if ( flag_previa_real == FALSE )
  {
    if ( pos != *p_pos  &&  TF_buffer_texto[ pos - 1 ] == ' ' )
      TF_buffer_texto[ pos - 1 ] = 'I';
  }
  else
  {
    if ( pos != *p_pos  &&  TF_buffer_texto[ pos - 1 ] == ' ' )
      pos--;
  }

  *p_pos = pos;
}

/*------------------------------------------------------------------------*/
static void TF_substituir_logo ( WORD *p_pos )
/* substitui um logo por um retangulo com tamanho aproximado da largura
*  do logo
*/
{
  WORD  tam, pos = *p_pos;
  BYTE  nonolil[] = "LOGO";

  tam = strlen(nonolil);
  TF_inserir_cadeia ( nonolil, tam, pos );
  pos += tam;
  *p_pos = pos;
}

/*------------------------------------------------------------------------*/
static WORD TF_ler_comando ( BYTE *texto, WORD tam_texto, WORD *p_pos )
/* converter um comando no formato da estrutura de um TextField para as
*  estruturas internas do editor de texto, armazenando a partir da
*  posição apontada por p_pos.
*
*  Obs: texto deve estar apontando para o 'ESC' delimitador do comando.
*       retorna o número de caracteres interpretados.
*/
{
  static char cmd[ TF_TAM_CMD ] = { sESC, 0, 0, sESC };

  WORD  tam_pedaco = 1;
  BYTE  tipo_fio;

  // pulando o caractere 'ESC'
  texto++;
  tam_texto--;

  tam_pedaco += TF_strnchr( texto, tam_texto, sESC );

  switch ( texto[ 0 ] )
  {
    case 'F':   // comando de fonte
      texto += 2;
      tam_texto -=2;

      cmd[ 1 ] = (BYTE) TF_CMD_FONTE;
      cmd[ 2 ] = (BYTE) TF_ler_fonte( texto, tam_texto );
      if ( LeArq == TRUE && cmd [2] == -1 )
        return ( -1 );
      break;

    case 'L': // logo
      texto +=2;
      tam_texto -= 2;
      cmd[ 1 ] = (BYTE) TF_CMD_LOGO_INI;
      cmd[ 2 ] = (BYTE) TF_ler_logo( texto, tam_texto );

      TF_inserir_cadeia( cmd, sizeof( cmd ), *p_pos );
      *p_pos += sizeof( cmd );

      TF_substituir_logo( p_pos );

      cmd[ 1 ] = (BYTE) TF_CMD_LOGO_FIM;
      cmd[ 2 ] = (BYTE) -1;
      break;

    case 'C': // campo de saida
      texto += 2;
      tam_texto -=2;

      cmd[ 1 ] = (BYTE) TF_CMD_CAMPO_INI;
      cmd[ 2 ] = (BYTE) TF_ler_campo( texto, tam_texto );
      // inserido SYLA 09/04/97
      if ( LeArq == TRUE && cmd [2] == -1 )
        return ( -1 );

      TF_inserir_cadeia( cmd, sizeof( cmd ), *p_pos );
      *p_pos += sizeof( cmd );

      TF_substituir_campo( cmd[ 2 ], p_pos );

      cmd[ 1 ] = (BYTE) TF_CMD_CAMPO_FIM;
      cmd[ 2 ] = (BYTE) -1;
      break;

    case 'H': // fio horizontal
      cmd[ 1 ] = (BYTE) TF_CMD_FIOH;
      goto fio_comum;

    case 'V': // fio vertical
      cmd[ 1 ] = (BYTE) TF_CMD_FIOV;
      goto fio_comum;

fio_comum:
      tipo_fio = texto[0];
      texto += 2;
      tam_texto -=2;

      cmd[ 2 ] = (BYTE) TF_ler_fio( texto, tam_texto, tipo_fio );
      break;
  }

  TF_inserir_cadeia( cmd, sizeof( cmd ), *p_pos );

  *p_pos += sizeof( cmd );

  return ( tam_pedaco );
}

/*------------------------------------------------------------------------*/
static WORD TF_compilar_um_texto ( BYTE *texto, WORD tam_texto, WORD pos )
/* compila um texto no formato da estrutura de um TextField para as
*  estruturas internas do editor de texto, armazenando a partir da
*  posição pos.
*/
{
  short int tam_pedaco,
            tam_ret;

  while ( tam_texto > 0 )
  {
    // procurar um comando
    tam_pedaco = TF_strnchr( texto, tam_texto, sESC );

    if ( tam_pedaco == 0 )
      tam_ret = tam_texto;
    else
      tam_ret = tam_pedaco;

    tam_ret = TF_strnchr( texto, tam_ret, 0x0d );

    // retirar os caracteres 0x0d
    if ( tam_ret > 0 )
    {
      TF_inserir_cadeia( texto, tam_ret - 1, pos );

      pos += tam_ret - 1;
      tam_texto -= tam_ret;
      texto += tam_ret;

      continue;
    }

    if ( tam_pedaco == 0 )
    {
      // inserindo o final do texto
      TF_inserir_cadeia( texto, tam_texto, pos );

      return ( pos + tam_texto );
    }

    // copiar o pedaco do texto anterior ao comando
    if ( tam_pedaco > 1 )
    {
      tam_pedaco--;

      TF_inserir_cadeia( texto, tam_pedaco, pos );

      pos += tam_pedaco;
      tam_texto -= tam_pedaco;
      texto += tam_pedaco;
    }

    // analisar o comando, convertendo-o
    tam_pedaco = TF_ler_comando( texto, tam_texto, &pos );
    if ( LeArq == TRUE && tam_pedaco == -1 )
      return ( -1 );

    // pular o comando
    tam_texto -= tam_pedaco;
    texto += tam_pedaco;
  }

  return ( pos );
}

/*------------------------------------------------------------------------*/
#pragma argsused
BOOL TF_inicializar_formatador ( HWND hwnd, TEXTFIELD *textfield )
/* iniciar a formatação do texto
*/
{
  struct TF_tab_fonte  ft = {{0}};  // fonte default do Text Field
  short int  i, j;
  char buf [100];

//  if (LARGURA_TAB == 0)
  LARGURA_TAB = gUMA_POLEGADA / 2;

  // liberar áreas anteriores
  TF_liberar_areas_formatador();

  // alocar novas áreas iniciais
  if (TF_aumentar_tabela_de_fontes() == FALSE)  return FALSE;
  if (TF_aumentar_tabela_de_campos() == FALSE)  return FALSE;
  if (TF_aumentar_tabela_de_logos()  == FALSE)  return FALSE;
  if (TF_aumentar_tabela_de_fios()   == FALSE)  return FALSE;
  if (TF_aumentar_buffer_de_texto()  == FALSE)  return FALSE;

  TF_atual = * textfield;

  fRespeitarDimLogo = (TF_atual.obj.Opcoes & OPC_OBJ_TXT_LOGO) == OPC_OBJ_TXT_LOGO;

  // espacejamento entre linhas   Susana   maio/96
  switch ( TF_atual.EspLin )
  {
    case ( TF_ESP_SIMPLES ):
      esp_lin_fator = 1;
      break;

    case ( TF_ESP_DUPLO ):
      esp_lin_fator = 2;
      break;

    case ( TF_ESP_MULT ):
      esp_lin_fator = TF_atual.AtEspLin;
      break;

    case ( TF_ESP_EXATO ):
      esp_lin_fator = 0;
      fRespeitarDimLogo = FALSE;
      break;
  }

  bmpCopo0   = LoadBitmap(inst_atual, "COPOBMP0");
  bmpCopo90  = LoadBitmap(inst_atual, "COPOBMP90");
  bmpCopo180 = LoadBitmap(inst_atual, "COPOBMP180");
  bmpCopo270 = LoadBitmap(inst_atual, "COPOBMP270");

  hwnd_text = hwnd;

  if ( hwnd_text != NULL )
  {
    hdc_text = GetDC( hwnd_text );

    // se está editando um text field, forçar a orientação normal
    TF_atual.obj.Orientacao = OO_NORMAL;

    SetTextAlign(hdc_text, TA_BASELINE);
  }

  apresentar_espere();

  TF_criar_dc_da_impressora();

  // 21/02/2000 nao verifica fwfonts se for driver windows
  if ( LeArq == TRUE && gDriverWindows == FALSE )
  {
    if ( FonteAcharIndice ( TF_atual.fonte.Fnome ) == -1 )
    {
      if ( senhaOper == FALSE )
      {
        BOOL resp;

        resp = trocaFonteTextfield (NULL, &(textfield->fonte) );
        if ( resp == FALSE )
        {
          FonteDestravar();
          return (FALSE);
        }
        else
        {
          strcpy ( TF_atual.fonte.Fnome, textfield->fonte.Fnome );
          TF_atual.fonte.Fcpi = textfield->fonte.Fcpi;
        }
      }
      else
      { // no Printing Module aborta a execucao
        j = strlen(buf);
        while ( j>0 && buf[j] != '\n' )
          j--;
        buf[j] = 0x00;
        erro_msgtxt ( buf, strload(IDS_MSG_ERRO+ 108), hwnd );
        return (FALSE);
      }
    }
  }

  // inicializar a fonte default do Text Field ( obs: fonte 0 )
  ft.f = TF_atual.fonte;

  TF_criar_fonte( &ft );

  // compilar texto inicial
  if ( TF_atual.Text != NULL )
  {
    BYTE * texto;

    if ( (texto = (BYTE *)GlobalLock( TF_atual.Text )) == NULL )
    {
      apagar_espere();
      erro_mens ( 67, NULL ); // out of memory
      return(FALSE);          // ??? mensagem de erro?
    }

    i = TF_compilar_um_texto( texto, TF_atual.Tatual, TF_buf_tatual );
    if (LeArq == TRUE && i == -1)
    {
      GlobalUnlock( TF_atual.Text );
      return ( FALSE );
    }

    GlobalUnlock( TF_atual.Text );
  }

  TF_ptexto = 0;

  TFED_iniciar_tratamento_marcacao_bloco();
  TFED_iniciar_tratamento_undo();

  apagar_espere();

  return (TRUE);
}

/*------------------------------------------------------------------------*/
#pragma argsused
TEXTFIELD * TF_finalizar_formatador ( BOOL salvar )
/* finalizar a operação de formatação do texto
*/
{
  TFED_terminar_tratamento_undo();

  if (bmpCopo0 != NULL)
  {
    DeleteObject(bmpCopo0);
    bmpCopo0 = NULL;
  }
  if (bmpCopo90 != NULL)
  {
    DeleteObject(bmpCopo90);
    bmpCopo90 = NULL;
  }
  if (bmpCopo180 != NULL)
  {
    DeleteObject(bmpCopo180);
    bmpCopo180 = NULL;
  }
  if (bmpCopo270 != NULL)
  {
    DeleteObject(bmpCopo270);
    bmpCopo270 = NULL;
  }

  if ( salvar == TRUE )
    TF_restaurar_um_texto( 0, TF_buf_tatual );
  else
  {
    TF_atual.Text   = NULL;
    TF_atual.Tatual =
    TF_atual.Tmax   = 0;
  }

  if ( hwnd_text != NULL )
  {
//    SelectFont( hdc_text, GetStockObject( SYSTEM_FONT ) );

    ReleaseDC( hwnd_text, hdc_text );

    hdc_text = NULL;
    hwnd_text = NULL;
  }

  TF_liberar_dc_da_impressora();
  TF_liberar_areas_formatador();

  return ( &TF_atual );
}

/*------------------------------------------------------------------------*/
static WORD TF_largura_do_tab ( WORD marg_atu )
/* determinar o tamanho de um tab
*/
{
  return (((marg_atu + LARGURA_TAB) / LARGURA_TAB)
                    * LARGURA_TAB - marg_atu);
}

/*------------------------------------------------------------------------*/
static WORD TF_largura_da_palavra ( HDC hdc, BYTE * pal, short int tam_pal, WORD *altura, short int ft )
/* determinar o tamanho de uma palavra
*/
{
//
//  ALTERADA SYLA 25/10/96
//
  SIZE       tam;
  short int *tl;
  WORD       larg;
  short int  i;

  if ( ft >= 0 )
  {
    GetTextExtentPoint( hdc_impr, pal, tam_pal, (SIZE *)&tam );

    if (gDriverWindows == TRUE)
    {
      tl = TF_ptr_tab_fonte[ ft ].tab_larg;
      larg = 0;
      for ( i=0; i<tam_pal; i++ )
        larg += tl[ (WORD) pal[i]];
      tam.cx = larg;
    }
    else
    if ( TF_ptr_tab_fonte[ ft ].f.Fcpi != 0 )
      tam.cx = (gUMA_POLEGADA / TF_ptr_tab_fonte[ ft ].f.Fcpi) * tam_pal;
    else
//    if ( UMA_POLEGADA == 240 )    // retirado SYLA em 21/05/98 ????
    {
      tl = TF_ptr_tab_fonte[ ft ].tab_larg;
      larg = 0;
      for ( i=0; i<tam_pal; i++ )
        larg += tl[ (WORD) pal[i]];
      tam.cx = larg;
    }
  }
  else
    GetTextExtentPoint( hdc, pal, tam_pal, (SIZE *)&tam );

  if (TF_ptr_tab_fonte[ft].Fsobre || TF_ptr_tab_fonte[ft].Fsub)
  {
    tam.cy  = (tam.cy * 3) / 2;
  }

  *altura = tam.cy;

  return ( tam.cx );
}
/*------------------------------------------------------------------------*/
static WORD TF_largura_branco ( HDC hdc, WORD *altura, short int ft )
/* determinar o tamanho de um branco
*/
{
  //
  //  ALTERADA SYLA 25/10/96
  //
  SIZE  tam;

  if ( ft >= 0 )
  {
    GetTextExtentPoint( hdc_impr, " ", 1,(SIZE *)&tam );

    if (gDriverWindows == FALSE)
    {
      if ( TF_ptr_tab_fonte[ ft ].f.Fcpi != 0 )
        tam.cx = (gUMA_POLEGADA / TF_ptr_tab_fonte[ ft ].f.Fcpi);
    }
  }
  else  GetTextExtentPoint( hdc, " ", 1, (SIZE *)&tam );

  *altura = tam.cy;

  return ( tam.cx );
}

/*------------------------------------------------------------------------*/
static void TF_formatar_linha ( struct TF_linha *ptr_linha )
/* formatar uma nova linha do texto
*
* Obs: ptr_linha representa o status da composição para o início da linha.
*      Quando esta função retorna, ptr_linha representa o status do
*      início da linha seguinte.
*/
{
  WORD      salva_pos, maior_cp, larg_pal, larg_tab, larg_br = 0, ind;
  short int tam_pal;

  unsigned short int delta;

  BYTE  *palavra, car;

  struct TF_linha linha;

  BOOL  trocar_fonte = TRUE,
        tem_texto = FALSE;

  TEXTMETRIC tm;
  HFONT      hft_impr_ant = SelectFont( hdc_impr, GetStockObject( SYSTEM_FONT ) );

  int alt = 0;
  int larg = 0;


  ptr_linha->num_br = 0;
  ptr_linha->esp_br = 0;
  ptr_linha->baseline = 0;
  ptr_linha->descent = 0;
  ptr_linha->flag_tab = FALSE;
  ptr_linha->tem_texto = FALSE;

  ptr_linha->larg_lin = TF_atual.obj.TamHor;

  delta = (TF_atual.Espessura + TF_atual.Sombra) * 2;

  if (TF_atual.Moldurado && (delta < ptr_linha->larg_lin))
    ptr_linha->larg_lin -= delta;

  ptr_linha->larg_max_lin = ptr_linha->larg_lin;

  ptr_linha->maior_cp = 0;

  ptr_linha->tipo_qb = TF_QB_NENHUMA;

  salva_pos = ptr_linha->posi;

  linha = *ptr_linha;

  linha.num_br_fim = 0;
  linha.esp_br_fim = 0;
  linha.tem_texto = FALSE;

  maior_cp = 0;

  // compondo...
loop:
  tam_pal = 0;

  while ( linha.posi < TF_buf_tatual )
  {
    car = TF_buffer_texto[ linha.posi ];

    switch ( car )
    {
      case sBRANCO:
        if ( linha.flag_lg == TRUE ) break;
      case sTAB:
      case sESC:
      case sRETURN:
        goto tratar_cmd;
    }

    if ( tam_pal == 0 )
      palavra = &TF_buffer_texto[ linha.posi ];

    tam_pal++;
    linha.posi++;
  }
  car = 0;  // fim do texto

tratar_cmd: // tratando um comando
  // verificar se a última palavra cabe na linha
  if ( tam_pal > 0 )
  {
    if ( trocar_fonte == TRUE )
    {
      trocar_fonte = FALSE;

      if ( linha.flag_lg == TRUE )
      { // LOGOTIPO
//        tm.tmDescent = alt / 3;
//        tm.tmAscent = alt - ( alt / 3 );
        tm.tmDescent = 0;
        tm.tmAscent = 0;
      }
      else
      {
        SelectFont( hdc_impr, TF_ptr_tab_fonte[ linha.ft_atual ].hft );
        GetTextMetrics( hdc_impr, &tm );

        if (TF_ptr_tab_fonte[linha.ft_atual].Fsobre ||
            TF_ptr_tab_fonte[linha.ft_atual].Fsub)
        {
          tm.tmAscent  = (tm.tmAscent * 3) / 2;
          tm.tmDescent = (tm.tmDescent * 3) / 2;
        }
      }

      if ( linha.baseline < tm.tmAscent )
        linha.baseline = tm.tmAscent;

      if ( linha.descent < tm.tmDescent )
        linha.descent = tm.tmDescent;
    }

    if ( linha.flag_lg == TRUE )
      larg_pal = larg;
    else
      larg_pal = TF_largura_da_palavra((HDC) hdc_impr, palavra, tam_pal,
                  &maior_cp, linha.ft_atual );

    if ( linha.larg_lin < linha.esp_br + larg_pal )
    {
      // estourou a linha, a palavra não cabe
      if ( ptr_linha->posi == salva_pos )
      {
        // a palavra ocupou toda a linha, então truncá-la
        while ( tam_pal > 0 )  // Alterado erro se largura=1 Susana 5/7/96 (era > 1)
        {
          if ( tam_pal == 1  ||  linha.larg_lin >= larg_pal )
          {
            if ( linha.maior_cp < maior_cp )
              linha.maior_cp = maior_cp;

            linha.tipo_qb = TF_QB_WORDWRAP;

            if ( linha.larg_lin > larg_pal )
              linha.larg_lin -= larg_pal;
            else
              linha.larg_lin = 0;

            linha.tem_texto = TRUE;
            *ptr_linha = linha;

            goto fim;
          }

          tam_pal--;
          linha.posi--;

          larg_pal = TF_largura_da_palavra( hdc_impr, palavra,
                  tam_pal, &maior_cp, linha.ft_atual );
        }
      }
      ptr_linha->num_br -= linha.num_br_fim;
      ptr_linha->esp_br -= linha.esp_br_fim;

      ptr_linha->tipo_qb = TF_QB_WORDWRAP;

      goto fim;
    }

    tem_texto = TRUE;

    if ( linha.maior_cp < maior_cp )
      linha.maior_cp = maior_cp;

    linha.num_br_fim = 0;
    linha.esp_br_fim = 0;
    linha.larg_lin -= larg_pal;
    linha.tem_texto = TRUE;

    *ptr_linha = linha;
  }

  switch ( car )
  {
    case sESC:
      linha.posi += TF_TAM_CMD;

      switch ( TF_buffer_texto[ linha.posi - TF_TAM_CMD + 1 ] )
      {
        case TF_CMD_INVALIDO:
          break;

        case TF_CMD_CAMPO_FIM:
          linha.flag_cp = FALSE;

          if ( linha.ft_atual != linha.ft_def )
          {
            trocar_fonte = TRUE;
            linha.ft_atual = linha.ft_def;
          }

          *ptr_linha = linha;
          break;

        case TF_CMD_LOGO_FIM:
          linha.flag_lg = FALSE;

          *ptr_linha = linha;
          break;

        case TF_CMD_FONTE:
          if ( linha.ft_atual != TF_buffer_texto[ linha.posi
                            - TF_TAM_CMD + 2 ] )
          {
            trocar_fonte = TRUE;
            linha.ft_def =
            linha.ft_atual = TF_buffer_texto[ linha.posi
                            - TF_TAM_CMD + 2 ];
          }
          break;

        case TF_CMD_LOGO_INI:
          // ?????????????????????????????????
          alt = TF_ptr_logo[ TF_buffer_texto[linha.posi-TF_TAM_CMD+2]].altura;
          larg = TF_ptr_logo[ TF_buffer_texto[linha.posi-TF_TAM_CMD+2]].largura;

          if (flag_previa_real && fRespeitarDimLogo &&
                TF_ptr_logo[TF_buffer_texto[linha.posi-TF_TAM_CMD+2]].expType == 0)
          {
            char * bmp;
            enum result_expr resp;

            resp = CalculaExpr( TF_ptr_logo[ TF_buffer_texto[linha.posi-TF_TAM_CMD+2] ].expressao, &bmp );
            if ( resp != RE_ERRO && resp != RE_FALSE_SEM_VALOR )
            {
              int res = (TF_ptr_logo[ TF_buffer_texto[linha.posi-TF_TAM_CMD+2] ].resolucao == 0)
                          ? gDpiImagem
                          : TF_ptr_logo[ TF_buffer_texto[linha.posi-TF_TAM_CMD+2] ].resolucao;

              bmp = (char *)RedefinirPastaRecursoImagem(bmp);
              VerDimensoesImagem(&larg, &alt, bmp, gUMA_POLEGADA, res);
            }
          }
          maior_cp = alt;

          if ( linha.maior_cp < maior_cp )
            linha.maior_cp = maior_cp;
          linha.flag_lg = TRUE;
          trocar_fonte = TRUE;
          break;

        case TF_CMD_CAMPO_INI:
          linha.flag_cp = TRUE;

          if ( linha.ft_atual != TF_ptr_campo_saida[ TF_buffer_texto[
                  linha.posi - TF_TAM_CMD + 2 ] ].fonte )
          {
            trocar_fonte = TRUE;
            linha.ft_atual = TF_ptr_campo_saida[ TF_buffer_texto[
                  linha.posi - TF_TAM_CMD + 2 ] ].fonte;
          }
          break;

        case TF_CMD_FIOH:
          ind = TF_buffer_texto[linha.posi - TF_TAM_CMD + 2 ];
          larg_pal = TF_ptr_fio[ind].larg_alt;

          if ( linha.baseline < TF_ptr_fio[ind].espessura )
          {
            linha.baseline = TF_ptr_fio[ind].espessura;
            if (linha.maior_cp < linha.baseline + linha.descent)
              linha.maior_cp = linha.baseline + linha.descent;
          }
          goto fio_comum;

        case TF_CMD_FIOV:
          ind = TF_buffer_texto[linha.posi - TF_TAM_CMD + 2 ];
          larg_pal = TF_ptr_fio[ind].espessura;

          if ( linha.descent < TF_ptr_fio[ind].larg_alt )
          {
            linha.descent = TF_ptr_fio[ind].larg_alt;
            if (linha.maior_cp < linha.baseline + linha.descent)
              linha.maior_cp = linha.baseline + linha.descent;
          }
          goto fio_comum;
fio_comum:
          if ( linha.larg_lin < linha.esp_br + larg_pal )
          {
            // estourou a linha, o fio não cabe
            if ( ptr_linha->posi == salva_pos )
            {
              // o fio ocupou toda a linha, então truncá-lo
              linha.tipo_qb = TF_QB_WORDWRAP;
              linha.larg_lin = 0;

              *ptr_linha = linha;
              goto fim;
            }

            ptr_linha->num_br -= linha.num_br_fim;
            ptr_linha->esp_br -= linha.esp_br_fim;
            ptr_linha->tipo_qb = TF_QB_WORDWRAP;

            goto fim;
          }

          linha.num_br_fim = 0;
          linha.esp_br_fim = 0;
          linha.larg_lin -= larg_pal;
          linha.tem_texto = TRUE;
          tem_texto = TRUE;

          *ptr_linha = linha;
          break;
      }
      break;

    case sRETURN:
      linha.num_br -= linha.num_br_fim;
      linha.esp_br -= linha.esp_br_fim;
      linha.tipo_qb = TF_QB_RETURN;
      linha.posi++;
      *ptr_linha = linha;

      goto fim;

    case sTAB:
      larg_tab = TF_largura_do_tab( linha.larg_max_lin - linha.larg_lin );
      linha.posi++;

      // se estourou a linha com o tab, fechar a linha sem contar o tab
      if ( linha.larg_lin < larg_tab + linha.esp_br )
      {
        linha.tipo_qb = TF_QB_WORDWRAP;
        *ptr_linha = linha;
        goto fim;
      }

      linha.num_br_fim = 0;
      linha.esp_br_fim = 0;
      linha.larg_lin -= larg_tab;

      if (tem_texto == TRUE)
        linha.flag_tab = TRUE;

      *ptr_linha = linha;

      break;

    case sBRANCO:
      if ( trocar_fonte == TRUE )
      {
        trocar_fonte = FALSE;
        SelectFont( hdc_impr, TF_ptr_tab_fonte[ linha.ft_atual ].hft );
        GetTextMetrics( hdc_impr, &tm );
        if (TF_ptr_tab_fonte[linha.ft_atual].Fsobre ||
           TF_ptr_tab_fonte[linha.ft_atual].Fsub)
        {
          tm.tmAscent  = (tm.tmAscent * 3) / 2;
          tm.tmDescent = (tm.tmDescent * 3) / 2;
        }

        if ( linha.baseline < tm.tmAscent )
          linha.baseline = tm.tmAscent;

        if ( linha.descent < tm.tmDescent )
          linha.descent = tm.tmDescent;
      }

      larg_br = TF_largura_branco( hdc_impr, &maior_cp, linha.ft_atual );

      if ( linha.maior_cp < maior_cp )
        linha.maior_cp = maior_cp;

      if ( tem_texto == TRUE )
      {
        // cabendo ou não o branco, incorporá-lo
        linha.num_br++;
        linha.esp_br += larg_br;
        linha.num_br_fim++;
        linha.esp_br_fim += larg_br;

        linha.posi++;

        *ptr_linha = linha;

        if ( linha.larg_lin < linha.esp_br )
        {
          // estourou a linha com o branco, descontá-lo
//          ptr_linha->num_br--;
//          ptr_linha->esp_br -= larg_br;
          ptr_linha->num_br -= linha.num_br_fim;
          ptr_linha->esp_br -= linha.esp_br_fim;
          ptr_linha->tipo_qb = TF_QB_WORDWRAP;
          goto fim;
        }
      }
      else
      {
        linha.posi++;

        if ( linha.larg_lin < larg_br )
        {
          *ptr_linha = linha;

          // estourou a linha com o branco
          ptr_linha->tipo_qb = TF_QB_WORDWRAP;
          goto fim;
        }

        linha.larg_lin -= larg_br;

        *ptr_linha = linha;
      }

      break;

    case 0:
    default:
      goto fim;   // fim do texto
  }
  goto loop;

fim:
  // se ao formatar, a altura da linha continuar com zero,
  // selecionar a fonte corrente para saber a altura da mesma.
  if ( ptr_linha->maior_cp == 0 || ptr_linha->baseline == 0)
  {
    SelectFont( hdc_impr, TF_ptr_tab_fonte[ ptr_linha->ft_atual ].hft );
    GetTextMetrics( hdc_impr, &tm );
    if (TF_ptr_tab_fonte[ptr_linha->ft_atual].Fsobre ||
       TF_ptr_tab_fonte[ptr_linha->ft_atual].Fsub)
    {
      tm.tmAscent  = (tm.tmAscent * 3) / 2;
      tm.tmDescent = (tm.tmDescent * 3) / 2;
    }

    if ( ptr_linha->baseline < tm.tmAscent )
      ptr_linha->baseline = tm.tmAscent;

    if ( ptr_linha->descent < tm.tmDescent )
      ptr_linha->descent = tm.tmDescent;

    TF_largura_branco( hdc_impr, &maior_cp, ptr_linha->ft_atual );

    if (ptr_linha->maior_cp < maior_cp)
      ptr_linha->maior_cp = maior_cp;
  }

  // espacejamento entre linhas   Susana   maio/96
  if ( esp_lin_fator == 0 )
    ptr_linha->maior_cp = TF_atual.AtEspLin;
  else
    ptr_linha->maior_cp *= esp_lin_fator;

  SelectFont( hdc_impr, hft_impr_ant );
}

/*------------------------------------------------------------------------*/
static void TF_formatar_texto_parcial ( short int lin_ini, short int num_lin )
/* formatar algumas linhas do Text Field corrente
*
* Parâmetros:
*   lin_ini - linha inicial
*   num_lin - número de linhas a serem formatadas
*
* Obs: se o número de linhas não for suficiente para atingir a posição
*       TF_ptexto, será formatado mais linhas.
*/
{
  struct TF_linha linha,
                * ptr_linha;

  if ( (TF_tab_linha_tatual = lin_ini) == 0 )
  {
    // iniciar primeira linha
    linha.posi = 0;         // posição inicial
    linha.prof = 0;         // profundidade da linha

    linha.ft_def =          // fonte default
    linha.ft_atual = 0;     // fonte do inicio da linha

    linha.flag_cp = FALSE;  // flag de texto dentro de campo de saida
    linha.flag_lg = FALSE;  // flag de logo
    linha.flag_tab = FALSE; // flag de tab na linha
    linha.tem_texto = FALSE;
  }
  else
    linha = TF_tab_linha[ TF_tab_linha_tatual ];

mais_uma_linha:

  do
  {
    if ( TF_tab_linha_tatual >= TF_tab_linha_tmax )
      TF_aumentar_tabela_de_linhas();

    TF_tab_linha[ TF_tab_linha_tatual ] = linha;

    TF_formatar_linha( &linha );

    ptr_linha = &TF_tab_linha[ TF_tab_linha_tatual ];

    ptr_linha->num_br = linha.num_br;       // número de brancos
    ptr_linha->esp_br = linha.esp_br;       // espaço total de brancos
    ptr_linha->larg_lin = linha.larg_lin;   // largura da linha
    ptr_linha->maior_cp = linha.maior_cp;   // maior corpo da linha
    ptr_linha->tipo_qb = linha.tipo_qb;     // tipo da quebra
    ptr_linha->baseline = linha.baseline;   // linha de base
    ptr_linha->descent = linha.descent;     // descendente
    ptr_linha->flag_tab = linha.flag_tab;
    ptr_linha->tem_texto = linha.tem_texto;

    linha.prof += linha.maior_cp;   // avançar a profundidade

    ++TF_tab_linha_tatual;
  }
  while ( --num_lin > 0  &&  linha.tipo_qb != TF_QB_NENHUMA );

  if ( linha.tipo_qb != TF_QB_NENHUMA  &&  linha.posi <= TF_ptexto )
  {
    num_lin = 1;

    goto mais_uma_linha;
  }

  if ( TF_tab_linha_tatual >= TF_tab_linha_tmax )
    TF_aumentar_tabela_de_linhas();

  TF_tab_linha[ TF_tab_linha_tatual ] = linha;  // linha final
}

/*------------------------------------------------------------------------*/
static BOOL TFED_composicao_pendente = FALSE;

/*------------------------------------------------------------------------*/
void TF_formatar_texto ( void )
/* formatar o texto do Text Field corrente
*/
{
  apresentar_espere();

  TF_formatar_texto_parcial( 0, NUM_MAX_LINHAS );

  TFED_composicao_pendente = FALSE;

  apagar_espere();
}
/*------------------------------------------------------------------------*/
static WORD TFED_achar_linha ( WORD pos )
/* determinar a linha onde está a posição especificada
*/
{
  WORD  lin;
  struct TF_linha *ptr_linha;

  ptr_linha = &TF_tab_linha[ 0 ];

  // localizar a linha em que está a posição de texto desejada
  for ( lin = 0; lin < TF_tab_linha_tatual; lin++, ptr_linha++ )
  {
    if ( ptr_linha->posi > pos )
      break;

    if ( ptr_linha->tipo_qb == TF_QB_NENHUMA )
      return( lin );
  }

  return ( lin - 1 );
}

/*------------------------------------------------------------------------*/
static void TFED_atualizar_tela_parcial ( short int lin, short int num_lin )
/* atualizar num_lin linhas da tela, a partir da linha lin
*
* Obs: se a linha do TF_ptexto não tiver sido atualizada, novas linhas
*       o serão até que o mesmo apareça na tela.
*/
{
  RECT  ret;
  POINT pt;
  LONG  l;

  GetClientRect( hwnd_text, &ret );

  l = SendMessage( hwnd_text, SM_GETSCROLLPOS, 0, 0L );

  pt.x = 0;
  pt.y = TF_tab_linha[ lin ].prof - HIWORD( l );

  LPtoDP( hdc_text, &pt, 1 );

  if ( pt.y > 0 )
    ret.top = pt.y;

mais_uma_linha:
  lin += num_lin;

  if ( lin > TF_tab_linha_tatual )
    lin = TF_tab_linha_tatual;
  else
  {
    num_lin = 1;

    if ( TF_tab_linha[ lin + 1 ].posi <= TF_ptexto )
      goto mais_uma_linha;
  }

  pt.y = TF_tab_linha[ lin ].prof - HIWORD( l );

  LPtoDP( hdc_text, &pt, 1 );

  if ( pt.y < ret.bottom )
    ret.bottom = pt.y;

  InflateRect( &ret, 2, 2 );

  InvalidateRect( hwnd_text, &ret, TRUE );

  UpdateWindow( hwnd_text );
}

/*------------------------------------------------------------------------*/
void TFED_verificar_composicao_pend ( void )
/* verificar se existe texto pendente de composição
*/
{
  WORD  lin;
  RECT  ret;

  if ( TFED_composicao_pendente == TRUE )
  {
    apresentar_espere();

    TFED_composicao_pendente = FALSE;

    // atualizar a tela antes de executar o movimento de cursor
    lin = TF_tab_linha_tatual;

    if ( lin > 0 )
      lin--;

    TF_formatar_texto_parcial( lin, NUM_MAX_LINHAS );

    GetClientRect( hwnd_text, &ret );

    FORWARD_WM_SIZE( hwnd_text, 0, ret.right, ret.bottom, SendMessage );

    InvalidateRect( hwnd_text, &ret, TRUE );
    UpdateWindow( hwnd_text );

    TFED_navegar_texto( 0 );

    apagar_espere();
  }
}

/*------------------------------------------------------------------------*/
void TFED_alterar_alinhamento ( enum tp_alin alin )
/* alterar o alinhamento do texto durante a edição
*/
{
  if ( hwnd_text != NULL  &&  alin != TF_atual.Just )
  {
    TF_atual.Just = alin;

    TFED_composicao_pendente = TRUE;

    TF_tab_linha_tatual = 0;

    TFED_marcar_tempo_idle( GetTickCount() );
  }
}

/*------------------------------------------------------------------------*/
void TFED_alterar_largura ( unsigned short int larg )
/* alterar a largura do texto durante a edição
*/
{
  if ( hwnd_text != NULL  &&  larg != TF_atual.obj.TamHor )
  {
    TF_atual.obj.TamHor = larg;

    TFED_composicao_pendente = TRUE;

    TF_tab_linha_tatual = 0;

    TFED_marcar_tempo_idle( GetTickCount() );
  }
}

/*------------------------------------------------------------------------*/
void TFED_alterar_altura ( unsigned short int alt )
/* alterar a altura do texto durante a edição
*/
{
  if ( hwnd_text != NULL  &&  alt != TF_atual.obj.TamVer )
  {
    RECT  ret;

    TF_atual.obj.TamVer = alt;

    GetClientRect( hwnd_text, &ret );
    InvalidateRect( hwnd_text, &ret, TRUE );
  }
}

/*------------------------------------------------------------------------*/
void TFED_alterar_moldura ( BOOL mold, unsigned short int esp, unsigned short int somb )
{
  if ( hwnd_text != NULL  &&
     (mold != TF_atual.Moldurado  ||
      esp  != TF_atual.Espessura  || somb != TF_atual.Sombra) )
  {
    TF_atual.Moldurado = mold;
    TF_atual.Espessura = esp;
    TF_atual.Sombra = somb;

    TFED_composicao_pendente = TRUE;
    TF_tab_linha_tatual = 0;

    TFED_marcar_tempo_idle( GetTickCount() );
  }
}

/*------------------------------------------------------------------------*/
void TFED_alterar_fonte ( char *nome, unsigned short int corpo, BOOL sub,
                  BOOL exp, BOOL ita, BOOL stk, short int bold,
                  COLORREF color )
/* alterar a fonte default do texto durante a edição
*/
{
  BOOL mudou = FALSE;

  // alterado em 21/02/97 ignora case sensitive no nome da fonte
  if ( hwnd_text != NULL )
  {
    if ( (gDriverWindows == FALSE)  &&
       (TF_ptr_tab_fonte[0].f.Fcpi  != corpo  ||
        TF_ptr_tab_fonte[0].f.Fexp  != exp    ||
        TF_ptr_tab_fonte[0].f.Fund  != sub    ||
        TF_ptr_tab_fonte[0].f.color != color  ||
        strnicmp( TF_ptr_tab_fonte[0].f.Fnome, nome,
              sizeof( TF_ptr_tab_fonte[0].f.Fnome ) ) != 0 ) )
    {
      TF_ptr_tab_fonte[0].f.Fcpi = corpo;
      TF_ptr_tab_fonte[0].f.Fexp = exp;
      TF_ptr_tab_fonte[0].f.Fund = sub;
      TF_ptr_tab_fonte[0].f.color= color;
      strcpy( TF_ptr_tab_fonte[0].f.Fnome, nome );

      FonteCompatibilizarComWindows( &TF_ptr_tab_fonte[0].f );
      mudou = TRUE;
    }
    else
    if ( (gDriverWindows == TRUE)  &&
       (TF_ptr_tab_fonte[0].f.corpo != corpo  ||
        TF_ptr_tab_fonte[0].f.Fund  != sub    ||
        TF_ptr_tab_fonte[0].f.Fita  != ita    ||
        TF_ptr_tab_fonte[0].f.Fstk  != stk    ||
        TF_ptr_tab_fonte[0].f.Fbold != bold   ||
        TF_ptr_tab_fonte[0].f.color != color  ||
        strnicmp( TF_ptr_tab_fonte[0].f.FnomeW, nome,
              sizeof( TF_ptr_tab_fonte[0].f.FnomeW ) ) != 0 ) )
    {
      TF_ptr_tab_fonte[0].f.corpo = corpo;
      TF_ptr_tab_fonte[0].f.color = color;
      TF_ptr_tab_fonte[0].f.Fund  = sub;
      TF_ptr_tab_fonte[0].f.Fita  = ita;
      TF_ptr_tab_fonte[0].f.Fstk  = stk;
      TF_ptr_tab_fonte[0].f.Fbold = bold;

      strcpy( TF_ptr_tab_fonte[0].f.FnomeW, nome );

      FonteCompatibilizarComFWFONTS( &TF_ptr_tab_fonte[0].f );
      mudou = TRUE;
    }

    TF_ptr_tab_fonte[0].Fsobre = FALSE;
    TF_ptr_tab_fonte[0].Fsub = FALSE;

    if ( mudou )
    {
      if ( TF_ptr_tab_fonte[0].hft != NULL )
        DeleteFont( TF_ptr_tab_fonte[0].hft );
      if ( TF_ptr_tab_fonte[0].hft_vid != NULL )
        DeleteFont( TF_ptr_tab_fonte[0].hft_vid );

      TF_criar_fonte_impressora( 0 );

      TFED_composicao_pendente = TRUE;
      TF_tab_linha_tatual = 0;

      TFED_marcar_tempo_idle( GetTickCount() );
    }
  }
}

/*------------------------------------------------------------------------*/
static void TFED_inserir_caractere_aux ( BYTE car, BOOL com_undo )
/* inserir um caracter na posição corrente do texto
*/
{
  WORD  lin;
  WORD  posi, posf;

  struct Undo undo = { 0 };


  if ( TFED_ler_pos_bloco( &posi, &posf ) == TRUE )
  {
    if ( com_undo == TRUE )
    {
      TF_restaurar_um_texto( posi, posf );

      undo.pos      = posi;
      undo.htxt1    = TF_atual.Text;
      undo.tatual1  = posf - posi;
    }

    TFED_apagar_bloco();
  }
  else
    undo.pos = TF_ptexto;

  if ( com_undo )
  {
    undo.ope = TF_OPE_INSERIR;
    undo.car = car;

    TFED_guardar_undo( &undo );
  }

  lin = TFED_achar_linha( TF_ptexto );

  TF_inserir_cadeia( &car, 1, TF_ptexto );

  TF_ptexto++;

// Substitui o código seguinte p/ refazer as linhas desde a anterior Susana 5/7/96
//  if ( lin > 0  &&  (car == sBRANCO  ||  car == sRETURN) )

  if ( lin > 0 )
    lin--;

  TF_formatar_texto_parcial( lin, NUM_ATU_LINHAS /*3*/ );
  TFED_atualizar_tela_parcial( lin, NUM_ATU_LINHAS /*3*/ );

  TFED_composicao_pendente = TRUE;
}

/*------------------------------------------------------------------------*/
void TFED_inserir_caractere ( BYTE car )
/* inserir um caracter na posição corrente do texto
*/
{
  TFED_inserir_caractere_aux( car, TRUE );
}

/*------------------------------------------------------------------------*/
static WORD TFED_apagar_comando ( WORD pos )
/* apagar um comando do buffer de texto
*/
{
  WORD tam = 0, ft, cp;

  if ( TF_buffer_texto[ pos ] == sESC )
  {
    // apagar um comando
    switch ( TF_buffer_texto[ pos + 1 ] )
    {
      case TF_CMD_FONTE:
        tam = TF_TAM_CMD;
        ft = TF_buffer_texto[ pos + 2 ];

        if ( TF_ptr_tab_fonte[ ft ].contador > 1 )
          TF_ptr_tab_fonte[ ft ].contador--;
        else
        {
          DeleteFont( TF_ptr_tab_fonte[ ft ].hft );
          DeleteFont( TF_ptr_tab_fonte[ ft ].hft_vid );

          TF_ptr_tab_fonte[ ft ].hft = NULL;
          TF_ptr_tab_fonte[ ft ].hft_vid = NULL;
          TF_ptr_tab_fonte[ ft ].contador = 0;
        }

        break;

      case TF_CMD_CAMPO_INI:
        cp = TF_buffer_texto[ pos + 2 ];
        ft = TF_ptr_campo_saida[ cp ].fonte;

        TF_ptr_campo_saida[ cp ].em_uso = FALSE;

        // liberar referência da fonte
        if ( TF_ptr_tab_fonte[ ft ].contador > 1 )
          TF_ptr_tab_fonte[ ft ].contador--;
        else
        {
          DeleteFont( TF_ptr_tab_fonte[ ft ].hft );
          DeleteFont( TF_ptr_tab_fonte[ ft ].hft_vid );

          TF_ptr_tab_fonte[ ft ].hft = NULL;
          TF_ptr_tab_fonte[ ft ].hft_vid = NULL;
          TF_ptr_tab_fonte[ ft ].contador = 0;
        }

        tam = TF_TAM_CMD +
            TF_strnchr( &TF_buffer_texto[ pos + TF_TAM_CMD ],
                  TF_buf_tatual - pos - TF_TAM_CMD, sESC ) +
            TF_TAM_CMD - 1;
        break;

      case TF_CMD_LOGO_INI:
        cp = TF_buffer_texto[ pos + 2 ];

        if (TF_ptr_logo[ cp ].ptr_img != NULL)
        {
          IMG_LiberarImagem(TF_ptr_logo[ cp ].ptr_img);
          TF_ptr_logo[ cp ].ptr_img = NULL;
        }
        TF_ptr_logo[ cp ].em_uso = FALSE;

        tam = TF_TAM_CMD +
            TF_strnchr( &TF_buffer_texto[ pos + TF_TAM_CMD ],
                  TF_buf_tatual - pos - TF_TAM_CMD, sESC ) +
            TF_TAM_CMD - 1;
        break;

      case TF_CMD_FIOH:
      case TF_CMD_FIOV:
        cp = TF_buffer_texto[ pos + 2 ];

        TF_ptr_fio[ cp ].em_uso = FALSE;

        tam = TF_TAM_CMD;
        break;
    }
  }

  if ( tam > 0 )
    TF_apagar_cadeia( tam, pos );

  return ( tam );
}

/*------------------------------------------------------------------------*/
static BOOL TFED_apagar_caractere ( BOOL com_undo )
/* apagar um caracter na posição corrente do texto
*/
{
  if ( TF_ptexto < TF_buf_tatual )
  {
    struct Undo undo = { 0 };

    WORD lin = TFED_achar_linha( TF_ptexto );


    if ( TF_buffer_texto[ TF_ptexto ] == sESC )
    {
      if ( com_undo == TRUE )
      {
        TF_restaurar_um_texto( TF_ptexto, TF_ptexto + TF_TAM_CMD );

        undo.pos      = TF_ptexto;
        undo.htxt1    = TF_atual.Text;
        undo.tatual1  = TF_TAM_CMD;
        undo.ope      = TF_OPE_APAGAR;

        TFED_guardar_undo( &undo );
      }

      TFED_apagar_comando( TF_ptexto );
    }
    else
    {
      if ( com_undo == TRUE )
      {
        undo.pos  = TF_ptexto;
        undo.car  = TF_buffer_texto[ TF_ptexto ];
        undo.ope  = TF_OPE_APAGAR;

        TFED_guardar_undo( &undo );
      }

      TF_apagar_cadeia( 1, TF_ptexto );
    }

    if ( lin > 0 )
      lin--;

    TF_formatar_texto_parcial( lin, NUM_ATU_LINHAS /*3*/ );
    TFED_atualizar_tela_parcial( lin, NUM_ATU_LINHAS /*3*/ );

    TFED_composicao_pendente = TRUE;

    return ( TRUE );
  }

  return ( FALSE );
}

/*------------------------------------------------------------------------*/
void TFED_tratar_delete ( void )
/* tratar a tecla delete
*/
{
  struct Undo undo  = { 0 };

  WORD  posi, posf;

  if ( TFED_ler_pos_bloco( &posi, &posf ) == TRUE )
  {
    TF_restaurar_um_texto( posi, posf );

    undo.ope      = TF_OPE_TROCAR;
    undo.pos      = posi;
    undo.htxt1    = TF_atual.Text;
    undo.tatual1  = posf - posi;

    TFED_guardar_undo( &undo );

    TFED_apagar_bloco();
  }
  else
    TFED_apagar_caractere( TRUE );  // esta função faz o undo

  TFED_navegar_texto( 0 );
}

/*------------------------------------------------------------------------*/
BOOL TFED_tratar_back_space ( void )
/* tratar a tecla back space
*/
{
  struct Undo undo  = { 0 };

  WORD  posi, posf;

  if ( TFED_ler_pos_bloco( &posi, &posf ) == TRUE )
  {
    TF_restaurar_um_texto( posi, posf );

    undo.ope      = TF_OPE_TROCAR;
    undo.pos      = posi;
    undo.htxt1    = TF_atual.Text;
    undo.tatual1  = posf - posi;

    TFED_guardar_undo( &undo );

    TFED_apagar_bloco();
  }
  else
  {
    WORD  ptexto_old = TF_ptexto;

    if ( TFED_navegar_texto( VK_LEFT ) == FALSE || ptexto_old == TF_ptexto)
      return ( FALSE );   // está no inicio do texto
    if ( TFED_apagar_caractere( TRUE ) == FALSE )
      return ( FALSE );   // nao apagou nada
  }
  return ( TRUE );
}

/*------------------------------------------------------------------------*/
BOOL TFED_verifica_logo ( void )
{
  if ( TF_ptexto < TF_buf_tatual  &&
       TF_buffer_texto[ TF_ptexto ] == sESC &&
       TF_buffer_texto[ TF_ptexto+1 ] == TF_CMD_LOGO_INI )
       return ( TRUE );
  else return ( FALSE );
}
/*------------------------------------------------------------------------*/
BOOL TFED_verifica_fio ( void )
{
  if ( TF_ptexto < TF_buf_tatual  &&
       TF_buffer_texto[ TF_ptexto ] == sESC &&
     ( TF_buffer_texto[ TF_ptexto+1 ] == TF_CMD_FIOH ||
       TF_buffer_texto[ TF_ptexto+1 ] == TF_CMD_FIOV ))
       return ( TRUE );
  else return ( FALSE );
}

/*------------------------------------------------------------------------*/
// estado da composição na posição do cursor
static struct est_pos estado_cur;


/*------------------------------------------------------------------------*/
void TFED_comando_campo ( HWND hwnd )
{
  BYTE  buff[ 512 ];
  BOOL  editando_campo = FALSE;
  WORD  tam, lin;

  struct  TF_campo_saida  campo = { 0 };
  struct  TF_tab_fonte    fonte = { 0 };

  struct  Undo  undo  = { 0 };
  BYTE        * ptr;

  // SYLA 09/11/95 output field comeca com fonte atual
  fonte = TF_ptr_tab_fonte[ estado_cur.fonte ];

  if ( TF_ptexto < TF_buf_tatual  &&
       TF_buffer_texto[ TF_ptexto ] == sESC )
  {
    // cursor sobre um comando
    switch ( TF_buffer_texto[ TF_ptexto + 1 ] )
    {
      case TF_CMD_INVALIDO:
      case TF_CMD_CAMPO_FIM:
      case TF_CMD_LOGO_FIM:
        return;   // posição inválida do cursor

      case TF_CMD_FONTE:
      case TF_CMD_LOGO_INI:
      case TF_CMD_FIOH:
      case TF_CMD_FIOV:
        break;

      case TF_CMD_CAMPO_INI:
        editando_campo = TRUE;

        // ler as informações do campo atual
        campo = TF_ptr_campo_saida[
                  TF_buffer_texto[ TF_ptexto + 2 ] ];

        fonte = TF_ptr_tab_fonte[ campo.fonte ];

        break;
    }
  }

  // Zera auto_LF em arquivos de versões anteriores Susana 11/7/96
  if ( strcmp ( Arq.Versao, "451" ) < 0 )
    campo.auto_LF = FALSE;

  if ( TextField_edita_campo( hwnd, &campo, &fonte ) == FALSE )
    return;

  tam = TF_expandir_campo( buff, &campo, &fonte );

  lin = TFED_achar_linha( TF_ptexto );

  if ( editando_campo == TRUE )
  {
    TF_restaurar_um_texto( TF_ptexto, TF_ptexto + TF_TAM_CMD );

    undo.htxt1    = TF_atual.Text;
    undo.tatual1  = TF_TAM_CMD;
  }

  undo.pos    = TF_ptexto;
  undo.ope    = TF_OPE_TROCAR;
  undo.htxt2  = GlobalAlloc( GHND, tam + 1 );

  if ( undo.htxt2 != NULL )
  {
    ptr = GlobalLock( undo.htxt2 );

    if ( ptr != NULL )
      strcpy( ptr, buff );

    GlobalUnlock( undo.htxt2 );
  }

  undo.tatual2  = TF_TAM_CMD;

  TFED_guardar_undo( &undo );

  if ( editando_campo == TRUE )
    TFED_apagar_caractere( FALSE );

  TF_compilar_um_texto( buff, tam, TF_ptexto );

  if ( lin > 0 )
    lin--;

  TF_formatar_texto_parcial( lin, NUM_ATU_LINHAS /*3*/ );
  TFED_atualizar_tela_parcial( lin, NUM_ATU_LINHAS /*3*/ );

  TFED_composicao_pendente = TRUE;
  TFED_navegar_texto( VK_RIGHT ); // Alterado p/deixar cursor à direita Susana 5/7/96
}

/*------------------------------------------------------------------------*/
void TFED_comando_logo ( HWND hwnd )
{
  BYTE  buff[ 512 ];
  BOOL  editando_logo = FALSE;
  WORD  tam, lin;

  struct TF_logo logo = { 0 };

  struct Undo undo  = { 0 };
  BYTE      * ptr;

  if ( TF_ptexto < TF_buf_tatual  &&
       TF_buffer_texto[ TF_ptexto ] == sESC )
  {
    // cursor sobre um comando
    switch ( TF_buffer_texto[ TF_ptexto + 1 ] )
    {
      case TF_CMD_INVALIDO:
      case TF_CMD_CAMPO_FIM:
      case TF_CMD_LOGO_FIM:
        return; // posição inválida do cursor

      case TF_CMD_FONTE:
      case TF_CMD_CAMPO_INI:
      case TF_CMD_FIOH:
      case TF_CMD_FIOV:
        break;

      case TF_CMD_LOGO_INI:
        editando_logo = TRUE;
        logo = TF_ptr_logo[ TF_buffer_texto[ TF_ptexto + 2 ] ];
        break;
    }
  }

  if ( TextField_edita_logo( hwnd, &logo ) == FALSE )
    return;

  tam = TF_expandir_logo( buff, &logo );

  lin = TFED_achar_linha( TF_ptexto );

  if ( editando_logo == TRUE )
  {
    TF_restaurar_um_texto( TF_ptexto, TF_ptexto + TF_TAM_CMD );

    undo.htxt1    = TF_atual.Text;
    undo.tatual1  = TF_TAM_CMD;
  }

  undo.pos    = TF_ptexto;
  undo.ope    = TF_OPE_TROCAR;
  undo.htxt2  = GlobalAlloc( GHND, tam + 1 );

  if ( undo.htxt2 != NULL )
  {
    ptr = GlobalLock( undo.htxt2 );

    if ( ptr != NULL )
      strcpy( ptr, buff );

    GlobalUnlock( undo.htxt2 );
  }

  undo.tatual2  = TF_TAM_CMD;

  TFED_guardar_undo( &undo );

  if ( editando_logo == TRUE )
    TFED_apagar_caractere( FALSE );

  TF_compilar_um_texto( buff, tam, TF_ptexto );

  if ( lin > 0 )
    lin--;

  TF_formatar_texto_parcial( lin, NUM_ATU_LINHAS /*3*/ );
  TFED_atualizar_tela_parcial( lin, NUM_ATU_LINHAS /*3*/ );

  TFED_composicao_pendente = TRUE;
  TFED_navegar_texto( VK_RIGHT ); // Alterado p/deixar cursor à direita Susana 5/7/96
}


/*------------------------------------------------------------------------*/
void TFED_comando_fonte ( HWND hwnd )
/* tratar a opção de menu FONT
*/
{
  BYTE  buff[ MAXLENSTR ];
  BOOL  editando_fonte = FALSE;

  struct TF_tab_fonte ft_atu, * pt_fnt;
  WORD  tam, lin,
        posi, posf;

  struct Undo undo  = { 0 };
  BYTE      * ptr;

  // se houver um bloco marcado, apaga os comandos de fonte
  // que existirem dentro do mesmo
  if ( TFED_ler_pos_bloco( &posi, &posf ) == TRUE )
  {
    struct est_pos        est_ini, est_fim;
    struct TF_tab_fonte   ft_ini, ft_fim;

    BOOL  ins_no_fim = (posf == TF_buf_tatual) ? FALSE : TRUE;

    WORD  pos, fonte;

    // achar o estado da linha no início do bloco a ser pesquisado
    TFED_determinar_estado_posicao( posi, &est_ini );

    // se houver comando de fonte antes do bloco, incorporá-lo no bloco
    while ( posi >= TF_TAM_CMD )  // alterado syla 21/02/97
    {
      if ( TF_buffer_texto[ posi - 1 ] == sESC )
      {
        // alterado SYLA 09/11/95 nao pode 2 comandos de fonte seguidos
//        if ( TF_buffer_texto[ posi - TF_CMD_FONTE + 1 ] ==
//                               TF_CMD_FONTE )
        if ( TF_buffer_texto[ posi - TF_TAM_CMD + 1 ] ==
                              TF_CMD_FONTE )
        {
          posi -= TF_TAM_CMD;
          continue;
        }
      }

      break;
    }

    lin = TFED_achar_linha( posi );

    pos = posi;

    while ( pos < posf )
    {
      tam = TF_strnchr( TF_buffer_texto + pos, posf - pos, sESC );

      if ( tam == 0 )
        break;

      pos += tam;

      if ( TF_buffer_texto[ pos ] == TF_CMD_FONTE  ||
           TF_buffer_texto[ pos ] == TF_CMD_CAMPO_INI )
      {
        // existe pelo menos 1 cmd de fonte dentro do bloco
        editando_fonte = TRUE;
        break;
      }

      pos += TF_TAM_CMD - 1;
    }

    // a fonte deve ser a mesma do primeiro caractere imprimível
//    TFED_determinar_estado_posicao( posi, &est_ini );
    TFED_determinar_estado_posicao( posf, &est_fim );

    // usar como default a fonte do inicio do bloco
    ft_ini = TF_ptr_tab_fonte[ est_ini.fonte ];
    ft_fim = TF_ptr_tab_fonte[ est_fim.fonte ];

    ft_atu = ft_ini;

    if ( TextField_sel_fonte( hwnd, &ft_atu ) == FALSE )
      return;

    // alterado em 21/02/97 compara o nome da fonte ignorando case sensitive
    if ( editando_fonte   == FALSE            &&
       ft_ini.f.Fcpi      == ft_atu.f.Fcpi    &&
       ft_ini.f.corpo     == ft_atu.f.corpo   &&
       ft_ini.f.color     == ft_atu.f.color   &&
       ft_ini.f.Fexp      == ft_atu.f.Fexp    &&
       ft_ini.f.Fund      == ft_atu.f.Fund    &&
       ft_ini.f.Fita      == ft_atu.f.Fita    &&
       ft_ini.f.Fstk      == ft_atu.f.Fstk    &&
       ft_ini.f.Fbold     == ft_atu.f.Fbold   &&
       ft_ini.Fsobre      == ft_atu.Fsobre    &&
       ft_ini.Fsub        == ft_atu.Fsub      &&
       strnicmp( ft_ini.f.FnomeW, ft_atu.f.FnomeW,
                    sizeof( ft_atu.f.FnomeW ) ) == 0 &&
       strnicmp( ft_ini.f.Fnome, ft_atu.f.Fnome,
                    sizeof( ft_atu.f.Fnome ) ) == 0 &&
       strnicmp( ft_ini.f.expressao, ft_atu.f.expressao,
                    sizeof( ft_atu.f.expressao ) ) == 0 )
      return;

    TF_restaurar_um_texto( posi, posf );

    undo.pos      = posi;
    undo.htxt1    = TF_atual.Text;
    undo.tatual1  = posf - posi;

    // apagar os comandos de fonte que existirem dentro do bloco
    pos = posi;

    if ( editando_fonte == TRUE )
    {
      while ( pos < posf )
      {
        tam = TF_strnchr( TF_buffer_texto + pos, posf - pos, sESC );

        if ( tam == 0 )
          break;

        pos += tam - 1;

        if ( TF_buffer_texto[ pos + 1 ] == TF_CMD_FONTE )
        {
          TFED_apagar_comando( pos );

          if ( TF_ptexto > pos )
            TF_ptexto -= TF_TAM_CMD;

          posf -= TF_TAM_CMD;
        }
        else
          pos += TF_TAM_CMD;
      }
    }

    // inserir os comandos de fonte adequados
    // se a fonte do fim é diferente da fonte do inicio,
    // inserir um comando no final para restaurar a fonte anterior
    // alterado em 21/02/97 ignora case sensitive no nome da fonte
    if ( ins_no_fim     == TRUE             &&
      (ft_fim.f.corpo   != ft_atu.f.corpo   ||
       ft_fim.f.color   != ft_atu.f.color   ||
       ft_fim.f.Fcpi    != ft_atu.f.Fcpi    ||
       ft_fim.f.Fexp    != ft_atu.f.Fexp    ||
       ft_fim.f.Fund    != ft_atu.f.Fund    ||
       ft_fim.f.Fita    != ft_atu.f.Fita    ||
       ft_fim.f.Fstk    != ft_atu.f.Fstk    ||
       ft_fim.f.Fbold   != ft_atu.f.Fbold   ||
       ft_fim.Fsobre    != ft_atu.Fsobre    ||
       ft_fim.Fsub      != ft_atu.Fsub      ||
       strnicmp( ft_fim.f.FnomeW, ft_atu.f.FnomeW,
                    sizeof( ft_atu.f.FnomeW ) ) != 0 ||
       strnicmp( ft_fim.f.Fnome, ft_atu.f.Fnome,
                    sizeof( ft_atu.f.Fnome ) ) != 0 ||
       strnicmp( ft_fim.f.expressao, ft_atu.f.expressao,
                    sizeof( ft_atu.f.expressao ) ) != 0) )
    {
      tam = TF_expandir_fonte( buff, &ft_fim );

      pos = TF_compilar_um_texto( buff, tam, posf );

      if ( TF_ptexto >= posf )
        TF_ptexto += pos - posf;

      posf = pos;
    }
    if ( ft_ini.f.corpo != ft_atu.f.corpo  ||
         ft_ini.f.color != ft_atu.f.color  ||
         ft_ini.f.Fcpi  != ft_atu.f.Fcpi   ||
         ft_ini.f.Fexp  != ft_atu.f.Fexp   ||
         ft_ini.f.Fund  != ft_atu.f.Fund   ||
         ft_ini.f.Fita  != ft_atu.f.Fita   ||
         ft_ini.f.Fstk  != ft_atu.f.Fstk   ||
         ft_ini.f.Fbold != ft_atu.f.Fbold  ||
         ft_ini.Fsobre  != ft_atu.Fsobre   ||
         ft_ini.Fsub    != ft_atu.Fsub     ||
       strnicmp( ft_ini.f.FnomeW, ft_atu.f.FnomeW,
                    sizeof( ft_atu.f.FnomeW ) ) != 0 ||
       strnicmp( ft_ini.f.Fnome, ft_atu.f.Fnome,
                    sizeof( ft_atu.f.Fnome ) ) != 0 ||
       strnicmp( ft_ini.f.expressao, ft_atu.f.expressao,
                    sizeof( ft_atu.f.expressao ) ) != 0 )
    {
      tam = TF_expandir_fonte( buff, &ft_atu );

      pos = TF_compilar_um_texto( buff, tam, posi );

      if ( TF_ptexto >= posi )
        TF_ptexto += pos - posi;

      posf += pos - posi;
    }

    // trocar as fontes dos campos de saída
    // nos campos de saída não pode ter Sobrescrito/Subescrito
    ft_atu.Fsobre = ft_atu.Fsub = FALSE;
    fonte = TF_criar_fonte( &ft_atu );

    if ( fonte == 0xFFFF )
      fonte = 0;  // syla 01/03/2000 em caso de erro usa default

    pos = posi;

    while ( pos < posf )
    {
      tam = TF_strnchr( TF_buffer_texto + pos, posf - pos, sESC );

      if ( tam == 0 )
        break;

      pos += tam - 1;

      if ( TF_buffer_texto[ pos + 1 ] == TF_CMD_CAMPO_INI )
      {
        WORD ft;

        if ( fonte == 0 ) // não pode ser a fonte default
        {
          fonte = TF_criar_fonte( &ft_atu );

          if ( fonte == 0xFFFF )
            break;
        }

        ft = TF_ptr_campo_saida[ TF_buffer_texto[ pos + 2 ] ].fonte;

        if ( ft != fonte )
        {
          // liberar referência da fonte
          if ( TF_ptr_tab_fonte[ ft ].contador > 1 )
            TF_ptr_tab_fonte[ ft ].contador--;
          else
          {
            DeleteFont( TF_ptr_tab_fonte[ ft ].hft );
            DeleteFont( TF_ptr_tab_fonte[ ft ].hft_vid );

            TF_ptr_tab_fonte[ ft ].hft = NULL;
            TF_ptr_tab_fonte[ ft ].hft_vid = NULL;
            TF_ptr_tab_fonte[ ft ].contador = 0;
          }
          TF_ptr_campo_saida[ TF_buffer_texto[ pos + 2 ] ].fonte =
                                   fonte;
          TF_ptr_tab_fonte[ fonte ].contador++;
        }
      }

      pos += TF_TAM_CMD;
    }

    TF_restaurar_um_texto( posi, posf );

    undo.ope      = TF_OPE_TROCAR;
    undo.htxt2    = TF_atual.Text;
    undo.tatual2  = posf - posi;

    TFED_guardar_undo( &undo );

    if ( lin > 0 )
      lin--;

    TFED_ajustar_bloco( posf );
    TF_formatar_texto_parcial( lin, NUM_MAX_LINHAS );
    TFED_atualizar_tela_parcial( lin, NUM_MAX_LINHAS );

    TFED_composicao_pendente = TRUE;
    TFED_navegar_texto( 0 );

    return;
  }

  if ( TF_ptexto < TF_buf_tatual  &&
       TF_buffer_texto[ TF_ptexto ] == sESC )
  {
    // cursor sobre um comando
    switch ( TF_buffer_texto[ TF_ptexto + 1 ] )
    {
      case TF_CMD_INVALIDO:
      case TF_CMD_CAMPO_FIM:
      case TF_CMD_LOGO_FIM:
        return;   // posição inválida do cursor

      case TF_CMD_FONTE:
        editando_fonte = TRUE;
        pt_fnt = &TF_ptr_tab_fonte[ TF_buffer_texto[ TF_ptexto + 2 ] ];
        break;

      case TF_CMD_CAMPO_INI:
        // trocando a fonte na posição do cursor
        pt_fnt = &TF_ptr_tab_fonte[ estado_cur.fonte ];
        break;

      case TF_CMD_LOGO_INI:
      case TF_CMD_FIOH:
      case TF_CMD_FIOV:
        return;
    }
  }
  else
    // trocando a fonte na posição do cursor
    pt_fnt = &TF_ptr_tab_fonte[ estado_cur.fonte ];

  ft_atu = *pt_fnt;

  TextField_sel_fonte( hwnd, &ft_atu );

  if ( pt_fnt->f.corpo  != ft_atu.f.corpo  ||
       pt_fnt->f.color  != ft_atu.f.color  ||
       pt_fnt->f.Fcpi   != ft_atu.f.Fcpi   ||
       pt_fnt->f.Fexp   != ft_atu.f.Fexp   ||
       pt_fnt->f.Fund   != ft_atu.f.Fund   ||
       pt_fnt->f.Fita   != ft_atu.f.Fita   ||
       pt_fnt->f.Fstk   != ft_atu.f.Fstk   ||
       pt_fnt->f.Fbold  != ft_atu.f.Fbold  ||
       pt_fnt->Fsobre   != ft_atu.Fsobre   ||
       pt_fnt->Fsub     != ft_atu.Fsub     ||
     strnicmp( pt_fnt->f.FnomeW, ft_atu.f.FnomeW,
                    sizeof( ft_atu.f.FnomeW ) ) != 0 ||
     strnicmp( pt_fnt->f.Fnome, ft_atu.f.Fnome,
                    sizeof( ft_atu.f.Fnome ) ) != 0 ||
     strnicmp( pt_fnt->f.expressao, ft_atu.f.expressao,
                    sizeof( ft_atu.f.expressao ) ) != 0 )
  {
    lin = TFED_achar_linha( TF_ptexto );

    tam = TF_expandir_fonte( buff, &ft_atu );

    if ( editando_fonte == TRUE )
    {
      TF_restaurar_um_texto( TF_ptexto, TF_ptexto + TF_TAM_CMD );

      undo.htxt1    = TF_atual.Text;
      undo.tatual1  = TF_TAM_CMD;
    }

    undo.pos    = TF_ptexto;
    undo.ope    = TF_OPE_TROCAR;
    undo.htxt2  = GlobalAlloc( GHND, tam + 1 );

    if ( undo.htxt2 != NULL )
    {

      ptr = GlobalLock( undo.htxt2 );

      if ( ptr != NULL )
        strcpy( ptr, buff );

      GlobalUnlock( undo.htxt2 );
    }

    undo.tatual2 = TF_TAM_CMD;

    TFED_guardar_undo( &undo );

    if ( editando_fonte == TRUE )
      TFED_apagar_caractere( FALSE );

    TF_ptexto = TF_compilar_um_texto( buff, tam, TF_ptexto );

    if ( lin > 0 )
      lin--;

    TF_formatar_texto_parcial( lin, NUM_ATU_LINHAS /*3*/ );
    TFED_atualizar_tela_parcial( lin, NUM_ATU_LINHAS /*3*/ );

    TFED_composicao_pendente = TRUE;
    TFED_navegar_texto( 0 );
  }
}


/*------------------------------------------------------------------------*/
void TFED_comando_fio ( HWND hwnd )
{
  BYTE  buff[ 512 ];
  BOOL  editando_fio = FALSE;
  WORD  tam, lin;

  struct TF_fio fio = { 0 };

  struct Undo undo  = { 0 };
  BYTE      * ptr;

  fio.tipo = 'H'; // default

  if ( TF_ptexto < TF_buf_tatual  &&
       TF_buffer_texto[ TF_ptexto ] == sESC )
  {
    // cursor sobre um comando
    switch ( TF_buffer_texto[ TF_ptexto + 1 ] )
    {
      case TF_CMD_INVALIDO:
      case TF_CMD_CAMPO_FIM:
      case TF_CMD_LOGO_FIM:
        return; // posição inválida do cursor

      case TF_CMD_FIOH:
      case TF_CMD_FIOV:
        editando_fio = TRUE;

        // ler as informações do campo atual
        fio = TF_ptr_fio[ TF_buffer_texto[ TF_ptexto + 2 ] ];
        break;

      case TF_CMD_FONTE:
      case TF_CMD_LOGO_INI:
      case TF_CMD_CAMPO_INI:
        break;
    }
  }

  if ( TextField_edita_fio( hwnd, &fio ) == FALSE )
    return;

  tam = TF_expandir_fio( buff, &fio );

  lin = TFED_achar_linha( TF_ptexto );

  if ( editando_fio == TRUE )
  {
    TF_restaurar_um_texto( TF_ptexto, TF_ptexto + TF_TAM_CMD );

    undo.htxt1    = TF_atual.Text;
    undo.tatual1  = TF_TAM_CMD;
  }

  undo.pos    = TF_ptexto;
  undo.ope    = TF_OPE_TROCAR;
  undo.htxt2  = GlobalAlloc( GHND, tam + 1 );

  if ( undo.htxt2 != NULL )
  {
    ptr = GlobalLock( undo.htxt2 );
    if ( ptr != NULL )
      strcpy( ptr, buff );
    GlobalUnlock( undo.htxt2 );
  }

  undo.tatual2  = TF_TAM_CMD;

  TFED_guardar_undo( &undo );

  if ( editando_fio == TRUE )
    TFED_apagar_caractere( FALSE );

  TF_compilar_um_texto( buff, tam, TF_ptexto );

  if ( lin > 0 )
    lin--;

  TF_formatar_texto_parcial( lin, NUM_ATU_LINHAS /*3*/ );
  TFED_atualizar_tela_parcial( lin, NUM_ATU_LINHAS /*3*/ );

  TFED_composicao_pendente = TRUE;
  TFED_navegar_texto( VK_RIGHT ); // Alterado p/deixar cursor à direita Susana 5/7/96
}

/*------------------------------------------------------------------------*/
void TFED_importar_texto ( HWND hwnd )
/* tratar a opção de menu IMPORT
*/
{
  struct est_pos est_atu;
  struct TF_tab_fonte ft_atu;
  BYTE   buff[ MAXLENSTR ];


  OPENFILENAME ofn = { 0 };

  char filtro[ 65 ] = "Text Files (*.txt)\0*.txt\0Rich-Text Format (*.rtf)\0*.rtf\0\0";
  char nome[ MAXLENFILENAME ];
  HGLOBAL hNew;

  nome[ 0 ] = 0;

  ofn.lStructSize = sizeof( OPENFILENAME );
  ofn.hwndOwner   = hwnd;
  ofn.hInstance   = (HINSTANCE)inst_atual;
  ofn.lpstrFilter = filtro;
  ofn.lpstrCustomFilter = NULL;
  ofn.nFilterIndex  = 1;
  ofn.lpstrFile   = nome;
  ofn.nMaxFile    = sizeof( nome );
  ofn.lpstrFileTitle  = NULL;
  ofn.lpstrInitialDir = NULL;
  ofn.lpstrTitle  = "Import text";
  ofn.Flags   = OFN_PATHMUSTEXIST | OFN_FILEMUSTEXIST |
              OFN_HIDEREADONLY;
  ofn.lpstrDefExt = NULL;

  if ( GetOpenFileName( &ofn ) == TRUE )
  {
    struct Undo undo  = { 0 };

    HFILE arq;
    LONG  tam, tam1;
    BYTE *ptr;
    BYTE *pto;
    BYTE *ptd;
    WORD  posi, posf, lin;

    arq = _lopen( nome, OF_READ );

    // Move para o fim do arquivo para saber o tamanho do mesmo
    if ( (tam = _llseek( arq, 0L, 2 )) == HFILE_ERROR )
    {
      // ??? mensagem de erro de posicionamento
      erro_mens( 115, NULL ); // error in .TXT or .RTF file
      return;
    }
    // alterado SYLA 23/02/96 trocado de 30L para 60L
    // aceita arquivos de até 60K
    if ( tam == 0  ||  (tam + TF_buf_tatual > (60L * 1024)) )
    {
      // ??? mensagem de erro de arquivo vazio ou muito grande
      erro_mens( 114, NULL);  // text too large
      return;
    }

    // volta para o início do arquivo
    _llseek( arq, 0L, 0 );

    // ler o arquivo para uma área em memória
    // aloca mais 80 bytes para inserir troca de fonte no final SYLA 04/07/96
    undo.htxt2 = GlobalAlloc( GHND, tam + 80 );

    if ( undo.htxt2 != NULL )
    {
      ptr = GlobalLock( undo.htxt2 );
      if ( ptr != NULL )
      {
        if ( _lread( arq, ptr, tam ) == (UINT)HFILE_ERROR )
        {
          GlobalUnlock( undo.htxt2 );
          GlobalFree( undo.htxt2 );
          _lclose( arq );
          // ??? mensagem de erro de leitura do arquivo.
          erro_mens( 115, NULL ); // error in .TXT or .RTF file
          return;
        }
        _lclose( arq );

        // tirar ^Z
        if ( ptr[ (WORD)tam - 1 ] == 0x1a )
          tam--;

        ptr[ (WORD)tam ] = 0;

        /*
        ** Faz a conversão de RTF se a extensão do arquivo for ".rtf"
        */
        if ( strstr(nome, "rtf") != NULL  ||  strstr(nome, "RTF") != NULL )
        {
          if ((hNew = RtfParse( ptr, tam + 1 )) != NULL)
          {
            GlobalUnlock( undo.htxt2 );
            GlobalFree( undo.htxt2 );
            undo.htxt2 = hNew;
            ptr = GlobalLock( hNew );
            tam = strlen(ptr);
          }
        }

        // se houver um bloco marcado, apaga o mesmo antes de inserir
        if ( TFED_ler_pos_bloco( &posi, &posf ) == TRUE )
        {
          TF_restaurar_um_texto( posi, posf );
          undo.pos      = posi;
          undo.htxt1    = TF_atual.Text;
          undo.tatual1  = posf - posi;
          TFED_apagar_bloco();
        }
        else
          undo.pos  = TF_ptexto;

        undo.ope  = TF_OPE_TROCAR;

        lin = TFED_achar_linha( TF_ptexto );

        posi = TF_buf_tatual;

        // inserido Syla para inserir os comandos de fonte no final do texto
        // importado para restaurar a fonte anterior ( 11/04/96 )

        TFED_determinar_estado_posicao( posi, &est_atu );
        ft_atu = TF_ptr_tab_fonte[ est_atu.fonte ];
        tam1 = TF_expandir_fonte( buff, &ft_atu );
        ptd = ptr+tam;
        pto = buff;
        tam += tam1;
        while ( tam1-- > 0 )
          *ptd++ = *pto++;
        TF_compilar_um_texto( ptr, tam, TF_ptexto );
        undo.tatual2 = TF_buf_tatual - posi;
        TFED_guardar_undo( &undo );
      }
      GlobalUnlock( undo.htxt2 );
    }

    if ( lin > 0 )
      lin--;

    TF_formatar_texto_parcial( lin, NUM_ATU_LINHAS /*3*/ );
    TFED_atualizar_tela_parcial( lin, NUM_ATU_LINHAS /*3*/ );

    TFED_composicao_pendente = TRUE;
    TFED_navegar_texto( 0 );
  }
}

/*------------------------------------------------------------------------*/
void TFED_criar_caret ( void )
{
  RECT ret;

  TFED_determinar_estado_posicao( TF_ptexto, &estado_cur );

  ret.top = ret.left = 0;
  ret.right = ret.bottom = 2;

  DPtoLP( hdc_text, (LPPOINT)&ret, 2 );

  CreateCaret( hwnd_text, NULL, ret.right - ret.left, estado_cur.alt );
}

/*------------------------------------------------------------------------*/
void TFED_mostrar_caret ( BOOL mostrar )
{
  if ( mostrar == TRUE )
  {
    LONG l;
    int marg, prof;

    // descontar o scroll
    l = SendMessage( hwnd_text, SM_GETSCROLLPOS, 0, 0L );
    marg = estado_cur.marg - (int)LOWORD( l );
    prof = estado_cur.prof - (int)HIWORD( l );

    if ( marg < 0 ) // SYLA 03/08/98
      marg = 0;
    if ( prof < 0 )
      prof = 0;

    SetCaretPos( marg, prof );
    ShowCaret( hwnd_text );
  }
  else
    HideCaret( hwnd_text );
}

/*------------------------------------------------------------------------*/
void TFED_posicionar_caret ( int marg, int prof )
{
  POINT pt;
  LONG  l;
  WORD  desl;

  struct est_pos estado;

  pt.x = marg;
  pt.y = prof;

  DPtoLP( hdc_text, &pt, 1 );

  l = SendMessage( hwnd_text, SM_GETSCROLLPOS, 0, 0L );
  pt.x += LOWORD( l );
  pt.y += HIWORD( l );

  if ( pt.x < 0 )
    pt.x = 0;
  if ( pt.y < 0 )
    pt.y = 0;

  TF_ptexto = TFED_determinar_posicao_texto( (int)pt.x, (int)pt.y, &estado );

  if ( estado.dentro_campo == TRUE ||
       estado.dentro_logo  == TRUE )
  {
    if ( TF_buffer_texto[ TF_ptexto ] == sESC )
      TF_ptexto--;

    desl = TF_strnchrb( &TF_buffer_texto[ TF_ptexto ],
                      TF_ptexto - 1, sESC );

    TF_ptexto -= desl + (TF_TAM_CMD - 1) - 1;
  }

  TFED_navegar_texto( 0 );
}

/*------------------------------------------------------------------------*/
static void TFED_enquadrar_caret ( void )
{
  int marg_new, prof_new,
      marg_atu, prof_atu;

  RECT  ret;
  LONG  l;
  POINT p;

  // largura e altura das barras de scroll
  p.x = GetSystemMetrics( SM_CXVSCROLL );
  p.y = GetSystemMetrics( SM_CYHSCROLL );

  DPtoLP( hdc_text, &p, 1 );  // convertendo para unidades do usuário

  GetClientRect( hwnd_text, &ret );

  DPtoLP( hdc_text, (LPPOINT)&ret, 2 ); // convertendo para unidades do usuário

  // dimensões da janela em unidades do usuário
  SendMessage( hwnd_text, SM_GETSCROLLRANGE, 0, 0L );

  ret.right -= p.x;   // desconta a barra de scroll
  ret.bottom -= p.y;  // desconta a barra de scroll

  if ( ret.right < 0 )   // SYLA 03/08/98 TESTE
    ret.right = 0;
  if ( ret.bottom < 0 )
    ret.bottom = 0;

  l = SendMessage( hwnd_text, SM_GETSCROLLPOS, 0, 0L );
  marg_atu = (int)LOWORD( l );
  prof_atu = (int)HIWORD( l );

  if ( estado_cur.marg < marg_atu )
    marg_new = estado_cur.marg;
  else
  if ( estado_cur.marg > marg_atu + ret.right )
    marg_new = estado_cur.marg - ret.right + 1;
  else
    marg_new = marg_atu;

   // SYLA 03/08/98
  if ( (ret.bottom > 0 ) &&
      (estado_cur.prof + estado_cur.alt > prof_atu + ret.bottom) )
    prof_new = estado_cur.prof + estado_cur.alt - ret.bottom + 1;
  else
  if ( estado_cur.prof < prof_atu )
    prof_new = estado_cur.prof;
  else
    prof_new = prof_atu;

  if ( prof_new != prof_atu  ||  marg_new != marg_atu )
  {
    // teve que fazer scroll na tela ...
    SendMessage( hwnd_text, SM_SETSCROLLPOS, 0, MAKELONG( marg_new, prof_new ) );

    // ... então, reposicionar o caret
    l = SendMessage( hwnd_text, SM_GETSCROLLPOS, 0, 0L );

    SetCaretPos( estado_cur.marg - LOWORD( l ),
             estado_cur.prof - HIWORD( l ) );
  }
}

/*------------------------------------------------------------------------*/
LRESULT TFED_dimensao_texto ( void )
{
  // tamanho do text field
  WORD  p;

  p = TF_tab_linha[ TF_tab_linha_tatual ].prof +
    TF_tab_linha[ TF_tab_linha_tatual ].maior_cp; // linha final

  p = max( p, TF_atual.obj.TamVer );

  return MAKELONG( TF_atual.obj.TamHor, p );
}

/*------------------------------------------------------------------------*/
BOOL TFED_navegar_texto ( UINT mov )
/* mover o cursor de texto no texto do Text Field
*/
{
  struct est_pos estado;
  WORD  pos, desl, lin, ptexto_old = TF_ptexto;


de_novo:
  switch ( mov )
  {
    default:
      return ( FALSE );

    case 0:
      break;

    case VK_UP:
      TFED_determinar_estado_posicao( TF_ptexto, &estado );

      if ( estado.lin == 0 )
        return ( FALSE );   // já estou na primeira linha

      pos = TFED_determinar_posicao_texto( estado.marg,
                         estado.prof - 1,
                        &estado );

      if ( estado.dentro_campo == TRUE ||
          estado.dentro_logo  == TRUE )
      {
        if ( TF_buffer_texto[ pos ] == sESC )
        {
          pos += TF_TAM_CMD;
        }
        else
        {
          desl = TF_strnchrb( &TF_buffer_texto[ pos ],
                        pos - 1, sESC );

          pos -= desl + (TF_TAM_CMD - 1) - 1;
        }
      }

      TF_ptexto = pos;
      break;

    case VK_DOWN:
      TFED_determinar_estado_posicao( TF_ptexto, &estado );

      if ( TF_tab_linha[ estado.lin ].tipo_qb == TF_QB_NENHUMA )
        return ( FALSE );

      pos = TFED_determinar_posicao_texto( estado.marg,
                    estado.prof + estado.alt + 1,
                    &estado );

      if ( estado.dentro_campo == TRUE ||
           estado.dentro_logo  == TRUE )
      {
        if ( TF_buffer_texto[ pos ] == sESC )
          pos += TF_TAM_CMD;
        else
        if ( TF_buffer_texto[ pos - 1 ] == sESC )
          pos -= TF_TAM_CMD;
        else
        {
          desl = TF_strnchr( &TF_buffer_texto[ pos ],
                    TF_buf_tatual - pos, sESC );

          pos += desl + (TF_TAM_CMD - 1);
        }
      }

      TF_ptexto = pos;
      break;

    case VK_LEFT:
      if ( TF_ptexto == 0 )
        return ( FALSE );   // já está no inicio do texto

      TF_ptexto--;

      if ( TF_buffer_texto[ TF_ptexto ] == sESC )
      {
        // posicionando no inicio do comando
        TF_ptexto -= (TF_TAM_CMD - 1);

        /* se estiver entrando num campo de saída,
          posicionar no início
        */
        if ( TF_buffer_texto[ TF_ptexto + 1 ] == TF_CMD_CAMPO_FIM )
        {
          WORD desl;

          desl = TF_strnchrb( &TF_buffer_texto[ TF_ptexto - 1 ],
                      TF_ptexto - 1, sESC );

          TF_ptexto -= desl + (TF_TAM_CMD - 1);
        }
        /* se estiver entrando num logo, posicionar no início
        */
        if ( TF_buffer_texto[ TF_ptexto + 1 ] == TF_CMD_LOGO_FIM )
        {
          WORD desl;

          desl = TF_strnchrb( &TF_buffer_texto[ TF_ptexto - 1 ],
                      TF_ptexto - 1, sESC );

          TF_ptexto -= desl + (TF_TAM_CMD - 1);
        }

      }

      break;

    case VK_RIGHT:
      if ( TF_ptexto >= TF_buf_tatual )
        return ( FALSE );   // já está no fim do texto

      if ( TF_buffer_texto[ TF_ptexto ] == sESC )
      {
        TF_ptexto += TF_TAM_CMD;

        /* se estiver entrando num campo de saída,
          posicionar após o campo
        */
        if ( TF_buffer_texto[ TF_ptexto - 3 ] == TF_CMD_CAMPO_INI )
        {
          WORD desl;

          desl = TF_strnchr( &TF_buffer_texto[ TF_ptexto ],
                    TF_buf_tatual - TF_ptexto, sESC );

          TF_ptexto += desl + (TF_TAM_CMD - 1);
        }
        /* se estiver entrando num logo, posicionar após o logo
        */
        if ( TF_buffer_texto[ TF_ptexto - 3 ] == TF_CMD_LOGO_INI )
        {
          WORD desl;

          desl = TF_strnchr( &TF_buffer_texto[ TF_ptexto ],
                    TF_buf_tatual - TF_ptexto, sESC );

          TF_ptexto += desl + (TF_TAM_CMD - 1);
        }

      }
      else
        TF_ptexto++;

      break;

    case -VK_HOME:
      // tratamento para ^HOME
      TF_ptexto = 0;
      break;

    case VK_HOME:
      lin = TFED_achar_linha( TF_ptexto );

      // não posso para dentro de campo
      if ( TF_tab_linha[ lin ].flag_cp == TRUE )
        return ( FALSE );

      TF_ptexto = TF_tab_linha[ lin ].posi;
      break;

    case -VK_END:
      // tratamento para ^END
      TF_ptexto = TF_buf_tatual;
      break;

    case VK_END:
      lin = TFED_achar_linha( TF_ptexto );

      // não posso para dentro de campo
      if ( TF_tab_linha[ lin + 1 ].flag_cp == TRUE )
        return ( FALSE );

      TF_ptexto = TF_tab_linha[ lin + 1 ].posi;

      if ( TF_ptexto > 0  &&
         TF_tab_linha[ lin ].tipo_qb != TF_QB_NENHUMA )
        TF_ptexto--;

      break;
  }

  // se o cursor parou sobre um comando de fonte, achar outra posição
  if ( TF_buffer_texto[ TF_ptexto ] == sESC  &&
     TF_buffer_texto[ TF_ptexto + 1 ] == TF_CMD_FONTE )
  {
    if ( TF_ptexto == 0 )
      TF_ptexto = ptexto_old;
    else
    {
      if ( TF_ptexto < ptexto_old )
        mov = VK_LEFT;
      else
        mov = VK_RIGHT;

      goto de_novo;
    }
  }

  // se campo, posiciona no início          Susana 5/7/96
  // não permite inserir um campo entre campos, só no fim
  // texto pode ser inserido entre campos

  TFED_determinar_estado_posicao( TF_ptexto, &estado );
  pos = TFED_determinar_posicao_texto( estado.marg, estado.prof,
                              &estado );
  if ( estado.dentro_campo == TRUE ||
       estado.dentro_logo  == TRUE )
  {
    if ( TF_buffer_texto[ pos ] == sESC )
      pos += TF_TAM_CMD;
    else
    if ( TF_buffer_texto[ pos - 1 ] == sESC )
      pos -= TF_TAM_CMD;
    else
    {
      desl = TF_strnchr( &TF_buffer_texto[ pos ],
                    TF_buf_tatual - pos, sESC );

      pos += desl + (TF_TAM_CMD - 1);
    }

    TF_ptexto = pos;

  }

  TFED_mostrar_caret( FALSE );
  TFED_criar_caret();
  TFED_enquadrar_caret();
  TFED_mostrar_caret( TRUE );

  {
    WORD  fonte = estado_cur.fonte;
    char *exp = NULL;
    BOOL  tem_logo;

    tem_logo = FALSE;
    if ( TF_buffer_texto[ TF_ptexto ] == sESC  &&
         TF_buffer_texto[ TF_ptexto + 1 ] == TF_CMD_CAMPO_INI )
    {
      fonte = TF_ptr_campo_saida[ TF_buffer_texto[ TF_ptexto + 2 ] ].fonte;
      exp = TF_ptr_campo_saida[ TF_buffer_texto[ TF_ptexto + 2 ] ].expressao;
    }
    if ( TF_buffer_texto[ TF_ptexto ] == sESC  &&
         TF_buffer_texto[ TF_ptexto + 1 ] == TF_CMD_LOGO_INI )
    {
      tem_logo = TRUE;
      exp = TF_ptr_logo[ TF_buffer_texto[ TF_ptexto + 2 ] ].expressao;
    }
    if ( TF_buffer_texto[ TF_ptexto ] == sESC  &&
        (TF_buffer_texto[ TF_ptexto + 1 ] == TF_CMD_FIOH  ||
         TF_buffer_texto[ TF_ptexto + 1 ] == TF_CMD_FIOV))
    {
      exp = TF_ptr_fio[ TF_buffer_texto[ TF_ptexto + 2 ] ].expressao;
    }

    if ( gDriverWindows )
      TextFieldSit_atualizar( estado_cur.lin, estado_cur.col,
                (char *)&TF_ptr_tab_fonte[ fonte ].f.FnomeW,
                (char *)exp, tem_logo );
    else
      TextFieldSit_atualizar( estado_cur.lin, estado_cur.col,
                (char *)&TF_ptr_tab_fonte[ fonte ].f.Fnome,
                (char *)exp, tem_logo );
  }

  return ( TRUE );
}

/*------------------------------------------------------------------------*/
static void TFED_determinar_estado_posicao ( WORD pos, struct est_pos * estado )
/* determinar o estado de composição de um determinado ponto do texto
*/
{
  WORD  larg_pal, larg_tab,
        posi,
        maior_cp,
        lin,
        esp_dist_br,
        esp_br;

  short int tam_pal,
            fonte_def;

  BYTE    *palavra, car;
  struct TF_linha *ptr_linha;

  BOOL  trocar_fonte = TRUE,
        tem_texto = FALSE;

  enum tp_alin alin;

  short int larg = 0;

  HFONT hft_impr_ant = SelectFont( hdc_impr, GetStockObject( SYSTEM_FONT ) );
  HFONT hft_vid_ant = SelectFont( hdc_text, GetStockObject( SYSTEM_FONT ) );

  // localizar a linha em que está a posição de texto desejada
  lin = TFED_achar_linha( pos );

  ptr_linha = &TF_tab_linha[ lin ];

  // recuperar estado inicial da linha
  estado->lin  = lin;
  estado->col  = 0;
  estado->alt  = ptr_linha->maior_cp;
  estado->prof = ptr_linha->prof;
  estado->dentro_campo = ptr_linha->flag_cp;
  estado->dentro_logo = ptr_linha->flag_lg;
  estado->fonte = ptr_linha->ft_atual;

  esp_dist_br = ptr_linha->larg_lin;
  esp_br      = ptr_linha->esp_br;

  fonte_def = ptr_linha->ft_def;

  posi = ptr_linha->posi;

  alin = TF_atual.Just;

  if ( (alin == TF_AL_JUS  &&  ptr_linha->tipo_qb != TF_QB_WORDWRAP) ||
     (ptr_linha->flag_tab == TRUE) )
    alin = TF_AL_ESQ;

  switch ( alin )
  {
    case TF_AL_ESQ:
    case TF_AL_JUS:
      estado->marg = 0;
      break;
    case TF_AL_DIR:
      estado->marg = ptr_linha->larg_lin - ptr_linha->esp_br;
      break;
    case TF_AL_CEN:
      estado->marg = (ptr_linha->larg_lin - ptr_linha->esp_br) / 2;
      break;
  }

  // compondo...
loop:
  tam_pal = 0;

  while ( posi < pos )
  {
    car = TF_buffer_texto[ posi ];

    switch ( car )
    {
      case sBRANCO:
        if (estado->dentro_logo) break;
      case sTAB:
      case sESC:
      case sRETURN:
        goto tratar_cmd;
    }

    if ( tam_pal == 0 )
      palavra = &TF_buffer_texto[ posi ];

    tam_pal++;
    posi++;
  }
  car = 0;  // fim do texto

tratar_cmd: // tratando um comando

  if ( tam_pal > 0 )
  {
    if ( trocar_fonte == TRUE )
    {
      trocar_fonte = FALSE;

      SelectFont( hdc_impr, TF_ptr_tab_fonte[ estado->fonte ].hft );
      SelectFont( hdc_text, TF_ptr_tab_fonte[ estado->fonte ].hft_vid );
    }

    if ( estado->dentro_logo != TRUE )
      larg_pal = TF_largura_da_palavra( hdc_text, palavra, tam_pal,
                            &maior_cp, estado->fonte );
    else larg_pal = larg;
    estado->col  += tam_pal;
    estado->marg += larg_pal;

    tem_texto = TRUE;
  }

  switch ( car )
  {
    case sESC:
      switch ( TF_buffer_texto[ posi + 1 ] )
      {
        case TF_CMD_INVALIDO:
          break;

        case TF_CMD_CAMPO_FIM:
          estado->dentro_campo = FALSE;

          if ( estado->fonte != fonte_def )
          {
            trocar_fonte = TRUE;
            estado->fonte = fonte_def;
          }

          break;

        case TF_CMD_LOGO_FIM:
          estado->dentro_logo = FALSE;
          break;

        case TF_CMD_FONTE:
          if ( estado->fonte != TF_buffer_texto[ posi + 2 ] )
          {
            trocar_fonte = TRUE;
            fonte_def =
            estado->fonte = TF_buffer_texto[ posi + 2 ];
          }
          break;

        case TF_CMD_CAMPO_INI:
          estado->dentro_campo = TRUE;

          if ( estado->fonte != TF_ptr_campo_saida[ TF_buffer_texto[
                        posi + 2 ] ].fonte )
          {
            trocar_fonte = TRUE;
            estado->fonte = TF_ptr_campo_saida[ TF_buffer_texto[
                        posi + 2 ] ].fonte;
          }
          break;

        case TF_CMD_LOGO_INI:
          estado->dentro_logo = TRUE;
          larg = TF_ptr_logo[ TF_buffer_texto[posi+2]].largura;
          break;

        case TF_CMD_FIOH:
          larg_pal = TF_ptr_fio[ TF_buffer_texto[posi+2]].larg_alt;
              goto fio_comum;
        case TF_CMD_FIOV:
          larg_pal = TF_ptr_fio[ TF_buffer_texto[posi+2]].espessura;
          goto fio_comum;

fio_comum:
          estado->col++;
          estado->marg += larg_pal;
          break;
      }
      posi += TF_TAM_CMD;
      break;

    case sRETURN:
      estado->col += 1;
      goto fim;

    case sTAB:
      larg_tab = TF_largura_do_tab( estado->marg );

      estado->col  += 1;
      estado->marg += larg_tab;
        posi++;

      break;

    case sBRANCO:
      if ( trocar_fonte == TRUE )
      {
        trocar_fonte = FALSE;

        SelectFont( hdc_impr, TF_ptr_tab_fonte[ estado->fonte ].hft );
        SelectFont( hdc_text, TF_ptr_tab_fonte[ estado->fonte ].hft_vid );
      }

      larg_pal = TF_largura_branco( hdc_text, &maior_cp, estado->fonte );

      if ( tem_texto == TRUE )
      {
        // recalcula a largura do branco
        if ( alin == TF_AL_JUS  &&  esp_br > 0 )
        {
          WORD  larg_br;

          larg_br = (WORD)(((DWORD)esp_dist_br * larg_pal) / esp_br);

          esp_dist_br -= larg_br;
          esp_br -= larg_pal;

          larg_pal = larg_br;
        }
      }

      estado->col  += 1;
      estado->marg += larg_pal;

      posi++;

      break;

    case 0:
    default:
      goto fim; // fim do texto
  }
  goto loop;

fim:
  SelectFont( hdc_impr, hft_impr_ant );
  SelectFont( hdc_text, hft_vid_ant );
  return;
}

/*------------------------------------------------------------------------*/
static WORD TFED_determinar_posicao_texto ( int marg, int prof, struct est_pos * estado )
/* determinar a posição de texto que melhor se aproxima
*  da margem e da profundidade desejada, retorna também
*  o estado de composição desta posição
*/
{
  WORD  larg_pal, larg_ant, larg_tab,
        posi, posf,
        maior_cp,
        lin,
        esp_dist_br,
        esp_br;

  short int tam_pal,
            fonte_def;

  BYTE   *palavra, car;
  struct TF_linha *ptr_linha;

  BOOL trocar_fonte = TRUE,
       tem_texto = FALSE;

  enum tp_alin alin;

  short int larg = 0;

  HFONT hft_impr_ant = SelectFont( hdc_impr, GetStockObject( SYSTEM_FONT ) );
  HFONT hft_vid_ant = SelectFont( hdc_text, GetStockObject( SYSTEM_FONT ) );

  // localizar a linha que está na profundidade desejada
  for ( lin = 0; lin < TF_tab_linha_tatual; lin++ )
  {
    ptr_linha = &TF_tab_linha[ lin ];

    if ( ptr_linha->prof > prof ) // passou da profundidade
    {
      lin--;
      ptr_linha--;
      break;
    }

    if ( ptr_linha->tipo_qb == TF_QB_NENHUMA )
      break;
  }

  // recuperar estado inicial da linha
  estado->lin  = lin;
  estado->col  = 0;
  estado->alt  = ptr_linha->maior_cp;
  estado->prof = ptr_linha->prof;
  estado->dentro_campo = ptr_linha->flag_cp;
  estado->dentro_logo = ptr_linha->flag_lg;

  estado->fonte = ptr_linha->ft_atual;
  fonte_def = ptr_linha->ft_def;

  esp_dist_br = ptr_linha->larg_lin;
  esp_br = ptr_linha->esp_br;

  posi = ptr_linha->posi;
  posf = (ptr_linha + 1)->posi;

  alin = TF_atual.Just;

  if ( (alin == TF_AL_JUS  &&  ptr_linha->tipo_qb != TF_QB_WORDWRAP) ||
     (ptr_linha->flag_tab == TRUE) )
    alin = TF_AL_ESQ;

  switch ( alin )
  {
    case TF_AL_ESQ:
    case TF_AL_JUS:
      estado->marg = 0;
      break;
    case TF_AL_DIR:
      estado->marg = ptr_linha->larg_lin - ptr_linha->esp_br;
      break;
    case TF_AL_CEN:
      estado->marg = (ptr_linha->larg_lin - ptr_linha->esp_br) / 2;
      break;
  }

  // compondo...
loop:
  if ( estado->marg > marg )
    goto fim;

  tam_pal = 0;

  while ( posi < posf )
  {
    car = TF_buffer_texto[ posi ];

    switch ( car )
    {
      case sBRANCO:
        if ( estado->dentro_logo ) break;
      case sTAB:
      case sESC:
      case sRETURN:
        goto tratar_cmd;
    }

    if ( tam_pal == 0 )
      palavra = &TF_buffer_texto[ posi ];

    tam_pal++;
    posi++;
  }
  car = 0;  // fim do texto

tratar_cmd: // tratando um comando

  if ( tam_pal > 0 )
  {
    if ( trocar_fonte == TRUE )
    {
      trocar_fonte = FALSE;

      SelectFont( hdc_impr, TF_ptr_tab_fonte[ estado->fonte ].hft );
      SelectFont( hdc_text, TF_ptr_tab_fonte[ estado->fonte ].hft_vid );
    }

    if ( estado->dentro_logo != TRUE )
    {
      larg_ant =
      larg_pal = TF_largura_da_palavra( hdc_text, palavra, tam_pal,
                        &maior_cp, estado->fonte );
    }
    else larg_ant = larg_pal = larg;

    if ( estado->marg + larg_pal >= marg )
    {
      // a margem desejada está dentro desta palavra...
      while ( tam_pal >= 0 )
      {
        if ( estado->marg + larg_pal <= marg )
        {
          // testar se foi clicado bem no meio de duas letras
          if ( larg_ant - (marg - estado->marg) <
                (marg - estado->marg) - larg_pal )
          {
            posi++;
            tam_pal++;
          }
          break;
        }

        larg_ant = larg_pal;

        posi--;
        tam_pal--;

        if ( tam_pal > 0 )
          larg_pal = TF_largura_da_palavra( hdc_text, palavra,
                      tam_pal, &maior_cp,
                        /* -1 */ estado->fonte );
        else
          larg_pal = 0;
      }
      estado->col  += tam_pal;
      estado->marg += larg_pal;
      goto fim;
    }

    estado->col  += tam_pal;
    estado->marg += larg_pal;

    tem_texto = TRUE;
  }

  switch ( car )
  {
    case sESC:
      switch ( TF_buffer_texto[ posi + 1 ] )
      {
        case TF_CMD_INVALIDO:
          break;
        case TF_CMD_CAMPO_FIM:
          estado->dentro_campo = FALSE;

          if ( estado->fonte != fonte_def )
          {
            trocar_fonte = TRUE;
            estado->fonte = fonte_def;
          }
          break;
        case TF_CMD_LOGO_FIM:
          estado->dentro_logo = FALSE;
          break;

        case TF_CMD_FONTE:
          if ( estado->fonte != TF_buffer_texto[ posi + 2 ] )
          {
            trocar_fonte = TRUE;
            fonte_def =
            estado->fonte = TF_buffer_texto[ posi + 2 ];
          }
          break;
        case TF_CMD_CAMPO_INI:
          estado->dentro_campo = TRUE;

          if ( estado->fonte != TF_ptr_campo_saida[ TF_buffer_texto[
                        posi + 2 ] ].fonte )
          {
            trocar_fonte = TRUE;
            estado->fonte = TF_ptr_campo_saida[ TF_buffer_texto[
                        posi + 2 ] ].fonte;
          }
          break;
        case TF_CMD_LOGO_INI:
          estado->dentro_logo = TRUE;
          larg = TF_ptr_logo[ TF_buffer_texto[posi+2]].largura;
          break;
        case TF_CMD_FIOH:
          larg_pal = TF_ptr_fio[ TF_buffer_texto[posi+2]].larg_alt;
              goto fio_comum;
        case TF_CMD_FIOV:
          larg_pal = TF_ptr_fio[ TF_buffer_texto[posi+2]].espessura;
          goto fio_comum;

fio_comum:
          if ( estado->marg + larg_pal >= marg )
            goto fim;

          estado->col++;
          estado->marg += larg_pal;
          break;
      }
      posi += TF_TAM_CMD;
      break;

    case sRETURN:
      estado->col += 1;
      goto fim;

    case sTAB:
      larg_tab = TF_largura_do_tab( estado->marg );

      if ( estado->marg + larg_tab > marg )
        goto fim;

      estado->col  += 1;
      estado->marg += larg_tab;

      posi++;

      break;

    case sBRANCO:
      if ( trocar_fonte == TRUE )
      {
        trocar_fonte = FALSE;

        SelectFont( hdc_impr, TF_ptr_tab_fonte[ estado->fonte ].hft );
        SelectFont( hdc_text, TF_ptr_tab_fonte[ estado->fonte ].hft_vid );
      }

      larg_pal = TF_largura_branco( hdc_text, &maior_cp, estado->fonte );

      if ( tem_texto == TRUE )
      {
        // recalcula a largura do branco
        if ( alin == TF_AL_JUS  &&  esp_br > 0 )
        {
          WORD larg_br;

          larg_br = (WORD)(((DWORD)esp_dist_br * larg_pal) / esp_br);

          esp_dist_br -= larg_br;
          esp_br -= larg_pal;

          larg_pal = larg_br;
        }
      }

      if ( estado->marg + larg_pal > marg )
        goto fim;

      estado->col  += 1;
      estado->marg += larg_pal;

      posi++;

      break;

    case 0:
    default:
      goto fim; // fim do texto
  }
  goto loop;

fim:
  if ( ptr_linha->tipo_qb != TF_QB_NENHUMA  &&  posi >= posf )
    posi = posf - 1;

  SelectFont( hdc_impr, hft_impr_ant );
  SelectFont( hdc_text, hft_vid_ant );

  return ( posi );
}
/*------------------------------------------------------------------------*/
static int    quadrante;
static double sen, cosen;
/*------------------------------------------------------------------------*/
static void TFED_pintar_uma_linha ( HDC hdc, struct TF_linha *ptr_linha, struct TF_linha *ptr_linha_ant )
/* pintar uma linha do texto no dispositivo especificado
*/
{
  WORD  larg_pal, larg_tab;
  int   marg, prof, prof_texto;
  WORD  posi, posf, esp_dist_br, esp_br;

  HBRUSH  hbr, hbr_ant;

  short int tam_pal, fonte, fonte_def;
  short int *tl;
  int   tab_esp[ TAM_MAX_PAL ];

  BYTE  *palavra, car,
        *pinibl,
        *pfimbl;

  TEXTMETRIC tm;
  HFONT hft_impr_ant = SelectFont( hdc_impr, GetStockObject( SYSTEM_FONT ) );
  HFONT hft_vid_ant = SelectFont( hdc_text, GetStockObject( SYSTEM_FONT ) );
  HFONT hft_ant = SelectFont( hdc, GetStockObject( SYSTEM_FONT ) );

  RECT retang;

  BOOL  tem_bloco, tem_texto = FALSE;
  WORD  inibl, fimbl;
  RECT  ret_bl, ret_txt;

  short int alt = 0;
  short int larg = 0;
  short int indlogo = 0;
  short int num_br = 0;

  BOOL  trocar_fonte = TRUE, dentro_campo, dentro_logo;
  LONG  l;

  enum tp_alin alin;

  int margr, profr, delta,
      th = TF_atual.obj.TamHor,
      tv = TF_atual.obj.TamVer;

  delta = (TF_atual.Espessura + TF_atual.Sombra) * 2;

  if (TF_atual.Moldurado && (delta < TF_atual.obj.TamHor))
  {
    th -= delta;
    tv -= delta;
  }

  prof = ptr_linha->prof;

  posi = ptr_linha->posi;
  posf = (ptr_linha + 1)->posi;

  fonte_def = ptr_linha->ft_def;
  fonte = ptr_linha->ft_atual;

  esp_dist_br = ptr_linha->larg_lin;
  esp_br = ptr_linha->esp_br;

  dentro_campo = ptr_linha->flag_cp;
  dentro_logo  = ptr_linha->flag_lg;

  hbr = CreateSolidBrush( RGB( 0, 0, 0 ) );
  hbr_ant = SelectBrush( hdc, hbr );

  SetBkMode( hdc, TRANSPARENT );

  alin = TF_atual.Just;

  if ( (alin == TF_AL_JUS  &&  ptr_linha->tipo_qb != TF_QB_WORDWRAP) ||
     (ptr_linha->flag_tab == TRUE) )
    alin = TF_AL_ESQ;

  switch ( alin )
  {
    case TF_AL_ESQ:
    case TF_AL_JUS:
      marg = 0;
      break;
    case TF_AL_DIR:
      marg = ptr_linha->larg_lin - ptr_linha->esp_br;
      break;
    case TF_AL_CEN:
      marg = (ptr_linha->larg_lin - ptr_linha->esp_br) / 2;
      break;
  }

  // descontar o scroll
  if ( hwnd_text != NULL )
    l = SendMessage( hwnd_text, SM_GETSCROLLPOS, 0, 0L );
  else
    l = MAKELONG( 0, 0 );

  marg -= (int)LOWORD( l );
  prof -= (int)HIWORD( l );

  // verificando se existe bloco a ser marcado nesta linha
  if ( (tem_bloco = TFED_ler_pos_bloco( &inibl, &fimbl )) == TRUE )
  {
    if ( inibl >= posf  ||  fimbl < posi )
      tem_bloco = FALSE;
    else
    {
      inibl = max( posi, inibl );
      fimbl = min( posf, fimbl );

      ret_bl.top    = prof;
      ret_bl.bottom = prof + ptr_linha->maior_cp;
      ret_bl.right  = TF_atual.obj.TamHor;

      pinibl = pfimbl = NULL;
    }
  }

  ret_txt.top = prof;
  ret_txt.left = 0;
  ret_txt.bottom = prof + ptr_linha->maior_cp;
  ret_txt.right  = TF_atual.obj.TamHor;

  // compondo...
loop:
  if ( trocar_fonte == TRUE )
  {
    trocar_fonte = FALSE;

    SelectFont( hdc_impr, TF_ptr_tab_fonte[ fonte ].hft );
    SelectFont( hdc_text, TF_ptr_tab_fonte[ fonte ].hft_vid );

    if ( hdc_text != hdc )
      SelectFont( hdc, TF_ptr_tab_fonte[ fonte ].hft_vid );

//    GetTextMetrics( hdc_text, &tm );
    GetTextMetrics( hdc_impr, &tm );

    tl = TF_ptr_tab_fonte[ fonte ].tab_larg;
  }

  larg_pal = 0;
  tam_pal = 0;

  while ( posi < posf )
  {
    int larg_caractere;

    car = TF_buffer_texto[ posi ];

    if ( tem_bloco )
    {
      if ( posi == inibl )
        pinibl = &TF_buffer_texto[ posi ];
      if ( posi == fimbl )
        pfimbl = &TF_buffer_texto[ posi ];
    }

    switch ( car )
    {
      case sBRANCO:
        if ( dentro_logo ) break;

        larg_caractere = tl[ ' ' ];

        if ( tem_texto == TRUE )
        {
          num_br++;

          // recalcula a largura do branco
          if (num_br > ptr_linha->num_br)
          {
            // brancos no final da linha, abandoná-los...
            posi = posf;
            continue;
          }
          else
          if ( alin == TF_AL_JUS  &&  esp_br > 0 )
          {
            larg_caractere = (WORD)(((DWORD)esp_dist_br * larg_caractere) / esp_br);

            esp_dist_br -= larg_caractere;
            esp_br -= tl[ ' ' ];
          }
        }
        else
        if (ptr_linha_ant == NULL ||
            ptr_linha_ant->tipo_qb != TF_QB_WORDWRAP)
        {
          // se margem de parágrafo via brancos, não imprime os brancos,
          // só avança a margem
          marg += larg_caractere;
          posi++;
          continue;
        }
//        if ( alin != TF_AL_JUS )
        break;  // tratar o branco como um caracter comum
      case sTAB:
      case sESC:
      case sRETURN:
        goto tratar_cmd;
      default:
        // outros casos
        tem_texto = TRUE;
        larg_caractere = tl[ (WORD)car ];
        break;
    }

    if ( tam_pal == 0 )
      palavra = &TF_buffer_texto[ posi ];

//    if ( tam_pal < TAM_MAX_PAL )
    tab_esp[ tam_pal ] = larg_caractere;

    if ( dentro_logo == FALSE )
      larg_pal += larg_caractere;

    tam_pal++;
    posi++;

    if ( tam_pal == TAM_MAX_PAL )
    {
      car = 1;
      goto tratar_cmd;
    }
  }
  car = 0;  // fim do texto

tratar_cmd:   // tratando um comando
  if ( dentro_logo == TRUE )
    larg_pal = larg;

  if ( tam_pal > 0 )
  {
    if ( flag_para_impressora )
      SetTextColor( hdc, TF_ptr_tab_fonte[ fonte ].CorFonteSel );   // 03/09/2003
//      SetTextColor( hdc, RGB( 0, 0, 0 ) );
    else
    if ( flag_previa_real )
    {
      if ( gPrinter == XEROX )
      { // SYLA 06/11/97 TESTE !!!!!!!!!!!!!!!
        if ( TF_ptr_tab_fonte[ fonte ].f.color == 0  )    // alterado SYLA 17/08/95
          SetTextColor( hdc, RGB( 0, 0, 0 ) );
        else
        {
          if ( Arq.CorHilite == 1 )
            SetTextColor( hdc, RGB( 127, 0, 0 ) );
          else
          if ( Arq.CorHilite == 2 )
                SetTextColor( hdc, RGB( 0, 127, 0 ) );
          else  SetTextColor( hdc, RGB( 0, 0, 127 ) );
        }
      }
      else SetTextColor( hdc, TF_ptr_tab_fonte[ fonte ].CorFonteSel );  // 03/09/2003
    }
    else
    if ( dentro_campo == TRUE  )    // alterado SYLA 17/08/95
      SetTextColor( hdc, RGB( 127, 0, 0 ) );
    else
      SetTextColor( hdc, RGB( 0, 0, 0 ) );

    if (dentro_logo == TRUE)
        prof_texto = prof;
    else
    {
      if (TF_ptr_tab_fonte[ fonte ].Fsobre)
      {
        if (gerando_metafile || hwnd_text != NULL)
          prof_texto = prof + ptr_linha->baseline - tm.tmAscent / 2;
        else
          prof_texto = prof + ptr_linha->baseline - (tm.tmAscent * 3) / 2;
//          int h = (tm.tmAscent * 3) / 2;
//          prof_texto = prof + ptr_linha->baseline - h;
      }
      else
      if (TF_ptr_tab_fonte[ fonte ].Fsub)
      {
        if (gerando_metafile || hwnd_text != NULL)
          prof_texto = prof + ptr_linha->baseline + tm.tmDescent / 2;
        else
          prof_texto = prof + ptr_linha->baseline + (tm.tmDescent * 3) / 2
                            - (tm.tmAscent + tm.tmDescent);
//          int h = (tm.tmDescent * 3) / 2;
//          prof_texto = prof + ptr_linha->baseline + h - (tm.tmAscent + tm.tmDescent);
      }
      else
      if (gerando_metafile || hwnd_text != NULL)
        prof_texto = prof + ptr_linha->baseline;
      else
        prof_texto = prof + ptr_linha->baseline - tm.tmAscent;
//        prof_texto = prof + ptr_linha->baseline - tm.tmAscent;
    }

    if ( dentro_logo == FALSE )
    {
      switch ( TF_atual.obj.Orientacao )
      {
        case OO_NORMAL:
//            if ( tam_pal > TAM_MAX_PAL )
//              TextOut( hdc, marg, prof_texto, palavra, tam_pal );
//            else
          ExtTextOut( hdc, marg, prof_texto, 0, NULL, //ETO_CLIPPED, &ret_txt,
                    palavra, (UINT)tam_pal, tab_esp );
          break;
        case OO_CIMA:
//            if ( tam_pal > TAM_MAX_PAL )
//              TextOut( hdc, prof_texto, -marg, palavra, tam_pal );
//            else
          ExtTextOut( hdc, prof_texto, -marg + th, 0, NULL,
                    palavra, tam_pal, tab_esp );
          break;
        case OO_BAIXO:
//            if ( tam_pal > TAM_MAX_PAL )
//              TextOut( hdc, -prof_texto, marg, palavra, tam_pal );
//            else
          ExtTextOut( hdc, -prof_texto + tv, marg, 0, NULL, palavra, tam_pal, tab_esp );
          break;
        case OO_INVERTIDO:
//            if ( tam_pal > TAM_MAX_PAL )
//              TextOut( hdc, -marg, -prof_texto, palavra, tam_pal );
//            else
          ExtTextOut( hdc, -marg + th, -prof_texto + tv, 0, NULL, palavra, tam_pal, tab_esp );
          break;
        default:    // falta tratar outra rotacao
          {
            switch (quadrante)
            {
              case 1:
                margr = marg * cosen  + prof_texto * sen;
                profr = marg * (-sen) + prof_texto * cosen  + th * sen;
                break;
              case 2:
                margr = marg * (-sen)   + prof_texto * cosen  + th * sen;
                profr = marg * (-cosen) + prof_texto * (-sen) + th * cosen + tv * sen;
                break;
              case 3:
                margr = marg * (-cosen) + prof_texto * (-sen)   + th * cosen + tv * sen;
                profr = marg * sen      + prof_texto * (-cosen) + tv * cosen;
                break;
              case 4:
                margr = marg * sen    + prof_texto * (-cosen)  + tv * cosen;
                profr = marg * cosen  + prof_texto * sen;
                break;
            }

            ExtTextOut( hdc, margr, profr, 0, NULL,
                    palavra, (UINT)tam_pal, tab_esp );
          }
          break;
      }
    }
    else
    { // LOGO
      POINT ptLine[5];
      BOOL  giro_especial = FALSE;
      int thg, tvg;

      switch ( TF_atual.obj.Orientacao )
      {
        case OO_NORMAL:
          retang.left   = marg;
          retang.top    = prof_texto;
          retang.right  = retang.left + larg;
          retang.bottom = retang.top + alt;
          break;

        case OO_INVERTIDO:
//          retang.left   = -marg + th - larg;
//          retang.top    = -prof_texto + tv - alt;
//          retang.right  = retang.left + larg;
//          retang.bottom = retang.top + alt;
//          break;

        case OO_CIMA:
//          retang.left   = prof_texto;
//          retang.top    = -marg + th - larg;
//          retang.right  = retang.left + alt;
//          retang.bottom = retang.top + larg;
//          break;

        case OO_BAIXO:
//          retang.left   = -prof_texto + tv - alt;
//          retang.top    = marg;
//          retang.right  = retang.left + alt;
//          retang.bottom = retang.top + larg;
//          break;

        default:    // falta tratar outra rotacao
          {
            giro_especial = TRUE;

            // imagina no 1o quadrante e depois gira
            retang.left   = marg;
            retang.top    = prof_texto;
            retang.right  = retang.left + larg;
            retang.bottom = retang.top + alt;

            switch (quadrante)
            {
              case 1:
                ptLine[0].x = retang.left  * cosen  + retang.top    * sen;
                ptLine[0].y = retang.left  * (-sen) + retang.top    * cosen  + th * sen;
                ptLine[1].x = retang.right * cosen  + retang.top    * sen;
                ptLine[1].y = retang.right * (-sen) + retang.top    * cosen  + th * sen;
                ptLine[2].x = retang.right * cosen  + retang.bottom * sen;
                ptLine[2].y = retang.right * (-sen) + retang.bottom * cosen  + th * sen;
                ptLine[3].x = retang.left  * cosen  + retang.bottom * sen;
                ptLine[3].y = retang.left  * (-sen) + retang.bottom * cosen  + th * sen;

                ptLine[4].x = ptLine[0].x;
                ptLine[4].y = ptLine[1].y;

                thg = larg * cosen + alt * sen;
                tvg = larg * sen   + alt * cosen;
                break;
              case 2:
                ptLine[0].x = retang.left  * (-sen)   + retang.top    * cosen  + th * sen;
                ptLine[0].y = retang.left  * (-cosen) + retang.top    * (-sen) + th * cosen + tv * sen;
                ptLine[1].x = retang.right * (-sen)   + retang.top    * cosen  + th * sen;
                ptLine[1].y = retang.right * (-cosen) + retang.top    * (-sen) + th * cosen + tv * sen;
                ptLine[2].x = retang.right * (-sen)   + retang.bottom * cosen  + th * sen;
                ptLine[2].y = retang.right * (-cosen) + retang.bottom * (-sen) + th * cosen + tv * sen;
                ptLine[3].x = retang.left  * (-sen)   + retang.bottom * cosen  + th * sen;
                ptLine[3].y = retang.left  * (-cosen) + retang.bottom * (-sen) + th * cosen + tv * sen;

                ptLine[4].x = ptLine[1].x;
                ptLine[4].y = ptLine[2].y;

                thg = larg * sen   + alt * cosen;
                tvg = larg * cosen + alt * sen;
                break;
              case 3:
                ptLine[0].x = retang.left  * (-cosen) + retang.top    * (-sen)   + th * cosen + tv * sen;
                ptLine[0].y = retang.left  * sen      + retang.top    * (-cosen) + tv * cosen;
                ptLine[1].x = retang.right * (-cosen) + retang.top    * (-sen)   + th * cosen + tv * sen;
                ptLine[1].y = retang.right * sen      + retang.top    * (-cosen) + tv * cosen;
                ptLine[2].x = retang.right * (-cosen) + retang.bottom * (-sen)   + th * cosen + tv * sen;
                ptLine[2].y = retang.right * sen      + retang.bottom * (-cosen) + tv * cosen;
                ptLine[3].x = retang.left  * (-cosen) + retang.bottom * (-sen)   + th * cosen + tv * sen;
                ptLine[3].y = retang.left  * sen      + retang.bottom * (-cosen) + tv * cosen;

                ptLine[4].x = ptLine[2].x;
                ptLine[4].y = ptLine[3].y;

                thg = larg * cosen + alt * sen;
                tvg = larg * sen   + alt * cosen;
                break;
              case 4:
                ptLine[0].x = retang.left  * sen      + retang.top    * (-cosen) + tv * cosen;
                ptLine[0].y = retang.left  * cosen    + retang.top    * sen;
                ptLine[1].x = retang.right * sen      + retang.top    * (-cosen) + tv * cosen;
                ptLine[1].y = retang.right * cosen    + retang.top    * sen;
                ptLine[2].x = retang.right * sen      + retang.bottom * (-cosen) + tv * cosen;
                ptLine[2].y = retang.right * cosen    + retang.bottom * sen;
                ptLine[3].x = retang.left  * sen      + retang.bottom * (-cosen) + tv * cosen;
                ptLine[3].y = retang.left  * cosen    + retang.bottom * sen;

                ptLine[4].x = ptLine[3].x;
                ptLine[4].y = ptLine[0].y;

                thg = larg * sen   + alt * cosen;
                tvg = larg * cosen + alt * sen;
                break;
            }

            retang.left   =
            retang.top    =
            retang.right  =
            retang.bottom = 0;
          }
          break;
      }

      if ( flag_previa_real )
      {
        BOOL imprimir;
        char * bmp;
        enum result_expr resp;

        resp = CalculaExpr( TF_ptr_logo[ indlogo ].expressao, &bmp );
        if ( resp != RE_ERRO && resp != RE_FALSE_SEM_VALOR )
          imprimir = TRUE;
        else
          imprimir = FALSE;
        if ( imprimir )
        {
          int res = (TF_ptr_logo[ indlogo ].resolucao == 0)
                      ? gDpiImagem
                      : TF_ptr_logo[ indlogo ].resolucao;

          bmp = DefinirExtensao(RedefinirPastaRecursoImagem(bmp));  // se não tem extensão tenta:BMP, JPE, JPG, JPEG, GIF

          if (giro_especial)
          {
            DWORD drop = (  gDriverWindows==TRUE && gTipoDriverWindows != DPCL ) ?
                        SRCCOPY : /* Outros - PostScript */
                        SRCAND;   /* PCL */

            if (gDriverWindows &&
                (TF_ptr_logo[ indlogo ].expType > 0) &&
                (TF_ptr_logo[ indlogo ].largura != 0) &&
                (TF_ptr_logo[ indlogo ].altura != 0) )
            {
              int tipo = (TF_ptr_logo[ indlogo ].expType == 1)? ZOOM_ENCAIXAR : ZOOM_ENCHER;

              PintarBitmapGirando(hdc, ptLine[4].x, ptLine[4].y, thg, tvg,
                          TF_atual.obj.Orientacao, bmp, larg, alt,
                          gUMA_POLEGADA, res, drop, tipo);
            }
            else
              PintarBitmapGirando(hdc, ptLine[4].x, ptLine[4].y, thg, tvg,
                          TF_atual.obj.Orientacao, bmp, larg, alt,
                          gUMA_POLEGADA, res, drop, 0);
          }
          else
          {
            if (gDriverWindows &&
                (TF_ptr_logo[ indlogo ].expType > 0) &&
                (TF_ptr_logo[ indlogo ].largura != 0) &&
                (TF_ptr_logo[ indlogo ].altura != 0) )
            {
              int tipo = (TF_ptr_logo[ indlogo ].expType == 1)? ZOOM_ENCAIXAR : ZOOM_ENCHER;

              BitmapDesenharImagemComZoom(hdc,
                          retang.left,
                          retang.top,
                          TF_ptr_logo[ indlogo ].largura,
                          TF_ptr_logo[ indlogo ].altura, bmp, tipo);
            }
            else
              BitmapDesenharImagem(hdc, retang.left, retang.top, bmp, res);
          }
        }
      }
      else
      if (IsRectEmpty(&retang) == FALSE)
      {
        HPEN pen = CreatePen(PS_DASH, 0, RGB(0,0,0)),
             pen_old = SelectObject(hdc, pen);

        if (TF_ptr_logo[ indlogo ].ptr_img != NULL)
          IMG_PintarImagem(hdc, retang.left, retang.top,
                TF_ptr_logo[ indlogo ].ptr_img, FALSE, SRCAND);

        if (hwnd_text != NULL || TF_ptr_logo[ indlogo ].ptr_img == NULL)
        {
          // em edição...
          MoveToEx( hdc, retang.left, retang.top, NULL );
          LineTo( hdc, retang.left, retang.bottom );
          LineTo( hdc, retang.right, retang.bottom );
          LineTo( hdc, retang.right, retang.top );
          LineTo( hdc, retang.left, retang.top );
        }

        if (TF_ptr_logo[ indlogo ].ptr_img == NULL)
        {
          int larg = 106, alt = 106;
          HDC hdc_mem = CreateCompatibleDC(NULL);
          HBITMAP hbm_old = SelectObject(hdc_mem, bmpCopo0);

          if (abs(retang.right - retang.left) < 106) larg = abs(retang.right - retang.left);
          if (abs(retang.bottom - retang.top) < 106)  alt  = abs(retang.bottom - retang.top);

          StretchBlt(hdc, retang.left + 1, retang.top + 1, larg, alt, hdc_mem, 0, 0, 34, 34, SRCAND);

          SelectObject(hdc_mem, hbm_old);
          DeleteDC( hdc_mem );
//          LineTo( hdc, retang.right, retang.bottom );
//          MoveToEx( hdc, retang.right, retang.top, NULL );
//          LineTo( hdc, retang.left, retang.bottom );
        }
        SelectObject(hdc, pen_old);
        DeleteObject(pen);
      }
      else
      {
        // é campo texto inclinado
        if (TF_ptr_logo[indlogo].ptr_img != NULL)
        {
          TF_ptr_logo[indlogo].ptr_img = IMG_GirarImagem(TF_ptr_logo[indlogo].ptr_img,
                                        TF_atual.obj.Orientacao);
          if (TF_ptr_logo[indlogo].ptr_img != NULL)
            IMG_PintarImagem(hdc, ptLine[4].x, ptLine[4].y,
                        TF_ptr_logo[indlogo].ptr_img, FALSE, SRCAND);
        }
        else
        {
          HPEN pen = CreatePen(PS_DASH, 0, RGB(0,0,0)),
              pen_old = SelectObject(hdc, pen);

          if ((TF_atual.obj.Orientacao % 90) == 0)
          {
            int _larg = 106, _alt = 106, marg, prof;
            HDC hdc_mem = CreateCompatibleDC(NULL);
            HBITMAP hbm_old;

            if (thg < 106) _larg = thg;
            if (tvg < 106) _alt  = tvg;

            switch (TF_atual.obj.Orientacao)
            {
              case OO_CIMA:
                hbm_old = SelectObject(hdc_mem, bmpCopo90);
                marg = ptLine[4].x;
                prof = ptLine[4].y + tvg - _alt;
                break;
              case OO_BAIXO:
                hbm_old = SelectObject(hdc_mem, bmpCopo270);
                marg = ptLine[4].x + thg - _alt;
                prof = ptLine[4].y;
                break;
              case OO_INVERTIDO:
                hbm_old = SelectObject(hdc_mem, bmpCopo180);
                marg = ptLine[4].x + thg - _larg;
                prof = ptLine[4].y + tvg - _alt;
                break;
            }

            StretchBlt(hdc, marg + 1, prof + 1, _larg, _alt, hdc_mem, 0, 0, 34, 34, SRCAND);

            SelectObject(hdc_mem, hbm_old);
                  DeleteDC( hdc_mem );
          }

          MoveToEx( hdc, ptLine[0].x, ptLine[0].y, NULL );
          LineTo( hdc, ptLine[1].x, ptLine[1].y );
          LineTo( hdc, ptLine[2].x, ptLine[2].y );
          LineTo( hdc, ptLine[3].x, ptLine[3].y );
          LineTo( hdc, ptLine[0].x, ptLine[0].y );
//          LineTo( hdc, ptLine[2].x, ptLine[2].y );
//          MoveToEx( hdc, ptLine[1].x, ptLine[1].y, NULL );
//          LineTo( hdc, ptLine[3].x, ptLine[3].y );
          SelectObject(hdc, pen_old);
          DeleteObject(pen);
        }
      }
    }

    if ( tem_bloco )
    {
      if ( pinibl != NULL )
      {
//        ret_bl.left = marg +
//                      TF_largura_da_palavra( hdc_text, palavra,
//                          pinibl - palavra, &maior_cp, fonte );
        int k;

        ret_bl.left = marg;

        for (k = 0; k < pinibl - palavra; k++)
          ret_bl.left += tab_esp[k];

        pinibl = NULL;
      }
      if ( pfimbl != NULL )
      {
//        ret_bl.right = marg +
//                        TF_largura_da_palavra( hdc_text, palavra,
//                          pfimbl - palavra, &maior_cp, fonte );
        int k;

        ret_bl.right = marg;

        for (k = 0; k < pfimbl - palavra; k++)
          ret_bl.right += tab_esp[k];

        pfimbl = NULL;
      }
    }

    marg += larg_pal;

    tem_texto = TRUE;
  }

  switch ( car )
  {
    case sESC:
      if ( tem_bloco )
      {
        if ( pinibl != NULL )
        {
          ret_bl.left = marg;

          pinibl = NULL;
        }
        if ( pfimbl != NULL )
        {
          ret_bl.right = marg;

          pfimbl = NULL;
        }
      }

      switch ( TF_buffer_texto[ posi + 1 ] )
      {
        case TF_CMD_INVALIDO:
          break;
        case TF_CMD_CAMPO_FIM:
          dentro_campo = FALSE;

          if ( fonte != fonte_def )
          {
            trocar_fonte = TRUE;
            fonte = fonte_def;
          }
          break;

        case TF_CMD_LOGO_FIM:
          dentro_logo = FALSE;
          break;

        case TF_CMD_FONTE:
          if ( fonte != TF_buffer_texto[ posi + 2 ] )
          {
            trocar_fonte = TRUE;
            fonte_def =
            fonte = TF_buffer_texto[ posi + 2 ];
          }
          break;
        case TF_CMD_CAMPO_INI:
          dentro_campo = TRUE;

          if ( fonte != TF_ptr_campo_saida[ TF_buffer_texto[
                        posi + 2 ] ].fonte )
          {
            trocar_fonte = TRUE;
            fonte = TF_ptr_campo_saida[ TF_buffer_texto[
                        posi + 2 ] ].fonte;
          }
          break;

        case TF_CMD_LOGO_INI:
          indlogo = TF_buffer_texto[posi+2];
          alt = TF_ptr_logo[ TF_buffer_texto[posi+2]].altura;
          larg = TF_ptr_logo[ TF_buffer_texto[posi+2]].largura;
          dentro_logo = TRUE;
          break;

        case TF_CMD_FIOH:
          larg_pal = TF_ptr_fio[ TF_buffer_texto[posi+2]].larg_alt;

          switch ( TF_atual.obj.Orientacao )
          {
            case OO_NORMAL:
              retang.left   = marg;
              retang.bottom = prof + ptr_linha->baseline;
              retang.right  = retang.left + larg_pal;
              retang.top    = retang.bottom -
                                  TF_ptr_fio[ TF_buffer_texto[posi+2]].espessura;
              break;
            case OO_CIMA:
              retang.right  = prof + ptr_linha->baseline;
              retang.bottom = -marg + th;
              retang.left   = retang.right - TF_ptr_fio[ TF_buffer_texto[posi+2]].espessura;
              retang.top    = retang.bottom - larg_pal;
              break;
            case OO_BAIXO:
              retang.left   = -prof + tv - ptr_linha->baseline;
              retang.top    = marg;
              retang.right  = retang.left + TF_ptr_fio[ TF_buffer_texto[posi+2]].espessura;
              retang.bottom = retang.top + larg_pal;
              break;
            case OO_INVERTIDO:
              retang.right  = -marg + th;
              retang.left   = retang.right - larg_pal;
              retang.bottom = -prof + tv - ptr_linha->baseline;
              retang.top    = retang.bottom -
                                  TF_ptr_fio[ TF_buffer_texto[posi+2]].espessura;
              break;

            default:    // falta tratar outra rotacao
              {
                int delta,
                th = TF_atual.obj.TamHor,
                tv = TF_atual.obj.TamVer;

                POINT ptLine[5];

                delta = (TF_atual.Espessura + TF_atual.Sombra) * 2;

                if (TF_atual.Moldurado && (delta < TF_atual.obj.TamHor))
                {
                  th -= delta;
                  tv -= delta;
                }

                // imagina no 1o quadrante e depois gira
                retang.left   = marg;
                retang.bottom = prof + ptr_linha->baseline;
                retang.right  = retang.left + larg_pal;
                retang.top    = retang.bottom -
                                  TF_ptr_fio[ TF_buffer_texto[posi+2]].espessura;

                switch (quadrante)
                {
                  case 1:
                    ptLine[0].x = retang.left  * cosen  + retang.top    * sen;
                    ptLine[0].y = retang.left  * (-sen) + retang.top    * cosen  + th * sen;
                    ptLine[1].x = retang.right * cosen  + retang.top    * sen;
                    ptLine[1].y = retang.right * (-sen) + retang.top    * cosen  + th * sen;
                    ptLine[2].x = retang.right * cosen  + retang.bottom * sen;
                    ptLine[2].y = retang.right * (-sen) + retang.bottom * cosen  + th * sen;
                    ptLine[3].x = retang.left  * cosen  + retang.bottom * sen;
                    ptLine[3].y = retang.left  * (-sen) + retang.bottom * cosen  + th * sen;
                    break;
                  case 2:
                    ptLine[0].x = retang.left  * (-sen)   + retang.top    * cosen  + th * sen;
                    ptLine[0].y = retang.left  * (-cosen) + retang.top    * (-sen) + th * cosen + tv * sen;
                    ptLine[1].x = retang.right * (-sen)   + retang.top    * cosen  + th * sen;
                    ptLine[1].y = retang.right * (-cosen) + retang.top    * (-sen) + th * cosen + tv * sen;
                    ptLine[2].x = retang.right * (-sen)   + retang.bottom * cosen  + th * sen;
                    ptLine[2].y = retang.right * (-cosen) + retang.bottom * (-sen) + th * cosen + tv * sen;
                    ptLine[3].x = retang.left  * (-sen)   + retang.bottom * cosen  + th * sen;
                    ptLine[3].y = retang.left  * (-cosen) + retang.bottom * (-sen) + th * cosen + tv * sen;
                    break;
                  case 3:
                    ptLine[0].x = retang.left  * (-cosen) + retang.top    * (-sen)   + th * cosen + tv * sen;
                    ptLine[0].y = retang.left  * sen      + retang.top    * (-cosen) + tv * cosen;
                    ptLine[1].x = retang.right * (-cosen) + retang.top    * (-sen)   + th * cosen + tv * sen;
                    ptLine[1].y = retang.right * sen      + retang.top    * (-cosen) + tv * cosen;
                    ptLine[2].x = retang.right * (-cosen) + retang.bottom * (-sen)   + th * cosen + tv * sen;
                    ptLine[2].y = retang.right * sen      + retang.bottom * (-cosen) + tv * cosen;
                    ptLine[3].x = retang.left  * (-cosen) + retang.bottom * (-sen)   + th * cosen + tv * sen;
                    ptLine[3].y = retang.left  * sen      + retang.bottom * (-cosen) + tv * cosen;
                    break;
                  case 4:
                    ptLine[0].x = retang.left  * sen      + retang.top    * (-cosen) + tv * cosen;
                    ptLine[0].y = retang.left  * cosen    + retang.top    * sen;
                    ptLine[1].x = retang.right * sen      + retang.top    * (-cosen) + tv * cosen;
                    ptLine[1].y = retang.right * cosen    + retang.top    * sen;
                    ptLine[2].x = retang.right * sen      + retang.bottom * (-cosen) + tv * cosen;
                    ptLine[2].y = retang.right * cosen    + retang.bottom * sen;
                    ptLine[3].x = retang.left  * sen      + retang.bottom * (-cosen) + tv * cosen;
                    ptLine[3].y = retang.left  * cosen    + retang.bottom * sen;
                    break;
                }

                Polygon( hdc, ptLine, 4 );

                retang.left   =
                retang.top    =
                retang.right  =
                retang.bottom = 0;
              }
              break;
          }

          if (IsRectEmpty(&retang) == FALSE)
            Rectangle( hdc, retang.left,
                            retang.top,
                            retang.right,
                            retang.bottom );

          tem_texto = TRUE;
          marg += larg_pal;
          break;

        case TF_CMD_FIOV:
          larg_pal = TF_ptr_fio[ TF_buffer_texto[posi+2]].espessura;

          switch ( TF_atual.obj.Orientacao )
          {
            case OO_NORMAL:
              retang.top    = prof + ptr_linha->baseline;
              retang.bottom = retang.top +
                                  TF_ptr_fio[ TF_buffer_texto[posi+2]].larg_alt;
              retang.left   = marg;
              retang.right  = retang.left + larg_pal;
              break;

            case OO_INVERTIDO:
              retang.bottom = -prof + tv - ptr_linha->baseline;
              retang.top    = retang.bottom -
                                  TF_ptr_fio[ TF_buffer_texto[posi+2]].larg_alt;
              retang.right  = -marg + th;
              retang.left   = retang.right - larg_pal;
              break;

            case OO_CIMA:
              retang.bottom = -marg + th;
              retang.top    = retang.bottom - larg_pal;
              retang.left   = prof + ptr_linha->baseline;
              retang.right  = retang.left + TF_ptr_fio[ TF_buffer_texto[posi+2]].larg_alt;
              break;

            case OO_BAIXO:
              retang.right  = -prof + tv - ptr_linha->baseline;
              retang.left   = retang.right - TF_ptr_fio[ TF_buffer_texto[posi+2]].larg_alt;
              retang.top    = marg;
              retang.bottom = retang.top + larg_pal;
              break;

            default:    // falta tratar outra rotacao
              {
                int delta,
                th = TF_atual.obj.TamHor,
                tv = TF_atual.obj.TamVer;

                POINT ptLine[5];

                delta = (TF_atual.Espessura + TF_atual.Sombra) * 2;

                if (TF_atual.Moldurado && (delta < TF_atual.obj.TamHor))
                {
                  th -= delta;
                  tv -= delta;
                }

                // imagina no 1o quadrante e depois gira
                retang.top    = prof + ptr_linha->baseline;
                retang.bottom = retang.top +
                                    TF_ptr_fio[ TF_buffer_texto[posi+2]].larg_alt;
                retang.left   = marg;
                retang.right  = retang.left + larg_pal;

                switch (quadrante)
                {
                  case 1:
                    ptLine[0].x = retang.left  * cosen  + retang.top    * sen;
                    ptLine[0].y = retang.left  * (-sen) + retang.top    * cosen  + th * sen;
                    ptLine[1].x = retang.right * cosen  + retang.top    * sen;
                    ptLine[1].y = retang.right * (-sen) + retang.top    * cosen  + th * sen;
                    ptLine[2].x = retang.right * cosen  + retang.bottom * sen;
                    ptLine[2].y = retang.right * (-sen) + retang.bottom * cosen  + th * sen;
                    ptLine[3].x = retang.left  * cosen  + retang.bottom * sen;
                    ptLine[3].y = retang.left  * (-sen) + retang.bottom * cosen  + th * sen;
                    break;
                  case 2:
                    ptLine[0].x = retang.left  * (-sen)   + retang.top    * cosen  + th * sen;
                    ptLine[0].y = retang.left  * (-cosen) + retang.top    * (-sen) + th * cosen + tv * sen;
                    ptLine[1].x = retang.right * (-sen)   + retang.top    * cosen  + th * sen;
                    ptLine[1].y = retang.right * (-cosen) + retang.top    * (-sen) + th * cosen + tv * sen;
                    ptLine[2].x = retang.right * (-sen)   + retang.bottom * cosen  + th * sen;
                    ptLine[2].y = retang.right * (-cosen) + retang.bottom * (-sen) + th * cosen + tv * sen;
                    ptLine[3].x = retang.left  * (-sen)   + retang.bottom * cosen  + th * sen;
                    ptLine[3].y = retang.left  * (-cosen) + retang.bottom * (-sen) + th * cosen + tv * sen;
                    break;
                  case 3:
                    ptLine[0].x = retang.left  * (-cosen) + retang.top    * (-sen)   + th * cosen + tv * sen;
                    ptLine[0].y = retang.left  * sen      + retang.top    * (-cosen) + tv * cosen;
                    ptLine[1].x = retang.right * (-cosen) + retang.top    * (-sen)   + th * cosen + tv * sen;
                    ptLine[1].y = retang.right * sen      + retang.top    * (-cosen) + tv * cosen;
                    ptLine[2].x = retang.right * (-cosen) + retang.bottom * (-sen)   + th * cosen + tv * sen;
                    ptLine[2].y = retang.right * sen      + retang.bottom * (-cosen) + tv * cosen;
                    ptLine[3].x = retang.left  * (-cosen) + retang.bottom * (-sen)   + th * cosen + tv * sen;
                    ptLine[3].y = retang.left  * sen      + retang.bottom * (-cosen) + tv * cosen;
                    break;
                  case 4:
                    ptLine[0].x = retang.left  * sen      + retang.top    * (-cosen) + tv * cosen;
                    ptLine[0].y = retang.left  * cosen    + retang.top    * sen;
                    ptLine[1].x = retang.right * sen      + retang.top    * (-cosen) + tv * cosen;
                    ptLine[1].y = retang.right * cosen    + retang.top    * sen;
                    ptLine[2].x = retang.right * sen      + retang.bottom * (-cosen) + tv * cosen;
                    ptLine[2].y = retang.right * cosen    + retang.bottom * sen;
                    ptLine[3].x = retang.left  * sen      + retang.bottom * (-cosen) + tv * cosen;
                    ptLine[3].y = retang.left  * cosen    + retang.bottom * sen;
                    break;
                }

                Polygon( hdc, ptLine, 4 );

                retang.left   =
                retang.top    =
                retang.right  =
                retang.bottom = 0;
              }
              break;

          }

          if (IsRectEmpty(&retang) == FALSE)
            Rectangle( hdc, retang.left,
                            retang.top,
                            retang.right,
                            retang.bottom );

          tem_texto = TRUE;
          marg += larg_pal;
          break;
      }
      posi += TF_TAM_CMD;
      break;

    case sRETURN:
      if ( tem_bloco )
      {
        if ( pinibl != NULL )
          ret_bl.left = marg;
        if ( pfimbl != NULL )
          ret_bl.right = marg;
      }
      goto fim;

    case sTAB:
      if ( tem_bloco )
      {
        if ( pinibl != NULL )
        {
          ret_bl.left = marg;

          pinibl = NULL;
        }
        if ( pfimbl != NULL )
        {
          ret_bl.right = marg;

          pfimbl = NULL;
        }
      }

      larg_tab = TF_largura_do_tab( marg );

      marg += larg_tab;

      posi++;

      break;

    case sBRANCO:
      if ( flag_para_impressora )
        SetTextColor( hdc, RGB( 0, 0, 0 ) );
      else
      if ( dentro_campo == TRUE || dentro_logo == TRUE )  // alterado SYLA 17/08/95
        SetTextColor( hdc, RGB( 127, 0, 0 ) );
      else
        SetTextColor( hdc, RGB( 0, 0, 0 ) );

      if ( tem_bloco )
      {
        if ( pinibl != NULL )
        {
          ret_bl.left = marg;

          pinibl = NULL;
        }
        if ( pfimbl != NULL )
        {
          ret_bl.right = marg;

          pfimbl = NULL;
        }
      }

      larg_pal = tl[ ' ' ];

      if ( tem_texto == TRUE )
      {
        // recalcula a largura do branco
        if ( alin == TF_AL_JUS  &&  esp_br > 0 )
        {
          WORD larg_br;

          larg_br = (WORD)(((DWORD)esp_dist_br * larg_pal) / esp_br);

          esp_dist_br -= larg_br;
          esp_br -= larg_pal;

          larg_pal = larg_br;
        }
      }

      marg += larg_pal;

      posi++;

      break;

    case 1:
        break;

    case 0:
      if ( tem_bloco )
      {
        if ( pinibl != NULL )
          ret_bl.left = marg;
        if ( pfimbl != NULL )
          ret_bl.right = marg;
      }
    default:
      goto fim;   // fim do texto
  }
  goto loop;

fim:
  if ( tem_bloco )
    InvertRect( hdc, &ret_bl );

  SelectBrush( hdc, hbr_ant );
  DeleteObject( hbr );

  SelectFont( hdc_impr, hft_impr_ant );
  SelectFont( hdc_text, hft_vid_ant );
  SelectFont( hdc, hft_ant );
}

/*------------------------------------------------------------------------*/
static void TFED_atualizar_texto ( HDC hdc, RECT * ret_atu )
/* pintar o texto no dispositivo especificado
*/
{
  int   i, marg, prof, delta;
  HPEN  hpen, hpen_ant;
  LONG  l;
  RECT  retd, ret_lin;

  struct TF_linha * ptr_linha;

  gerando_metafile = FALSE;

  SetTextAlign(hdc, TA_BASELINE);

  // está editando, simular 1o quadrante
  quadrante = 1;
  sen = 1;
  cosen = 0;

  ret_lin.left = 0;
  ret_lin.right = TF_atual.obj.TamHor;

  l = SendMessage( hwnd_text, SM_GETSCROLLPOS, 0, 0L );

  for ( i = 0; i < TF_tab_linha_tatual; i++ )
  {
    ptr_linha = &TF_tab_linha[ i ];

    // descontando o scroll vertical
    ret_lin.top = ptr_linha->prof - HIWORD( l );
    ret_lin.bottom = ptr_linha->prof + ptr_linha->maior_cp - HIWORD( l );

    if ( IntersectRect( &retd, &ret_lin, ret_atu ) )
    {
      if (TF_tab_linha[i].tem_texto)
        TFED_pintar_uma_linha( hdc, &TF_tab_linha[i],
               (i == 0) ? NULL : &TF_tab_linha[i-1]);
    }
  }

  delta = (int)((TF_atual.Espessura + TF_atual.Sombra) * 2);

  if ((TF_atual.Moldurado == FALSE) || (delta > (int)TF_atual.obj.TamHor))
    delta = 0;

  // Contorno do Text Field
  hpen = CreatePen( PS_DASH, NULL, GetSysColor( COLOR_WINDOWTEXT ) );

  hpen_ant = SelectPen( hdc, hpen );

  l = SendMessage( hwnd_text, SM_GETSCROLLPOS, 0, 0L );
  marg = (int)LOWORD( l );
  prof = (int)HIWORD( l );

  MoveToEx( hdc, TF_atual.obj.TamHor - marg - delta, 0 - prof, NULL );
  LineTo( hdc, TF_atual.obj.TamHor - marg - delta, TF_atual.obj.TamVer - delta - prof );
  LineTo( hdc, 0 - marg, TF_atual.obj.TamVer - delta - prof );

  SelectPen( hdc, hpen_ant );

  DeleteObject( hpen );
}

/*---------------------------------------------------------------------------*/
static HDC TFED_criar_dc_compativel( HDC dc_orig )
{
  HDC   dc_mem = CreateCompatibleDC( dc_orig );
  SIZE  dims;

  if ( dc_mem == NULL )
    return ( NULL );

  SetMapMode( dc_mem, GetMapMode( dc_orig ) );

  GetWindowExtEx( dc_orig, (SIZE *)&dims );
  SetWindowExtEx( dc_mem, dims.cx, dims.cy, NULL );

  GetViewportExtEx( dc_orig, ( SIZE *)&dims );
  SetViewportExtEx( dc_mem, dims.cx, dims.cy, NULL );

  SetViewportOrgEx( dc_mem, 0, 0, NULL );
  SetWindowOrgEx( dc_mem, 0, 0, NULL );

  return ( dc_mem );
}

/*------------------------------------------------------------------------*/
void TFED_pintar_texto ( HDC hdc, RECT * ret_atu )
/* pintar o texto no dispositivo especificado, fazendo-o antes
*  numa memória.
*/
{
  HDC     dc_mem = NULL, dc_ant = NULL;
  HBITMAP hbm;
  RECT    ret;
  WORD    larg_corte, alt_corte;


  ret = * ret_atu;

  LPtoDP( hdc, (LPPOINT)&ret, 2 );

  // calcular memória - e se a memória necessária for muito grande ?
  hbm = CreateCompatibleBitmap( hdc, ret.right - ret.left + 1,
                                     ret.bottom - ret.top + 1 );

  if ( hbm != NULL )
  {
    dc_mem = TFED_criar_dc_compativel( hdc );

    if ( dc_mem == NULL )
    {
      DeleteObject( hbm );
      hbm = NULL;
    }
    else
    {
      SetWindowOrgEx( dc_mem, ret_atu->left, ret_atu->top, NULL );

      SelectObject( dc_mem, hbm );

      larg_corte = ret_atu->right  - ret_atu->left;
      alt_corte  = ret_atu->bottom - ret_atu->top;

      dc_ant = hdc;
      hdc = dc_mem;
    }
  }

  // Limpa a área de memória
  if ( dc_ant == NULL )
  {
    COLORREF  cor = GetSysColor( COLOR_WINDOW );
    HBRUSH    hbr = CreateSolidBrush( cor );

    ret = *ret_atu;

    InflateRect( &ret, 2, 2 );

    FillRect( hdc, &ret, hbr );

    DeleteObject( hbr );
  }
  else
    PatBlt( hdc, ret_atu->left, ret_atu->top,
                larg_corte, alt_corte, WHITENESS );

  TFED_atualizar_texto( hdc, ret_atu );

  if ( dc_ant != NULL )
  {
    BitBlt( dc_ant, ret_atu->left, ret_atu->top,
              larg_corte, alt_corte,
        dc_mem, ret_atu->left, ret_atu->top, SRCCOPY );

    DeleteDC( dc_mem );

    DeleteObject( hbm );
  }
}

/*------------------------------------------------------------------------*/
HMETAFILE TFED_gerar_metafile ( TEXTFIELD *tf, HDC hdc )
/* gerar um metafile para um text field. Este metafile será usado
*  depois para apresentar o text field na prévia.
*/
{
  HMETAFILE hmf = NULL;
  HDC       hdc_meta;

  struct TF_linha * ptr_linha;
  short int i;
  char * pttext;
  char * ptatual;
  HGLOBAL haux;

  int rot;

  if ( hwnd_text == NULL )
  {
    SaveDC( hdc );

    hdc_text = hdc;

    // acertando a escala para 100%
//    Zoom_acertar_escala( hdc_text, (short int) 0, (short int) 100 );
    Zoom_forcar_escala_100_impr(hdc_text);

    flagTrocouFonte = FALSE;

    if ( TF_inicializar_formatador((HDC) NULL, tf ) == FALSE )
    {
//      TF_finalizar_formatador( FALSE );
      RestoreDC( hdc, -1 );

      return (NULL);
    }

    quadrante = posCirculo(tf->obj.Orientacao, &rot);
    sen   = fabs(sin((rot * M_PI) / 180));
    cosen = fabs(cos((rot * M_PI) / 180));

    TF_formatar_texto();

    // só é possível criar o metafile se não estiver
    // editando um text field
    if ( tf->hmeta != NULL && LeArq == FALSE )
    {
      DeleteMetaFile( tf->hmeta );

      tf->hmeta = NULL;
    }

    if ( tf->ClassTF != NULL )
    {
      TTextField_DestruirClasse(tf->ClassTF);

      tf->ClassTF = NULL;
    }

    // recriar a classe acelerador para pintar textfields
    tf->ClassTF = TTextField_CriarClasse(TF_tam_tab_fonte,
                                         TF_tam_campo_saida,
                                         TF_tam_logo, TF_tam_fio,
                                         TF_buf_tmax + 10240, tf);

    if ( tf->ClassTF != NULL )
    {
      TTextField_GuardarFontes(tf->ClassTF, TF_ptr_tab_fonte, TF_tam_tab_fonte);
      TTextField_GuardarCamposSai(tf->ClassTF, TF_ptr_campo_saida, TF_tam_campo_saida);
      TTextField_GuardarLogos(tf->ClassTF, TF_ptr_logo, TF_tam_logo);
      TTextField_GuardarFios(tf->ClassTF, TF_ptr_fio, TF_tam_fio);
      TTextField_GuardarTexto(tf->ClassTF, TF_buffer_texto, TF_buf_tatual);
    }
    hdc_meta = CreateMetaFile( NULL );
    EstourouTextField = FALSE;
    SetTextAlign(hdc_meta, TA_BASELINE);
    gerando_metafile = TRUE;

    for ( i = 0; i < TF_tab_linha_tatual; i++ )
    {
      ptr_linha = &TF_tab_linha[ i ];

      if ((ptr_linha->prof + ptr_linha->maior_cp) < tf->obj.TamVer)
      {
        if (ptr_linha->tem_texto)
          TFED_pintar_uma_linha( hdc_meta, ptr_linha,
                  (i == 0) ? NULL : &TF_tab_linha[i-1]);
      }
      else
        EstourouTextField = TRUE;
    }

    gerando_metafile = FALSE;
    hmf = CloseMetaFile( hdc_meta );

// grava com novo formato para auto LF em versões anteriores
// pode ter que regravar para converter polegada
    if ( (LeArq == TRUE && strcmp ( Arq.Versao, "803" ) < 0 ) ||
         (LeArq == TRUE && flagConvPol == TRUE) ||
         (LeArq == TRUE && flagTrocouFonte == TRUE))
    {
      TF_finalizar_formatador ( TRUE );       // ?????
      if ( TF_atual.Tatual > tf->Tatual )
      { // libera e realoca area
        haux = GlobalReAlloc( tf->Text, TF_atual.Tatual, GMEM_ZEROINIT );
        if ( haux != NULL )
          tf->Text = haux;
      }
      ptatual = (char *)GlobalLock ( TF_atual.Text );
      pttext  = (char *)GlobalLock ( tf->Text );
      memcpy ( pttext, ptatual, TF_atual.Tatual );
      GlobalUnlock ( TF_atual.Text );
      GlobalUnlock ( tf->Text );
      tf->Tatual  = TF_atual.Tatual;
      tf->Tmax    = TF_atual.Tmax;
      GlobalFree ( TF_atual.Text ); // ??? SYLA 15/03/99
      flag_gravaArq = TRUE;
    }

    else
      TF_finalizar_formatador( FALSE );

    tf->hmeta = hmf;
    hdc_text = NULL;
    RestoreDC( hdc, -1 );
  }

  return( hmf );
}

/*------------------------------------------------------------------------*/
BOOL TFED_gerar_metafile_previa_real ( TEXTFIELD *tf, HDC hdc, BOOL impressora )
/* gerar um metafile para um text field. Este metafile será usado
*  depois para apresentar o text field na prévia.
*/
{
#if 1
  flag_previa_real = TRUE; // indica que é previa real do documento
  flag_para_impressora = impressora;

  TFED_gerar_metafile( tf, hdc );

  flag_previa_real = FALSE;
  flag_para_impressora = FALSE;

  return( !EstourouTextField );
#else
  TTextField_PrepararInicioImpressao();
  tf->hmeta = TTextField_GerarMetafilePreviaReal(tf->ClassTF, hdc, impressora, &EstourouTextField);
  TTextField_FinalizarImpressao();

  return( !EstourouTextField );
#endif
}
/*------------------------------------------------------------------------*/
BOOL TFED_imprimir_previa_real( TEXTFIELD *tf, HDC hdc )
{
  tf->hmeta = TTextField_GerarMetafilePreviaReal(tf->ClassTF, hdc, TRUE, &EstourouTextField);

  return( !EstourouTextField );
}

/*------------------------------------------------------------------------*/
/* Rotinas para a marcação de bloco                                       */
/*------------------------------------------------------------------------*/
static WORD inicio_bloco, fim_bloco;
static BOOL marcando_bloco;

/*------------------------------------------------------------------------*/
static void TFED_iniciar_tratamento_marcacao_bloco ( void )
{
  inicio_bloco = fim_bloco = TF_ptexto;

  marcando_bloco = FALSE;
}

/*------------------------------------------------------------------------*/
static void TFED_atu_marcacao_bloco ( WORD pos )
/* remarcar a variavel de controle do fim do bloco, e atualizar
*  a marcação do bloco na tela
*/
{
  if ( marcando_bloco == TRUE  &&  pos != fim_bloco )
  {
    WORD lin_ant, lin_atu, tmp;

    // invalidar desde a linha da posição anterior ...
    lin_ant = TFED_achar_linha( fim_bloco );

    fim_bloco = pos;

    // até a linha da posição atual
    lin_atu = TFED_achar_linha( fim_bloco );

    if ( lin_atu < lin_ant )
    {
      tmp     = lin_atu;
      lin_atu = lin_ant;
      lin_ant = tmp;
    }

    TFED_atualizar_tela_parcial( lin_ant, lin_atu - lin_ant + 1 );
  }
}

/*------------------------------------------------------------------------*/
static void TFED_ajustar_bloco ( WORD pos )
/*  Remarcar a variavel de controle do fim/inicio do bloco, e atualizar
*   a marcação do bloco na tela. Esta funcão só é para ser usada
*   quando se deseja efetuar uma operação com bloco que altere o seu
*   tamanho e não se deseja perder a marcação do mesmo.
*/
{
  if ( inicio_bloco < fim_bloco )
    fim_bloco = pos;
  else
    inicio_bloco = pos;
}

/*------------------------------------------------------------------------*/
void TFED_ini_marcacao_bloco ( void )
/* inicializar as variaveis de controle para marcacao de um bloco
*/
{
  inicio_bloco = fim_bloco = TF_ptexto;

  marcando_bloco = TRUE;
}

/*------------------------------------------------------------------------*/
void TFED_fim_marcacao_bloco ( void )
/* remarcar a variavel de controle do fim do bloco
*/
{
  if ( marcando_bloco == TRUE )
    TFED_atu_marcacao_bloco( TF_ptexto );
}

/*------------------------------------------------------------------------*/
void TFED_desmarcar_bloco ( void )
/* abandona a marcação de um bloco
*/
{
  TFED_atu_marcacao_bloco( inicio_bloco );

  marcando_bloco = FALSE;
}

/*------------------------------------------------------------------------*/
BOOL TFED_tem_texto ( void )
/* verificar se existe algum texto no buffer
*/
{
  if ( TF_buf_tatual != 0 )
    return ( TRUE );
  else
    return ( FALSE );
}

/*------------------------------------------------------------------------*/
void TFED_marcar_todo_texto ( void )
/* marca todo o texto como um bloco único
*/
{
  inicio_bloco = 0;

  fim_bloco = TF_buf_tatual;

  marcando_bloco = TRUE;

  TFED_verificar_composicao_pend();

  TFED_atualizar_tela_parcial( 0, TF_tab_linha_tatual );

  TFED_navegar_texto( -VK_END );
}

/*------------------------------------------------------------------------*/
BOOL TFED_ver_marcacao_bloco ( void )
/* testar se está marcando um bloco
*/
{
  if ( marcando_bloco == TRUE  &&  inicio_bloco != fim_bloco )
    return ( TRUE );
  else
    return ( FALSE );
}

/*------------------------------------------------------------------------*/
static BOOL TFED_ler_pos_bloco ( WORD *posi, WORD *posf )
/* ler as marcações de um bloco, caso esteja sendo marcado
*/
{
  if ( TFED_ver_marcacao_bloco() == FALSE )
  {
    *posi = *posf = 0;

    return ( FALSE );
  }
  else
  {
    if ( inicio_bloco < fim_bloco )
    {
      *posi = inicio_bloco;
      *posf = fim_bloco;
    }
    else
    {
      *posi = fim_bloco;
      *posf = inicio_bloco;
    }
    return ( TRUE );
  }
}

/*------------------------------------------------------------------------*/
static void TFED_inserir_bloco_aux ( BYTE *texto,
                     WORD tam_texto, WORD pos )
/*
* Inserir um bloco no texto
*/
{
  WORD  lin,
        fim_texto = TF_buf_tatual;


  lin = TFED_achar_linha( pos );

  TF_compilar_um_texto( texto, tam_texto, pos );

  if ( pos < TF_ptexto )
    TF_ptexto += TF_buf_tatual - fim_texto;

  if ( lin > 0 )
    lin--;

  TF_formatar_texto_parcial( lin, NUM_ATU_LINHAS /*3*/ );
  TFED_atualizar_tela_parcial( lin, NUM_ATU_LINHAS /*3*/ );

  TFED_composicao_pendente = TRUE;
  TFED_navegar_texto( 0 );
}

/*------------------------------------------------------------------------*/
static void TFED_apagar_bloco_aux ( WORD posi, WORD posf )
/* apagar o bloco marcado
*/
{
  WORD  tam;
  WORD  lin, pos;


  // achar a linha do inicio do bloco, para a recomposição
  // do texto após o apagamento do bloco
  lin = TFED_achar_linha( posi );

  /* podem existir comandos dentro do bloco que devam
    ser apagados antes de apagar o bloco inteiro
  */
  pos = posi;

  while ( pos < posf )
  {
    // procurar um comando
    tam = TF_strnchr( TF_buffer_texto + pos,
                    posf - pos, sESC );

    if ( tam == 0 )
      break;  // não existe mais comando dentro do bloco

    pos += tam - 1; // posicionando no inicio do comando

    tam = TFED_apagar_comando( pos );

    if ( TF_ptexto > pos )
      TF_ptexto -= tam;

    // comando como o de campo pode apagar um tamanho além de posf
    if ( posf > pos + tam )
      posf -= tam;
    else
      posf = pos;

    if ( TF_ptexto < posi )
      TF_ptexto = posi; // Alterado ponteiro p/início do campo Susana 5/7/96
  }

  tam = posf - posi;

  TF_apagar_cadeia( tam, posi );

  if ( TF_ptexto > posi )
    TF_ptexto -= tam;

  if ( lin > 0 )
    lin--;

  TF_formatar_texto_parcial( lin, NUM_ATU_LINHAS /*3*/ );
  TFED_atualizar_tela_parcial( lin, NUM_ATU_LINHAS /*3*/ );

  TFED_composicao_pendente = TRUE;
  TFED_navegar_texto( 0 );
}

/*------------------------------------------------------------------------*/
static void TFED_apagar_bloco ( void )
/* apagar o bloco marcado
*/
{
  WORD  posi, posf;

  if ( TFED_ler_pos_bloco( &posi, &posf ) == FALSE )
    return;

  TFED_desmarcar_bloco();

  TFED_apagar_bloco_aux( posi, posf );
}

/*------------------------------------------------------------------------*/
#define   TEMPO_IDLE    1000    /*  Em milésimos: 1 segundo */

#define   TEMPO_MAXIMO  (0x7FFFFFF0L - 0x7FFF )

static DWORD tempo_ultima_tecla = TEMPO_MAXIMO;

/*------------------------------------------------------------------------*/
void TFED_marcar_tempo_idle ( DWORD tempo )
/* iniciar a contagem do cronômetro que dá o tempo de inatividade ( IDLE )
*/
{
  if ( tempo == 0 )
    tempo = TEMPO_MAXIMO;

  tempo_ultima_tecla = tempo;
}

#pragma argsused
/*------------------------------------------------------------------------*/
void TFED_tratar_idle ( DWORD tempo )
/* tratar a mensagem WM_TIMER
*/
{
  // se não está ativo o editor de textfield, ignorar a mensagem
  if ( TF_buffer_texto == NULL )
    return;

  /* Atualizacao de tela
  */
  if ( tempo > tempo_ultima_tecla )//+ TEMPO_IDLE )
  {
    /* Para nao chamar de novo
    */
    tempo_ultima_tecla = TEMPO_MAXIMO;

    TFED_verificar_composicao_pend();
  }
}

/*------------------------------------------------------------------------*/
/*     Funções para a interação com o CLIPBOARD                           */
/*------------------------------------------------------------------------*/
static int TF_contar_qtd_CamposDeSaida( WORD posi, WORD posf )
/* determina o número de campos de saida existentes em um bloco do textfield
   para posteriormente copiá-los para o clipboard
*/
{
  WORD tam_pedaco, contador = 0;

  if ( posf > TF_buf_tatual )
    posf = TF_buf_tatual;

  while (posi < posf)
  {
    // procurar um comando
    tam_pedaco = TF_strnchr( TF_buffer_texto + posi, posf - posi, sESC );
    if ( tam_pedaco == 0 )
      break;  // chegou ao final do texto
    else
      posi += tam_pedaco - 1;

    if (TF_buffer_texto[ posi + 1 ] == TF_CMD_CAMPO_INI)
      ++contador;

    // pular o comando
    posi += TF_TAM_CMD;
  }
  return contador;
}
/*------------------------------------------------------------------------*/
static void TFED_copiar_CamposDeSaida_para_clipboard(void)
{
  // copiar para o clipboard os campos de saida que existem dentro
  // do textfield num segundo formato. Este novo formato
  // pode ser "colado" pelo Format num documento.
  WORD posi, posf, tam_pedaco, prof = 0;
  int  i = 0, n;

  CAMPO_SAIDA *pt_campo;
  struct TF_campo_saida *campo;

  if ( TFED_ler_pos_bloco( &posi, &posf ) == FALSE )
    return;   // nada a ser copiado

  // verificar se existe algum campo de saída no bloco marcado
  n = TF_contar_qtd_CamposDeSaida(posi, posf);

  if (n == 0) return;

  // alocando espaço necessário para salvar os campos de saída
  pt_campo = GlobalAllocPtr(GMEM_ZEROINIT, sizeof(CAMPO_SAIDA) * n);
  if (pt_campo == NULL)
    return;   // não conseguiu memória para expandir campos de saída

  if ( posf > TF_buf_tatual )
    posf = TF_buf_tatual;

  // recuperando os campos de saída
  while ( posi < posf )
  {
    // procurar um comando
    tam_pedaco = TF_strnchr( TF_buffer_texto + posi, posf - posi, sESC );

    if ( tam_pedaco == 0 )
      break;
    else
      posi += tam_pedaco - 1;

    if (TF_buffer_texto[ posi + 1 ] == TF_CMD_CAMPO_INI)
    {
      CAMPO_SAIDA *ptr = pt_campo + i;

      // ler as informações do campo atual
      campo = &TF_ptr_campo_saida[ TF_buffer_texto[ posi + 2 ] ];

      //ptr->obj.FlagUsado = 0;
      //ptr->obj.IndiceProximo = 0;

      ptr->obj.PosHor = i * 10;
      ptr->obj.PosVer = prof;
      ptr->obj.TamHor = campo->largura;
      ptr->obj.TamVer = 0;
      ptr->obj.Orientacao = OO_NORMAL;
      strncpy(ptr->obj.ExprCond, campo->expressao, MAXLENEXPR);

      ptr->fonte = TF_ptr_tab_fonte[ campo->fonte ].f;
      //ptr->Skey = ??;
      //ptr->LoadF = ??;
      ptr->AutoLF = campo->auto_LF;

      switch (TF_atual.Just)
      {
        case TF_AL_ESQ: ptr->Just = AL_ESQ; break;
        case TF_AL_DIR: ptr->Just = AL_DIR; break;
        case TF_AL_CEN: ptr->Just = AL_CEN; break;
        case TF_AL_JUS: ptr->Just = AL_JUS; break;
      }

      strncpy(ptr->Edit, campo->mascara, MAXLENEXPR);

      // acertando posição e altura do campo
      ptr->obj.TamVer = TF_ptr_tab_fonte[ campo->fonte ].alt;
      ptr->obj.PosVer += ptr->obj.TamVer;

      prof = ptr->obj.PosVer + 1;

      i++;
    }

    // pular o comando
    posi += TF_TAM_CMD;
  }

  CopiarCamposDoTextfieldParaClipBoard(pt_campo, n);

  GlobalFreePtr(pt_campo);
}
/*------------------------------------------------------------------------*/
static char *buffer_expansao_campos = NULL;
static int   buffer_tatual = 0;
static int   buffer_tmax = 0;
/*------------------------------------------------------------------------*/
void TFED_colar_CamposDeSaida_do_clipboard(CAMPO_SAIDA *pt_campo)
{
  // comando 'campo de saída' dentro de um textfield
  //'ESC'C,expressão,máscara,largura,automatic LF,nome da fonte,corpo,cor,E,S,num fonte int,FonteW,altura,I,K,NumBold'ESC'

  char *ptr = buffer_expansao_campos;
  int   i = buffer_tatual;

  if (ptr == NULL) return;

  ptr[i++] = sESC;
  ptr[i++] = 'C';
  ptr[i++] = DELIMITADOR;

  strcpy(ptr + i, pt_campo->obj.ExprCond);    // expressão
  i += strlen(ptr + i);
  ptr[i++] = DELIMITADOR;

  strcpy(ptr + i, pt_campo->Edit);            // máscara
  i += strlen(ptr + i);
  ptr[i++] = DELIMITADOR;

  itoa(pt_campo->obj.TamHor, ptr + i, 10);    // largura do campo de saída
  i += strlen(ptr + i);
  ptr[i++] = DELIMITADOR;

  itoa(pt_campo->AutoLF, ptr + i, 10);        // automatic LF
  i += strlen(ptr + i);
  ptr[i++] = DELIMITADOR;

  ptr[i++] = '0';   // flag para rtrim
  ptr[i++] = DELIMITADOR;

  // dados da fonte associada ao campo de saída
  strcpy(ptr + i, pt_campo->fonte.Fnome);     // nome da fonte
  i += strlen(ptr + i);
  ptr[i++] = DELIMITADOR;

  itoa(pt_campo->fonte.Fcpi, ptr + i, 10);    // corpo da fonte
  i += strlen(ptr + i);
  ptr[i++] = DELIMITADOR;

  if (pt_campo->fonte.Fexp)   // fonte expandida
    ptr[i++] = 'E';
  ptr[i++] = DELIMITADOR;

  if (pt_campo->fonte.Fund)   // fonte sublinhada
    ptr[i++] = 'S';
  ptr[i++] = DELIMITADOR;

  itoa(pt_campo->LoadF, ptr + i, 10);         // número da fonte interna
  i += strlen(ptr + i);
  ptr[i++] = DELIMITADOR;

  strcpy(ptr + i, pt_campo->fonte.FnomeW);    // nome da fonte windows
  i += strlen(ptr + i);
  ptr[i++] = DELIMITADOR;

  itoa(pt_campo->fonte.corpo, ptr + i, 10);   // altura da fonte
  i += strlen(ptr + i);
  ptr[i++] = DELIMITADOR;

  itoa(pt_campo->fonte.color, ptr + i, 10);   // cor da fonte
  i += strlen(ptr + i);
  ptr[i++] = DELIMITADOR;

  if (pt_campo->fonte.Fita)   // fonte itálica
    ptr[i++] = 'I';
  ptr[i++] = DELIMITADOR;

  if (pt_campo->fonte.Fstk)   // fonte strickeout
    ptr[i++] = 'K';
  ptr[i++] = DELIMITADOR;

  itoa(pt_campo->fonte.Fbold, ptr + i, 10);     // tamanho do bold
  i += strlen(ptr + i);

  ptr[i++] = DELIMITADOR;

  strcpy(ptr + i, pt_campo->fonte.expressao);   // expressão associada à fonte
  i += strlen(ptr + i);

  ptr[i++] = DELIMITADOR;
  ptr[i++] = DELIMITADOR;
  ptr[i++] = sESC;
  ptr[i++] = 0x0d;
  ptr[i++] = 0x0a;
  ptr[i] = 0;

  buffer_tatual = i;
}
/*------------------------------------------------------------------------*/
BOOL TFED_copiar_bloco_para_clipboard ( void )
/*
* Copiar texto marcado para o clipboard
*/
{
  WORD posi, posf;


  if ( TFED_ler_pos_bloco( &posi, &posf ) == FALSE )
    return ( FALSE );

  // guardar na variável TF_atual
  TF_restaurar_um_texto( posi, posf );

  if ( OpenClipboard( hwnd_text ) )
  {
    EmptyClipboard();

    SetClipboardData( CF_TEXT, TF_atual.Text );

    TFED_copiar_CamposDeSaida_para_clipboard();

    CloseClipboard();

    return ( TRUE );
  }
  else
  {
    GlobalFree( TF_atual.Text );

    TF_atual.Text = NULL;

    return ( FALSE );
  }
}

/*------------------------------------------------------------------------*/
void TFED_ler_bloco_do_clipboard ( void )
/*
* Ler o conteúdo do clipboard e inserir no texto
*/
{
  BYTE   *texto;
  HANDLE  hData;
  WORD    tam_texto;
  WORD    lin;
  BOOL    tem_campos = FALSE;
  int     qtd = 0;

  struct Undo undo = { 0 };

  WORD    posi, posf;
  BYTE  * ptr;

  if ( ! OpenClipboard( hwnd_text ) )
    return;

  if ( ( hData = GetClipboardData( CF_TEXT ) ) == NULL )
  {
    if ((qtd = VerificarQtdCamposNoClipBoard()) == 0)
    {
      CloseClipboard();
      return;
    }

    // não tem texto mas tem campos de saída
    tem_campos = TRUE;

    buffer_expansao_campos = NULL;
    buffer_tatual = 0;
    buffer_tmax = 0;
  }
  else
  if ( (texto = (BYTE *)GlobalLock( hData ) ) == NULL )
  {
    CloseClipboard();
    return;
  }

  // se houver um bloco marcado, apaga o mesmo antes de copiar
  if ( TFED_ler_pos_bloco( &posi, &posf ) == TRUE )
  {
    TF_restaurar_um_texto( posi, posf );

    undo.pos      = posi;
    undo.htxt1    = TF_atual.Text;
    undo.tatual1  = posf - posi;

    TFED_apagar_bloco();
  }
  else
    undo.pos = TF_ptexto;

  undo.ope  = TF_OPE_TROCAR;

  lin = TFED_achar_linha( TF_ptexto );

  posi = TF_buf_tatual;

  if (tem_campos == FALSE)
  {
    tam_texto = strlen( texto );

    // salvar o texto do clipboard
    undo.htxt2 = GlobalAlloc( GHND, tam_texto + 1 );

    if ( undo.htxt2 != NULL )
    {
      ptr = GlobalLock( undo.htxt2 );

      if ( ptr != NULL )
        strcpy( ptr, texto );

      GlobalUnlock( undo.htxt2 );
    }

    TF_compilar_um_texto( texto, tam_texto, TF_ptexto );

    GlobalUnlock( hData );
  }
  else
  {
    // salvar a expansão dos campos do clipboard
    buffer_tmax = qtd * sizeof(CAMPO_SAIDA);
    undo.htxt2  = GlobalAlloc(GHND, buffer_tmax);

    if ( undo.htxt2 != NULL )
    {
      buffer_expansao_campos = GlobalLock( undo.htxt2 );
      buffer_tatual = 0;

      ColarCamposNoClipBoardParaTextField();

      TF_compilar_um_texto( buffer_expansao_campos, buffer_tatual, TF_ptexto );

      GlobalUnlock( undo.htxt2 );
    }
  }

  undo.tatual2 = TF_buf_tatual - posi;

  TFED_guardar_undo( &undo );

  CloseClipboard();

  if ( lin > 0 )
    lin--;

  TF_formatar_texto_parcial( lin, NUM_ATU_LINHAS /*3*/ );
  TFED_atualizar_tela_parcial( lin, NUM_ATU_LINHAS /*3*/ );

  TFED_composicao_pendente = TRUE;
  TFED_navegar_texto( 0 );
}

/*------------------------------------------------------------------------*/
void TFED_mover_bloco_para_clipboard ( void )
/*
* Mover texto marcado para o clipboard
*/
{
  struct Undo undo  = { 0 };

  WORD  posi, posf;

  if ( TFED_copiar_bloco_para_clipboard() == FALSE )
    return;

  if ( TFED_ler_pos_bloco( &posi, &posf ) == TRUE )
  {
    TF_restaurar_um_texto( posi, posf );

    undo.ope      = TF_OPE_TROCAR;
    undo.pos      = posi;
    undo.htxt1    = TF_atual.Text;
    undo.tatual1  = posf - posi;

    TFED_guardar_undo( &undo );

    TFED_apagar_bloco();
  }
}

/*------------------------------------------------------------------------*/
/*     Funções para o tratamento de UNDO e REDO                           */
/*------------------------------------------------------------------------*/
#define   NUM_MAX_UNDO    21

static  short int ini_undo, fim_undo, atu_undo;

static  struct Undo tab_undo[ NUM_MAX_UNDO ];

#define   INC(x)    ((x + 1) % NUM_MAX_UNDO)
#define   DEC(x)    ((x + NUM_MAX_UNDO - 1) % NUM_MAX_UNDO)

/*------------------------------------------------------------------------*/
void TFED_iniciar_tratamento_undo ( void )
{
  ini_undo = fim_undo = atu_undo = 0;

  memset( (void *)tab_undo, 0, sizeof( tab_undo ) );
}

/*------------------------------------------------------------------------*/
void TFED_terminar_tratamento_undo ( void )
{
  ini_undo = fim_undo = atu_undo = 0;

  do
  {
    if ( tab_undo[ ini_undo ].htxt1 != NULL )
    {
      GlobalFree( tab_undo[ ini_undo ].htxt1 );

      tab_undo[ ini_undo ].htxt1 = NULL;
    }
    if ( tab_undo[ ini_undo ].htxt2 != NULL )
    {
      GlobalFree( tab_undo[ ini_undo ].htxt2 );

      tab_undo[ ini_undo ].htxt2 = NULL;
    }

    ini_undo = INC( ini_undo );
  }
  while ( ini_undo != 0 );
}

/*------------------------------------------------------------------------*/
void TFED_guardar_undo ( struct Undo * undo )
{
  if ( INC( atu_undo ) == ini_undo )
  {
    ini_undo = INC( ini_undo );

    if ( tab_undo[ ini_undo ].htxt1 != NULL )
    {
      GlobalFree( tab_undo[ ini_undo ].htxt1 );

      tab_undo[ ini_undo ].htxt1 = NULL;
    }
    if ( tab_undo[ ini_undo ].htxt2 != NULL )
    {
      GlobalFree( tab_undo[ ini_undo ].htxt2 );

      tab_undo[ ini_undo ].htxt2 = NULL;
    }
  }

  fim_undo = atu_undo = INC( atu_undo );

  tab_undo[ atu_undo ] = *undo;
}

/*------------------------------------------------------------------------*/
UINT TFED_estado_undo ( void )
{
  UINT estado = 0;

  if ( atu_undo != ini_undo )
    estado |= 1;
  if ( fim_undo != atu_undo )
    estado |= 2;

  return ( estado );
}

/*------------------------------------------------------------------------*/
void TFED_executar_undo ( void )
{
  BYTE *ptr;
  WORD  tam;

  TFED_desmarcar_bloco();

  if ( atu_undo == ini_undo )
    return; // não existe nada na tabela de undo

  TF_ptexto = tab_undo[ atu_undo ].pos;

  switch ( tab_undo[ atu_undo ].ope )
  {
    case TF_OPE_INSERIR:
      TFED_apagar_caractere( FALSE );

      if ( tab_undo[ atu_undo ].htxt1 != NULL )
      {
        ptr = GlobalLock( tab_undo[ atu_undo ].htxt1 );

        tam = strlen( ptr );

        TFED_inserir_bloco_aux ( ptr, tam, tab_undo[ atu_undo ].pos );

        GlobalUnlock( tab_undo[ atu_undo ].htxt1 );
      }

      break;

    case TF_OPE_APAGAR:
      if ( tab_undo[ atu_undo ].htxt1 != NULL )
      {
        ptr = GlobalLock( tab_undo[ atu_undo ].htxt1 );

        tam = strlen( ptr );

        TFED_inserir_bloco_aux ( ptr, tam, tab_undo[ atu_undo ].pos );

        GlobalUnlock( tab_undo[ atu_undo ].htxt1 );
      }
      else
        TFED_inserir_caractere_aux( tab_undo[ atu_undo ].car, FALSE );

      break;

    case TF_OPE_TROCAR:
      if ( tab_undo[ atu_undo ].htxt2 != NULL )
        TFED_apagar_bloco_aux( TF_ptexto, TF_ptexto +
                      tab_undo[ atu_undo ].tatual2 );

      if ( tab_undo[ atu_undo ].htxt1 != NULL )
      {
        ptr = GlobalLock( tab_undo[ atu_undo ].htxt1 );

        tam = strlen( ptr );

        TFED_inserir_bloco_aux ( ptr, tam, tab_undo[ atu_undo ].pos );

        GlobalUnlock( tab_undo[ atu_undo ].htxt1 );
      }

      break;
  }

  atu_undo = DEC( atu_undo );
  TFED_navegar_texto( 0 );
}

/*------------------------------------------------------------------------*/
void TFED_executar_redo ( void )
{
  BYTE *ptr;
  WORD  tam;

  TFED_desmarcar_bloco();

  if ( atu_undo == fim_undo )
    return;   // não existe nada na tabela de undo

  atu_undo = INC( atu_undo );

  TF_ptexto = tab_undo[ atu_undo ].pos;

  switch ( tab_undo[ atu_undo ].ope )
  {
    case TF_OPE_INSERIR:
      if ( tab_undo[ atu_undo ].htxt1 != NULL )
        TFED_apagar_bloco_aux( TF_ptexto, TF_ptexto +
                      tab_undo[ atu_undo ].tatual1 );

      TFED_inserir_caractere_aux( tab_undo[ atu_undo ].car, FALSE );

      break;

    case TF_OPE_APAGAR:
      if ( tab_undo[ atu_undo ].htxt1 != NULL )
        TFED_apagar_bloco_aux( TF_ptexto, TF_ptexto +
                      tab_undo[ atu_undo ].tatual1 );
      else
        TFED_apagar_caractere( FALSE );

      break;

    case TF_OPE_TROCAR:
      if ( tab_undo[ atu_undo ].htxt1 != NULL )
        TFED_apagar_bloco_aux( TF_ptexto, TF_ptexto +
                      tab_undo[ atu_undo ].tatual1 );

      if ( tab_undo[ atu_undo ].htxt2 != NULL )
      {
        ptr = GlobalLock( tab_undo[ atu_undo ].htxt2 );

        tam = strlen( ptr );

        TFED_inserir_bloco_aux( ptr, tam, tab_undo[ atu_undo ].pos );

        GlobalUnlock( tab_undo[ atu_undo ].htxt2 );
      }

      break;
  }

  TFED_navegar_texto( 0 );
}

/*------------------------------------------------------------------------*/
#pragma argsused
void TF_carrega_fontes_internas( TEXTFIELD * pt_txtf, HDC hdc, int *nLogosXer )
/*
* Varre o texto de um textfield, carregando a fonte interna para
* cada fonte e cada campo de saida e se for Xerox atualiza nLogosXer
*/
{
  if ( hwnd_text == NULL )
  {
    int i;
    short int num_dc;

    num_dc = SaveDC( hdc );

    hdc_text = hdc;

    // acertando a escala para 100%
//    Zoom_acertar_escala( hdc_text, (short int) 0, (short int) 100 );
    Zoom_forcar_escala_100_impr(hdc_text);

    TF_inicializar_formatador((HDC) NULL, pt_txtf );

    if ( gPrinter == XEROX )
      *nLogosXer += TF_tot_logo;

    for ( i = 0; i < TF_tam_tab_fonte; i++ )
    {
      if ( TF_ptr_tab_fonte[ i ].contador > 0 )
      {
        TF_ptr_tab_fonte[ i ].ft_int =
                  InsereFont( TF_ptr_tab_fonte[ i ].f.Fnome )/*-TemFioXerox*/;
      }
    }

    TF_finalizar_formatador( TRUE );

    // liberar área anterior
    GlobalFree( pt_txtf->Text );

    // guardar com o número interno das fontes guardadas
    pt_txtf->Text = TF_atual.Text;
    pt_txtf->Tatual = TF_atual.Tatual;
    pt_txtf->Tmax = TF_atual.Tmax;

    hdc_text = NULL;

    RestoreDC( hdc, num_dc );
  }
}

/*------------------------------------------------------------------------*/
static void TF_caracteristicas_da_fonte ( WORD fonte, WORD * ascendente, WORD * descendente, WORD * altura )
{
  unsigned short int  alt, asc, desc;

  alt = tabela_altura[TF_ptr_tab_fonte[fonte].ft_int] & 0x00FF;
  asc = tabela_ascendente[TF_ptr_tab_fonte[fonte].ft_int] & 0x00FF;
  desc = tabela_descendente[TF_ptr_tab_fonte[fonte].ft_int] & 0x00FF;

  // se a fonte é sobrescrita/subescrita, tentar simular a fonte normal
  if (TF_ptr_tab_fonte[fonte].Fsobre || TF_ptr_tab_fonte[fonte].Fsub)
  {
    alt = 3 * alt / 2;
    asc = 3 * asc / 2;
    desc = 3 * desc / 2;
  }

  *altura = alt;

//  asc = tabela_ascend[TF_ptr_tab_fonte[fonte].num_ft_int];
//  asc = 2 * alt / 3;  // ???????????????????????????????

  *ascendente = asc;
  *descendente = desc;
}

/*------------------------------------------------------------------------*/

static short int MedeString (char *cad, short int nbytes, short int cpi, short int nfonte, BOOL exp )
{
  short int i;
  short int size = 0;
  char chascii;

  if ( cpi != 0 )
    size = nbytes * ( gUMA_POLEGADA / cpi );
  else
  { // fonte proporcional
    for (i = 0; i < nbytes; i++)
    {
      if ( gPrinter == IPDS || gPrinter == AFP )
      {
        chascii = tab_asc2_ebcdic [cad[i]&0x0FF];
        size += gTabelaAjuste[nfonte][chascii&0x00FF] & 0x00FF;
      }  // XEROX
      else size += gTabelaAjuste[nfonte][cad[i]&0x00FF] & 0x00FF;
    }
  }
  if (exp)
    size *= 2;  // a expansao por hardware duplica o tam. da cadeia
  return (size);
}


/*------------------------------------------------------------------------*/
static WORD TF_largura_da_palavra_pal ( BYTE * pal, short int tam_pal, BYTE fonte )
/* determinar o tamanho de uma palavra
*/
{
  short int  cpi, nfonte;
  BOOL exp;
  // ?????

  cpi = TF_ptr_tab_fonte [fonte].f.Fcpi;
  exp = TF_ptr_tab_fonte [fonte].f.Fexp;
  nfonte = TF_ptr_tab_fonte [fonte].ft_int;
  return (MedeString ( pal, tam_pal, cpi, nfonte, exp ));
}

/*------------------------------------------------------------------------*/
static void TF_formatar_linha_pal ( struct TF_linha *ptr_linha, struct TF_linha *ptr_linha_ant, WORD larg_lin )
/* formatar uma nova linha do texto
*
* Obs: ptr_linha representa o status da composição para o início da linha.
*      Quando esta função retorna, ptr_linha representa o status do
*      início da linha seguinte.
*/
{
  WORD  salva_pos, maior_cp,
        larg_pal,  larg_br = 0, larg_tab;
  short int tam_pal;
  WORD  ascendente,
        descendente;

  BYTE  *palavra, car;

  struct TF_linha linha;

  BOOL  trocar_fonte = TRUE,
        tem_texto = FALSE;

  short int larg, ind;

  larg = 0;
  ptr_linha->num_br = 0;
  ptr_linha->esp_br = 0;
  ptr_linha->baseline = 0;
  ptr_linha->descent  = 0;
  ptr_linha->larg_max_lin =
  ptr_linha->larg_lin     = larg_lin;
  ptr_linha->maior_cp = 0;
  ptr_linha->tipo_qb  = TF_QB_NENHUMA;
  ptr_linha->flag_lg  = FALSE;
  ptr_linha->flag_tab = FALSE;
  ptr_linha->tem_texto = FALSE;

  salva_pos = ptr_linha->posi;

  linha = *ptr_linha;

  linha.num_br_fim = 0;
  linha.esp_br_fim = 0;
  linha.tem_texto = FALSE;

  maior_cp = 0;

  // compondo...
loop:
  tam_pal = 0;

  while ( linha.posi < TF_buf_tatual )
  {
    car = TF_buffer_texto[ linha.posi ];

    switch ( car )
    {
      case sBRANCO:
        if ( linha.flag_lg ) break;
      case sTAB:
      case sESC:
      case sRETURN:
        goto tratar_cmd;
    }

    if ( tam_pal == 0 )
      palavra = &TF_buffer_texto[ linha.posi ];

    tam_pal++;
    linha.posi++;
  }
  car = 0;  // fim do texto

tratar_cmd: // tratando um comando
  // verificar se a última palavra cabe na linha
  if ( tam_pal > 0 )
  {
    if ( trocar_fonte == TRUE )
    {
      trocar_fonte = FALSE;

      if ( linha.flag_lg == FALSE )
      { // TEXTO OU CAMPO DE SAIDA
        TF_caracteristicas_da_fonte( linha.ft_atual,
                       &ascendente,
                       &descendente,
                       &maior_cp );
      }
      if ( linha.baseline < ascendente )
        linha.baseline = ascendente;
      if ( linha.descent < descendente )
        linha.descent = descendente;
      if ( linha.maior_cp < maior_cp )
        linha.maior_cp = maior_cp;
    }

    if ( linha.flag_lg == FALSE )
      larg_pal = TF_largura_da_palavra_pal( palavra, tam_pal, linha.ft_atual );
    else
      larg_pal = larg;  // LOGOTIPO

    if ( linha.larg_lin < linha.esp_br + larg_pal  && linha.flag_lg == FALSE )
    {
      // estourou a linha, a palavra não cabe
      if ( ptr_linha->posi == salva_pos )
      {
        // a palavra ocupou toda a linha, então truncá-la
        while ( tam_pal > 0 ) // era > 1 erro se largura 1 Susana 28/6/96
        {
          if ( tam_pal == 1  ||  linha.larg_lin >= larg_pal )
          {
            linha.tipo_qb = TF_QB_WORDWRAP;

            if ( linha.larg_lin > larg_pal )
              linha.larg_lin -= larg_pal;
            else
              linha.larg_lin = 0;

            linha.tem_texto = TRUE;
            *ptr_linha = linha;

            goto fim;
          }

          tam_pal--;
          linha.posi--;

          larg_pal = TF_largura_da_palavra_pal( palavra, tam_pal,
                            linha.ft_atual );
        }
      }

      // descontar o último branco da linha
//      if ( TF_buffer_texto[ ptr_linha->posi - 1 ] == sBRANCO )
//      {
//        if ( ptr_linha->esp_br > 0 )
//          ptr_linha->esp_br -= larg_br;
//      }
      ptr_linha->num_br -= linha.num_br_fim;
      ptr_linha->esp_br -= linha.esp_br_fim;

      ptr_linha->tipo_qb = TF_QB_WORDWRAP;

      goto fim;
    }

    tem_texto = TRUE;

    linha.num_br_fim = 0;
    linha.esp_br_fim = 0;
    linha.larg_lin -= larg_pal;
    linha.tem_texto = TRUE;

    *ptr_linha = linha;
  }

  switch ( car )
  {
    case sESC:
      linha.posi += TF_TAM_CMD;

      switch ( TF_buffer_texto[ linha.posi - TF_TAM_CMD + 1 ] )
      {
        case TF_CMD_INVALIDO:
          break;
        case TF_CMD_CAMPO_FIM:
          linha.flag_cp = FALSE;
          linha.ft_atual = linha.ft_def;
          *ptr_linha = linha;
          trocar_fonte = TRUE;
          break;
        case TF_CMD_LOGO_FIM:
          linha.flag_lg = FALSE;
          *ptr_linha = linha;
          break;
        case TF_CMD_FONTE:
          linha.ft_def =
          linha.ft_atual = TF_buffer_texto[ linha.posi
                            - TF_TAM_CMD + 2 ];
          trocar_fonte = TRUE;
          break;
        case TF_CMD_LOGO_INI:
          // ?????????????????????????????????
          ind = linha.posi - TF_TAM_CMD + 2;
          maior_cp = TF_ptr_logo[ TF_buffer_texto[ind] ].altura;
          ascendente = 2 * maior_cp / 3;
          descendente = maior_cp - ascendente;
          if ( linha.maior_cp < maior_cp )
            linha.maior_cp = maior_cp;
          larg = TF_ptr_logo[ TF_buffer_texto[ind] ].largura;
          linha.flag_lg = TRUE;
          trocar_fonte = TRUE;
          break;
        case TF_CMD_CAMPO_INI:
          linha.flag_cp = TRUE;
          linha.ft_atual = TF_ptr_campo_saida[ TF_buffer_texto[
                  linha.posi - TF_TAM_CMD + 2 ] ].fonte;
          trocar_fonte = TRUE;
          break;
        case TF_CMD_FIOH:
          ind = TF_buffer_texto[linha.posi - TF_TAM_CMD + 2 ];
          larg_pal = TF_ptr_fio[ind].larg_alt;
          // ?????????????????????????????????
          if ( linha.baseline < TF_ptr_fio[ind].espessura )
          {
            linha.baseline = TF_ptr_fio[ind].espessura;
            if (linha.maior_cp < linha.baseline + linha.descent)
              linha.maior_cp = linha.baseline + linha.descent;
          }
          goto fio_comum;

        case TF_CMD_FIOV:
          ind = TF_buffer_texto[linha.posi - TF_TAM_CMD + 2 ];
          larg_pal = TF_ptr_fio[ind].espessura;

          // ?????????????????????????????????
          if ( linha.descent < TF_ptr_fio[ind].larg_alt )
          {
            linha.descent = TF_ptr_fio[ind].larg_alt;
            if (linha.maior_cp < linha.baseline + linha.descent)
              linha.maior_cp = linha.baseline + linha.descent;
          }
          goto fio_comum;
fio_comum:
          if ( linha.larg_lin < linha.esp_br + larg_pal )
          {
            // estourou a linha, o fio não cabe
            if ( ptr_linha->posi == salva_pos )
            {
              // o fio ocupou toda a linha, então truncá-lo
              linha.tipo_qb = TF_QB_WORDWRAP;
              linha.larg_lin = 0;

              *ptr_linha = linha;
              goto fim;
            }

            // descontar o último branco da linha
            ptr_linha->num_br -= linha.num_br_fim;
            ptr_linha->esp_br -= linha.esp_br_fim;
            ptr_linha->tipo_qb = TF_QB_WORDWRAP;

            goto fim;
          }

          linha.num_br_fim = 0;
          linha.esp_br_fim = 0;
          linha.larg_lin -= larg_pal;
          linha.tem_texto = TRUE;
          tem_texto = TRUE;

          *ptr_linha = linha;
          break;
      }
      break;

    case sRETURN:
      linha.num_br -= linha.num_br_fim;
      linha.esp_br -= linha.esp_br_fim;
      linha.tipo_qb = TF_QB_RETURN;
      linha.posi++;
      *ptr_linha = linha;

      goto fim;

    case sTAB:
      larg_tab = TF_largura_do_tab( linha.larg_max_lin - linha.larg_lin );
      linha.posi++;

        // se estourou a linha com o tab, fechar a linha sem contar o tab
      if ( linha.larg_lin < larg_tab + linha.esp_br )
      {
        linha.tipo_qb = TF_QB_WORDWRAP;
        *ptr_linha = linha;
        goto fim;
      }

      linha.larg_lin -= larg_tab;

      if (tem_texto == TRUE)
        linha.flag_tab = TRUE;

      *ptr_linha = linha;

      break;

    case sBRANCO:
      if ( trocar_fonte == TRUE )
      {
        trocar_fonte = FALSE;

        TF_caracteristicas_da_fonte( linha.ft_atual,
                       &ascendente,
                       &descendente,
                       &maior_cp );

        if ( linha.baseline < ascendente )
          linha.baseline = ascendente;

        if ( linha.descent < descendente )
          linha.descent = descendente;

        if ( linha.maior_cp < maior_cp )
          linha.maior_cp = maior_cp;
      }

      larg_br = TF_largura_da_palavra_pal( " ", 1, linha.ft_atual );

      if ( tem_texto == TRUE )
      {
        // cabendo ou não o branco, incorporá-lo
        linha.num_br++;
        linha.esp_br += larg_br;
        linha.num_br_fim++;
        linha.esp_br_fim += larg_br;

        linha.posi++;

        *ptr_linha = linha;

        if ( linha.larg_lin < linha.esp_br )
        {
          // estourou a linha com o branco, descontá-lo
//          ptr_linha->esp_br -= larg_br;
          ptr_linha->num_br -= linha.num_br_fim;
          ptr_linha->esp_br -= linha.esp_br_fim;
          ptr_linha->tipo_qb = TF_QB_WORDWRAP;
          goto fim;
        }
      }
      else
      {
        linha.posi++;

        if ( linha.larg_lin < larg_br )
        {
          *ptr_linha = linha;

          // estourou a linha com o branco
          ptr_linha->tipo_qb = TF_QB_WORDWRAP;
          goto fim;
        }

        linha.larg_lin -= larg_br;

        *ptr_linha = linha;
      }

      break;

    case 0:
    default:
      goto fim; // fim do texto
  }
  goto loop;

fim:
  // se ao formatar, a altura da linha continuar com zero,
  // selecionar a fonte corrente para saber a altura da mesma.
  if ( ptr_linha->maior_cp == 0 )
  {
    TF_caracteristicas_da_fonte( ptr_linha->ft_atual,
                   &ascendente,
                   &descendente,
                   &maior_cp );

    if (ptr_linha->baseline < ascendente)
      ptr_linha->baseline = ascendente;
    if (ptr_linha->descent < descendente)
      ptr_linha->descent = descendente;
    ptr_linha->maior_cp = maior_cp;
  }

  // espacejamento entre linhas   Susana   maio/96

  if ( esp_lin_exato == TRUE )
    ptr_linha->maior_cp = esp_lin_fator;
  else
    ptr_linha->maior_cp *= esp_lin_fator;
}

/*------------------------------------------------------------------------*/
static void TF_formatar_texto_parcial_pal ( struct TF_controle *tf, BOOL primeira )
/* formatar uma linha do Text Field solicitado
*/
{
  struct TF_linha linha,
                * ptr_linha = &tf->lv[ 0 ];
  unsigned short int folga;

  if ( primeira == TRUE )
  {
    // iniciar primeira linha
    linha.posi = 0;   // posição inicial
    linha.prof = 0;   // profundidade da linha
    linha.marg = 0;   // margem da linha

    linha.ft_def =    // fonte default
    linha.ft_atual = tf->ft_def;  // fonte do inicio da linha

    linha.flag_cp = FALSE;  // flag de texto dentro de campo de saida

    *ptr_linha = linha;

    tf->lv_ant = NULL;
  }
  else
  {
    linha = *ptr_linha;
    tf->lv_ant = &tf->lv[2];
  }

  if (tf->tf->Moldurado)
    folga = (tf->tf->Espessura + tf->tf->Sombra) * 2;
  else
    folga = 0;

  TF_formatar_linha_pal( &linha, tf->lv_ant, tf->tf->obj.TamHor - folga );

  ptr_linha->num_br = linha.num_br;     // número de brancos
  ptr_linha->esp_br = linha.esp_br;     // espaço total de brancos
  ptr_linha->larg_lin = linha.larg_lin; // largura da linha
  ptr_linha->maior_cp = linha.maior_cp; // maior corpo da linha
  ptr_linha->tipo_qb = linha.tipo_qb;   // tipo da quebra
  ptr_linha->baseline = linha.baseline; // linha de base
  ptr_linha->descent = linha.descent;   // descendente
  ptr_linha->flag_tab = linha.flag_tab;
  ptr_linha->tem_texto = linha.tem_texto;

  linha.prof += linha.maior_cp;   // avançar a profundidade

  tf->lv[1] = linha;    // linha final
}

short int indLogo;
/*------------------------------------------------------------------------*/
enum FORM_PALAVRA TF_formatar_palavra ( struct TF_controle *tf,
                                        struct TF_palavra *palavra,
                                        struct TF_pal_logo *logo,
                                        struct TF_pal_fio *fio,
                                        WORD tam_max )
/* formatar um pedaço do texto do Text Field
*/
{
  WORD posf, larg_pal, larg_tab, ind;
  short int tam_pal;
  WORD  ascendente,
        descendente,
        maior_cp;

   unsigned short int folga;

  enum tp_alin alin;

  BOOL sair_fio = FALSE;

  BYTE  *pal;
  BYTE   car;

  struct TF_linha linha = tf->lv[ 0 ];

  BOOL trocar_fonte = TRUE;


  if (tf->tf->Moldurado)
    folga = tf->tf->Espessura + tf->tf->Sombra;
  else
    folga = 0;

  logo->tam = 0;

// Alterado   Susana maio/96 inic. margem no início de todas as linhas

  if ( linha.marg == 0 )
  {
    if (linha.flag_tab == FALSE)
      switch ( tf->tf->Just )
      {
        case TF_AL_ESQ:
        case TF_AL_JUS:
          linha.marg = 0;
          break;
        case TF_AL_DIR:
          linha.marg = linha.larg_lin - linha.esp_br;
          break;
        case TF_AL_CEN:
          linha.marg = (linha.larg_lin - linha.esp_br) / 2;
          break;
      }
  }

  if ( linha.posi >= tf->tatual )
    // fim deste text field, só reinicializando...
  {
    palavra->prof  = tf->tf->obj.PosVer - tf->tf->obj.TamVer + folga +
                tf->lv[ 1 ].prof;
    return FP_FIM_DO_TEXTO;
  }

  TF_buffer_texto = tf->texto;
  TF_buf_tatual = tf->tatual;

  if ( linha.posi == 0 )  // início do textfield
  {
    fRespeitarDimLogo = (tf->tf->obj.Opcoes & OPC_OBJ_TXT_LOGO) == OPC_OBJ_TXT_LOGO;

    // espacejamento entre linhas   Susana   maio/96
    esp_lin_exato = FALSE;

    switch ( tf->tf->EspLin )
    {
      case ( TF_ESP_SIMPLES ):
        esp_lin_fator = 1;
        break;
      case ( TF_ESP_DUPLO ):
        esp_lin_fator = 2;
        break;
      case ( TF_ESP_MULT ):
        esp_lin_fator = tf->tf->AtEspLin;
        break;
      case ( TF_ESP_EXATO ):
        esp_lin_fator = tf->tf->AtEspLin;
        esp_lin_exato = TRUE;
        fRespeitarDimLogo = FALSE;
        break;
    }

    // inicio da listagem deste text field, compor antes de mais nada
    TF_formatar_texto_parcial_pal(  tf, TRUE );

    linha = tf->lv[ 0 ];

    tf->pulou_marg = FALSE;
    tf->num_br = 0;

    alin = tf->tf->Just;

    if ( (alin == TF_AL_JUS  &&  linha.tipo_qb != TF_QB_WORDWRAP) ||
       (linha.flag_tab == TRUE) )
      alin = TF_AL_ESQ;

    switch ( alin )
    {
      case TF_AL_ESQ:
      case TF_AL_JUS:
        linha.marg = 0;
        break;
      case TF_AL_DIR:
        linha.marg = linha.larg_lin - linha.esp_br;
        break;
      case TF_AL_CEN:
        linha.marg = (linha.larg_lin - linha.esp_br) / 2;
        break;
    }
  }
  else
  if ( linha.posi >= tf->lv[ 1 ].posi )
  {
fim_da_linha:
    if ( linha.tipo_qb == TF_QB_NENHUMA )
    {
      palavra->prof  = tf->tf->obj.PosVer - tf->tf->obj.TamVer + folga +
                  tf->lv[ 1 ].prof;
      return FP_FIM_DO_TEXTO;
    }

    // já listou toda a última linha, formata mais um pouco...
    tf->lv[2] = tf->lv[0]; // salvar composição linha anterior
    tf->lv[0] = tf->lv[1];

    TF_formatar_texto_parcial_pal( tf, FALSE );

    tf->pulou_marg = FALSE;
    tf->num_br = 0;

    return FP_FIM_DA_LINHA;
  }
  else
  {
    if (linha.tem_texto == FALSE) goto fim_da_linha;

    alin = tf->tf->Just;

    if ( (alin == TF_AL_JUS  &&  linha.tipo_qb != TF_QB_WORDWRAP) ||
       (linha.flag_tab == TRUE) )
      alin = TF_AL_ESQ;
  }

  posf = tf->lv[ 1 ].posi;

  tam_pal = 0;

  // pegando apenas um pedaço de texto...
loop:
  while ( linha.posi < posf )
  {
    car = TF_buffer_texto[ linha.posi ];

    switch ( car )
    {
      case sBRANCO:
        if ( linha.flag_lg == TRUE ) break;

// SYLA 29/10/96 SE A FONTE FOSSE SUBL. O PRIM. BRANCO NÃO SAIA SUBLINHADO
//    if ( alin != AL_JUS  &&  tf->pulou_marg == TRUE )
//      if (alin != TF_AL_JUS)
//        break;  // tratar o branco como um caracter comum
        if (tf->pulou_marg == TRUE)
        {
          tf->num_br++;

          // recalcula a largura do branco
          if (tf->num_br > linha.num_br)
          {
            // brancos no final da linha, abandoná-los...
            linha.posi = posf;
            continue;
          }
          if (alin != TF_AL_JUS)
            break;  // tratar o branco como um caracter comum
        }
        else
        if (tf->lv_ant != NULL &&
           tf->lv_ant->tipo_qb == TF_QB_WORDWRAP)
          break;  // tratar o branco como um caracter comum
      case sTAB:
      case sESC:
      case sRETURN:
        goto tratar_cmd;
      default:
        tf->pulou_marg = TRUE;
        break;
    }

    if ( tam_pal == 0 )
      pal = &TF_buffer_texto[ linha.posi ];

    tam_pal++;
    linha.posi++;

    if ( tam_pal == tam_max )
      break;
  }
  car = 0;  // fim da linha

tratar_cmd: // tratando um comando

  if ( tam_pal > 0 )
  {
    if ( linha.flag_lg == TRUE )
    { // tratamento de logotipo
      logo->tam   = tam_pal;
      logo->pal   = pal;
      logo->tflogo.largura = TF_ptr_logo[indLogo].largura;
      logo->tflogo.altura = TF_ptr_logo[indLogo].altura;
      logo->tflogo.hReduced = TF_ptr_logo[indLogo].hReduced;
      logo->tflogo.vReduced = TF_ptr_logo[indLogo].vReduced;
      logo->tflogo.comprType = TF_ptr_logo[indLogo].comprType;
      logo->marg  = tf->tf->obj.PosHor + linha.marg + folga;
      logo->prof  = tf->tf->obj.PosVer - tf->tf->obj.TamVer + folga +
//                linha.prof + linha.baseline;
                linha.prof;

      linha.marg += TF_ptr_logo[indLogo].largura;
      tf->pulou_marg = TRUE;
    }
    else
    {
      int linha_de_base = linha.baseline;

      if ( trocar_fonte == TRUE )
      {
        trocar_fonte = FALSE;

        TF_caracteristicas_da_fonte( linha.ft_atual,
                       &ascendente,
                       &descendente,
                       &maior_cp );

        if (TF_ptr_tab_fonte[linha.ft_atual].Fsobre)
        {
          linha_de_base -= ascendente / 3;
        }
        else
        if (TF_ptr_tab_fonte[linha.ft_atual].Fsub)
        {
          linha_de_base += descendente / 3;
        }
      }
      if ( gPrinter == XEROX )
        linha_de_base += descendente; // especificando a profundidade a partir da base da célula
                                      // alinhamento pelo 'bottom'

      larg_pal = TF_largura_da_palavra_pal( pal, tam_pal, linha.ft_atual );

      palavra->tam   = tam_pal;
      palavra->pal   = pal;
      palavra->fonte = TF_ptr_tab_fonte[ linha.ft_atual ].ft_int/*+TemFioXerox*/;
      palavra->exp   = TF_ptr_tab_fonte[ linha.ft_atual ].f.Fexp;
      palavra->sub   = TF_ptr_tab_fonte[ linha.ft_atual ].f.Fund;
      palavra->color = TF_ptr_tab_fonte[ linha.ft_atual ].f.color;
      palavra->orient= tf->tf->obj.Orientacao;

      palavra->n_br     = -1;
      palavra->marg_br  = 0;
      palavra->prof_br  = 0;

      switch ( palavra->orient )
      {
        case OO_NORMAL:
          palavra->marg  = tf->tf->obj.PosHor + linha.marg + folga;
          palavra->prof  = tf->tf->obj.PosVer - tf->tf->obj.TamVer + folga +
                    linha.prof + linha_de_base; //linha.baseline;
          break;
        case OO_CIMA:
          palavra->marg  = tf->tf->obj.PosHor - tf->tf->obj.TamVer + folga +
                    linha.prof + linha_de_base; //linha.baseline;
          palavra->prof  = tf->tf->obj.PosVer - linha.marg - folga;
          break;
        case OO_BAIXO:
          palavra->marg  = tf->tf->obj.PosHor + tf->tf->obj.TamVer - folga -
                    (linha.prof + linha_de_base); //linha.baseline);
          palavra->prof  = tf->tf->obj.PosVer + linha.marg + folga;
          break;
        case OO_INVERTIDO:
          palavra->marg  = tf->tf->obj.PosHor - linha.marg - folga;
          palavra->prof  = tf->tf->obj.PosVer + tf->tf->obj.TamVer - folga -
                    linha.prof - linha_de_base; //linha.baseline;
          break;
        default:    // falta tratar outra rotacao
          break;
      }

      linha.marg += larg_pal;
      tf->pulou_marg = TRUE;
    }
  }

  switch ( car )
  {
    case sESC:
      switch ( TF_buffer_texto[ linha.posi + 1 ] )
      {
        case TF_CMD_INVALIDO:
          break;
        case TF_CMD_CAMPO_FIM:
          linha.flag_cp = FALSE;
          linha.ft_atual = linha.ft_def;
          trocar_fonte = TRUE;
          break;
        case TF_CMD_LOGO_FIM:
          linha.flag_lg = FALSE;
          linha.ft_atual = linha.ft_def;
          trocar_fonte = TRUE;
          break;
        case TF_CMD_FONTE:
          linha.ft_def =
          linha.ft_atual = TF_buffer_texto[ linha.posi + 2 ];
          trocar_fonte = TRUE;
          break;
        case TF_CMD_LOGO_INI:
          linha.flag_lg = TRUE;
          indLogo = TF_buffer_texto[ linha.posi + 2 ];
          trocar_fonte = TRUE;
          break;
        case TF_CMD_CAMPO_INI:
          linha.flag_cp = TRUE;
          linha.ft_atual = TF_ptr_campo_saida[ TF_buffer_texto[
                        linha.posi + 2 ] ].fonte;
          trocar_fonte = TRUE;
          break;
        case TF_CMD_FIOH:
          if (tam_pal == 0 && linha.flag_cp == FALSE)
          {
            fio->tipo = 'H';
            ind = TF_buffer_texto[linha.posi + 2 ];
            larg_pal = TF_ptr_fio[ind].larg_alt;

            goto fio_comum;
          }
          goto fim;
        case TF_CMD_FIOV:
          if (tam_pal == 0 && linha.flag_cp == FALSE)
          {
            fio->tipo = 'V';
            ind = TF_buffer_texto[linha.posi + 2 ];
            larg_pal = TF_ptr_fio[ind].espessura;

            goto fio_comum;
          }
          goto fim;


fio_comum:
          sair_fio = TRUE;

          switch ( tf->tf->obj.Orientacao )
          {
            case OO_NORMAL:
              fio->marg  = tf->tf->obj.PosHor + linha.marg + folga;
              fio->prof  = tf->tf->obj.PosVer - tf->tf->obj.TamVer + folga +
                      linha.prof + linha.baseline;
              break;
            case OO_CIMA:
              fio->marg  = tf->tf->obj.PosHor - tf->tf->obj.TamVer + folga +
                      linha.prof + linha.baseline;
              fio->prof  = tf->tf->obj.PosVer - linha.marg - folga;
              break;
            case OO_BAIXO:
              fio->marg  = tf->tf->obj.PosHor + tf->tf->obj.TamVer - folga -
                      (linha.prof + linha.baseline);
              fio->prof  = tf->tf->obj.PosVer + linha.marg + folga;
              break;
            case OO_INVERTIDO:
              fio->marg  = tf->tf->obj.PosHor - linha.marg - folga;
              fio->prof  = tf->tf->obj.PosVer + tf->tf->obj.TamVer - folga -
                      linha.prof - linha.baseline;
              break;
            default:    // falta tratar outra rotacao
              break;
          }

          fio->larg_alt = TF_ptr_fio[ind].larg_alt;
          fio->espessura = TF_ptr_fio[ind].espessura;
          linha.marg += larg_pal;
          tf->pulou_marg = TRUE;
          break;
      }
      linha.posi += TF_TAM_CMD;
      break;

    case sRETURN:
      linha.posi++;
      goto fim;

    case sTAB:
      larg_tab = TF_largura_do_tab( linha.marg );
      linha.posi++;

      linha.marg += larg_tab;
//      tf->pulou_marg = TRUE;

      break;

    case sBRANCO:
      {
        int linha_de_base = linha.baseline;

        if ( trocar_fonte == TRUE )
        {
          trocar_fonte = FALSE;

          TF_caracteristicas_da_fonte( linha.ft_atual, &ascendente,
                              &descendente, &maior_cp );

          if (TF_ptr_tab_fonte[linha.ft_atual].Fsobre)
            linha_de_base -= ascendente / 3;
          else
          if (TF_ptr_tab_fonte[linha.ft_atual].Fsub)
            linha_de_base += descendente / 3;
        }
           if ( gPrinter == XEROX )
          linha_de_base += descendente; // especificando a profundidade a partir da base da célula
                                        // alinhamento pelo 'bottom'

        palavra->fonte = TF_ptr_tab_fonte[ linha.ft_atual ].ft_int/*+TemFioXerox*/;
        palavra->exp   = TF_ptr_tab_fonte[ linha.ft_atual ].f.Fexp;
        palavra->sub   = TF_ptr_tab_fonte[ linha.ft_atual ].f.Fund;
        palavra->color = TF_ptr_tab_fonte[ linha.ft_atual ].f.color;
        palavra->orient= tf->tf->obj.Orientacao;

        palavra->n_br    = -1;
        palavra->marg_br = 0;
        palavra->prof_br = 0;

        if (tam_pal == 0) // só existe o branco, acertar margem inicial do branco
        {
          switch ( palavra->orient )
          {
            case OO_NORMAL:
              palavra->marg  = tf->tf->obj.PosHor + linha.marg + folga;
              palavra->prof  = tf->tf->obj.PosVer - tf->tf->obj.TamVer + folga +
                        linha.prof + linha_de_base; //linha.baseline;
              break;
            case OO_CIMA:
              palavra->marg  = tf->tf->obj.PosHor - tf->tf->obj.TamVer + folga +
                        linha.prof + linha_de_base; //linha.baseline;
              palavra->prof  = tf->tf->obj.PosVer - linha.marg - folga;
              break;
            case OO_BAIXO:
              palavra->marg  = tf->tf->obj.PosHor + tf->tf->obj.TamVer - folga -
                        (linha.prof + linha_de_base); //linha.baseline);
              palavra->prof  = tf->tf->obj.PosVer + linha.marg + folga;
              break;
            case OO_INVERTIDO:
              palavra->marg  = tf->tf->obj.PosHor - linha.marg - folga;
              palavra->prof  = tf->tf->obj.PosVer + tf->tf->obj.TamVer - folga -
                        linha.prof - linha_de_base; //linha.baseline;
              break;
            default:    // falta tratar outra rotacao
              break;
          }
        }

        larg_pal = TF_largura_da_palavra_pal( " ", 1, linha.ft_atual );

        if ( tf->pulou_marg == TRUE )
        {
          // recalcula a largura do branco
          if ( alin == TF_AL_JUS  &&  linha.esp_br > 0 )
          {
            WORD larg_br, tot_br = 0;

            larg_br = (WORD)(((DWORD)linha.larg_lin * larg_pal) /
                            linha.esp_br);

            linha.larg_lin -= larg_br;
            linha.esp_br -= larg_pal;

            // se for fonte sublinhada, tratamento especial (preencher com vários brancos)
            if (palavra->sub)
            {
              tot_br += larg_br;

              // verificando se existem outros brancos seguidos a este...
              while (linha.posi+1 < posf
                      && TF_buffer_texto[linha.posi+1] == ' '
                      && linha.esp_br > 0)
              {
                linha.marg += larg_br;
                linha.posi++;

                larg_br = (WORD)(((DWORD)linha.larg_lin * larg_pal) /
                                linha.esp_br);

                linha.larg_lin -= larg_br;
                linha.esp_br -= larg_pal;

                tot_br += larg_br;
              }

              palavra->n_br = tot_br / larg_pal;

              if (tot_br % larg_pal)
              {
                palavra->marg_br = linha.marg + larg_br - larg_pal;

                switch ( palavra->orient )
                {
                  case OO_NORMAL:
                    palavra->marg_br = tf->tf->obj.PosHor + palavra->marg_br + folga;
                    palavra->prof_br = tf->tf->obj.PosVer - tf->tf->obj.TamVer + folga +
                              linha.prof + linha_de_base; //linha.baseline;
                    break;
                  case OO_CIMA:
                    palavra->marg_br = tf->tf->obj.PosHor - tf->tf->obj.TamVer + folga +
                              linha.prof + linha_de_base; //linha.baseline;
                    palavra->prof_br = tf->tf->obj.PosVer - palavra->marg_br - folga;
                    break;
                  case OO_BAIXO:
                    palavra->marg_br = tf->tf->obj.PosHor + tf->tf->obj.TamVer - folga -
                              (linha.prof + linha_de_base); //linha.baseline);
                    palavra->prof_br = tf->tf->obj.PosVer + palavra->marg_br + folga;
                    break;
                  case OO_INVERTIDO:
                    palavra->marg_br = tf->tf->obj.PosHor - palavra->marg_br - folga;
                    palavra->prof_br = tf->tf->obj.PosVer + tf->tf->obj.TamVer - folga -
                              linha.prof - linha_de_base; //linha.baseline;
                    break;
                  default:    // falta tratar outra rotacao
                    break;
                }
              }
            }

            larg_pal = larg_br;
          }
        }

        linha.marg += larg_pal;
        linha.posi++;

        if ( tam_pal == 0 && palavra->n_br >= 0)
        {
          tf->lv[ 0 ] = linha;
          return FP_BR_JUSTIFIC;
        }
      }
      break;

    case 0:
    default:
      goto fim;   // fim do texto
  }
  if (sair_fio == FALSE)
  {
    if ( tam_pal == 0 ) // se não apareceu nenhuma palavra ainda...
      goto loop;
  }

fim:
  if (sair_fio == FALSE)
  {
    if ( tam_pal == 0 )
      goto fim_da_linha;
  }

  tf->lv[ 0 ] = linha;

  if (sair_fio == TRUE)
     return FP_FIO;
  else
  if ( logo->tam == 0 )
     return FP_PAL_FORMATADA;
  else return FP_LOGO;
}

/*------------------------------------------------------------------------*/
static void TF_trocar_fontes( void )
{
  // trocar apenas aquelas que podem ter uma expressão associada a elas
  int i;

  flag_previa_real = TRUE;  // conferir com o PIRES 24/05/2001

  for (i = 0; i < TF_tam_tab_fonte; i++)
    if (TF_ptr_tab_fonte[i].f.expressao[0] != 0)
    {
      // tem expressão, então...
      // apagar a fonte antiga e tentar criar uma nova
      if (TF_ptr_tab_fonte[i].hft != NULL)
        DeleteFont(TF_ptr_tab_fonte[i].hft);
      if (TF_ptr_tab_fonte[i].hft_vid != NULL)
        DeleteFont(TF_ptr_tab_fonte[i].hft_vid);

      TF_criar_fonte_impressora(i);
      TF_ptr_tab_fonte[ i ].ft_int =
            InsereFont(NomeFonteSelecionada)/*-TemFioXerox*/;
    }
  flag_previa_real = FALSE; // conferir com o PIRES 24/05/2001
}

/*------------------------------------------------------------------------*/
static void TF_substituir_campo_pal ( WORD campo, WORD *p_pos )
/* substitui um campo de saida por uma cadeia de caracteres com tamanho
*  aproximado da largura do campo
*/
{
  WORD  ft, larg, pedaco, tam, pos = *p_pos;
  char * nono;
  char buff [MAXLENSTR];
  enum result_expr resp;

  ft   = TF_ptr_campo_saida[ campo ].fonte;
  larg = TF_ptr_campo_saida[ campo ].largura;

  resp = CalculaExpr( TF_ptr_campo_saida[ campo ].expressao, &nono );
  if ( resp != RE_ERRO )
  {
    if ( resp != RE_FALSE_SEM_VALOR )
    {
      if ( TF_ptr_campo_saida[ campo ].mascara[0] != 0 )
      { // tem mascara de edição
        stredn ( buff, nono, TF_ptr_campo_saida[ campo ].mascara, strlen(nono));
        nono = buff;
      }

      tam = strlen(nono);

      pedaco = TF_largura_da_palavra_pal ( nono, tam, ft );

      if ( TF_ptr_campo_saida[ campo ].auto_LF == TRUE )
      {
        TF_inserir_cadeia( "\n", 1, pos );
        pos += 1;
      }

      if ( larg >= pedaco )
      {
        TF_inserir_cadeia( nono, tam, pos );
        pos += tam;
      }
      else
      {
        while( --tam > 0 )
        {
          pedaco = TF_largura_da_palavra_pal ( nono, tam, ft );
          if ( larg < pedaco )
            continue;
          TF_inserir_cadeia( nono, tam, pos );
          pos += tam;
          break;
        }
      }
    }
  }
  *p_pos = pos;
}

/*------------------------------------------------------------------------*/
static void TF_substituir_logo_pal ( WORD logo, WORD *p_pos )
/* substituir um logo por uma cadeia de caracteres com tamanho
*  aproximado da largura do logo
*/
{
  char * nono;
  enum result_expr resp;
  WORD  tam;

  resp = CalculaExpr( TF_ptr_logo[ logo ].expressao, &nono );
  if ( resp != RE_ERRO )
  {
    tam = strlen(nono);
    TF_inserir_cadeia( nono, tam, *p_pos );
    *p_pos += tam;
  }
}

/*------------------------------------------------------------------------*/
void TF_trocar_campos ( struct TF_controle *tf )
/* substituir o conteúdo dos campos de saída e logos do text field
*/
{
  WORD  pos = 0,
        tam_pedaco;

  // forçar a formatação do texto a partir do inicio do mesmo
  tf->lv[0].posi = 0;

  TF_trocar_fontes(); // trocar as fontes que são "variáveis"

  // se não tem campos a substituir, não faz nada
  if ( tf->tem_campo == FALSE && tf->tem_logo == FALSE )
    return;

  TF_buffer_texto = tf->texto;
  TF_buf_tatual = tf->tatual;
  TF_buf_tmax = tf->tmax;

  while ( pos < TF_buf_tatual )
  {
    tam_pedaco = TF_strnchr( TF_buffer_texto + pos,
                 TF_buf_tatual - pos, sESC );

    if ( tam_pedaco == 0 )
      break;

    pos += tam_pedaco - 1;

    if ( TF_buffer_texto[ pos + 1 ] == TF_CMD_CAMPO_INI )
    {
      WORD cmp = TF_buffer_texto[ pos + 2 ];

      pos += TF_TAM_CMD;

      tam_pedaco = TF_strnchr( TF_buffer_texto + pos,
                 TF_buf_tatual - pos, sESC );

      TF_apagar_cadeia( tam_pedaco - 1, pos );

      TF_substituir_campo_pal( cmp, &pos );
    }
    else
    if ( TF_buffer_texto[ pos + 1 ] == TF_CMD_LOGO_INI )
    {
      WORD cmp = TF_buffer_texto[ pos + 2 ];

      pos += TF_TAM_CMD;

      tam_pedaco = TF_strnchr( TF_buffer_texto + pos,
                 TF_buf_tatual - pos, sESC );

      TF_apagar_cadeia( tam_pedaco - 1, pos );
      TF_substituir_logo_pal( cmp, &pos );
    }


    pos += TF_TAM_CMD;
  }

  tf->texto = TF_buffer_texto;
  tf->tatual = TF_buf_tatual;
  tf->tmax = TF_buf_tmax;
}

/*------------------------------------------------------------------------*/
BOOL TF_preparar_textfield_para_listagem ( struct TF_controle *tf )
/* iniciar a estrutura de controle de um Text Field
*/
{
  TEXTFIELD TF_atual;

  struct TF_tab_fonte ft; // fonte default do Text Field
  BYTE * texto;

  tf->ft_def = (int)-1;
  tf->tem_campo = FALSE;
  tf->tem_logo = FALSE;

  // liberar áreas anteriores
  TF_liberar_dc_da_impressora();  // inserido SYLA 03/99
  TF_liberar_areas_formatador();

  // alocar novas áreas iniciais
  if (TF_aumentar_tabela_de_fontes() == FALSE)  return FALSE;
  if (TF_aumentar_tabela_de_campos() == FALSE)  return FALSE;
  if (TF_aumentar_tabela_de_logos() == FALSE)   return FALSE;
  if (TF_aumentar_tabela_de_fios() == FALSE)    return FALSE;
  if (TF_aumentar_buffer_de_texto() == FALSE)   return FALSE;

  TF_criar_dc_da_impressora(); // inserido SYLA 09/03/99

  TF_atual = * (tf->tf);

  // compilar texto inicial
  if ( TF_atual.Text != NULL )
  {
    // inicializar a fonte default do Text Field
    strcpy ( ft.f.Fnome, TF_atual.fonte.Fnome );
    ft.f.FProp = TF_atual.fonte.FProp;
    ft.f.Fcpi  = TF_atual.fonte.Fcpi;
    ft.f.Fexp  = TF_atual.fonte.Fexp;
    ft.f.Fund  = TF_atual.fonte.Fund;
    ft.f.color = TF_atual.fonte.color;

    // INSERIDO SYLA 19/05/98

    strcpy ( ft.f.FnomeW, TF_atual.fonte.FnomeW );
    ft.f.corpo = TF_atual.fonte.corpo;
    ft.f.Fstk  = TF_atual.fonte.Fstk;
    ft.f.Fbold = TF_atual.fonte.Fbold;
    ft.Fsobre  = FALSE;
    ft.Fsub    = FALSE;

    strcpy ( ft.f.expressao, TF_atual.fonte.expressao );

    ft.ft_int = TF_atual.LoadF/*-TemFioXerox*/;

    tf->ft_def = TF_criar_fonte( &ft );

    if ( (texto = (BYTE *)GlobalLock( TF_atual.Text )) == NULL )
    {
      erro_mens ( 67, NULL ); // out of memory
      return(FALSE);    // ??? mensagem de erro?
    }

    if ( tf->ft_def != (int)-1 )
      TF_compilar_um_texto( texto, TF_atual.Tatual, TF_buf_tatual );

    tf->texto   = TF_buffer_texto;
    tf->tatual  = TF_buf_tatual;
    tf->tmax    = TF_buf_tmax;

    if ( TF_tot_campo_saida > 0 )
      tf->tem_campo = TRUE;
    if ( TF_tot_logo > 0 )
      tf->tem_logo = TRUE;
  }

  tf->lv[0].posi = 0;
  GlobalUnlock( TF_atual.Text );
  return ( TRUE );
}

/*------------------------------------------------------------------------*/
void TF_liberar_textfield_para_listagem ( void )
{
  // liberar áreas anteriores
  TF_liberar_dc_da_impressora();  // inserido SYLA 09/03/99
  TF_liberar_areas_formatador();
}
/*..*/
