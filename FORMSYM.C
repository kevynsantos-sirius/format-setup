#include    <windows.h>
#include    <windowsx.h>

#include    "FORMLIB.H"
#include    "FORMW.H"
#include    "FORMSYM.H"
#include    "FORMAVAL.H"

#include    "GLOBAIS.H"
#include  "BARRLIB.H"

HGLOBAL HSym = NULL;

iacumsymb iacumtable [] =
{
  {"_AvDetSpace", 0},
  {"_ContRep",    0},
  {"_FileName",   0},
  {"_NroDoc",     0},
  {"_NumDocHoriz",0},
  {"_NumDocPag",  0},
  {"_NumRegGr",   0},
  {"_OverflowDoc",0},
  {"_PageNum",    0},
  {"_SpoolName",  0},
  {"_SysDate1",   0},
  {"_SysDate2",   0},
  {"_SysDate3",   0},
  {"_SysDate4",   0},
  {"_SysDate5",   0},
  {"_SysDate6",   0},
  {"_SysDate7",   0},
  {"_SysMsg1",    0},
  {"_TotRep",     0}
};

static short int  totItens;
static short int  numItens;
static short int  primeiroInd;
static short int  ultimoInd = 0;  /* usado na tabela de simbolos */
                                  /* as primeiras posicoes sao usadas para
                                     as variaveis do usuario */

BOOL ehDetalhe = FALSE;

         /* ACUMULADORES */
long  ContRep;              /* contador de repeticoes de cada grupo */
char *NroDoc [MAXNDOCPAG];  /* numero do documento que esta sendo tratado */
short int  NumDocHoriz;     /* contador de documentos na horizontal */
short int  NumDocPag;       /* contador de documentos por pagina */
short int  NumRegGr;        /* contador de documentos por grupo */
long  TotRep;               /* numero total de repeticoes de cada grupo */
short int  SysDate1;
short int  SysDate2;
short int  SysDate3;
short int  SysDate4;
short int  SysDate5;
short int  SysDate6;
short int  SysDate7;
char  SysMsg1 [65] = " ";
long  PageNum;              /* numero da pagina que esta sendo impressa */
short int  AvDetSpace;      // espaço disponível na janela detalhe em pixels

/******************************************************
 * createSym - rotina que cria a  tabela de simbolos  *
 ******************************************************/
static BOOL createSym( void )
{
  primeiroInd = -1;
  ultimoInd   = -1;
  totItens    = SYMTAM;
  numItens    = 0;
  if ( HSym != NULL )
  {
    GlobalFree ( HSym );
    HSym = NULL;
  }
  HSym = GlobalAlloc ( GHND, sizeof(entrSym)*totItens );
  if ( HSym == NULL )
    return ( FALSE );
  return ( TRUE );

}
// -----------------------------------------------------------------------------
/* Busca um elemento na lista ordenada */
static short int buscaBin (  char *s, short int *posant )
{
  short int inf, sup, meio;
  short int achou;
  int resp;
  entrSym *ptSym;

  if ( primeiroInd == -1 )
  {
    *posant = -1;
    return (-1);    /* tabela vazia */
  }
  inf = primeiroInd;
  sup = ultimoInd;
  ptSym = (entrSym *)GlobalLock(HSym);
  if ( ptSym == NULL )
    return(-1);

  achou = -1;
  while (inf <= sup)
  {
    meio = (inf+sup)/2;
    resp =  stricmp( (ptSym+meio)->lexname, s);
    if ( resp == 0)
    {
      achou=meio;
      inf = sup+1;
    }
    else if ( resp < 0 )
         inf = meio+1;
    else sup = meio - 1;
  }
  GlobalUnlock (HSym);
  *posant = (resp>0) ? meio-1 : meio;
  return achou;
}
// -----------------------------------------------------------------------------
static short int abreBuraco( short int pos )
{
  short int i;
  entrSym * ptultimo;
  entrSym * ptprox;
  entrSym * ptSym;

  if (numItens == 0)
  {
    ultimoInd = primeiroInd = 0;
    numItens++;
    return(1);
  }
  else
  if ( numItens == totItens )
  {
    totItens += 10;
    HSym = GlobalReAlloc(HSym, sizeof(entrSym)*totItens, GMEM_MOVEABLE|GMEM_ZEROINIT );
    if ( HSym == NULL )
      return (-1);
  }
  ptSym = (entrSym *) GlobalLock (HSym);
  if ( ptSym == NULL )
    return ( -1 );

  ptultimo = ptSym + ultimoInd;
  for ( i=ultimoInd; i>=pos; i-- )
  {
    ptprox = ptultimo + 1;
    *ptprox = *ptultimo;
    ptultimo--;
  }
  memset ( ptSym+pos, 0, sizeof(entrSym));
  GlobalUnlock (HSym);
  numItens++;
  ultimoInd++;
  return (1);
}
/******************************************************************
 * lookupSym - rotina que pesquisa um nome na tabela de simbolos  *
 *    entrada : s - endereco do nome a ser pesquisado             *
 *    saida   : posicao do nome na tabela de simbolos ou -1       *
 ******************************************************************/

short int lookupSym ( char *s )
{
  short int pos;
  if ( primeiroInd == -1 )  return (-1);    /* tabela vazia */
  return ( buscaBin (s, &pos) );
}
/******************************************************************  *
 * pesquisaSym - rotina que pesquisa um nome na tabela de simbolos e *
 *    se for campo verifica se é do mesmo tipo (detalhe ou cpoent)   *
 *    entrada : s - endereco do nome a ser pesquisado                *
 *    tipoCpo : 0 -> cpoent  e 1 -> detalhe                          *
 *    saida   : retorna TRUE se campo pode ser inserido              *
 *********************************************************************/
BOOL pesquisaSym ( char *s, int tipoCpo )
{        // retorna TRUE se pode inserir
  int   ind;
  entrSym *ptSym;
  BOOL  resp;

  if ( (ind = lookupSym( s )) == -1 )
    return ( TRUE );
  else
  { /* campo, doc, variável ou função */
    ptSym = (entrSym *) GlobalLock (HSym);
    resp = (ptSym+ind)->token == CPO && tipoCpo == (ptSym+ind)->flagDetalhe;
    GlobalUnlock (HSym);
    return ( resp );
  }
}
/***************************************************************
 * insertSym - insere nome na tabela simbolos e devolve posicao*
 *    entrada : s     - nome a ser inserido                    *
 *              token - token do simbolo a ser inserido        *
 *              id    - handle do nome na lista                *
 *    saida   : posicao do nome na tabela de simbolos ou -1    *
 ***************************************************************/
short int insertSym( char *s, short int token, short int ind )
{
  short int tam;
  entrSym * ptSym;
  short int posant;

  if ( buscaBin (  s, &posant ) == -1 )
  {
    posant++; // vai inserir na posição seguinte
    if ( abreBuraco ( posant ) != -1 )
    {
      ptSym = (entrSym *) GlobalLock (HSym);
      if ( ptSym == NULL )
        return ( -1 );
      (ptSym+posant)->token = token;
      (ptSym+posant)->indcpo= ind;
      if ( (ptSym+posant)->token == CPO || (ptSym+posant)->token == USERVAR )
           (ptSym+posant)->flagDetalhe = ehDetalhe;    // indica se é ou não cpo detalhe
      tam = strlen(s);
      if ( tam > MAXLENNAME )
           tam = MAXLENNAME;
      memcpy ( (ptSym+posant)->lexname, s, tam );
      (ptSym+posant)->lexname[tam] = 0;
      GlobalUnlock (HSym);
    }
  }
  return (posant);
}

/***************************************************************
 * retiraSym - rotina que retira um nome da tabela de simbolos *
 *    entrada : ind    - posicao do nome na tabela de simbolos *
 ***************************************************************/

short int retiraSym( short int ind )
{
  entrSym * ptSym;
  entrSym * ptAnterior;
  short int i;

  if ( primeiroInd == -1 ) return(-1);   /* lista vazia */
  ptSym = (entrSym *) GlobalLock ( HSym );
  if ( ptSym == NULL )
    return(-1);

  for ( i=ind+1; i<numItens; i++ )
  {
    ptAnterior = ptSym+i-1;
    *ptAnterior = *(ptSym+i);
  }
  memset ( ptSym+numItens-1, 0, sizeof(entrSym)); // 17/12/2003
  numItens--;
  ultimoInd--;
  GlobalUnlock (HSym);
  return(1);
}
/******************************************************************
 * liberaSym - rotina que libera a tabela de simbolos no final da *
 *             execução.                                          *
*******************************************************************/

void liberaSym ( void )
{
  if ( HSym != NULL )
  {
    GlobalFree ( HSym );
    HSym = NULL;
  }
  totItens = numItens = 0;
  primeiroInd = ultimoInd = -1;   /* usado na tabela de simbolos */
}
/******************************************************************
 * initSym - rotina que inicializa a tabela de simbolos armazenando  *
 *        palavras reservadas , campos de entrada e acumuladores  *
*******************************************************************/

BOOL initSym (void)     /* armazena palavras reservadas e campos de entrada
                           na tabela de simbolos */
{

  typedef struct { /* descricao da tabela de simbolos */
    char *    lexptr;
    short int token;
  } entr;

  entr keywords [] = {
     {"if",     IF},
     {"else",   ELSE},
     {"not",    NOT},
     {"and",    AND},
     {"or",     OR},
     {0,        0}
     };

  entr *ptr;

  short int i;
  Cpoent *ptent;
  Var    *ptvar;
  Fun    *ptfun;
  Doc    *ptdoc;


  if ( createSym () == FALSE )
    return ( FALSE );

  for ( ptr=keywords; ptr->token; ptr++ )
    if ( insertSym ( (char *)ptr->lexptr, ptr->token, 0 ) == -1 )
      return ( FALSE );

  if ( IdVar != -1 )
  {
    ehDetalhe = FALSE;
    ptvar = (Var *) lock_lista(IdVar);
    i = primeiro_lista (IdVar);
    while (i != -1)
    {
      if (insertSym ((char *)ptvar[i].NomeVar, USERVAR, i) == -1 )
      {
        unlock_lista(IdVar);
        return ( FALSE );
      }
      i = (ptvar+i)->indProxVar;
    }
    unlock_lista(IdVar);
  }

  if ( IdVarDet != -1 )
  {
    ehDetalhe = TRUE;
    ptvar = (Var *) lock_lista(IdVarDet);
    i = primeiro_lista (IdVarDet);
    while (i != -1)
    {
      if (insertSym ((char *)ptvar[i].NomeVar, USERVAR, i) == -1 )
      {
        unlock_lista(IdVarDet);
        return ( FALSE );
      }
      i = (ptvar+i)->indProxVar;
    }
    unlock_lista(IdVarDet);
  }

  if ( IdFun != -1 )
  {
    ptfun = (Fun *) lock_lista(IdFun);
    i = primeiro_lista (IdFun);
    while (i != -1)
    {
      if ( insertSym ((char *)ptfun[i].NomeFun, USERFUN, i) == -1)
      {
        unlock_lista(IdFun);
        return ( FALSE );
      }
      i = (ptfun+i)->indProxFun;
    }
    unlock_lista(IdFun);
  }

  if ( IdCpoent != -1 )
  {
    ptent = (Cpoent *) lock_lista(IdCpoent);
    i = primeiro_lista (IdCpoent);
    ehDetalhe = FALSE;
    while (i != -1)
    {
      if (insertSym ( (char *)ptent[i].NomeCpoent, CPO, i) == -1 )
      {
        unlock_lista(IdCpoent);
        return( FALSE );
      }
      i = (ptent+i)->indProxCpoent;
    }
    unlock_lista(IdCpoent);
  }

  if ( IdCpodet != -1 )
  {
    ehDetalhe = TRUE;
    ptent = (Cpoent *) lock_lista(IdCpodet);
    i = primeiro_lista (IdCpodet);
    while (i != -1)
    {
      if (insertSym ( (char *)ptent[i].NomeCpoent, CPO, i) == -1 )
      {
        unlock_lista(IdCpodet);
        return( FALSE );
      }
      i = (ptent+i)->indProxCpoent;
    }
    unlock_lista(IdCpodet);
  }
  ehDetalhe = FALSE;

  if ( IdDoc != -1 )
  {
    ptdoc = (Doc *) lock_lista(IdDoc);
    i = primeiro_lista (IdDoc);
    while (i != -1)
    {
      if ( ptdoc[i].NomeDoc[0] != (int) NULL )
        if (insertSym ( (char *)ptdoc[i].NomeDoc, DOC, i) == -1)
        {
          unlock_lista(IdDoc);
          return ( FALSE );
        }
      i = (ptdoc+i)->indProxDoc;
    }
    unlock_lista(IdDoc);
  }

  for ( i=0; i<NUMACUM; i++ )
    if (insertSym ( iacumtable[i].lexptr, SYSVAR, 0 ) == -1)
      return ( FALSE );

  iacumtable[0].iacumptr =  (YYSTYPE)(&AvDetSpace);
  iacumtable[1].iacumptr =  (YYSTYPE)(&ContRep);
  iacumtable[2].iacumptr =  (YYSTYPE)(&gDataFileName);
  iacumtable[3].iacumptr =  (YYSTYPE)(&NroDoc);
  iacumtable[4].iacumptr =  (YYSTYPE)(&NumDocHoriz);
  iacumtable[5].iacumptr =  (YYSTYPE)(&NumDocPag);
  iacumtable[6].iacumptr =  (YYSTYPE)(&NumRegGr);
  iacumtable[7].iacumptr =  (YYSTYPE)(&gPagDocOverflow);
  iacumtable[8].iacumptr =  (YYSTYPE)(&PageNum);
  iacumtable[9].iacumptr =  (YYSTYPE)(&nomePrinter1);
  iacumtable[10].iacumptr =  (YYSTYPE)(&SysDate1);
  iacumtable[11].iacumptr =  (YYSTYPE)(&SysDate2);
  iacumtable[12].iacumptr =  (YYSTYPE)(&SysDate3);
  iacumtable[13].iacumptr =  (YYSTYPE)(&SysDate4);
  iacumtable[14].iacumptr =  (YYSTYPE)(&SysDate5);
  iacumtable[15].iacumptr =  (YYSTYPE)(&SysDate6);
  iacumtable[16].iacumptr =  (YYSTYPE)(&SysDate7);
  iacumtable[17].iacumptr =  (YYSTYPE)(&SysMsg1);
//  iacumtable[18].iacumptr =  (YYSTYPE)(&RegTotRep);
  iacumtable[18].iacumptr =  (YYSTYPE)(&TotRep);  // alterado em 08/08/2005

  return ( TRUE );
}


