// Chamada do formulario dentro do HTML
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario');

    // Funcao que responde quando clicamos no botao de entrar da tela de Login
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Armazenamento das variaveis do HTML
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const data = {
            email: email,
            senha: senha
        };

        // Envio da requisicao para a API
        fetch("http://localhost:3400/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            // Resposta da API
            .then(response => {
                // Se o login estiver certo, redireciona para a pagina principal
                if (response.ok) {
                    window.location.href = '../html/pagina_principal.html';
                    // Se o login estiver errado, mostra uma mensagem de erro
                } else {
                    const errorMessage = document.getElementById('mensagem-erro');
                    errorMessage.textContent = 'Usuário ou senha inválido';
                }
            })
        // Caso apresente algum erro com a API
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            const errorMessage = document.getElementById('mensagem-erro');
            errorMessage.textContent = 'Sem conexão com o banco de dados.';
        });
    });
});
