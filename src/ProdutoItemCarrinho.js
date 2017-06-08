/* @flow */
export default class ProdutoItemCarrinho{

    _id: string
    _nome: string
    _valor: number
    _img: string
    _status: number

    constructor(id: string, nome: string, valor: number, img: string, status:number){
        if(typeof(id) !== 'string') throw Error("id inválido para o ProdutoItemCarrinho")
        if(typeof(nome) !== 'string') throw Error("nome inválido para o ProdutoItemCarrinho")
        if(typeof(valor) !== 'number') throw Error("valor inválido para o ProdutoItemCarrinho")
        if(typeof(img) !== 'string') throw Error("img inválido para o ProdutoItemCarrinho")
        if(typeof(status) !== 'number') throw Error("status inválido para o ProdutoItemCarrinho")

        this._id = id
        this._nome = nome
        this._valor = valor
        this._img = img
        this._status = status
    }

    get id():string{
        return this._id
    }
    get nome():string{
        return this._nome
    }
    get valor():number{
        return this._valor
    }
    get img():string{
        return this._img
    }
    get status():number{
        return this._status
    }
}