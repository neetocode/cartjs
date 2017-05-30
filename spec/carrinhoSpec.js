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
        expect(carrinho.idCliente).toBeDefined()
        expect(carrinho.idPlace).toBeDefined()
        expect(carrinho.dataCriacao).toBeDefined()
        expect(carrinho.dataAtualizacao).toBeDefined()
        expect(carrinho.itens).toBeDefined()
        expect(carrinho.valor).toBeDefined()
        expect(carrinho.state).toBeDefined()
        expect(carrinho.frete).toBeDefined()
    });

    it('verifica se valores dos atributos criados estão corretos', function() {
        expect(typeof(carrinho.dataCriacao)).toEqual('object')
        expect(typeof(carrinho.dataAtualizacao)).toEqual('object')
        expect(carrinho.itens.length).toEqual(0)
        expect(carrinho.valor.subTotal).toEqual(0)
        expect(carrinho.valor.valorDesconto).toEqual(0)
        expect(carrinho.valor.valorFrete).toEqual(0)
        expect(carrinho.valor.total).toEqual(0)
        expect(carrinho.state.mensagem).toEqual(null)
        expect(carrinho.state.isValido).toEqual(false)
    });

    it('verifica se aceita valor inválido para adicionarItem', function() {
        expect(()=>carrinho.adicionarItem({oi:'ola'})).toThrowError()
    });

    it('deve verificar valores após adicionar produto sem variacoes', function() {
        carrinho.adicionarItem(itemCarrinho01)
        expect(carrinho.valor.valorDesconto).toEqual(0)
        expect(carrinho.valor.valorFrete).toEqual(0)
        expect(carrinho.valor.subTotal).toEqual(100)
        expect(carrinho.valor.total).toEqual(100)

    });

    it('deve verificar valores após adicionar produto sem variacoes', function() {
        carrinho.adicionarItem(itemCarrinho01)
        expect(carrinho.valor.valorDesconto).toEqual(0)
        expect(carrinho.valor.valorFrete).toEqual(0)
        expect(carrinho.valor.subTotal).toEqual(100)
        expect(carrinho.valor.total).toEqual(100)
    });

    it('deve verificar valores após adicionar produto com variacoes e opcoes', function() {
        carrinho.adicionarItem(itemCarrinho02)
        expect(carrinho.valor.valorDesconto).toEqual(0)
        expect(carrinho.valor.valorFrete).toEqual(0)
        expect(carrinho.valor.subTotal).toEqual(150)
        expect(carrinho.valor.total).toEqual(150)
        expect(carrinho.size()).toEqual(1)
        expect(carrinho.isValido()).toEqual(true)
    });

    it('deve verificar valores após adicionar produto com status diferente de ativo', function() {
        carrinho.adicionarItem(itemCarrinho03)
        expect(carrinho.valor.valorDesconto).toEqual(0)
        expect(carrinho.valor.valorFrete).toEqual(0)
        expect(carrinho.valor.subTotal).toEqual(0)
        expect(carrinho.valor.total).toEqual(0)
        expect(carrinho.size()).toEqual(1)
        expect(carrinho.isValido()).toEqual(false)
    });
        
        
        
});