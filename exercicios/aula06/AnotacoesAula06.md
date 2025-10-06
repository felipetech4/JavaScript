<!-- Manipulação de dados -->

<!-- Variáveis, Conversão de Variável e Concatenações em JavaScript -->
Para criar uma variável, basta inserir o tipo, nome e o sinal de = que siginfica recebe.

    var n1 = 5. -> Desse modo a variável recebe o valor de 5, porém, por padrão ele vem como String.

Para converter o tipo da variável, basta inserir:

    Number -> Isso faz com que o valor se tranforme em número. o JS faz a distinção automática entre número real e inteiro.

    var n1 = Number(5)

    Também podemos fazer o mesmo com strings:

    var s = String(olá)

Para concatenar uma variável de maneira ágil, podemos usar:
    `${}` -> Para informar uma variável dessa forma basta inserir a varável dentro do {} que está dentro do ``.

<!-- Contar letras e colocar tudo em MAIÚSCULO e MINÚSCULO -->

var s = 'JavaScript'

s.length -> Vai contar as letras da palavra JavaScript -> O resultado é 10

s.toUpperCase() -> Vai colocar tudo em maiúsculo -> o resultado é JAVASCRIPT

s.toLowerCase() -> Vai colocar tudo em minúsculo -> o resultado é javascript

<!-- Definir casas decimais de um número -->

var n1 = 1545.5
n1.toFixed(2)  -> Vai definir 2 casas decimais = 1545.50

<!-- Coverter . em , -->
n1.toFixed(2).replace('.',',')

<!-- Definir um número com estilo de moeda brasileira -->
var testeMoeda = n1.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) o resultado é R$1545,50

<!-- Para escrever no body do HTML -->
Basta iserir: document.write('conteudo que vai aparecer na tela')