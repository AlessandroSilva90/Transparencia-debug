import { useEffect, useState } from 'react'
import { getDadosPorCidade } from './services/api'

import './App.css'
import AppRouts from './router'

function App() {

  return (
    <div className="App">
      <AppRouts/>
    </div>
  )
}

export default App
