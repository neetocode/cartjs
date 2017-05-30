const ItemCarrinho = require('./../src/ItemCarrinho')
class Carrinho {
    constructor(idCliente, idPlace) {
        if (idCliente === undefined || idCliente === null) throw new Error("idCliente deve ser um valor válido")
        if (idPlace === undefined || idPlace === null) throw new Error("idPlace deve ser um valor válido")

        this.idCliente = idCliente
        this.idPlace = idPlace
        this.dataCriacao = new Date()
        this.dataAtualizacao = new Date()
        this.itens = []
        this.valor = {
            subTotal: 0,
            valorDesconto: 0,
            valorFrete: 0,
            total: 0
        }
        this.state = {
            mensagem: null,
            isValido: false
        }
        this.frete = {}
    }

    size(){
        return this.itens.length
    }
    isValido(){
        if(this.itens.length <= 0){
            this.state ={
                mensagem: "Seu carrinho está vazio",
                isValido:false
            }
            return false
        }
        if(this.valor.total <= 0){
            this.state ={
                mensagem: "O valor do carrinho é inválido",
                isValido:false
            }
            return false
        }
        this.state = {
            mensagem: "Carrinho válidado localmente",
            isValido:true
        }
        return true
    }


    adicionarItem(itemCarrinho) {
        if (!(itemCarrinho instanceof ItemCarrinho)) throw new Error("itemCarrinho possui valor inválido para Carrinho.adicionarItem")

        this.itens.push(itemCarrinho)
        this._calcularValores()
    }

    _calcularValores(){
        // não está tratando descontos
        var total = 0
        this.itens.forEach(item=>{
            total += item.valorTotal
        })

        this.valor.valorDesconto = 0
        this.valor.valorFrete = 0
        this.valor.subTotal = total
        this.valor.total = total - this.valor.valorDesconto
    }



}

module.exports = Carrinho