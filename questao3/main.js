function carregaCSVRemoto(){
  
    var arquivo = 'https://raw.githubusercontent.com/ARJOM/avaliativa3/master/questao3/wifi.csv';
  
    $.get(arquivo, function( dados ) {
  
      var dadosLinhas = dados.split(/\r\n|\n/);
      var dadosLista = "";

      //Para cada um dos elementos
      //Por estar começando do 1, retira-se uma unidade do tamanho da lista
        for (var i=1; i<dadosLinhas.length-1; i++) {
            var dados = dadosLinhas[i].split(",");
            var nome = dados[4];
            //por alguma razão o nome de algumas vem na forma de número
            var bairro = dados[1];
            var localizacao = dados[5];
            var cidade = dados[12];
            var rede = dados[13];
            var latitude = dados[6];
            var longitude = dados[7];
            dadosLista += "<li>"+i+"- Nome do local: "+nome+", Localização: "+localizacao+", Cidade: "+cidade+", Bairro: "+bairro+", Nome da rede wi-fi: "+rede+", <a href='https://maps.google.com/?q="+latitude+","+longitude+"' target='_blank'>Veja no mapa</a></li>";
            //Do modo como está sendo exibido, as informações as vezes não parecem condizer com o índice do cabeçalho.
            //Não sei se é impressão minha por não conhecer as informações do lugar, ou falta de organização em algumas partes do arquivo
        }
        document.getElementById("wifi").innerHTML = dadosLista;
    });
  }
  