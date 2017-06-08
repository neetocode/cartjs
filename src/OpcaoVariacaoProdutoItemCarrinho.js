//@flow

export default class OpcaoVariacaoProdutoItemCarrinho{
    _id: string
    _nome: string
    _preco: number
    _status: number
    constructor(id: string, nome: string, preco: number, status: number){
        this._id = id
        this._nome = nome
        this._preco = preco
        this._status = status
    }

    get id():string{
        return this._id
    }

    get nome():string{
        return this._nome
    }

    get preco():number{
        return this.preco
    }
    get status():number{
        return this._status
    }
    



}