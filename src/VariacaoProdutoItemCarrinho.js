/* @flow */
import OpcaoVariacaoProdutoItemCarrinho from './OpcaoVariacaoProdutoItemCarrinho'

export default class VariacaoProdutoItemCarrinho{

    _id: string
    _nome: string
    _min: number
    _max: number
    _tipoCalculo: number
    _isAtivo: boolean
    _opcoes: Array<OpcaoVariacaoProdutoItemCarrinho>

    constructor(id:string, nome:string, min: number, max: number, tipoCalculo: number, isAtivo: boolean, opcoes: Array<OpcaoVariacaoProdutoItemCarrinho>){
        if(!(opcoes instanceof Array)) throw new Error("opcoes possui um valor inválido em VariacaoProdutoItemCarrinho")
        if(opcoes.length < min) throw new Error("Quantidade de opções fora do intervalo de mínimo")
        if(max !== -1){
            if(opcoes.length > max) throw new Error("Quantidade de opções fora do intervalo de máximo")
        }
        
        this._id = id
        this._nome = nome
        this._min = min
        this._max = max
        this._tipoCalculo = tipoCalculo
        this._isAtivo = isAtivo
        this._opcoes = opcoes
    }

    get id():string{
        return this._id
    }
    get nome():string{
        return this._nome
    }
    get min():number{
        return this._min
    }
    get max():number{
        return this._max
    }
    get tipoCalculo():number{
        return this._tipoCalculo
    }
    get isAtivo():boolean{
        return this.isAtivo
    }
    get opcoes():Array<OpcaoVariacaoProdutoItemCarrinho>{
        return this._opcoes
    }
}