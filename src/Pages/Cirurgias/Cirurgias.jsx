import { useEffect, useState } from 'react'
import Loader from '../../Components/Loading/Loading';
import Swal from 'sweetalert2'; 
import {format} from "date-fns"
import toDate from 'date-fns/toDate';
// API
import { getCirurgiaTipo, getCirurgiaCidade, getCirurgiaFaixaEtaria, getCirurgiaSexo } from '../../services/api';


import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import "./main.css"
import Container from 'react-bootstrap/Container';
import InputMask from 'react-input-mask';
import Paginator from '../../Components/Paginator/Paginator';
import parseISO from 'date-fns/parseISO';
import Menu from '../../Components/Menu/Menu';
import TableComponent from '../../Components/Table/Table';
// import Menu from '../../Components/Menu/Menu.jsx';

function Cirurgias() {

  const [dt_inicio, setdtInicio] = useState("");
  const [dt_fim, setdtFim] = useState("");

  const [tipo,setDadosTipo] = useState(['']);
  const [sexo,setDadosSexo] = useState(['']);
  const [cidade,setDadosCidade] = useState(['']);
  const [faixa_etaria,setDadosFaixaEtaria] = useState(['']);
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
      const responseTipo = await getCirurgiaTipo(format(parseISO( dt_inicio), "dd-MM-yyyy"),format(parseISO( dt_fim), "dd-MM-yyyy"));
      const responseSexo = await getCirurgiaSexo(format(parseISO( dt_inicio), "dd-MM-yyyy"),format(parseISO( dt_fim), "dd-MM-yyyy"));
      const responseCidade = await getCirurgiaCidade(format(parseISO( dt_inicio), "dd-MM-yyyy"),format(parseISO( dt_fim), "dd-MM-yyyy"));
      const responseFaixaEtaria = await getCirurgiaFaixaEtaria(format(parseISO( dt_inicio), "dd-MM-yyyy"),format(parseISO( dt_fim), "dd-MM-yyyy"));
  
      setDadosTipo(responseTipo);
      setDadosCidade(responseCidade);
      setDadosFaixaEtaria(responseFaixaEtaria);
      setDadosSexo(responseSexo);
      setIsLoad(true);
      console.log(responseSexo)
      
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

  
  const returnTipo = (val , index) =>{
    
    return(
      <tr key={index}>
        <td>{val['TIPO']}</td>
        <td>{val['QTD']}</td>
      </tr>
    )
  }
  const returnCidade = (val , index) =>{
    
    return(
      <tr key={index}>
        <td>{val['UF']}</td>
        <td>{val['NM_CIDADE']}</td>
        <td>{val['QTD']}</td>
      </tr>
    )
  }
  const returnSexo = (val , index) =>{
    
    return(
      <tr key={index}>
        <td>{val['SEXO']}</td>
        <td>{val['QTD']}</td>
      </tr>
    )
  }
  const returnFaixaEtaria = (val , index) =>{
    
    return(
      <tr key={index}>
        <td>{val['FAIXA']}</td>
        <td>{val['QTD']}</td>
      </tr>
    )
  }

  return (
    <Container>
      <Menu></Menu>
      <div className="mainPage">

      <h1>Cirúrgias</h1>

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
          <p>Por Faixa Etária</p>
        </div>
        {isToggled ? <Loader/> :
          <TableComponent striped> 
            <thead>
              <tr>
                <th>Idade</th>
                <th>Quantidade</th>
              </tr>
            </thead>

            <tbody>
              { faixa_etaria.map(returnFaixaEtaria)}
            </tbody>
          
          </TableComponent>
}
      </div>

      <div className='qrsCards'>
        <div className="titleDiv">
          <p>Cidade</p>
        </div>
        <Table striped> 
          <thead>
            <tr>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Quantidade</th>
            </tr>
            
          </thead>          
          { <Paginator data={cidade}/>}
            
        </Table>
        {isToggled && <Loader/>}
      </div>

      <div className='qrsCards'>
        <div className="titleDiv">
          <p>Sexo</p>
        </div>
        <Table striped> 
          <thead>
            <tr>
              <th>Sexo</th>
              <th>Quantidade</th>
            </tr>
            
          </thead>
          <tbody>
            {sexo.map(returnSexo)}
          </tbody>
        </Table>
        {isToggled && <Loader/>}
      </div>

      <div className='qrsCards'>
        <div className="titleDiv">
          <p>Tipo</p>
        </div>
        <Table striped> 
          <thead>
            <tr>
            <th>Tipo</th>
            <th>Quantidade</th>
            
            </tr>
            
          </thead>
          <tbody>
            {tipo.map(returnTipo)}
          </tbody>
        </Table>
        {isToggled && <Loader/>}
      </div>

      
    </div>
    </Container>

  );
}

export default Cirurgias;