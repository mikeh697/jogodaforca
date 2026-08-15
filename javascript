let tentativas = 6;
let listaNormal = [];//lista vazia que serve para armazenar os estados de cada letra (oculta ou revelada)
let palavraOcultaSorteada
let categoriaSorteada
const palavras = [
    palavra001={nome: "Irlanda", categoria: "país"},
    palavra002={nome: "Brasil", categoria: "país"},
    palavra003={nome: "Uzbequistao", categoria: "país"},
    palavra004={nome: "Bangladesh", categoria: "país"},
    palavra005={nome: "Groenlandia", categoria: "país"},
    palavra006={nome: "carro", categoria: "veículo"},
    palavra007={nome: "moto", categoria: "veículo"},
    palavra008={nome: "pizza", categoria: "comida"},
    palavra009={nome: "chocolate", categoria: "comida"},
    palavra010={nome: "trem", categoria: "veículo"},
    palavra011={nome: "aviao", categoria: "veículo"},
    palavra012={nome: "inglaterra", categoria: "país"},
    palavra013={nome: "história", categoria: "disciplina"},
    palavra014={nome: "jogo", categoria: "entretenimento"},
    palavra015={nome: "motor", categoria: "peça"},
    palavra016={nome: "bicicleta", categoria: "veículo"},
    palavra017={nome: "America Do Sul", categoria: "país"},
    palavra018={nome: "bola de futebol", categoria: "esporte"},
    palavra019={nome: "matematica", categoria: "disciplina"},
    palavra020={nome: "biologia", categoria: "disciplina"},
    palavra021={nome: "quimica", categoria: "disciplina"},
    palavra022={nome: "fisica", categoria: "disciplina"},
    palavra023={nome: "Estados Unidos", categoria: "país"},
    palavra024={nome: "cachorro", categoria: "animal"},
    palavra025={nome: "pássaro", categoria: "animal"},
    palavra026={nome: "rinoceronte", categoria: "animal"},
    palavra027={nome: "gato", categoria: "animal"},
    palavra028={nome: "torta", categoria: "comida"},
    palavra029={nome: "macarrão", categoria: "comida"},
    palavra030={nome: "pavão", categoria: "animal"},

]


function criarPalavraOculta(){
    const tamanhoPalavra = Math.floor(Math.random() * palavras.length);//monta um número aleatório que corresponde com o índice da lista.
    palavraOcultaSorteada = palavras[tamanhoPalavra].nome; //a partir da seleção do índice, acha a palavra da lista
    categoriaSorteada = palavras[tamanhoPalavra].categoria; //a partir do índice também pega a categoria em qua a palavra está
}


function montarPalavraNaTela(){
    const palavraTela = document.getElementById("palavraOculta");//verifica no html o local onde a palavra deverá ser mostrada
    if (palavraTela){ // se a palavra tela for verdade
        palavraTela.innerHTML = "";//cada letra da palavraOculta recebe uma variável vazia, limpando a palavra
    } else {
        console.error("Elemento não foi encontrado no html!");//caso isso não ocorra, mostra que o elemento não foi encontrado no html
        return; //retorna o valor
    }

    for (let i = 0; i < palavraOcultaSorteada.length; i++){ //cria um loop cujo o objetivo é percorrer toda a palavra, letra por letra.
        if (palavraOcultaSorteada[i] === " ") {
            listaNormal[i] = " ";
            palavraTela.innerHTML += "<div class='espaco'></div>"; // caso seja um espaço, cria uma div especialmente para ele
        }
        // 2. Se a letra ainda não foi descoberta
        else if (listaNormal[i] === undefined){
            listaNormal[i] = "&nbsp;"; //isso desenha uma caixa oculta caso a letra não tenha sido descoberta
            palavraTela.innerHTML += "<div class='caracteres'>" + listaNormal[i] + "</div>"; //desenha a letra dentro da caixa oculta
        }
        // 3. Se a letra já foi descoberta
        else {
            palavraTela.innerHTML += "<div class='caracteres'>" + listaNormal[i] + "</div>"; //desenha a letra, mas como a caixa não está mais oculta, ela aparece
        }
    }
}


function mudarEstiloLetra(tecla, acertou){
    const botao = document.getElementById(tecla); //localiza o local das letras no html
    if (acertou){ //caso o jogador acerte
        botao.style.background = "green"; //muda o estilo do botão quando o jogador clica na mesma (verde)
        botao.style.color = "#ffffff"; // muda a cor da letra dentro do botão quando o jogador clica
    }
    else{ //caso o jogador erre
        botao.style.background = "red"; //muda o estilo do botão quando o jogador clica na mesma (vermelho)
        botao.style.color = "#ffffff"; // muda a cor da letra dentro do botão quando o jogador clica
    }
}

function comparalistas(letra){
    let acertou = false; //cria uma variável de controle, para saber se houve o acerto ou não

    const letraClicada = letra.toUpperCase();//converte a letra que o jogador clicou em maiúscula

    for (let i = 0; i < palavraOcultaSorteada.length; i++) { //percore a palavra letra por letra
        const letraOriginal = palavraOcultaSorteada[i].toUpperCase(); //tranforma a letra da palavra em maiúscula
        
        const letraSemAcento = letraOriginal.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //remove os acentos da palavra sorteada e as compara

        if (letraSemAcento === letraClicada) { //caso a letra comparada anteriormente for igual a letra que o usuário clicou
            listaNormal[i] = palavraOcultaSorteada[i].toUpperCase();//revela a letra original dentro do array listaNormal
            acertou = true; //transforma o acertou, antes falso, em verdadeiro
        }
    }

    if (!acertou) { //caso acertou seja falso
        tentativas--; //diminui as tentativas
    }

    let vitoria = true; // assume inicialmente que o jogador tenha descoberto a palavra!
    for (let i = 0; i < palavraOcultaSorteada.length; i++) { //percorre a palavra letra por letra
        if (listaNormal[i] === "&nbsp;" || listaNormal[i] === undefined) { //caso haja alguma oculta no fim
            vitoria = false; //vitória é falsa
        }
    }

    if (vitoria) {
        exibirMensagemFim(true);//se a vitória for verdadeira mostra a mensagem de vitória
    } else if (tentativas === 0){
        exibirMensagemFim(false); //caso as tentativas se esgotem, indicando derrota, mostra a mensgem de derrota
    }

    return acertou;
}

function verificaLetraEscolhida(letra){ //realiza a verificação da letra
    if(tentativas > 0){ //caso o número de tentativas for maior que zero, ou seja, o jogo não tiver acabado ainda, a função será executada
        const acertou = comparalistas(letra);// verifica a letra (se ela é a certa ou não), e a armazena
        mudarEstiloLetra("tecla-" + letra, acertou); //pinta o botão de verde ou vermelho
        document.getElementById("tecla-" + letra).disabled = true;//desativa o botão que foi escolhido, impedindo que o usuário aperte-o novamente.
        montarPalavraNaTela(); //atualiza a palavra exibida na tela
        carregaImagemForca(); // atualiza a imagem da forca no caso de erro
    }
    
}

function carregaImagemForca(){
    switch(tentativas){ //switch feito para mostrar uma parte do boneco quando o jogador errar uma letra
        case 5: //caso as tentativas sejam 5 mostrar imagem da cabeça do boneco.
            imagem.style.backgroundImage = "url('forcacabeça.png')";
            break;
    }
    switch(tentativas){
        case 4: //caso as tentativas sejam 4 mostrar imagem do tronco do boneco.
            imagem.style.backgroundImage = "url('forcatronco.png')";
            break;
    }
    switch(tentativas){
        case 3: //caso as tentativas sejam 3 mostrar imagem do braço esquerdo do boneco.
            imagem.style.backgroundImage = "url('forcabracoesquerdo.png')";
    }
    switch(tentativas){
        case 2: //caso as tentativas sejam 2 mostrar imagem do braço direito do boneco.
            imagem.style.backgroundImage = "url('forcabracodireito.png')";
    }
    switch(tentativas){
        case 1: //caso a tentativa seja 1 mostrar a imagem da perna esquerda do boneco.
            imagem.style.backgroundImage = "url('forcapernaesquerda.png')";
    }
    switch(tentativas){
        case 0: //caso a tentativa seja 0 mostrar a imagem da perna direita do boneco, assim encerrando o jogo e resultando na derrota do jogador.
            imagem.style.backgroundImage = "url('forcafinal.png')";
    }
}

function exibirMensagemFim(venceu){
    const elemento = document.getElementById("mensagem");//pega um elemento mensagem do html
    const textofim = document.getElementById("titulo");//pega um elemento chamado titulo no html
    const mensagem = document.getElementById("texto");//pega um elemento chamado texto do html
    const text = document.getElementById("palavra");//pega um elemento chamado palavra no html

    if(venceu){ //caso o jogador tenha vencido
        textofim.textContent = "parabéns, você venceu!";
        mensagem.textContent = "você acertou a palavra!";
        textofim.style.color = "green";
        mensagem.style.color = "green"; 
        text.textContent = "🎉🎉🎉🎉🎉🎉";

    }
    else{  // caso o jogador tenha perdido.
        textofim.textContent = "você perdeu!!!";
        mensagem.textContent = "a palavra correta era: " + palavraOcultaSorteada;
        textofim.style.color = "red";
        mensagem.style.color = "red";
        text.textContent = "💀💀💀💀💀💀";
    }
    elemento.classList.remove("oculto"); // remove uma classe do elemento(remove do css), essa classe se chama oculto, enquanto a div tiver essa classe, ela estará oculta.
}

function reiniciarJogo() {
    // 1. Reseta os valores das variáveis
    tentativas = 6;
    listaNormal = [];
    
    const elemento = document.getElementById("mensagem"); // pega o elemento mensagem no html
    if (elemento) {
        elemento.classList.add("oculto"); //adiciona novamente a classe oculto, fazendo com que novamente a mensagem se torne oculta
    }

    // 3. Reativa todos os botões do teclado e remove a cor de fundo (verde/vermelho)
    const botoes = document.querySelectorAll("button"); 
    botoes.forEach(botao => {
        botao.disabled = false; //torna todas as letras que foram desabilitadas em habilitadas novamente
        botao.style.background = ""; // Volta a cor original padrão do CSS
        botao.style.color = ""; //retorna a cor das letras
    });

    // 4. Reseta a imagem da forca 
    const imagem = document.getElementById("imagem");
    if (imagem) {
        imagem.style.backgroundImage = "";
    }

    // 5. Sorteia uma nova palavra e redesenha na tela, também recolocando a dica
    criarPalavraOculta();
    montarPalavraNaTela();
    mostrarDica();
}

function mostrarDica(){
    const elementoDica = document.getElementById("dica"); //localiza no html onde a dica deverá ser escrita
    if (elementoDica){
        elementoDica.innerHTML = "<strong>Dica / categoria:</strong>" + categoriaSorteada; //coloca a categoria da palavra escolhida aleatoriamente no local onde deveria estar
    }
}

criarPalavraOculta();//caha a função para escolher a palavra
montarPalavraNaTela(); //monta ela na tela
mostrarDica(); //chama a função de mostrar dica
