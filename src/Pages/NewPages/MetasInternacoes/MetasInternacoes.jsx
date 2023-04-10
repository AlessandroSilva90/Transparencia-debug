import { useEffect, useState } from 'react'
import Loader from '../../../Components/Loading/Loading';
import Swal from 'sweetalert2'; 
import {format} from "date-fns"
import toDate from 'date-fns/toDate';
// API
import { getMetasInternacoes } from '../../../services/api';


import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import "./main.css"
import Container from 'react-bootstrap/Container';

import parseISO from 'date-fns/parseISO';
import Menu from '../../../Components/Menu/Menu';
import TableComponent from '../../../Components/Table/Table';
// import Menu from '../../Components/Menu/Menu.jsx';

function MetasInternacoes() {

    const [dt_inicio, setdtInicio] = useState("");
    const [dt_fim, setdtFim] = useState("");
    const [metas, setMetas] = useState(['']);

    const [isLoad,setIsLoad] = useState(false);
    const [isToggled, setIsToggled] = useState(false);



  const handleDados = async (e) => {
    e.preventDefault();
    
    if(format(parseISO( dt_inicio), "yyyy") > format(parseISO( dt_fim), "yyyy")){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique se as datas estão corretas!'
      })
    }else{      
    try{
      setIsLoad(false)
      setIsToggled(!isToggled)
      const response = await getMetasInternacoes(format(parseISO( dt_inicio), "dd-MM-yyyy"),format(parseISO( dt_fim), "dd-MM-yyyy"));
        
      setMetas(response);
      setIsLoad(true);
    }catch (e) {
      setIsLoad(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique se as datas estão corretas!'
      })
    }
  }
  setIsToggled(false)
    setIsLoad(true);
  }

  

  
  const returnMetas = (val , index) =>{
    
    return(
      <tr key={index}>
        <td>{val['DS_ESPECIALID']}</td>
        <td>{val['QTD']}</td>
      </tr>
    )
  }
  

  return (
    <Container>
      <Menu></Menu>
      <div className="mainPage">

      <h1>Internações</h1>

      <Form className='forms' onSubmit={handleDados} >
        <div className="titleDiv">
          <p>Pesquisa</p>
        </div>
        <div className="fields">
          <input type={"date"}  placeholder='Data Inicial' className='inpText' onChange={(e)=> setdtInicio(e.target.value)}/>
          <input type={"date"}  placeholder='Data Final'  className='inpText' onChange={(e)=> setdtFim(e.target.value)}/>
        </div>
        <div className="buttons">
          <button>Buscar</button>
        </div>
      </Form>

      <div className='qrsCards'>
        <div className="titleDiv">
          <p>Internações</p>
        </div>
        {isToggled ? <Loader/> :
          <TableComponent striped> 
            <thead>
              <tr>
                <th>Internações</th>
                <th>Quantidade</th>
              </tr>
            </thead>

            <tbody>
              { metas.map(returnMetas)}
            </tbody>
          
          </TableComponent>
        }
      </div>


      
    </div>
    </Container>

  );
}

export default MetasInternacoes;