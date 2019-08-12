
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
        var localizacao = [parseFloat(latitude), parseFloat(longitude)];
        var linguagens = document.getElementById("linguagens").value;
        var linguas = linguagens.split(", ");

        if (validaLocalizacao(localizacao)){
            if (validaInsert(email)){
                cadastrados = getObjectLocalStorage("cadastrados");
                var usuario = new Usuario( cadastrados.length, nome, foto, email, repo, localizacao, linguas);
                cadastrados.push(usuario);
                setObjectLocalStorage("cadastrados", cadastrados);
            } else{
                window.alert("email já cadastrado");
            }
        } else{
            window.alert("já existe um usuário cadastrado com essa localização")
        }
        limpar();
        
    } else {
        window.alert("API Web Storage não encontrada");
    }
}

function limpar(){
    document.getElementById("nome").value = "";
    document.getElementById("foto").value = "";
    document.getElementById("email").value = "";
    document.getElementById("repo").value = "";
    document.getElementById("latitude").value = "";
    document.getElementById("longitude").value = "";
    document.getElementById("linguagens").value = "";
}

function exibe(){
    if (typeof(Storage) !== "undefined"){
        cadastrados = getObjectLocalStorage("cadastrados");
        var paragrafo = document.getElementById("exibe");
        var resultado = "<ul>";
        for (var i=0; i<cadastrados.length; i++){
            var usuario = cadastrados[i];
            var link = "<a id = "+usuario.email+" onclick=\"+detalha('"+usuario.email+"')\" href='detalhes.html'>"+usuario.nome+"</a>"
            resultado += "<li><p>"+link+" "+usuario.email+"</p></li>"
        }
        resultado+="</ul>"
        paragrafo.innerHTML = resultado;  
    } else {
        window.alert("API Web Storage não encontrada")
    }
}

function detalha(email){
    if (isRegistred(email)){
        var usuario = buscaUsuario(email);
        setObjectLocalStorage("usuario", usuario);
    }
    else{
        window.alert("Usuário não registrado")
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
        resultado+= "</ul>";
        resultado+= "<a href='https://maps.google.com/?q="+usuario.localizacao[0]+","+usuario.localizacao[1]+"'>Localiza</a>";
        paragrafo.innerHTML = resultado;

    } else {
        window.alert("API Web Storage não encontrada")
    }
}


//Classes

function Usuario(index, nome, foto, email, repo, localizacao, linguagens){
    this.index = index;
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

function validaInsert(email){
    var cadastrados = getObjectLocalStorage("cadastrados");
    for (var i = 0; i<cadastrados.length; i++){
        var usuario = cadastrados[i];
        if (usuario.email == email){
            return false;
        }
    }
    return true;
}

function buscaUsuario(email){
    var cadastrados = getObjectLocalStorage("cadastrados");
    for (var i=0; i<cadastrados.length; i++){
        var usuario = cadastrados[i];
        if (usuario.email == email){
            return usuario;
        }
    }
    return null;  
}

function isRegistred(email){
    var cadastrados = getObjectLocalStorage("cadastrados");
    for (var i=0; i<cadastrados.length; i++){
        var usuario = cadastrados[i];
        if (usuario.email == email){
            return true;
        }
    }
    return false; 
}

function validaLocalizacao(localizacao){
    var cadastrados = getObjectLocalStorage("cadastrados");
    for (var i =0; i<cadastrados.length; i++){
        var usuario = cadastrados[i];
        if (isEquivalent(localizacao, usuario.localizacao)){
            return false;
        }
    }
    return true;
}

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}