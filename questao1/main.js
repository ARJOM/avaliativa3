
cadastrados = getObjectLocalStorage("cadastrados");
if (cadastrados == null) {
    cadastrados = [];
    setObjectLocalStorage("cadastrados", cadastrados);
} 

//Funções

function cadastro() {
    if (typeof (Storage) !== "undefined") {
        var nome = document.getElementById("nome").value;
        var foto = document.getElementById("foto").value;
        var email = document.getElementById("email").value;
        var repo = document.getElementById("repo").value;
        var latitude = document.getElementById("latitude").value;
        var longitude = document.getElementById("longitude").value;
        var localizacao = [latitude, longitude];
        var linguagens = document.getElementById("linguagens").value;
        var linguas = linguagens.split(", ");

        var usuario = new Usuario(nome, foto, email, repo, localizacao, linguas);

        cadastrados = getObjectLocalStorage("cadastrados");
        if (validaInsert(email, cadastrados)){
            cadastrados.push(usuario);
            setObjectLocalStorage("cadastrados", cadastrados);
        }
        else{
            window.alert("email já cadastrado");
        }

        document.getElementById("nome").value = "";
        document.getElementById("foto").value = "";
        document.getElementById("email").value = "";
        document.getElementById("repo").value = "";
        document.getElementById("latitude").value = "";
        document.getElementById("longitude").value = "";
        document.getElementById("linguagens").value = "";

    } else {
        window.alert("API Web Storage não encontrada");
    }
}

function exibe(){
    if (typeof(Storage) !== "undefined"){
        cadastrados = getObjectLocalStorage("cadastrados");
        var paragrafo = document.getElementById("exibe");
        var resultado = "";
        for (var i=0; i<cadastrados.length; i++){
            var usuario = cadastrados[i];
            var link = "<a id = "+usuario.email+" href='detalhes.html'>"+usuario.email+"</a>"
            resultado += "<div><p>"+usuario.nome+" "+link+"</p></div>"
        }
        paragrafo.innerHTML = resultado;
        for (var i=0; i<cadastrados.length; i++){
            var usuario = cadastrados[i];
            console.log(usuario.nome);
            document.getElementById(usuario.email).addEventListener("click", setObjectLocalStorage("usuario", usuario));
        }    
    } else {
        window.alert("API Web Storage não encontrada")
    }
}

function detalhes(){
    if (typeof(Storage) !== "undefined"){
        var paragrafo = document.getElementById("detalhes");
        var resultado = "";
        var usuario = getObjectLocalStorage("usuario");
        resultado+= "<img src='"+usuario.foto+"'>"
        resultado+= "<p>Nome: "+usuario.nome+"</p>"
        resultado+= "<p>E-mail: "+usuario.email+"</p>"
        resultado+= "<a href="+usuario.repo+">Visite o repositório</a>"
        resultado+= "<p>Linguagens favoritas:</p>"
        resultado+= "<ul>"
        for (var i=0; i<usuario.linguagens.length; i++){
            resultado += "<li>"+usuario.linguagens[i]+"</li>";
        }
        resultado+= "</ul>"
        paragrafo.innerHTML = resultado;

    } else {
        window.alert("API Web Storage não encontrada")
    }
}


//Classes

function Usuario(nome, foto, email, repo, localizacao, linguagens){
    this.nome = nome;
    this.foto = foto;
    this.email = email;
    this.repo = repo;
    this.localizacao = localizacao;
    this.linguagens = linguagens;
    this.descricao = function(){
        return "O usuário é: "+this.nome+"!";
    }
}

//Funções Auxiliares

function setObjectLocalStorage(key,value){
	localStorage.setItem(key, JSON.stringify(value));
}

function getObjectLocalStorage(key){
	var value = localStorage.getItem(key);
    return value && JSON.parse(value);
}

function validaInsert(email, cadastrados){
    for (var i = 0; i<cadastrados.length; i++){
        var usuario = cadastrados[i];
        if (usuario.email == email){
            return false;
        }
    }
    return true;
}