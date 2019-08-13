function carregaCSVRemoto(){
  
    var arquivo = 'https://raw.githubusercontent.com/ARJOM/avaliativa3/master/questao3/wifi.csv';
  
    $.get(arquivo, function( dados ) {
  
      var dadosLinhas = dados.split(/\r\n|\n/);
      var dadosLista = "";

      // para cada um dos elementos
        for (var i=1; i<100; i++) {
            var dados = dadosLinhas[i].split(",");
            var nome = dados[4];
            var bairro = dados[1];
            var localizacao = dados[5];
            var cidade = dados[12];
            var rede = dados[13];
            var latitude = dados[6];
            var longitude = dados[7];
            dadosLista += "<li>"+nome+", "+localizacao+", "+cidade+", "+bairro+", "+rede+", <a href='https://maps.google.com/?q="+latitude+","+longitude+"' target='_blank'>Veja no mapa</a></li>";
        }
        document.getElementById("wifi").innerHTML = dadosLista;
    });
  }
  