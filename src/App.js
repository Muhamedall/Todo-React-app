import React, { useRef, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Mylist from './FormRedux/Mylist';
import { addItem, resetList, updateItem, deleteItem, editItem, loadData } from './FormRedux/action';
import axios from 'axios';

function App() {
  const listValue = useSelector((state) => state.listValue);
  const editMode = useSelector((state) => state.editMode);
  const editIndex = useSelector((state) => state.editIndex);
  const  refresh=useSelector((state)=>state.refresh);
  
  
  const dispatch = useDispatch();
  const getItem = () => (dispatch) => {
   
    console.log("in getItem");
 axios.get('http://localhost:1337/api/stagaires/?populate=*')
  .then((response) => {
    console.log('API Response:', response.data);
    dispatch(loadData(response.data)); // ==  dispatch({type:"LOAD_DATA",payload:response.data})

  })
  .catch((error) => console.error("Error fetching data:", error));

  }
  const deletItemApi = (index) => (dispatch) => {
    //message confirmation 
    axios.delete(`http://localhost:1337/api/stagaires/${index}`)
      .then((response) => {
        console.log("Axios api delete:", response);
        dispatch({ type: 'REFRESH_DATA' });
        dispatch(deleteItem(index));
      })
      .catch((error) => {
        console.log("Error deleting item via API:", error);
      });
  };
  const AddItemApi = (data) => {
    return (dispatch) => {
      axios
        .post('http://localhost:1337/api/stagaires',{data:data} )
        .then((response) => {
          console.log('Axios API add:', response);
          dispatch(addItem(data));
         
        })
        .catch((error) => {
          console.log('Error adding item via API:', error);
        });
    };
  };
  const UpdatItemApi = (data) => {
    const {Name,Email}=data
    console.log("Test data "+ JSON.stringify(data))
    return   (dispatch) => {
        axios
        .put(`http://localhost:1337/api/stagaires/${data.id}` ,{data: {Name:Name,Email:Email},headers:{'Content-Type':'application/json'}})
        .then((response) => {
          console.log('Axios API update:', response);
          dispatch(updateItem(data));
        })
        .catch((error) => {
          console.log('Error updating item via API:', error);
        });
    };
  };
  
  
    

  useEffect(() => {
    console.log("This refresh :"+refresh)
    if( refresh===true){
      dispatch(getItem());


    }
   
  },[refresh]);

  console.log('Redux State:', listValue);
  const Name = useRef('');
  const Email = useRef('');
  const stgid=useRef()
  const searchInput =useRef();

  const onDelete = (index) => {
     if(window.confirm("Voullez vous vraiment  suprime  "+ index))

    dispatch(deletItemApi(index));
    console.log("is deleted ")
   
  };

  const onEdit = (index) => {
    console.log(listValue[index])
    dispatch(editItem(index));
    const itemToEdit = listValue[index];
    Name.current.value = itemToEdit.attributes.Name;
    Email.current.value = itemToEdit.attributes.Email;
    stgid.current=itemToEdit.id
  };

  const handleUpdate = () => {
    const nameRef = Name.current.value;
    const emailRef = Email.current.value;
    const id = stgid.current;
    
   // if (editMode && (editIndex !== null) && id) {
      
   
      dispatch(UpdatItemApi({ Name: nameRef, Email: emailRef, id: id }))
        Name.current.value = '';
        Email.current.value = '';
      
   // }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameRef = Name.current.value;
    const emailRef = Email.current.value;

    dispatch(AddItemApi({ Name: nameRef, Email: emailRef }));
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
        </div><br></br>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            ref={Email}
          />
        </div><br></br>
        <div className='Buttons_form'>
        <button type="submit" disabled={editMode}>Submit</button>

          <button type="reset" onClick={reset}>Cancel</button>
          <button onClick={handleUpdate} disabled={!editMode}>Update</button>
        </div><br></br>
     
      </form><br></br>

      <Mylist listValue={listValue} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default App;
