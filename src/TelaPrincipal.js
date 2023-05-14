import { Component, useEffect, useState } from "react";
import Lista from "./TelaListaDeProdutos";
import axios from "axios";
import { AcessToken } from "./token";

function MainPage(){
    const[TodosProdutos,setTodosProduto] = useState([])
    
    var verificarUsuario = ()=>{
        axios({
            method:"get",
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "Authorization":AcessToken.token
            },
            url:"http://localhost:8080/api/usuario/"+AcessToken.nomeUsuario,
            
        })
        .then(response=>{
            alert(response.data[0].isGerente)
        })
        .catch(error=>console.log(error))
    }

    var atualizarListaDeProdutos = ()=>{ 
        axios({
            method:"get",
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "Authorization":AcessToken.token
            },
            url:"http://localhost:8080/api/produto",
        })
        .then(response => setTodosProduto(response.data))
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        atualizarListaDeProdutos()
        verificarUsuario()
    },[])
    return(
        <Lista produtos={TodosProdutos} atualizar={atualizarListaDeProdutos}></Lista>
    )
}

export default MainPage