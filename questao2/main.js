
/**
 * Função que carrega um XML de URL
 */
function carregaXMLRemoto(){
  
    urlxml = '';
    
    $.get(urlxml, function(dados){
      parserXML(dados);});
  }
  
  /**
   * Função que processa os dados de um XML
   * @param {*} xml 
   */
  function parserXML(xml){
  
    dadosLista = "";
    
    xmlDoc = $.parseXML(xml);
    $xml = $(xmlDoc);
    
    $filmes = $xml.find("Movie");
    
    $filmes.each(function(){
      titulo = $(this).find('title').text();
      genero = $(this).find('description').text();
      dadosLista += criaElementoLista([titulo, genero]);
    });
    document.getElementById("projeto_lista").innerHTML = dadosLista;
  }
  
  /**
   * Criando os elementos de uma lista com o Material Design
   * @param {*} dados
   */
  function criaElementoLista(dados){
    
    /*
    criando elemento lista
    <li class="mdl-list__item mdl-list__item--three-line">
      <span class="mdl-list__item-primary-content">
        <i class="material-icons mdl-list__item-avatar">person</i>
        <span>Bryan Cranston</span>
        <span class="mdl-list__item-text-body">
          Bryan Cranston played the role of Walter in Breaking Bad. He is also known
          for playing Hal in Malcom in the Middle.
        </span>
      </span>
      <span class="mdl-list__item-secondary-content">
        <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>
      </span>
    </li>
    */
  
   var item_lista = '<li class="mdl-list__item mdl-list__item--three-line">';
       item_lista += '<span class="mdl-list__item-primary-content">';
       item_lista += '<i class="material-icons mdl-list__item-avatar">person</i>';
       item_lista += '<span>'+ dados[0] +'</span>';
       item_lista += '<span class="mdl-list__item-text-body">';
       item_lista += dados[1];
       item_lista += '</span></span></li>'; 
    
   return item_lista;
  }
  
  
  
  /**
   * Função que carrega um XML de URL
   */
  function carregaXMLRemotoNoticias(){
    
    //urlxml = 'tecnologia_uol.xml';
    urlxml = 'brasil.xmle';
    
    $.get(urlxml, function(dados){
      parserXMLNoticias(dados);
    });
  }
  
  /**
   * Função que processa os dados de um XML
   * @param {*} xml 
   */
  function parserXMLNoticias(xml){
  
    dadosLista = "";
    
    xmlDoc = $.parseXML(xml);
    $xml = $(xmlDoc);
    
    // coletando item: title, link, description, pubDate
    $itens = $xml.find("entry");
    
    $itens.each(function(){
      titulo = $(this).find('title').text();
      descricao = $(this).find('description').text();
      datapub = $(this).find('pubDate').text();
      dadosLista += criaElementoLista([titulo, descricao]);
    });
    document.getElementById("noticias").innerHTML = dadosLista;
  }