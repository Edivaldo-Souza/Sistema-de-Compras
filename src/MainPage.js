import { Component, useEffect, useState } from "react";
import Lista from "./Lista";
import axios from "axios";

function MainPage(){
    const[TodosProdutos,setTodosProduto] = useState([])
            
    var atualizarLista = ()=>{ axios({
            method:"get",
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
            },
            url:"http://localhost:8080/api/produto",
        })
        .then(response => setTodosProduto(response.data))
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        atualizarLista()
    },[])
    return(
        <Lista produtos={TodosProdutos} atualizar={atualizarLista}></Lista>
    )
}

export default MainPage