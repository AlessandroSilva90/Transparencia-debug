import { Table } from "react-bootstrap";
const TableComponent = (props) => {
    return ( <Table striped>{props.children} </Table>);
}
 
export default TableComponent