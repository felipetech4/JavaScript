new Vue({
    el: '#app',
    data: {
        clientes: [],
        dadosCliente: {
            nome: '',
            cpfOuCnpj: '',
            email: '',
            telefone: ''
          },
          exibirFormulario: false,
          exibirFormularioEdicao: false,
          exibirFormularioExclusao: false,
          clienteEmExclusao: null
    },


    methods: {
        async exibirClientes() {
            try {
                const response = await fetch('http://localhost:3400/clientes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': '29e0e91d897e358054d44872170a8699',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    this.clientes = data;
                } else {
                    alert(data.message || 'Erro ao buscar clientes');
                }
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        },


        async enviarCliente() {
            try {
              const url = 'http://localhost:3400/clientes';
              
              const headers = {
                'Content-Type': 'application/json',
                'Authorization': '29e0e91d897e358054d44872170a8699'
              };
  
              const resposta = await axios.post(url, this.dadosCliente, { headers });
  
              console.log('Resposta:', resposta.data);

              window.alert('Cliente criado com sucesso! Recarregue a página.')
              this.exibirFormulario = false;
            } catch (erro) {
              console.error('Erro ao enviar cliente:', erro);
            }
        },


        exibirModal() {
            console.log('Modal exibido');
            this.exibirFormulario = true;
        },


        cancelarFormulario() {
            this.dadosCliente = {
                nome: '',
                cpfOuCnpj: null,
                email: null,
                telefone: ''
            };
            this.exibirFormulario = false;
        },


        editarCliente() {
            if (this.dadosCliente.id) {
                const dadosAtualizados = {
                    nome: this.dadosCliente.nome,
                    cpfOuCnpj: this.dadosCliente.cpfOuCnpj,
                    email: this.dadosCliente.email,
                    telefone: this.dadosCliente.telefone
                };

                axios.put(`http://localhost:3400/clientes/${this.dadosCliente.id}`, dadosAtualizados, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': '29e0e91d897e358054d44872170a8699'
                    }
                })
                .then(response => {
                    window.alert('Cliente atualizado com sucesso! Recarregue a página.')
                    console.log('Cliente atualizado com sucesso:', response.data);
                    this.dadosCliente = {
                        id: null,
                        nome: '',
                        cpfOuCnpj: '',
                        email: '',
                        telefone: ''
                    };
                    this.exibirFormularioEdicao = false;
                })
                .catch(error => {
                    console.error('Erro ao atualizar o cliente:', error);
                });
            } else {
                console.error('ID do cliente não especificado para edição.');
            }
            
        },


        exibirModalEdicao(cliente) {
            console.log('Modal exibido para edição');
            this.dadosCliente = { ...cliente };
            this.exibirFormularioEdicao = true;
        },


        cancelarFormularioEdicao() {
            this.dadosCliente = {
                nome: '',
                cpfOuCnpj: null,
                email: null,
                telefone: ''
            };
            this.exibirFormularioEdicao = false;
        },


        deletarCliente(id) {
            if (!id) {
                console.error('ID do cliente não especificado para exclusão.');
                return;
            }
            axios.delete(`http://localhost:3400/clientes/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '29e0e91d897e358054d44872170a8699'
                }
            })
            .then(response => {
                console.log('Cliente excluído com sucesso:', response.data);
            })
            .catch(error => {
                console.error('Erro ao excluir o cliente:', error);
            });
        },


        exibirModalExclusao(cliente) {
            this.clienteEmExclusao = cliente;
            this.exibirFormularioExclusao = true;
        },


         confirmarExclusao() {
            if (this.clienteEmExclusao) {
                this.deletarCliente(this.clienteEmExclusao.id);
                
                this.clienteEmExclusao = null;
                this.exibirFormularioExclusao = false;
                window.alert('Cliente excluído com sucesso! Recarregue a página.')
                console.log('Cliente excluído com sucesso!');

            } else {
                console.error('Cliente para exclusão não especificado.');
            }
        },


        cancelarFormularioExclusao() {
            this.cliente = null;
            this.exibirFormularioExclusao = false;
        },

        
    },
    mounted() {
        this.exibirClientes();
    },
});