import "./Saldo.css"
import { Component } from "react"
import { useState,useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom"

class Produtos extends Component{
    render(){
        const itens = this.props.vendasProdutos.map((item,index)=>{
            return(
                <tr key={index}>
                    <td>{"R$"+item.valor}</td>
                    <td>{item.dataDaCompra}</td>
                </tr>
            )
        })

        return(
            <tbody>
                {itens}   
            </tbody>
        )
    }        
}

function Saldo(){
    const [saldo,setSaldo] = useState()
    const [vendas,setVendas] = useState([])

    const getVendas = () =>{
        axios({
            method:"get",
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
            },
            url:"http://localhost:8080/api/saldo",
        })
        .then(response => setVendas(response.data))
        .catch(error => console.log(error))
    }

    const getSaldo = () =>{
        let t = 0.0
        for(let item of vendas){
            t = t + item.valor
        }
        setSaldo(t)
    }

    useEffect(()=>{
        getVendas();
        getSaldo();
    })

    return(
        <div className="back">
        <div className="main-container">
            <div className="lista-itens">
                <table>
                    <thead>
                        <th>Valor da Venda</th>
                        <th>Data da Venda</th>
                    </thead>
                    <Produtos vendasProdutos={vendas}/>
                </table>
            </div>
            <div className="charge">
                <div className="container-charge">
                    <div className="preco-total">
                        <p>Saldo de Vendas</p>
                        <h1>{"R$"+saldo}</h1>
                    </div>
                    <Link to="/main"><button style={{backgroundColor:"black"}}>Voltar</button></Link>
                </div>
                
            </div>
        </div>
    </div>
    )
}

export default Saldo