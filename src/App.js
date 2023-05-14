
import './App.css';
import CadastroUsuario from './CadastroUsuario';
import Carrinho from './TelaCarrinhoDeCompras';
import MainPage from './TelaPrincipal';
import Login from './TelaDeLogin';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Saldo from './Saldo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}></Route>
        <Route path="/main" element={<MainPage/>}></Route>
        <Route path="/carrinho" element={<Carrinho/>}></Route>
        <Route path='/cadastro' element={<CadastroUsuario/>}></Route>
        <Route path='/saldo' element={<Saldo/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
