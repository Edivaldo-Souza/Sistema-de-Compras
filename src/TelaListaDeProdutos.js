import { Component} from "react"
import "./Lista.css"
import axios from "axios"
import { Link } from "react-router-dom"
import { AcessToken } from "./token"

var editing = false;

const toggleCrud = () =>{
    let cont = document.getElementsByClassName("crud-container")
    let editar = document.getElementsByClassName("edit-button")
    let cart = document.getElementsByClassName("shop-cart")
    let bCarrinho = document.getElementById("buttonCarrinho")

    if(editing==false){
        editing = true
        bCarrinho.style.pointerEvents = "none";
        bCarrinho.style.opacity = "50%"
        cont[0].style.display = "block"
        for(let i of editar){
            i.style.display = "block"
        }
        for(let j of cart){
            j.style.display = "none"
        }
    }
    else if(editing==true){
        editing = false
        cont[0].style.display = "none"
        for(let i of editar){
            i.style.display = "none"
        }
        for(let j of cart){
            j.style.display = "block"
        }
    }
}

class Produtos extends Component{
    state = {
        nome:"",
        valor:0,
        selecionados:[]
    }

    atualizarInputs = (prod) => {
        this.props.atualizar(prod)
    }

    toggleSelect = (prod,index) =>{
        let buttons = document.getElementsByClassName("shop-cart")
    
        if(this.state.selecionados[index] === false){
            
            this.state.selecionados[index] = true
            buttons[index].style.backgroundColor = "white"
            this.props.atualizarCarrinho(prod)
            
        }
        else{
           
            this.state.selecionados[index] = false
            buttons[index].style.backgroundColor = "rgb(40, 67, 223)"
            this.props.removerDoCarrinho(index);
        }
    }

    render(){
        const itens = this.props.produtos.map((item,index) =>{
        this.state.selecionados.push(false);
            return(
                <div className="produto" key={index}>
                    <div className="info-produto">
                        <div>
                            <p>{item.nome}</p>
                            <p>{"R$"+item.valor}</p>
                        </div>
                        <div className="produto-container-buttons">
                                        
                            <img onClick={()=>this.toggleSelect(item,index)} className="shop-cart" src="resources/shopping-cart_3.png"></img>
                            <img onClick={()=>this.props.remover(item.id,index)} className="edit-button" src="resources/lixeira.png"></img>
                            
                        </div>
                    </div>
                </div>
            )})
    
    
        return(
            <div className="lista-produtos">
                {itens}
            </div>
        )
    }
}

class Lista extends Component{
    padrao = {
        nome:"",
        valor:0.00,
        produtosCarrinho:[]
    }

    state = this.padrao

    atualizarInputs = (event) => {
        const{name,value} = event.target
        this.setState({
            [name]:value
        })
    }

    atualizarProdutosCarrinho = (produto) =>{
        this.setState({
            produtosCarrinho:[...this.state.produtosCarrinho,produto]
        })
    }

    removerProdutoCarrinho = (index) =>{
        const{produtosCarrinho} = this.state;
        this.setState({
            produtosCarrinho:produtosCarrinho.filter((prod,i)=>{
                return i!=index;
            })
        })
    }

    setInputsParaEdicao = (prod)=>{
        let nome = document.getElementById("nomeInput")
        let valor = document.getElementById("valorInput")

        nome.value = prod.nome
        this.state.nome = prod.nome
        valor.value = prod.valor
        this.state.valor = prod.valor
    }

    criarProduto = () =>{
        axios({
            method:"post",
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "Authorization":AcessToken.token
            },
            url:"http://localhost:8080/api/produto",
            data:{
                nome:this.state.nome,
                valor:parseFloat(this.state.valor),
                imgPath:""
            },
        })
        .then(response => {
            alert(response.json)
            this.props.atualizar();
        })
        .catch(error => console.log(error))
    }

    removerProduto = (id,ix) =>{
        axios({
            method:"delete",
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "Authorization":AcessToken.token
            },
            url:"http://localhost:8080/api/produto/"+id,
        })
        .then(response => {
            alert(response.data)
            this.removerProdutoCarrinho(ix)
            this.props.atualizar();
        })
        .catch(error => console.log(error))
    }

    atualizarProduto = (id) =>{
        axios({
            method:"put",
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "Authorization":AcessToken.token
            },
            url:"http://localhost:8080/api/produto",
            data:{
                id:id,
                nome:this.state.nome,
                valor:parseFloat(this.state.valor),
                imgPath:""
            },
        })
        .then(response => {
            alert(response.json)
            this.props.atualizar();
        })
        .catch(error => console.log(error))
    }

    render(){
        const{nome,valor} = this.state
        
        return(<div>
            <div className="search-bar">
                <div className="search-bar-content">
                    {/*<input type="text" placeholder="Pesquisar"/>
                    <img className="lupa" src="resources/lupa_2.png"></img>*/}
                    <Link to="/">
                        <button className="buttons-text">Sair</button>
                    </Link>
                    <div className="container-carrinho">
                    <Link id="buttonCarrinho" to="/carrinho" state={{produtos:this.state.produtosCarrinho}}>
                        <button className="buttons-text">Carrinho de Compras</button>
                    </Link>
                    <Link to="/saldo">
                        <button className="buttons-text">Saldo</button>
                    </Link>    
                        <button className="buttons-text" onClick={toggleCrud}>Gerenciar Produtos</button>
                    </div>
                </div>
            </div>
            <div className="management-container">
                <Produtos produtos={this.props.produtos} remover={this.removerProduto}
                atualizar={this.setInputsParaEdicao} atualizarCarrinho={this.atualizarProdutosCarrinho} removerDoCarrinho={this.removerProdutoCarrinho}/>
                <div className='crud-container'>
                    <div className="crud-dados">
                        
                        <input id="nomeInput" type="text" onChange={this.atualizarInputs} value={nome} name="nome" placeholder="Nome do Produto"/>
                        <input id="valorInput" type="number" step={0.01} onChange={this.atualizarInputs} value={valor} name="valor" placeholder="Valor Unitário"/>
                        <div className="crud-button-container">
                            <button  className="buttons-text" onClick={this.criarProduto}>Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Lista