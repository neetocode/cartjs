class ProdutoItemCarrinho {
    constructor(id, nome, valor, img, status) {
        if (typeof id !== 'string') throw Error("id inválido para o ProdutoItemCarrinho");
        if (typeof nome !== 'string') throw Error("nome inválido para o ProdutoItemCarrinho");
        if (typeof valor !== 'number') throw Error("valor inválido para o ProdutoItemCarrinho");
        if (typeof img !== 'string') throw Error("img inválido para o ProdutoItemCarrinho");
        if (typeof status !== 'number') throw Error("status inválido para o ProdutoItemCarrinho");

        this.id = id;
        this.nomeg = nome;
        this.valor = valor;
        this.img = img;
        this.status = status;
    }}


module.exports = ProdutoItemCarrinho;