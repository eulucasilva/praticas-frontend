function comprarPacote(destino, inclusos, preco, observacoes, parcelamento) {

    var pacoteTuristico = {
        destino: destino,
        inclusos: inclusos,
        preco: preco,
        observacoes: observacoes,
        parcelamento: parcelamento
    };

    
    console.log(JSON.stringify(pacoteTuristico));
}


var botoesComprar = document.querySelectorAll('.roteiro-comprar');

botoesComprar.forEach(function (botao) {
    botao.addEventListener('click', function () {
        // Captura informações usando métodos da API do DOM
        var destino = this.parentElement.querySelector('.roteiro-destino').textContent;
        var inclusos = Array.from(this.parentElement.querySelectorAll('.roteiro-incluso li'))
            .map(function (item) { return item.textContent; });
        var preco = this.parentElement.querySelector('.roteiro-preco').textContent;
        var observacoes = this.parentElement.querySelector('.roteiro-obs').textContent;
        var parcelamento = this.parentElement.querySelector('.roteiro-parcelamento').textContent;

        comprarPacote(destino, inclusos, preco, observacoes, parcelamento);
    });
});

function inserirPacote() {
  
    var destino = document.getElementById('destino').value;
    var imagem = document.getElementById('imagem').value;
    var inclusos = document.getElementById('inclusos').value.split(',');
    var preco = document.getElementById('preco').value;
    var obs = document.getElementById('observacoes').value;
    var parcelamento = document.getElementById('parcelamento').value;

    
    var novoRoteiro = document.createElement('div');
    novoRoteiro.classList.add('roteiros-viagens');

   
    var imagemElemento = document.createElement('img');
    imagemElemento.src = imagem;
    imagemElemento.classList.add('postal');
    novoRoteiro.appendChild(imagemElemento);

   
    var destinoElemento = document.createElement('div');
    destinoElemento.classList.add('roteiro-destino');
    destinoElemento.textContent = destino;
    novoRoteiro.appendChild(destinoElemento);

   
    var inclusosElemento = document.createElement('ul');
    inclusos.forEach(function(item) {
        var li = document.createElement('li');
        li.textContent = item.trim();
        inclusosElemento.appendChild(li);
    });
    inclusosElemento.classList.add('roteiro-incluso');
    novoRoteiro.appendChild(inclusosElemento);

    
    ['preco', 'obs', 'parcelamento'].forEach(function(propriedade) {
        var elemento = document.createElement('div');
        elemento.classList.add('roteiro-' + propriedade);
        if(propriedade == 'preco'){
            elemento.textContent = "R$" + eval(propriedade);
        }
        else{
            elemento.textContent = eval(propriedade);
        }
        novoRoteiro.appendChild(elemento);
    });

    
    var botaoComprar = document.createElement('button');
    botaoComprar.classList.add('roteiro-comprar');
    botaoComprar.textContent = 'Comprar';
    novoRoteiro.appendChild(botaoComprar);

    
    var containerDestinos = document.querySelector('.container-destinos');
    containerDestinos.appendChild(novoRoteiro);
}
