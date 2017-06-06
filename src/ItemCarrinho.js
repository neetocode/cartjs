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

function ItemCarrinho(produto: ProdutoItemCarrinho, variacoes: Array<VariacaoProdutoItemCarrinho>, observacao: string, quantidade: number) {
    /**
     * Item do carrinho, deve passar produto como tipo ProdutoItemCarrinho
     */
    if (typeof (produto) !== 'object') throw new Error("Parâmetro inválido para produto")
    if (!(produto instanceof ProdutoItemCarrinho)) throw new Error("Parâmetro inválido para produto")
    if (!(variacoes instanceof Array)) throw new Error("Parâmetro inválido para variacoes")
    if (typeof (observacao) !== 'string') throw new Error("Parâmetro inválido para observacao")
    if (quantidade < 0) throw new Error("Quantidade deve ser maior que 0")

    const _produto: ProdutoItemCarrinho = produto
    const _variacoes: Array<VariacaoProdutoItemCarrinho> = variacoes
    const _observacao: string = observacao
    const _quantidade: quantidade = quantidade
    
    const _valor:{
        unitario: number,
        total:number
    } = {
        unitario: 0,
        total: 0
    }

    if (_produto.status === 1) { // verifique se produto está ativo
        var precoDoItem = _produto.valor
        _variacoes.forEach(variacao => {
            if (variacao.opcoes.length < variacao.min || variacao.opcoes.length > variacao.max) throw new Error("Quantidade de opções inválidas para a variação")

            if (!variacao.isAtivo) return null // se variacao não estiver ativa para a execução

            variacao.opcoes.forEach(opcao => {
                if (opcao.status === 1) { // verifique se opção está ativa
                    precoDoItem += opcao.preco
                }
            })
        })

        _valor.unitario = precoDoItem
        _valor.total = _valor.unitario * _quantidade
    } else {
        _valor.unitario = 0
        _valor.total = 0
    }

    this.getValor = () => _valor
    this.getQuantidade = () => _quantidade
    this.getVariacoes = () => _variacoes
    this.getProduto = () => _produto
    this.getObservao = () => _observacao
}


module.exports = ItemCarrinho