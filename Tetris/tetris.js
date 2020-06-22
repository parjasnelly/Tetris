/*
   Jogo: Tetris
   Autor: Code Explained (www.codeexplained.org)
   Adaptado por: Gilson Filho
   Modded by: Parjasnelly A. e Samuel Maia
   v 3.0 Final Edition
*/

// Rotina principal

const I = [
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ],

];

const J = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ]
];

const L = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]
];

const O = [
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ]
];

const S = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];

const T = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];

const Z = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
    ]
];

const PECAS = [
    [Z, "#FFE138"],
    [S, "#FF8E0D"],
    [T, "#FF0D72"],
    [O, "#F538FF"],
    [L, "#0DFF72"],
    [I, "#3877FF"],
    [J, "#0DC2FF"]
];

const LINHA = 20;
const COLUNA = 10;
const TAMANHO = 30;
const VAGO = "black";
// Carrega os efeitos sonoros
var musica = document.getElementById("musica");
musica.play();
const levelUp= new Audio();
levelUp.src = "./sons/levelUp.wav";

const encaixe= new Audio();
encaixe.src = "./sons/encaixe.wav";

const linhaEl= new Audio();
linhaEl.src = "./sons/linhaEl.wav";

const pecaVi= new Audio();
pecaVi.src = "./sons/pecaVi.wav";

const gameOver = new Audio();
gameOver.src = "./sons/gameOver.mp3";

const mov = new Audio();
mov.src = "./sons/mov.wav";

const tetris = new Audio();
tetris.src = "./sons/tetris.wav";

const quedaForte = new Audio();
quedaForte.src = "./sons/quedaForte.wav";

var peca;
var tabuleiro = [];
var cont = 1;
var inicioDescida;
var tempoDescida = 1000;
var fimDeJogo = false;
var scores = 0;
var level = 1;
var linhasCheias = 0;
var linhasApagadas = 0;
var tela = document.getElementById("tela");
var c = tela.getContext("2d");
var proxPc = Math.floor(Math.random() * PECAS.length);
var pecas = [];
// faz um "parseInt no vetor contador de peças"
for(i=0; i<7;i++){
    pecas[i]=0;
}

onkeydown = controlarPeca;

iniciarTabuleiro();

desenharTabuleiro();

gerarPeca();

inicioDescida = Date.now();

descerPeca();

// Sub-rotinas (funções)

function iniciarTabuleiro() {
    for (var i = 0; i < LINHA; i++) {
        tabuleiro[i] = [];

        for (var j = 0; j < COLUNA; j++) {
            tabuleiro[i][j] = VAGO;
        }
    }
}

function desenharTabuleiro(){
    for (var i = 0; i < LINHA; i++) {
        for (var j = 0; j < COLUNA; j++) {
            desenharQuadrado(j, i, tabuleiro[i][j]);
        }
    }
}

function desenharQuadrado(x, y, cor){
    if(fimDeJogo){
        musica.pause();
        musica.src = "./sons/ranking.mp3"
        gameOver.play();
        setTimeout(()=>{
            musica.play();
        }, 3500 );
        desenhaPecas();

    }
    // exibição de scores e level
    if(!fimDeJogo) {
        c.fillStyle = "#202028";
        c.fillRect(1, 1, 298, 150);
        c.font = "25px Comic Sans MS";
        c.fillStyle = "white";
        c.fillText("Scores:" + scores, 60, 45);
        c.fillText("Level:" + level, 10, 90);
        c.fillText("Linhas eliminadas: " + linhasApagadas, 10, 135);
        c.fillStyle = cor;
    }

    //Painel direito
    c.fillStyle = "#202028";
    c.fillRect(602, 1, 298, 100);
    c.font = "25px Comic Sans MS";
    c.fillStyle = "white";
    c.fillText("Próxima peça:", 610, 45);

    if(proxPc===0){

        c.fillStyle = "#202028";
        c.fillRect(610, 70, 160 ,150 );
        c.fillStyle = "#FFE138"
        c.beginPath();
        c.moveTo(610,70);
        c.lineTo(670,70);
        c.lineTo(670,100);
        c.lineTo(700,100);
        c.lineTo(700,130);
        c.lineTo(640,130);
        c.lineTo(640,100);
        c.lineTo(610,100);
        c.fill();
    }
    if(proxPc==1){
        c.fillStyle = "#202028";
        c.fillRect(610, 70, 160 ,150 );
        c.fillStyle = "#FF8E0D"
        c.beginPath();
        c.moveTo(610,100);
        c.lineTo(610,130);
        c.lineTo(670,130);
        c.lineTo(670,100);
        c.lineTo(700,100);
        c.lineTo(700,70);
        c.lineTo(640,70);
        c.lineTo(640,100);
        c.fill();

    }
    if(proxPc==2){
        c.fillStyle = "#202028";
        c.fillRect(610, 70, 160 ,150 );
        c.fillStyle = "#FF0D72"
        c.beginPath();
        c.moveTo(610,130);
        c.lineTo(700,130);
        c.lineTo(700,100);
        c.lineTo(670,100);
        c.lineTo(670,70);
        c.lineTo(640,70);
        c.lineTo(640,100);
        c.lineTo(610,100);
        c.fill();

    }
    if(proxPc==3){
        c.fillStyle = "#202028";
        c.fillRect(610, 70, 160 ,150 );
        c.fillStyle = "#F538FF"
        c.beginPath();
        c.moveTo(610,70);
        c.lineTo(610,130);
        c.lineTo(670,130);
        c.lineTo(670,70);
        c.fill();

    }
    if(proxPc==4){
        c.fillStyle = "#202028";
        c.fillRect(610, 70, 160 ,150 );
        c.fillStyle = "#0DFF72"
        c.beginPath();
        c.moveTo(610,130);
        c.lineTo(700,130);
        c.lineTo(700,70);
        c.lineTo(670,70);
        c.lineTo(670,100);
        c.lineTo(610,100);
        c.fill();

    }
    if(proxPc==5){
        c.fillStyle = "#202028";
        c.fillRect(610, 70, 160 ,150 );
        c.fillStyle = "#3877FF"
        c.beginPath();
        c.moveTo(610,70);
        c.lineTo(610,190);
        c.lineTo(640,190);
        c.lineTo(640,70);
        c.fill();

    }
    if(proxPc==6){
        c.fillStyle = "#202028";
        c.fillRect(610, 70, 160 ,150 );
        c.fillStyle = "#0DC2FF"
        c.beginPath();
        c.moveTo(610,70);
        c.lineTo(610,130);
        c.lineTo(700,130);
        c.lineTo(700,100);
        c.lineTo(640,100);
        c.lineTo(640,70);
        c.fill();

    }

    c.fillStyle = cor;

    c.fillRect(x*TAMANHO+300, y*TAMANHO, TAMANHO, TAMANHO);

    c.strokeStyle = "black";
    c.strokeRect(x*TAMANHO+300, y*TAMANHO, TAMANHO, TAMANHO);

}

function gerarPeca(){
    pcAt = proxPc;
    proxPc = Math.floor(Math.random() * PECAS.length);
    var r = pcAt;
    pecas[r]++;

    peca = {

        tetramino : PECAS[r][0],
        cor : PECAS[r][1],
        tetraminoN : 0,
        tetraminoAtivo : [[]],
        x : 3,
        y : -2
    };

    peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];


}


function descerPeca(){
    var agora = Date.now();
    var delta = agora - inicioDescida;
    //tempo de descida com variavel
    if (delta > tempoDescida-level*130 ) {
        moverAbaixo();
        inicioDescida = Date.now();
    }

    if (!fimDeJogo) {
        requestAnimationFrame(descerPeca);
    }
}

function moverAbaixo(){

    if (!colisao(0, 1, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.y++;
        desenharPeca();
        return true
    } else {
        travarPeca();
        gerarPeca();
        encaixe.play();
        return false
    }

}

function moverDireita(){
    if (!colisao(1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x++;
        desenharPeca();
    }
}

function moverEsquerda(){
    if (!colisao(-1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x--;
        desenharPeca();
    }
}

function colisao(x, y, p){
    for (var i = 0; i < p.length; i++) {
        for (var j = 0; j < p.length; j++) {
            if (!p[i][j]) {
                continue;
            }

            var novoX = peca.x + j + x;
            var novoY = peca.y + i + y;

            if (novoX < 0 || novoX >= COLUNA || novoY >= LINHA) {
                return true;
            }

            if (novoY < 0) {
                continue;
            }

            if (tabuleiro[novoY][novoX] != VAGO) {
                return true;
            }
        }
    }

    return false;
}

function apagarPeca(){
    preencherPeca(VAGO);
}

function desenharPeca(){
    preencherPeca(peca.cor);
}

function preencherPeca(cor) {



    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (peca.tetraminoAtivo[i][j]) {
                desenharQuadrado(peca.x + j, peca.y + i, cor);
            }
        }
    }
}

function travarPeca(){
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (!peca.tetraminoAtivo[i][j]) {
                continue;
            }

            if (peca.y + i < 0) {
                fimDeJogo = true;
                break;
            }

            tabuleiro[peca.y+i][peca.x+j] = peca.cor;
        }
    }

    for (var i = 0; i < LINHA; i++) {
        var linhaCheia = true;

        for (var j = 0; j < COLUNA; j++) {
            linhaCheia = linhaCheia && (tabuleiro[i][j] != VAGO);
        }


        if (linhaCheia) {
            for (var y = i; y > 1; y--) {
                for (var j = 0; j < COLUNA; j++) {
                    tabuleiro[y][j] = tabuleiro[y-1][j];
                }
            }

            for (var j = 0; j < COLUNA; j++) {
                tabuleiro[0][j] = VAGO;
            }
            linhasApagadas++
            linhasCheias++;

            if(linhasApagadas>0 && linhasApagadas%10===0) {
                level++
                levelUp.play();
                // troca a musica a cada 2 levels e para de trocar no level 7
                if (level % 2 !== 0 && level <= 7) {
                    cont++
                    musica.src = "./sons/musica" + cont + ".mp3";
                    musica.play();
                }
            }
        }

    }
    if(linhasCheias==1){
        scores+=(100*level);
        linhaEl.play();
    }
    if(linhasCheias==2){
        scores+=(300*level);
        linhaEl.play();
    }
    if(linhasCheias==3){
        scores+=(500*level);
        linhaEl.play();
    }
    if(linhasCheias>=4){
        scores+=(800*level);
        tetris.play()
    }
    linhasCheias=0;
    desenharTabuleiro();
}
function rodarPeca(){
    var proximoPadrao = Math.abs(peca.tetramino[(peca.tetraminoN +1) % peca.tetramino.length]);
    var recuo = 0;

    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA/2) {
            recuo = -1;
        } else {
            recuo = 1;
        }
    }

    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x += recuo;
        peca.tetraminoN = (peca.tetraminoN + 1) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }
}

function controlarPeca(evento) {
    var tecla = evento.keyCode;
    //BugFix: Adicionado uma condição para que não se possa controlar a peça mesmo após o fim de jogo
    if (!fimDeJogo) {
        if (tecla == 37) {
            moverEsquerda();
            inicioDescida = Date.now();
            mov.play();
        } else if (tecla == 38) {
            rodarPeca();
            pecaVi.play();
            inicioDescida = Date.now();
        } else if (tecla == 90) {
            rodarPeca();
            pecaVi.play();
            inicioDescida = Date.now();
            // Roda a peça para a esquerda
        } else if (tecla == 39) {
            moverDireita();
            inicioDescida = Date.now();
            mov.play();
        } else if (tecla == 40) {
            moverAbaixo();
            mov.play();
            //bonus de pontos para a descida acelerada
            scores++;
        } else if (tecla == 32) {
            quedaForte.play();
            while(moverAbaixo()){
                scores += 2;
            }
        }
    }
}
function desenhaPecas() {
    c.fillStyle = "#202028";
    c.fillRect(1, 1, 298, 150);
    c.fillStyle = "#1C1C1C";
    c.fillRect(300, 200, 300, 350);
    c.textAlign = "center";
    c.font = "30px Comic Sans MS";
    c.fillStyle = "white";

    c.strokeText("Game over!", tela.width/2, (tela.height/2)-40);
    c.fillText("Game over!", tela.width/2, (tela.height/2)-40);
    c.font = "20px Comic Sans MS";
    c.fillText("Level máximo alcançado: "+level, tela.width/2, (tela.height/2)-10);
    //Z

    c.strokeText("Peças Z: "+pecas[0], (tela.width/2)-50, (tela.height/2)+30);
    c.fillText("Peças Z: "+pecas[0], (tela.width/2)-50, (tela.height/2)+30);
    c.fillStyle = "#FFE138";
    c.beginPath();
    c.moveTo(((tela.width/2)+20),((tela.height/2)+10));
    c.lineTo(((tela.width/2)+20),((tela.height/2)+20));
    c.lineTo(((tela.width/2)+30),((tela.height/2)+20));
    c.lineTo(((tela.width/2)+30),((tela.height/2)+30));
    c.lineTo(((tela.width/2)+50),((tela.height/2)+30));
    c.lineTo(((tela.width/2)+50),((tela.height/2)+20));
    c.lineTo(((tela.width/2)+40),((tela.height/2)+20));
    c.lineTo(((tela.width/2)+40),((tela.height/2)+10));
    c.fill();
    c.closePath();
    //S
    c.fillStyle = "white";
    c.strokeText("Peças S: "+pecas[1], (tela.width/2)-50, (tela.height/2)+60);
    c.fillText("Peças S: "+pecas[1], (tela.width/2)-50, (tela.height/2)+60);
    c.fillStyle = "#FF8E0D";
    c.beginPath();
    c.moveTo(((tela.width/2)+20),((tela.height/2)+50));
    c.lineTo(((tela.width/2)+20),((tela.height/2)+60));
    c.lineTo(((tela.width/2)+40),((tela.height/2)+60));
    c.lineTo(((tela.width/2)+40),((tela.height/2)+50));
    c.lineTo(((tela.width/2)+50),((tela.height/2)+50));
    c.lineTo(((tela.width/2)+50),((tela.height/2)+40));
    c.lineTo(((tela.width/2)+30),((tela.height/2)+40));
    c.lineTo(((tela.width/2)+30),((tela.height/2)+50));
    c.fill();
    c.closePath();
    //T
    c.fillStyle = "white";
    c.strokeText("Peças T: "+pecas[2], (tela.width/2)-50, (tela.height/2)+90);
    c.fillText("Peças T: "+pecas[2], (tela.width/2)-50, (tela.height/2)+90);
    c.fillStyle = "#FF0D72";
    c.beginPath();
    c.moveTo(((tela.width/2)+20),((tela.height/2)+80));
    c.lineTo(((tela.width/2)+20),((tela.height/2)+90));
    c.lineTo(((tela.width/2)+50),((tela.height/2)+90));
    c.lineTo(((tela.width/2)+50),((tela.height/2)+80));
    c.lineTo(((tela.width/2)+40),((tela.height/2)+80));
    c.lineTo(((tela.width/2)+40),((tela.height/2)+70));
    c.lineTo(((tela.width/2)+30),((tela.height/2)+70));
    c.lineTo(((tela.width/2)+30),((tela.height/2)+80));
    c.fill();
    c.closePath();
    //O
    c.fillStyle = "white";
    c.strokeText("Peças O: "+pecas[3], (tela.width/2)-50, (tela.height/2)+120);
    c.fillText("Peças O: "+pecas[3], (tela.width/2)-50, (tela.height/2)+120);
    c.fillStyle = "#F538FF";
    c.beginPath();
    c.moveTo(((tela.width/2)+20),((tela.height/2)+100));
    c.lineTo(((tela.width/2)+20),((tela.height/2)+120));
    c.lineTo(((tela.width/2)+40),((tela.height/2)+120));
    c.lineTo(((tela.width/2)+40),((tela.height/2)+100));
    c.fill();
    c.closePath();
    //L
    c.fillStyle = "white";
    c.strokeText("Peças L: "+pecas[4], (tela.width/2)-50, (tela.height/2)+150);
    c.fillText("Peças L: "+pecas[4], (tela.width/2)-50, (tela.height/2)+150);
    c.fillStyle = "#0DFF72";
    c.beginPath();
    c.moveTo(((tela.width/2)+20),((tela.height/2)+140));
    c.lineTo(((tela.width/2)+20),((tela.height/2)+150));
    c.lineTo(((tela.width/2)+50),((tela.height/2)+150));
    c.lineTo(((tela.width/2)+50),((tela.height/2)+130));
    c.lineTo(((tela.width/2)+40),((tela.height/2)+130));
    c.lineTo(((tela.width/2)+40),((tela.height/2)+140));
    c.fill();
    c.closePath();
    //I
    c.fillStyle = "white";
    c.strokeText("Peças I: "+pecas[5], (tela.width/2)-50, (tela.height/2)+180);
    c.fillText("Peças I: "+pecas[5], (tela.width/2)-50, (tela.height/2)+180);
    c.fillStyle = "#3877FF";
    c.beginPath();
    c.moveTo(((tela.width/2)+20),((tela.height/2)+165));
    c.lineTo(((tela.width/2)+60),((tela.height/2)+165));
    c.lineTo(((tela.width/2)+60),((tela.height/2)+175));
    c.lineTo(((tela.width/2)+20),((tela.height/2)+175));
    c.fill();

    //J
    c.fillStyle = "white";
    c.strokeText("Peças J: "+pecas[6], (tela.width/2)-50, (tela.height/2)+210);
    c.fillText("Peças J: "+pecas[6], (tela.width/2)-50, (tela.height/2)+210);
    c.fillStyle = "#0DC2FF";
    c.beginPath();
    c.moveTo(((tela.width/2)+20),((tela.height/2)+190));
    c.lineTo(((tela.width/2)+20),((tela.height/2)+210));
    c.lineTo(((tela.width/2)+50),((tela.height/2)+210));
    c.lineTo(((tela.width/2)+50),((tela.height/2)+200));
    c.lineTo(((tela.width/2)+30),((tela.height/2)+200));
    c.lineTo(((tela.width/2)+30),((tela.height/2)+190));
    c.lineTo(((tela.width/2)+20),((tela.height/2)+190));
    c.fill();
    c.closePath();

    c.font = "18px Comic Sans MS";
    c.fillStyle = "white";
    c.fillText("Scores:" + scores + " Linhas eliminadas:"+ linhasApagadas, (tela.width/2), ((tela.height/2)+240));
    return;
}