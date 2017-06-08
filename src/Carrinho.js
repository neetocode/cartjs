/* @flow */
import ItemCarrinho from './ItemCarrinho'

type objValor = {
    subTotal: number,
    valorDesconto: number,
    valorFrete: number,
    total: number
}

type objState ={
    mensagem: string,
    isValido: boolean
}

export class Carrinho{

    _clienteId : string
    _placeId : string
    _dataCriacao : Date
    _dataAtualizacao : Date
    _itens : Array<ItemCarrinho>
    _valor: objValor
    _state : objState
    _frete : Object

    constructor(clienteId: string, placeId: string){
        if (clienteId === undefined || clienteId === null) throw new Error("clienteId deve ser um valor válido")
        if (placeId === undefined || placeId === null) throw new Error("placeId deve ser um valor válido")

        this._clienteId = clienteId
        this._placeId = placeId
        this._dataCriacao = new Date()
        this._dataAtualizacao = new Date()
        this._itens = []
        this._valor = {
            subTotal: 0,
            valorDesconto: 0,
            valorFrete: 0,
            total: 0,
            teste: 1
        }
        this._state = {  
            mensagem: '',
            isValido: false
        }
        this._frete = {}

    }

    addItem(itemCarrinho: ItemCarrinho) : void{
        if (!(itemCarrinho instanceof ItemCarrinho)) throw new Error("itemCarrinho possui valor inválido para Carrinho.adicionarItem")

        this._itens.push(itemCarrinho)
        this.calcularValores()
    }

    removeItem(index: number) : void{
        if(isNaN(index)) throw new Error("Índice não é um número")
        if(index >= this._itens.length) throw new Error("Índice fora do intervalo")

        this._itens.splice(index,1)
        this.calcularValores()
    }

    replaceItem(index:number, itemCarrinho:ItemCarrinho):void{
        if (!(itemCarrinho instanceof ItemCarrinho)) throw new Error("itemCarrinho possui valor inválido para Carrinho.adicionarItem")
        if(isNaN(index)) throw new Error("Índice não é um número")
        if(index >= this._itens.length) throw new Error("Índice fora do intervalo")

        this._itens[index] = itemCarrinho
        this.calcularValores()

    }

    calcularValores():void{
        // não está tratando descontos
        let total = 0
        this._itens.forEach(item=>{
            total += item.valor.total
        })

        this._valor.valorDesconto = 0
        this._valor.valorFrete = 0
        this._valor.subTotal = total
        this._valor.total = total - this._valor.valorDesconto
    }


    get clienteId():string{
        return this._clienteId
    }
    get placeId():string{
        return this._clienteId
    }
    get size():number{
        return this._itens.length
    }
    get valor():objValor{
        return this.valor
    }
    get valido():boolean{
        if(this._itens.length <= 0){
            this._state.mensagem =  "Seu carrinho está vazio",
            this._state.isValido = false
            
            return false
        }
        if(this._valor.total <= 0){
            this._state.mensagem = "O valor do carrinho é inválido"
            this._state.isValido = false
            return false
        }
        
        this._state.mensagem = "Carrinho validado localmente"
        this._state.isValido = true
        
        return true
    }
    get dataCriacao():Date{
        return this._dataCriacao
    }
    get dataAtualizacao():Date{
        return this._dataAtualizacao
    }
    get state():objState{
        return this._state
    }
    get itens():Array<ItemCarrinho>{
        return this._itens
    }
}