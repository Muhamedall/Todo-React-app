/* App.js
//partie vues 
import React, { useRef ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Mylist from './Form&redux/Mylist'

import { addItem, resetList, updateItem, deleteItem, editItem ,fetchStagaires} from './Form&redux/action';


function App() {
  //useSelector=====> recupere the valeur 
  const listValue = useSelector((state) => state.listValue);
  const editMode = useSelector((state) => state.editMode);
  const editIndex = useSelector((state) => state.editIndex);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStagaires());
  }, [dispatch]);


  const Name = useRef('');
  const Email = useRef('');

  const onDelet = (index) => {
    dispatch(deleteItem(index));
  };

  const onEdit = (index) => {
    dispatch(editItem(index));
    const itemToEdit = listValue[index];
    Name.current.value = itemToEdit.Name;
    Email.current.value = itemToEdit.Email;
  };

  const handelUpdate = () => {
    const Nameref = Name.current.value;
    const EmailRef = Email.current.value;

    if (editMode && editIndex !== null) {
      dispatch(updateItem({ Name: Nameref, Email: EmailRef }));
      Name.current.value = '';
      Email.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Nameref = Name.current.value;
    const EmailRef = Email.current.value;
  

    dispatch(addItem({ Name: Nameref, Email: EmailRef }));
    //addItem() ====> retourne action 
    Name.current.value = '';
    
    Email.current.value = '';
  };

  const reset = (e) => {
    Name.current.value = '';
    Email.current.value = '';
    e.preventDefault();
    dispatch(resetList());
  };

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
          <button type="submit">Submit</button>
          <button type="reset" onClick={reset}>Cancel</button>
          <button onClick={handelUpdate} disabled={!editMode}>Update</button>
        </div>
      </form>
      
      <Mylist listValue={listValue} onDelet={onDelet} onEdit={onEdit} />

    </div>
  );
}

export default App;

// actions.js
import axios from 'axios';
export const addItem = (item) => {
  return { type: 'ADD_ITEM', payload: item };
};


export const deleteItem = (index) => {
  return { type: 'DELETE_ITEM', payload: index };
};

export const editItem = (index) => {
  return { type: 'EDIT_ITEM', payload: index };
};

export const updateItem = (item) => {
  return { type: 'UPDATE_ITEM', payload: item };
};

export const resetList = () => {
  return { type: 'RESET_LIST' };
};
// actions.js
 // You may need to install axios

export const fetchStagaires = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:1337/api/stagaires');
      const stagaires = response.data.data.map((stagaire) => ({
        Name: stagaire.attributes.FirstName,
        Email: stagaire.attributes.LastName,
      }));
      dispatch({ type: 'FETCH_STAGAIRES', payload: stagaires });
    } catch (error) {
      console.error('Error fetching stagaires:', error);
    }
  };
};

//Mulist.js
export default function List({ listValue, onDelet, onEdit }) {
    const handelDelet = (index) => {
      onDelet(index);
    };
  
    const handelEdit = (idx) => {
      onEdit(idx);
    };
  
    if (!listValue || listValue.length === 0) {
      return <div>No items to display.</div>;
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
                <td>{list.Email}</td>
                <td>{list.Name}</td>
                <td>
                  <button onClick={() => handelDelet(keys)}>Delete</button>
                  <button onClick={() => handelEdit(keys)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  
  //Mulist.js
export default function List({ listValue, onDelet, onEdit }) {
    const handelDelet = (index) => {
      onDelet(index);
    };
  
    const handelEdit = (idx) => {
      onEdit(idx);
    };
  
    if (!listValue || listValue.length === 0) {
      return <div>No items to display.</div>;
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
                <td>{list.Email}</td>
                <td>{list.Name}</td>
                <td>
                  <button onClick={() => handelDelet(keys)}>Delete</button>
                  <button onClick={() => handelEdit(keys)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  







*/
