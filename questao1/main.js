
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

        var linguagens = document.getElementById("linguagens").value.split(", ");

        var usuario = new Usuario(nome, foto, email, repo, null, linguagens);


        cadastrados = getObjectLocalStorage("cadastrados");
        cadastrados.push(usuario);
        setObjectLocalStorage("cadastrados", cadastrados);

    } else {
        window.alert("API Web Storage não encontrada");
    }
}

function exibe(){
    if (typeof(Storage) !== "undefined"){

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