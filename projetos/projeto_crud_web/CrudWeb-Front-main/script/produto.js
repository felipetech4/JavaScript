new Vue({
    el: '#app',
    data: {
        produtos: [],
        dadosProduto: {
            nome: '',
            quantidadeEstoque: null,
            valor: null,
            observacao: ''
          },
          exibirFormulario: false,
          exibirFormularioEdicao: false,
          exibirFormularioExclusao: false,
          produtoEmExclusao: null
    },


    methods: {
        async exibirProdutos() {
            try {
                const response = await fetch('http://localhost:3400/produtos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': '8f8c5397ab71941d3c657247f3ea684f',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    this.produtos = data;
                } else {
                    alert(data.message || 'Erro ao buscar produtos');
                }
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        },


        async enviarProduto() {
            try {
              const url = 'http://localhost:3400/produtos';
              
              const headers = {
                'Content-Type': 'application/json',
                'Authorization': '8846b88fa80d2e6f03637d20c01fc33a'
              };
  
              const resposta = await axios.post(url, this.dadosProduto, { headers });
  
              console.log('Resposta:', resposta.data);
              window.alert('Produto criado com sucesso! Recarregue a página.')
              this.exibirFormulario = false;
            } catch (erro) {
              console.error('Erro ao enviar produto:', erro);
            }
        },


        exibirModal() {
            console.log('Modal exibido');
            this.exibirFormulario = true;
        },


        cancelarFormulario() {
            this.dadosProduto = {
                nome: '',
                quantidadeEstoque: null,
                valor: null,
                observacao: ''
            };
            this.exibirFormulario = false;
        },


        editarProduto() {
            if (this.dadosProduto.id) {
                const dadosAtualizados = {
                    nome: this.dadosProduto.nome,
                    quantidadeEstoque: this.dadosProduto.quantidadeEstoque,
                    valor: this.dadosProduto.valor,
                    observacao: this.dadosProduto.observacao
                };

                axios.put(`http://localhost:3400/produtos/${this.dadosProduto.id}`, dadosAtualizados, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': '8f8c5397ab71941d3c657247f3ea684f'
                    }
                })
                .then(response => {
                    window.alert('Produto atualizado com sucesso! Recarregue a página.')
                    console.log('Produto atualizado com sucesso:', response.data);
                    this.dadosProduto = {
                        id: null,
                        nome: '',
                        quantidadeEstoque: 0,
                        valor: 0,
                        observacao: ''
                    };
                    this.exibirFormularioEdicao = false;
                })
                .catch(error => {
                    console.error('Erro ao atualizar o produto:', error);
                });
            } else {
                console.error('ID do produto não especificado para edição.');
            }
            
        },


        exibirModalEdicao(produto) {
            console.log('Modal exibido para edição');
            this.dadosProduto = { ...produto };
            this.exibirFormularioEdicao = true;
        },


        cancelarFormularioEdicao() {
            this.dadosProduto = {
                nome: '',
                quantidadeEstoque: null,
                valor: null,
                observacao: ''
            };
            this.exibirFormularioEdicao = false;
        },


        deletarProduto(id) {
            if (!id) {
                console.error('ID do produto não especificado para exclusão.');
                return;
            }
    
            axios.delete(`http://localhost:3400/produtos/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '8846b88fa80d2e6f03637d20c01fc33a'
                }
            })
            .then(response => {
                console.log('Produto excluído com sucesso:', response.data);
            })
            .catch(error => {
                console.error('Erro ao excluir o produto:', error);
            });
        },


        exibirModalExclusao(produto) {
            this.produtoEmExclusao = produto;
            this.exibirFormularioExclusao = true;
        },


        confirmarExclusao() {
            if (this.produtoEmExclusao) {
                this.deletarProduto(this.produtoEmExclusao.id);
                this.produtoEmExclusao = null;
                this.exibirFormularioExclusao = false;
                window.alert('Produto excluído com sucesso! Recarregue a página.')
                console.log('Produto excluído com sucesso!');

            } else {
                console.error('Produto para exclusão não especificado.');
            }
        },


        cancelarFormularioExclusao() {
            this.produtoEmExclusao = null;
            this.exibirFormularioExclusao = false;
        },
    },
    mounted() {
        this.exibirProdutos();
    },
});