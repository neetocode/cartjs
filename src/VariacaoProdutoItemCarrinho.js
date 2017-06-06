class VariacaoProdutoItemCarrinho{
    constructor(id:string, nome:string, min: number, max: number, tipoCalculo: number, isAtivo: boolean, opcoes: Array<OpcaoVariacaoProdutoItemCarrinho>){
        if(!(opcoes instanceof Array)) throw new Error("opcoes possui um valor inválido em VariacaoProdutoItemCarrinho")
        if(opcoes.length < min || opcoes.length > max) throw new Error("Quantidade de opções fora do intervalo de mínimo e máximo")
        
        this.id = id
        this.nome = nome
        this.min = min
        this.max = max
        this.tipoCalculo = tipoCalculo
        this.isAtivo = isAtivo
        this.opcoes = opcoes
    }
}


module.exports = VariacaoProdutoItemCarrinho