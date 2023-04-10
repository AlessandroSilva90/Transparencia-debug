import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
// import reactPaginator from 'react-paginator';
import "./main.css"

// Example items, to simulate fetching from another resources.

export default function Paginator(props){

    const {data} = props;
    const [currentItems, setCurrentItens] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;
    


    useEffect(()=> {

        const endOffset = itemOffset + itemsPerPage;
        setCurrentItens(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
        // setPageCount(Math)
        // currentItems = items.slice(itemOffset, endOffset);
    },[itemOffset, itemsPerPage,data])
        
        
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const returnCidade = (val , index) =>{
    
    return(
      <tr key={index}>
        <td>{val['UF']}</td>
        <td>{val['NM_CIDADE']}</td>
        <td>{val['QTD']}</td>
        {/* <td>{val[3]}</td>
        <td>{val[4]}</td> */}
        {/* <td>{val[5]}</td>
        <td>{Math.round(val[6])}</td>
        <td>{Math.round(val[7])}</td>
        <td>{val[8]}</td>
        <td>{val[9]}</td> */}
      </tr>
    )
  }

  return (
    <>
    <tbody>
      
        {currentItems.map(returnCidade)}
    </tbody>

    <div className="paginator">
    <ReactPaginate
        breakLabel="..."
        nextLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel=""
        renderOnZeroPageCount={null}
        containerClassName = "pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName='active'
        />
        
    </div>
    </>
  );
}