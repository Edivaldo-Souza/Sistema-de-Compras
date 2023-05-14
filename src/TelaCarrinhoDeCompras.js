import { Component, useEffect, useState } from "react"
import "./Carrinho.css"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { AcessToken } from "./token"

class Produtos extends Component{
    render(){
        const itens = this.props.produtos.map((item,index)=>{
            return(
                <tr key={index}>
                    <td>{item.nome}</td>
                    <td>{item.valor}</td>
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

function Carrinho(){
        const location = useLocation();
        const {produtos} = location.state
        const [total,setTotal] = useState()

        const definirTotal = () =>{
            let t = 0.00

            for(let item of produtos){
                t = t + parseFloat(item.valor)
            }
            setTotal(t.toFixed(2))
        }

        const efetuaCompra = async()=>{
            let date = new Date()
            let actualDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            axios({
                method:"post",
                headers:{
                    "Content-Type":"application/json; charset=UTF-8",
                    "Authorization":AcessToken.token
                },
                url:"http://localhost:8080/api/saldo",
                data:{
                    valor:total,
                    dataDaCompra: actualDate
                }
            })
            .then(response=>{
                console.log("Compra Efetuada! Valor="+response.json.valor)
            })
            .catch(error=>console.log(error))
        }

        useEffect(()=>{
            definirTotal();
        },[])

        return(
            <div className="back">
                <div className="main-container">
                    <div className="lista-itens">
                        <table>
                            <thead>
                                <th>Produto</th>
                                <th>Valor</th>
                            </thead>
                            <Produtos produtos={produtos}/>
                        </table>
                    </div>
                    <div className="charge">
                        <div className="container-charge">
                            <div className="preco-total">
                                <p>Total</p>
                                <h1>{"R$"+total}</h1>
                            </div>
                            <Link to="/main" onClick={()=>{efetuaCompra();alert("Compra Efetuada!")}}><button style={{backgroundColor:"green"}}>Pagar</button></Link>
                            <Link to="/main"><button style={{backgroundColor:"red"}}>Cancelar</button></Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
}

export default Carrinho