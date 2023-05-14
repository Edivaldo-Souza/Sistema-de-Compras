import "./Login.css"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AcessToken } from "./token"
import { useState } from "react"

function Login(){
    const navigate = useNavigate()

    const efetuarLogin = () =>{
        let inputs = document.getElementsByTagName("input")
        var req = new XMLHttpRequest();
        req.open("POST","http://localhost:8080/api/login");
        req.onload = function(){
            console.log(req.getResponseHeader("Authorization"))
            AcessToken.token = req.getResponseHeader("Authorization")
            AcessToken.nomeUsuario = inputs[0].value
            navigate("/main")
        }
        req.send(JSON.stringify({
            nome:inputs[0].value,
            senha:inputs[1].value
        }))
    }

    return(
        <div className="container">
               <div className="formLogin">
               <h1 style={{color: "white", fontFamily: "Arial"}}>Login</h1>
                <input type="text" placeholder="Nome"/>
                <input type="text" placeholder="Senha"/>
                <div className="buttons">
                <button onClick={efetuarLogin}>Entrar</button>
                <Link to="/cadastro"><button>Cadastrar</button></Link>
                </div>   
            </div>
        </div>
    )
}

export default Login