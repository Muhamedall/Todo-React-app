// Mylist.js
import {  useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <div className='Table_User'>
      <table border={1}  >
        <thead >
          <tr>
            <th>Email</th>
            <th>Name</th>
           <th>Profile</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {listValue.map((list, keys) => (
            
            <tr key={keys}>
              <td>{list.attributes.Email}</td>
             
              <td>{list.attributes.Name}</td>
              <td>
                {list.attributes.image && list.attributes.image.data ? (
                  <img
                    src={`http://localhost:1337${list.attributes.image.data.attributes.url}`}
                    alt={list.attributes.Name}
                    style={{ maxWidth: '50px' ,borderRadius:'30px'}} // Adjust the style as needed
                  />
                ) : (
                  <span>No image available</span>
                )}
              </td>
             
             
              <td>
                <button onClick={() => handleDelete(list.id)}>Delete<DeleteIcon style={{fontSize: '15px' ,color:'22c55e'} }/>  </button>
                <button onClick={() => handleEdit(keys,list.id)}>Edit <EditIcon style={{fontSize: '15px' ,color:'22c55e'} }/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
   
  );
}




