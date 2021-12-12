import React, {useEffect, useState} from "react"
import TablePagination from '@material-ui/core/TablePagination';
import "./SelectionTable.css"

function SelectionTable(props){
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(2)
    const [tableHeaders, setTableHeaders] = useState(["imgUrl", "name", "price", "choose quantity"]) 


    async function handleChange(event){
        const {name, value} = event.target

        props.setSelectedProducts(prevValue=>{
            return {
                    ...prevValue,
                    [name]:+value
            }
        })

        /*if (+value===0){
            let newObject= selectedProducts
            console.log(newObject)
            delete newObject[name]
            console.log(newObject)
            setSelectedProducts(newObject)
        }*/
    }


 
    useEffect(()=>{
        let boolean=false
        let temp={}
        Object.keys(props.selectedProducts).map((key, index)=>{
            if(props.selectedProducts[key]>0){
                temp[key]=props.selectedProducts[key]
            }
            else {
                boolean=true
            }
        })
        console.log(temp)
        localStorage.setItem("selectedProducts", JSON.stringify(temp))
        if(boolean===true){
            props.setSelectedProducts(temp)
        }
        //setSelectedProducts(temp)
    },[props.selectedProducts])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    return(
        <div>
            <div className="select-products" onClick={()=>console.log(props.selectedProducts)}>Select products:-</div>
            <table className="table-1">
                <tr className="tr-1">
                    {tableHeaders.map((info, index)=>{
                        return (
                            <th className="td-1">{info}</th>
                        );
                    })
                    }
                </tr>

                {props.products?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index)=>{
                    return (
                        <tr className="tr-1" key={index}>
                        {item && Object.keys(item).map((key, index) => (
                            key!=="_id" &&
                            <td key={index} className="td-1">
                                {key==="imgUrl" ? <img src={item[key]} className="table-img"></img>:item[key]}   
                            </td>
                        ))}

                        <td className="td-1"><input type="number" min="0" onChange={handleChange} value={props.selectedProducts[item.name]==undefined?0:props.selectedProducts[item.name]} onClick={(e)=>{console.log(e.target.value);}} name={item.name} className="quantity-input" placeholder="0"></input> </td>

                        </tr>);
                })}
                <TablePagination
                rowsPerPageOptions={[1, 2, 3]}
                page={page}
                count={props.products.length}
                rowsPerPage={rowsPerPage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </table>

        </div> 
    );
}

export default SelectionTable;