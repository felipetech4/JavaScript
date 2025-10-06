// Declaração do gráfico top 10
var ctxTop10 = document.getElementById('chartTop10').getContext('2d');
var chartTop10 = new Chart(ctxTop10, {
    type: 'pie',
    data: {
        labels: ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4', 'Produto 5'],
        datasets: [{
            label: 'Quantidade em Estoque',
            data: [50, 45, 40, 35, 30],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    }
});

// Declaração do gráfico Negativo Zerado
var ctxZeroNegativo = document.getElementById('chartZeroNegativo').getContext('2d');
var chartZeroNegativo = new Chart(ctxZeroNegativo, {
    type: 'pie',
    data: {
        labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E'],
        datasets: [{
            label: 'Quantidade em Estoque',
            data: [0, -5, 0, -8, -3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    }
});



// Função para buscar dados da API e repassar ao gráfico
async function buscarDadosDaAPI() {
    try {
        const token = '8f8c5397ab71941d3c657247f3ea684f';

        // Request por JSON
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        };

        // Informando URL para realizar a request e salvar em variável
        const response = await fetch('http://localhost:3400/produtos', requestOptions);

        // Verificação OK
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados da API: ${response.statusText}`);
        }

        // Converte a resposta para JSON
        const data = await response.json();

        console.log('Dados da API:', data);

        atualizarGraficosComDados(data);
    } catch (error) {
        console.error('Erro na solicitação da API:', error.message);
    }
}

function atualizarGraficosComDados(dados) {
    // Verifique os dados recebidos da API
    console.log('Dados da API:', dados);

    // Filtra produtos com quantidade menor ou igual a 0 para o gráfico Zero Negativo
    const dadosFiltrados = dados.filter(produto => produto.quantidadeEstoque <= 0);

    // Mapeando as informações que o gráfico pede, nome e quantidade para gráfico top 10
    const labelsTop10 = dados.map(produto => produto.nome);
    const dadosTop10 = dados.map(produto => produto.quantidadeEstoque);

    // Atualiza o gráfico Top 10
    chartTop10.data.labels = labelsTop10;
    chartTop10.data.datasets[0].data = dadosTop10;
    chartTop10.update();

    // Mapeando as informações que o gráfico pede, nome e quantidade para gráfico Negativo
    const labelsZeroNegativo = dadosFiltrados.map(produto => produto.nome);
    const dadosZeroNegativo = dadosFiltrados.map(produto => produto.quantidadeEstoque);

    // Atualiza o gráfico Negativo
    chartZeroNegativo.data.labels = labelsZeroNegativo;
    chartZeroNegativo.data.datasets[0].data = dadosZeroNegativo;
    chartZeroNegativo.update();
}

// Mostra o resultado diretamente no gráfico.
window.onload = buscarDadosDaAPI;


// Utilizei uma palheta de cores simples e clara para uma experiência positiva do usuário.