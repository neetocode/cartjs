class ProdutoItemCarrinho{
    constructor(id: string, nome: string, valor: number, img: string, status:number){
        if(typeof(id) !== 'string') throw Error("id inválido para o ProdutoItemCarrinho")
        if(typeof(nome) !== 'string') throw Error("nome inválido para o ProdutoItemCarrinho")
        if(typeof(valor) !== 'number') throw Error("valor inválido para o ProdutoItemCarrinho")
        if(typeof(img) !== 'string') throw Error("img inválido para o ProdutoItemCarrinho")
        if(typeof(status) !== 'number') throw Error("status inválido para o ProdutoItemCarrinho")

        this.id:string = id
        this.nome:string = nome
        this.valor:number = valor
        this.img:string = img
        this.status:number = status
    }
}

module.exports = ProdutoItemCarrinho