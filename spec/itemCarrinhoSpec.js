const ItemCarrinho = require('./../src/ItemCarrinho')
const ProdutoItemCarrinho = require('./../src/ProdutoItemCarrinho')
const VariacaoProdutoItemCarrinho = require('./../src/VariacaoProdutoItemCarrinho')
const OpcaoVariacaoProdutoItemCarrinho = require('./../src/OpcaoVariacaoProdutoItemCarrinho')

describe('Deve validar inicialização do ItemCarrinho', function () {
    var itemCarrinho, produtoEx, variacao01, variacao02, variacao03


    beforeEach(() => {
        produtoEx = new ProdutoItemCarrinho('4ADB5FF8-77F7-47E7-B0CE-416DD204A866','Esse é um produto de exemplo', 100, 'caminho-da-imagem.png', 1)
        variacao01 = new VariacaoProdutoItemCarrinho(
            '123', 'variacao', 0, 1, 3, true, [
                new OpcaoVariacaoProdutoItemCarrinho(
                    '1234',
                    'opção01',
                    10.5,
                    1
                )
            ]
        )
        variacao02 = new VariacaoProdutoItemCarrinho(
            '123', 'variacao02', 0, 1, 3, true, [
                new OpcaoVariacaoProdutoItemCarrinho(
                    '1234',
                    'opção01',
                    10.5,
                    1
                )
            ]
        )
        variacao03 = new VariacaoProdutoItemCarrinho(
            '123', 'variacao03', 0, 2, 3, true, [
                new OpcaoVariacaoProdutoItemCarrinho(
                    '1234',
                    'opção01',
                    10.5,
                    1
                ),
                new OpcaoVariacaoProdutoItemCarrinho(
                    '12',
                    'opcao02',
                    20,
                    1
                )
            ]
        )
    })

    it('deve verificar se preço está correto quando não possui variacoes', function () {
        itemCarrinho = new ItemCarrinho(produtoEx, [], '',1)
        expect(itemCarrinho.valorTotal).toEqual(100)
        expect(itemCarrinho.valorUnitario).toEqual(100)
    });
    
    it('deve verificar se preço está correto quando possui uma variacao e o produto não está ativo', function () {
        produtoEx.status = 2
        itemCarrinho = new ItemCarrinho(produtoEx, [variacao01], '',1)
        expect(itemCarrinho.valorTotal).toEqual(0)
        expect(itemCarrinho.valorUnitario).toEqual(0)
    });

    it('deve verificar se preço está correto quando possui uma variação e o produto está ativo', function () {
        itemCarrinho = new ItemCarrinho(produtoEx, [variacao01], '',1)
        expect(itemCarrinho.valorTotal).toEqual(110.5)
        expect(itemCarrinho.valorUnitario).toEqual(110.5)
    });


    it('deve verificar se preço está correto quando não possui variação e tem quantidade maior que 1', function () {
        itemCarrinho = new ItemCarrinho(produtoEx, [], '',3)
        expect(itemCarrinho.valorTotal).toEqual(300)
        expect(itemCarrinho.valorUnitario).toEqual(100)
    });

    it('deve verificar se preço está correto quando possui uma variação e tem quantidade maior que 1', function () {
        itemCarrinho = new ItemCarrinho(produtoEx, [variacao01], '',3)
        expect(itemCarrinho.valorTotal).toEqual(331.5)
        expect(itemCarrinho.valorUnitario).toEqual(110.5)
    });

    it('deve verificar se preço está correto quando possui 2 variações e tem quantidade maior que 1', function () {
        itemCarrinho = new ItemCarrinho(produtoEx, [variacao01,variacao02], '',3)
        expect(itemCarrinho.valorTotal).toEqual(363)
        expect(itemCarrinho.valorUnitario).toEqual(121)
    });

    it('deve verificar se preço está correto quando possui 2 variações e uma delas está inativa', function () {
        variacao02.isAtivo = false
        itemCarrinho = new ItemCarrinho(produtoEx, [variacao01,variacao02], '',1)
        expect(itemCarrinho.valorTotal).toEqual(110.5)
        expect(itemCarrinho.valorUnitario).toEqual(110.5)
    });

    it('deve verificar se preço está correto quando possui 2 variações e todas elas estão inativas', function () {
        variacao02.isAtivo = false
        variacao01.isAtivo = false
        itemCarrinho = new ItemCarrinho(produtoEx, [variacao01,variacao02], '',1)
        expect(itemCarrinho.valorTotal).toEqual(100)
        expect(itemCarrinho.valorUnitario).toEqual(100)
    });

    it('deve verificar se preço está correto quando possui 2 variações e todas elas estão inativas e a quantidade é maior que 1', function () {
        variacao02.isAtivo = false
        variacao01.isAtivo = false
        itemCarrinho = new ItemCarrinho(produtoEx, [variacao01,variacao02], '',3)
        expect(itemCarrinho.valorTotal).toEqual(300)
        expect(itemCarrinho.valorUnitario).toEqual(100)
    });

    it('deve verificar se preço está correto quando possui 3 variações e uma delas tem mais de uma opcao', function () {
        itemCarrinho = new ItemCarrinho(produtoEx, [variacao01,variacao02, variacao03], '',1)
        expect(itemCarrinho.valorTotal).toEqual(151.5)
        expect(itemCarrinho.valorUnitario).toEqual(151.5)
    });

    it('deve verificar se preço está correto quando possui 3 variações e uma delas tem mais de uma opcao onde uma delas não está ativa', function () {
        variacao03.opcoes[0].status = 2 
        itemCarrinho = new ItemCarrinho(produtoEx, [variacao01, variacao02, variacao03], '', 1)
        expect(itemCarrinho.valorTotal).toEqual(141)
        expect(itemCarrinho.valorUnitario).toEqual(141)
    });

});
