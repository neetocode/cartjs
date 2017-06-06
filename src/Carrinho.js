
const ItemCarrinho = require('./../src/ItemCarrinho')

function Carrinho(idCliente: string, idPlace: string){
    if (idCliente === undefined || idCliente === null) throw new Error("idCliente deve ser um valor válido")
    if (idPlace === undefined || idPlace === null) throw new Error("idPlace deve ser um valor válido")

    const _clienteId : string = idCliente
    const _placeId : string = idPlace
    const _dataCriacao = new Date()
    const _dataAtualizacao = new Date()
    const _itens: Array<ItemCarrinho> =  []

    type _objvalor ={
        subTotal: number,
        valorDesconto: number,
        valorFrete: number,
        total: number
    }
    type _objstate ={
        mensagem:string,
        isValido:boolean
    }
    const _valor: _objvalor = {
        subTotal: 0,
        valorDesconto: 0,
        valorFrete: 0,
        total: 0
    }
    
    const _state: _objstate = {  
        mensagem: '',
        isValido: false
    }

    const _frete = {}

    const _size = () : number => {
        return _itens.length
    }

    const _isValido = () : boolean => {
        if(_itens.length <= 0){
            _state.mensagem =  "Seu carrinho está vazio",
            _state.isValido = false
            
            return false
        }
        if(_valor.total <= 0){
            _state.mensagem = "O valor do carrinho é inválido"
            _state.isValido = false
            return false
        }
        
        _state.mensagem = "Carrinho validado localmente"
        _state.isValido = true
        
        return true
    }
    const _addItem = (itemCarrinho: ItemCarrinho) : void => {
        if (!(itemCarrinho instanceof ItemCarrinho)) throw new Error("itemCarrinho possui valor inválido para Carrinho.adicionarItem")

        _itens.push(itemCarrinho)
        _calcularValores()
    }

    const _removeItem = (index: number) : void => {
        if(isNaN(index)) throw new Error("Índice não é um número")
        if(index >= _itens.length) throw new Error("Índice fora do intervalo")

        _itens.splice(index,1)
        _calcularValores()
    }

    const _replaceItem = (index:number, itemCarrinho:ItemCarrinho):void =>{
        if (!(itemCarrinho instanceof ItemCarrinho)) throw new Error("itemCarrinho possui valor inválido para Carrinho.adicionarItem")
        if(isNaN(index)) throw new Error("Índice não é um número")
        if(index >= _itens.length) throw new Error("Índice fora do intervalo")

        _itens[index] = itemCarrinho
        _calcularValores()

    }

    const _calcularValores = ():void=>{
        // não está tratando descontos
        var total = 0
        _itens.forEach(item=>{
            total += item.getValor().total
        })

        _valor.valorDesconto = 0
        _valor.valorFrete = 0
        _valor.subTotal = total
        _valor.total = total - _valor.valorDesconto
    }


    this.getSize = ():number => _itens.length
    this.getIdCliente = ():string => _clienteId
    this.getIdPlace = ():string => _placeId
    this.getDataCriacao = () => _dataCriacao
    this.getDataAtualizacao = () => _dataCriacao
    this.getState = () => _state
    this.getValor = () => _valor
    this.getFrete = () => _frete
    this.getItens = ():Array<ItemCarrinho> => _itens
    this.isValido = _isValido

    this.addItem = _addItem
    this.removeItem = _removeItem
    this.replaceItem = _replaceItem

}

module.exports = Carrinho