// Mylist.js
import {  useSelector } from 'react-redux'
export default function List({ listValue, onDelete, onEdit }) {
  const handleDelete = (index) => onDelete(index);
  const handleEdit = (index,id) => onEdit(index,id);
  const isloading = useSelector((state)=>state.isloading)
  if (isloading===true) {
    return <div>Chargement en cour</div>;
  }
  else if (!Array.isArray(listValue) || listValue.length === 0) {
    return <div> No items to display.</div>;
  }
  
 

  return (
    <>
      <table border={1}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
           
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {listValue.map((list, keys) => (
            <tr key={keys}>
              <td>{list.attributes.Email}</td>
              <td>{list.attributes.Name}</td>
             
             
              <td>
                <button onClick={() => handleDelete(list.id)}>Delete</button>
                <button onClick={() => handleEdit(keys,list.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
