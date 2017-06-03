const Carrinho = require('./../src/Carrinho')
const ItemCarrinho = require('./../src/ItemCarrinho')
const ProdutoItemCarrinho = require('./../src/ProdutoItemCarrinho')
const VariacaoProdutoItemCarrinho = require('./../src/VariacaoProdutoItemCarrinho')
const OpcaoVariacaoProdutoItemCarrinho = require('./../src/OpcaoVariacaoProdutoItemCarrinho')

describe('Inicialização do carrinho ->', function() {
    var carrinho, itemCarrinho02, itemCarrinho03



    beforeEach(()=>{
        carrinho = new Carrinho('123','123')

        itemCarrinho01 = new ItemCarrinho(new ProdutoItemCarrinho('123','Produto tal',100,'caminho-img',1),[],'Minha observação',1)
        itemCarrinho02 = new ItemCarrinho(new ProdutoItemCarrinho('123','Produto tal',100,'caminho-img',1),[
            new VariacaoProdutoItemCarrinho('123','essa é uma variacao',0,3,1,true,[
                new OpcaoVariacaoProdutoItemCarrinho('1234','variacao01',25,1),
                new OpcaoVariacaoProdutoItemCarrinho('1235','variacao02',25,3),
                new OpcaoVariacaoProdutoItemCarrinho('1236','variacao03',25,1)
            ])
        ],'Minha observação',1),
         itemCarrinho03 = new ItemCarrinho(new ProdutoItemCarrinho('123','Produto tal',100,'caminho-img',2),[
            new VariacaoProdutoItemCarrinho('123','essa é uma variacao',0,3,1,true,[
                new OpcaoVariacaoProdutoItemCarrinho('1234','variacao01',25,1),
                new OpcaoVariacaoProdutoItemCarrinho('1235','variacao02',25,3),
                new OpcaoVariacaoProdutoItemCarrinho('1236','variacao03',25,1)
            ])
        ],'Minha observação',1)
    })


    it('deve barrar construtor com argumentos inválidos', function() {
        expect(()=>{ var carrinhoErro = new Carrinho()}).toThrowError()
        expect(()=>{ var carrinhoErro = new Carrinho('123')}).toThrowError()
    });
    
    it('verifica se atributos foram criados', function() {
        expect(carrinho.getIdCliente()).toBeDefined()
        expect(carrinho.getIdPlace()).toBeDefined()
        expect(carrinho.getDataCriacao()).toBeDefined()
        expect(carrinho.getDataAtualizacao()).toBeDefined()
        expect(carrinho.getItens()).toBeDefined()
        expect(carrinho.getValor()).toBeDefined()
        expect(carrinho.getState()).toBeDefined()
        expect(carrinho.getFrete()).toBeDefined()
    });

    it('verifica se valores dos atributos criados estão corretos', function() {
        expect(typeof(carrinho.getDataCriacao())).toEqual('object')
        expect(typeof(carrinho.getDataAtualizacao())).toEqual('object')
        expect(carrinho.getItens().length).toEqual(0)
        expect(carrinho.getValor().subTotal).toEqual(0)
        expect(carrinho.getValor().valorDesconto).toEqual(0)
        expect(carrinho.getValor().valorFrete).toEqual(0)
        expect(carrinho.getValor().total).toEqual(0)
        expect(carrinho.getState().mensagem).toEqual(null)
        expect(carrinho.getState().isValido).toEqual(false)
    });

    it('verifica se aceita valor inválido para adicionarItem', function() {
        expect(()=>carrinho.addItem({oi:'ola'})).toThrowError()
    });

    it('deve verificar valores após adicionar produto sem variacoes', function() {
        carrinho.addItem(itemCarrinho01)
        expect(carrinho.getValor().valorDesconto).toEqual(0)
        expect(carrinho.getValor().valorFrete).toEqual(0)
        expect(carrinho.getValor().subTotal).toEqual(100)
        expect(carrinho.getValor().total).toEqual(100)

    });

    it('deve verificar valores após adicionar produto sem variacoes', function() {
        carrinho.addItem(itemCarrinho01)
        expect(carrinho.getValor().valorDesconto).toEqual(0)
        expect(carrinho.getValor().valorFrete).toEqual(0)
        expect(carrinho.getValor().subTotal).toEqual(100)
        expect(carrinho.getValor().total).toEqual(100)
    });

    it('deve verificar valores após adicionar produto com variacoes e opcoes', function() {
        carrinho.addItem(itemCarrinho02)
        expect(carrinho.getValor().valorDesconto).toEqual(0)
        expect(carrinho.getValor().valorFrete).toEqual(0)
        expect(carrinho.getValor().subTotal).toEqual(150)
        expect(carrinho.getValor().total).toEqual(150)
        expect(carrinho.getSize()).toEqual(1)
        expect(carrinho.isValido()).toEqual(true)
    });

    it('deve verificar valores após adicionar produto com status diferente de ativo', function() {
        carrinho.addItem(itemCarrinho03)
        expect(carrinho.getValor().valorDesconto).toEqual(0)
        expect(carrinho.getValor().valorFrete).toEqual(0)
        expect(carrinho.getValor().subTotal).toEqual(0)
        expect(carrinho.getValor().total).toEqual(0)
        expect(carrinho.getSize()).toEqual(1)
        expect(carrinho.isValido()).toEqual(false)
    });

    it('deve remover item do carrinho e verificar se o tamanho ficou correto', function() {
        carrinho.addItem(itemCarrinho01)
        carrinho.addItem(itemCarrinho02)
        carrinho.addItem(itemCarrinho03)
        expect(carrinho.getSize()).toEqual(3)
        
        carrinho.removeItem(1)
        expect(carrinho.getSize()).toEqual(2)
    });

    it('deve remover item do carrinho e verificar se o tamanho ficou correto fazendo 2 vezes a operacao', function() {
        carrinho.addItem(itemCarrinho01)
        carrinho.addItem(itemCarrinho02)
        carrinho.addItem(itemCarrinho03)
        expect(carrinho.getSize()).toEqual(3)
        
        carrinho.removeItem(1)
        expect(carrinho.getSize()).toEqual(2)

        carrinho.addItem(itemCarrinho01)
        expect(carrinho.getSize()).toEqual(3)

        carrinho.removeItem(2)
        expect(carrinho.getSize()).toEqual(2)
    });

    it('deve remover item do carrinho e verificar se o valor ficou correto', function() {
        carrinho.addItem(itemCarrinho01)
        carrinho.addItem(itemCarrinho02)
        carrinho.addItem(itemCarrinho03)
        expect(carrinho.getValor().total).toEqual(250)

        carrinho.removeItem(0)
        expect(carrinho.getValor().total).toEqual(150)

        carrinho.addItem(itemCarrinho02)
        expect(carrinho.getValor().total).toEqual(300)

        carrinho.removeItem(1)
        expect(carrinho.getValor().total).toEqual(300)
    });

    it('deve trocar item e verificar se o valor ficou correto', function() {
        carrinho.addItem(itemCarrinho01)
        carrinho.addItem(itemCarrinho02)
        carrinho.addItem(itemCarrinho03)
        expect(carrinho.getValor().total).toEqual(250)

        carrinho.replaceItem(0,itemCarrinho02)
        expect(carrinho.getValor().total).toEqual(300)

        carrinho.replaceItem(1, itemCarrinho03)
        expect(carrinho.getValor().total).toEqual(150)

        carrinho.replaceItem(0, itemCarrinho03)
        expect(carrinho.getValor().total).toEqual(0)

    });

          
        
        
});