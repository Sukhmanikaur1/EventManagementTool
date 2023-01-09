import React, {useMemo} from 'react'
import {useTable} from 'react-table'

export const PersonalEventTableGlobalFilter = ({filter, setFilter}) =>{
    return(
        <span>
            Search: {' '}
            <input value={filter|| ''}
            onChange={e=>setFilter(e.target.value)}  />
        </span>
    )
}