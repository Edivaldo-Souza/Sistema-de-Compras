import "./Login.css"
import { Link } from "react-router-dom"

function Login(){
    return(
        <div className="container">
               <div className="formLogin">
               <h1 style={{color: "white", fontFamily: "Arial"}}>Login</h1>
                <input type="text" placeholder="Nome"/>
                <input type="text" placeholder="Senha"/>
                <div className="buttons">
                <Link to="/main"><button>Entrar</button></Link>
                <Link to="/cadastro"><button>Cadastrar</button></Link>
                </div>   
            </div>
        </div>
    )
}

export default Login