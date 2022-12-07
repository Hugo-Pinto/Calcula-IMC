/*
Solução do exercício

Para exibir os valores na tela, precisamos parar o evento de submit do formulário, ou seja, evitar que ele redirecione a outra página.
Criamos uma variável para pegar o formulário pelo ID, em seguida, prevenimos o evento padrão do formulário, desta forma, podemos pegar os dados inseridos.
*/
const formulario = document.querySelector('#formulario');//primeiro capturamos o formulário

formulario.addEventListener('submit', function(event) {
    event.preventDefault(); //impedimos o comportamento default do formulário ao ocorrer o evento de submit, impedindo que o formulário envie os dados.
    const inputPeso = event.target.querySelector('#peso'); //capturamos os inputs de dados.
    const inputAltura = event.target.querySelector('#altura');

    const peso = Number(inputPeso.value); //pegando os valores de peso e altura e transformando em number
    const altura = Number(inputAltura.value);

    //se o peso e a altura não forem numeros, é exibido o valor inválido.
    if(!peso) {
        setResultado('Peso inválido', false);  
        return;
    }
    if(!altura) {
        setResultado('Altura inválida', false);  
        return;
    }
    
    //caso os valores sejam numericos, calculamos o IMC e verificamos qual o nível do imc baseado no indice calculado.
    const imc = calculaImc(peso, altura);
    const nivel = getNivel(imc);

    //montamos a frase para exibir o IMC e o nível e chamamos a função set para exibir o ICM na tela.
    const msg = `Seu IMC é: ${imc} (${nivel}).`;
    setResultado(msg, true);
});

//calcula o IMC
function calculaImc (peso, altura) {
    const imc = peso / (altura * altura);
    return imc.toFixed(2);
}

//exibe o nível do IMC do usuário
function getNivel (imc) {
    const nivel = ['Abaixo do peso', 'Peso Normal', 'Sobrepeso', 'Obesidade Grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];
    if( imc >= 39.9 ) return nivel[5];
    if( imc >= 34.9 ) return nivel[4];
    if( imc >= 29.9 ) return nivel[3];
    if( imc >= 24.9 ) return nivel[2];
    if( imc >= 18.5 ) return nivel[1];
    if( imc < 18.5 ) return nivel[0];
}

//Criando uma função que insere um html na div resultado.
function setResultado (mensagem, isValid) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = ''; //sempre que chamarmos o resultado, zeramos a div.
    const p = criaParagrafo();

    if (isValid) {
        p.classList.add('bom-resultado'); //criamos duas classes para o paragrafo P onde dependendo se for um bom ou mal resultado, alteramos o estilo no CSS.
    }
    else {
        p.classList.add('mal-resultado');
    }

    p.innerHTML = mensagem;
    resultado.appendChild(p); //Ao final de tudo, mandamos inserir o texto dentro da div.
}

//Cria um parágrafo html com javascript
function criaParagrafo () {
    const p = document.createElement('p');//criamos um paragrafo no javascrip para inserirmos dentro da div
    return p;
}

