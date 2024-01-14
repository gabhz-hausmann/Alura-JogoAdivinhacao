let listaNumEscolhidos = [];
let numMax = 10;
let numSecret = geraNumero();
let tentativa = 1;


function imprimeTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function apresentacao(){
    imprimeTexto("h1", "Jogo do número secreto");
    let escolhaNum = `Escolha um número entre 1 e ${numMax}`;
    imprimeTexto("p", escolhaNum);
}

apresentacao();

function botaoChute(){
    let chute = document.querySelector("input").value;

    if (chute == numSecret) {
        imprimeTexto("h1", "Você ganhou o jogo!");
        let quantTent = tentativa > 1 ? "tentativas" : "tentativa";
        let acertou = `Você descobriu o número secreto com ${tentativa} ${quantTent}!`;
        imprimeTexto("p", acertou);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numSecret) {
            imprimeTexto("p", "O número secreto é menor!");
        } else {
            imprimeTexto("p", "O número secreto é maior!");
        }
        tentativa++;
        limpaTela();
    }
}

function geraNumero(){
    let numEscolhido = parseInt(Math.random() * numMax + 1);
    let quantLista = listaNumEscolhidos.length;

    if (quantLista == numMax) {
        listaNumEscolhidos = [];
    }

    if (listaNumEscolhidos.includes(numEscolhido)) {
        return geraNumero();
    } else {
        listaNumEscolhidos.push(numEscolhido);
        return numEscolhido;
    }
}

function limpaTela(){
    chute = document.querySelector("input");
    chute.value = "";
}

function botaoNJ(){
    numSecret = geraNumero(numMax);
    limpaTela();
    apresentacao();
    tentativa = 1;
    document.getElementById("reiniciar").setAttribute("disabled", true);
}