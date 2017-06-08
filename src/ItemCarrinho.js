/* @flow */

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
import ProdutoItemCarrinho from './ProdutoItemCarrinho'
import VariacaoProdutoItemCarrinho from './VariacaoProdutoItemCarrinho'

type objValor = {
     unitario: number,
    total:number
}

export default class ItemCarrinho{

    _produto: ProdutoItemCarrinho
    _variacoes: Array<VariacaoProdutoItemCarrinho>
    _observacao: string
    _quantidade: number
    _valor: objValor

    constructor(produto: ProdutoItemCarrinho, variacoes: Array<VariacaoProdutoItemCarrinho>, observacao: string, quantidade: number){
        if (typeof (produto) !== 'object') throw new Error("Parâmetro inválido para produto")
        if (!(produto instanceof ProdutoItemCarrinho)) throw new Error("Parâmetro inválido para produto")
        if (!(variacoes instanceof Array)) throw new Error("Parâmetro inválido para variacoes")
        if (typeof (observacao) !== 'string') throw new Error("Parâmetro inválido para observacao")
        if (quantidade < 0) throw new Error("Quantidade deve ser maior que 0")

        this._produto = produto
        this._variacoes = variacoes
        this._observacao = observacao
        this._quantidade = quantidade
        this._valor = {
            unitario: 0,
            total: 0
        }

        if (this._produto.status === 1) { // verifique se produto está ativo
            var precoDoItem = this._produto.valor
            this._variacoes.forEach(variacao => {
                if (variacao.opcoes.length < variacao.min || variacao.opcoes.length > variacao.max) throw new Error("Quantidade de opções inválidas para a variação")

                if (!variacao.isAtivo) return null // se variacao não estiver ativa para a execução

                variacao.opcoes.forEach(opcao => {
                    if (opcao.status === 1) { // verifique se opção está ativa
                        precoDoItem += opcao.preco
                    }
                })
            })
            this._valor.unitario = precoDoItem
            this._valor.total = this._valor.unitario * this._quantidade
        } else {
            this._valor.unitario = 0
            this._valor.total = 0
        }

    }


    get produto():ProdutoItemCarrinho{
        return this._produto
    }
    get valor():objValor{
        return this._valor
    }
    get quantidade():number{
        return this._quantidade
    }
    get variacoes():Array<VariacaoProdutoItemCarrinho>{
        return this._variacoes
    }
    get observacao():string{
        return this._observacao
    }
}