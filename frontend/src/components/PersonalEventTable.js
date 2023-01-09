import React, {useState, useEffect} from 'react'
import { useTable, useGlobalFilter, useSortBy , usePagination } from "react-table";
import {PersonalEventTableGlobalFilter} from './PersonalEventTableGlobalFilter'
const styles = {
    table:{
      maxheight:"322px",
      width:"98%",
    },
    tbody:{
      width:"10%",
      backgroundColor:"white",
    },
    thead: {
      backgroundColor: "#2192ff",
      width:"25%",
    },
    tr:{
      width:"30vw",
    },
    th:{
      height: "40px",
      },
    td: {
      padding: "5px",
      border: "dotted 1px black",
    },
    
  };
const PersonalEvent = ({setModals,columns,data}) => {
    const {
        getTableProps, // Sends the needed props to your table.
        getTableBodyProps, // Sends needed props to your table body
        headerGroups, // Returns normalized header groups
        page,
         // rows for the table based on the data passed
        prepareRow, // Prepare the row in order to be displayed.
        state,
        setGlobalFilter,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
      } = useTable({
        columns,
        data
      },useGlobalFilter, useSortBy, usePagination );
      const {globalFilter}=state
      useEffect(() => {

        setPageSize(4)
      },[])
      console.log(state)
      return (
        <div className="table-Container">
          <PersonalEventTableGlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <table style={styles.table} {...getTableProps()}>
          <thead  style={styles.thead}>
            {headerGroups.map((headerGroup) => (
              <tr style={styles.tr} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className={"personal-table-th"} {...column.getHeaderProps(column.getSortByToggleProps())}
                  
                >
                    <span style={styles.span}>
                      {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                    </span>
                    <span className="text-heading" style={styles.span}>{column.render("Header")}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody style={styles.tbody} {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr style={styles.tr} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td onClick={()=>{
                      setModals({data:[...data],id:row.id})}} {...cell.getCellProps()}  style={styles.td}><span className="text-item-td">{cell.render("Cell")}</span></td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination-buttons">
          <span>{state.pageIndex+1} of {pageOptions.length}</span>
        <button disabled={!canPreviousPage} onClick={()=>previousPage()}>previous</button>
        <button disabled={!canNextPage} onClick={()=>nextPage()}>next</button>
        </div>
        </div>
      );
      
}
export default PersonalEvent;