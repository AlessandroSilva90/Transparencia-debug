import { useEffect, useState } from 'react'
import { getDadosPorCidade } from './services/api'

import ReactInputMask from 'react-input-mask';

import './App.css'

function App() {


  const [dt_inicio, setdtInicio] = useState("");
  const [dt_fim, setdtFim] = useState("");

  const [dados,setDados] = useState([''])

  const handleDados = async (e) => {
      e.preventDefault();
      const response = await getDadosPorCidade(dt_inicio,dt_fim)
    console.log(response)
  }

  return (
    <div className="App">
      <form onSubmit={handleDados}>
        Data Inicial<input type="text" name="" id=""onChange={(e)=> setdtInicio(e.target.value)}/><br/>
        Data FInal<input type="text"  mask='99/99/9999' name="" id="" onChange={(e)=> setdtFim(e.target.value)}/><br/>
        <button>Enviar</button>
      </form>

      <div className="dados">

      </div>
    </div>
  )
}

export default App
