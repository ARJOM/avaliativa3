
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
            resultado += "<div>"
            resultado += "<p>"+usuario.nome+"</p>"
            resultado += "<a href='detalha("+usuario+")'>"+usuario.email+"</a>";
            resultado += "</div"
        }
        paragrafo.innerHTML = resultado;

    } else {
        window.alert("API Web Storage não encontrada")
    }
}

function detalha(user){
    window.alert(use.email);
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