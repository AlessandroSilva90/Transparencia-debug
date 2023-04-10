
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import AtendimentosPorCidade from "./Pages/Assistenciais/GetAtendPacCidade";
import ResumoUndInt from "./Pages/ResUndInternacao/ResumoUndInternacao";
import MainPage from "./Pages/PaginaPrincipal/MainPage";
import Cirurgias from "./Pages/Cirurgias/Cirurgias";
import Menu from "./Components/Menu/Menu";

import MetasInternacoes from "./Pages/NewPages/MetasInternacoes/MetasInternacoes";
import MetasCirurgias from "./Pages/NewPages/MetasCirurgias/MetasCirurgias";
import MetasUrgencia from "./Pages/NewPages/MetasUrgencia/MetasUrgencia";
import MetasConsultas from "./Pages/NewPages/MetasConsultas/MetasConsultas";
import MetasExames from "./Pages/NewPages/MetasExames/MetasExames";

const AppRouts = () => {
 
    return(
        <Router>
            <Routes>
            
                 <Route exact path='/' element={<MainPage/>} />
                 <Route exact path='transparencia/atendimentos_cidade' element={<AtendimentosPorCidade/>} />
                 <Route exact path='transparencia/atendimentos_unidade_internacao' element={<ResumoUndInt/>} />
                 <Route exact path='transparencia/cirurgias' element={<Cirurgias/>} /> 

                 {/* a partir daqui são as novas rotas */}
                 <Route exact path='Internacoes' element={<MetasInternacoes />} /> 
                 <Route exact path='Cirurgias' element={<MetasCirurgias />} /> 
                 <Route exact path='Ambulatorio' element={<MetasUrgencia />} /> 
                 <Route exact path='Consultas' element={<MetasConsultas />} /> 
                 <Route exact path='Exames' element={<MetasExames />} /> 


            </Routes>
        </Router>
    )
}

export default AppRouts;