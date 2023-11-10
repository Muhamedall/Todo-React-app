import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Mylist from './FormRedux/Mylist';
import { addItem, resetList, updateItem, deleteItem, editItem, loadData } from './FormRedux/action';
import axios from 'axios';

function App() {
  const listValue = useSelector((state) => state.listValue);
  const editMode = useSelector((state) => state.editMode);
  const editIndex = useSelector((state) => state.editIndex);
  const  refresh=useSelector((state)=>state.refresh)

  const dispatch = useDispatch();
  const getItem = () => (dispatch) => {
   
    console.log("in getItem");
 axios.get('http://localhost:1337/api/stagaires')
  .then((response) => {
    console.log('API Response:', response.data);
    dispatch(loadData(response.data)); // ==  dispatch({type:"LOAD_DATA",payload:response.data})
    
  })
  .catch((error) => console.error("Error fetching data:", error));

  }
  const deletItemApi =(  index)=>(dispatch)=>{
    axios.delete('http://localhost:1337/api/stagaires/'+ index)
  .then((response)=>{
    dispatch({type:'REFRESH_DATA'})

  })
  .catch((error)=>{


  })


  }
    
  
  
    

    
  


  
  

  

  useEffect(() => {
    if( refresh===true){
      dispatch(getItem());

    }
   
  },[refresh]);

  console.log('Redux State:', listValue);
  const Name = useRef('');
  const Email = useRef('');

  const onDelete = (index) => {
    dispatch(deletItemApi(index));
  };

  const onEdit = (index) => {
    dispatch(editItem(index));
    const itemToEdit = listValue[index];
    Name.current.value = itemToEdit.Name;
    Email.current.value = itemToEdit.Email;
  };

  const handleUpdate = () => {
    const nameRef = Name.current.value;
    const emailRef = Email.current.value;

    if (editMode && editIndex !== null) {
      dispatch(updateItem({ Name: nameRef, Email: emailRef }));
      Name.current.value = '';
      Email.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameRef = Name.current.value;
    const emailRef = Email.current.value;

    dispatch(addItem({ Name: nameRef, Email: emailRef }));
    Name.current.value = '';
    Email.current.value = '';
  };

  const reset = (e) => {
    Name.current.value = '';
    Email.current.value = '';
    e.preventDefault();
    dispatch(resetList());
  };
console.log("this list :" +listValue)
  return (

    <div>
      <h1>Hello World</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            ref={Name}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            ref={Email}
          />
        </div>
        <div>
        <button type="submit" disabled={editMode}>Submit</button>

          <button type="reset" onClick={reset}>Cancel</button>
          <button onClick={handleUpdate} disabled={!editMode}>Update</button>
        </div>
      </form>

      <Mylist listValue={listValue} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default App;