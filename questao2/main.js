function carregaXMLRemotoNoticias(){
  
  //urlxml = 'brasil.xml';
  urlxml = 'https://raw.githubusercontent.com/ARJOM/avaliativa3/master/questao2/brasil.xml';

  $.get(urlxml, function(dados){
    dadosLista = "";
  
    xmlDoc = $.parseXML(dados);
    $xml = $(xmlDoc);
  
    // coletando item: title, link, description, pubDate
    $filmes = $xml.find("entry");
  
    $filmes.each(function(){
      titulo = $(this).find('title').text();
      descricao = $(this).find('summary').text();
      datapub = $(this).find('published').text();
      img = $(this).find('img')[0].getAttribute("src");
      link = $(this).find('link')[0].getAttribute("href");
      externo = "<a href=\""+link+"\">Veja mais.</a>";
      imagem = "<img src="+img+" />";
      dadosLista += "<div> <h3>"+titulo+"</h3><h6>Publicado em: "+datapub+"</h6><p>"+descricao+""+externo+"</p>"+imagem+"</div>";
    });
    document.getElementById("noticias").innerHTML = dadosLista;
  });
}