// enum EStatusProdutoVariacaoOpcao
// {
//     Ativo = 1,
//     EmFalta = 2,
//     Oculto = 3
// }

// enum ETipoCalculoPreco
// {
//     MaiorPreco = 1,
//     MenorPreco = 2,
//     SomaTotal = 3, // usar somente esse
//     Media = 4
// }
// public enum EStatusProduto
// {
//     Ativo = 1,
//     EmFalta = 2,
//     Oculto = 3
// }
const ProdutoItemCarrinho = require('./ProdutoItemCarrinho')

class ItemCarrinho{
    /**
     * Item do carrinho, deve passar produto como tipo ProdutoItemCarrinho
     */
    constructor(produto,variacoes,observacao,quantidade){
        if(typeof(produto) !== 'object') throw new Error("Parâmetro inválido para produto")
        if(!(produto instanceof ProdutoItemCarrinho)) throw new Error("Parâmetro inválido para produto")
        if(!(variacoes instanceof Array)) throw new Error("Parâmetro inválido para variacoes")
        if(typeof(observacao) !== 'string') throw new Error("Parâmetro inválido para observacao")
        if(quantidade < 0) throw new Error("Quantidade deve ser maior que 0")

        this.produto = produto
        this.variacoes = variacoes
        this.observacao = observacao
        this.quantidade = quantidade

        if(produto.status === 1){ // verifique se produto está ativo
            var precoDoItem = produto.valor
            this.variacoes.forEach(variacao =>{
                if(variacao.opcoes.length < variacao.min || variacao.opcoes.length > variacao.max) throw new Error("Quantidade de opções inválidas para a variação")
                
                if(!variacao.isAtivo) return null// se variacao não estiver ativa para a execução

                variacao.opcoes.forEach(opcao=>{
                    if(opcao.status === 1){ // verifique se opção está ativa
                        precoDoItem += opcao.preco
                    }
                })
            })

            this.valorUnitario = precoDoItem 
            this.valorTotal = this.valorUnitario * this.quantidade
        }else{
            this.valorUnitario = 0
            this.valorTotal = 0
        }
    }



}

module.exports = ItemCarrinho
