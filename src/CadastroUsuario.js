import { Link } from "react-router-dom"
import "./CadastroUsuario.css"
import axios from "axios"

function CadastroUsuario(){

    const submit = ()=>{
        let inputs = document.getElementsByTagName("input")
        if(inputs[0].value!=undefined && inputs[1].value!=undefined && inputs[2].value!=undefined){
           axios({
            method:"post",
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
            },
            url:"http://localhost:8080/api/usuario",
            data:{
                nome:inputs[0].value,
                codigoValidacao:inputs[1].value,
                senha:inputs[2].value
            }
            })
            .then(()=>{
                alert("Cadastrado com sucesso!")
            })  
        }
        else{
            alert("Preencha todos os campos")
        }
        
    }

    return(
        <div className="container">
               <div className="form">
                <h1 style={{color: "white", fontFamily: "Arial"}}>Cadastro</h1>
                <input type="text" placeholder="Nome"/>
                <input type="text" placeholder="Chave para Gerente"/>
                <input type="text" placeholder="Senha"/>
                <input type="text" placeholder="Confirmar Senha"/>
                <div className="buttons">
                    <button onClick={submit}>Cadastrar</button>
                    <Link to="/"><button>Voltar</button></Link>
                </div>   
            </div>
        </div>
    )
}

export default CadastroUsuario