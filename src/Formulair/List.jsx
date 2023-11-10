import React from 'react';

export default function List ({listValue,onDelet,onEdit}){
    
    const handelDelet=(index)=>{
        onDelet(index)
    
        
       
    }
    const handelEdit=(idx)=>{
        onEdit(idx) 
     }
  return(
    <>
    <table border={1}>
        <thead>
            <tr >
            <th>Email  </th>
            <th>Name</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody >
           { listValue.map((list,keys)=>(
            
       <tr key={keys}>
        <td>{list.Email}</td>
        <td>{list.Name}</td>
        <td><button onClick={()=>handelDelet(keys)}>Delet</button> <button onClick={()=>handelEdit(keys)}> Edit</button></td>
       </tr>
           )
           )
           }

    

        </tbody>
    </table>
    
    </>
  )

}