import React from 'react'
import IList from "./IList"


export default function IListContainer({getIListItems}) {
    const listItemsFields= ["item0"];
    return (
        <>     
         <IList items={listItemsFields} getIListItems={getIListItems}/>
        </>
    )
}
