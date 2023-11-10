import React, { useRef, useState } from 'react';
import List from './List';

function App() {
  const [listValue, setListValue] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const Name = useRef('');
  const Email = useRef('');

  const onDelet = (index) => {
    const updatedDelet = listValue.filter((item, itemIndex) => itemIndex !== index);
    setListValue(updatedDelet);
  };

  const onEdit = (index) => {
    setEditMode(true);
    setEditIndex(index);
    const itemToEdit = listValue[index];
    Name.current.value = itemToEdit.Name;
    Email.current.value = itemToEdit.Email;
  };

  const handelUpdate = () => {
    const Nameref = Name.current.value;
    const EmailRef = Email.current.value;

    // Check if an item is being edited
    if (editMode && editIndex !== null) {
      const updatedList = [...listValue];
      updatedList[editIndex] = { Name: Nameref, Email: EmailRef };
      setListValue(updatedList);
      setEditMode(false);
      setEditIndex(null);
      Name.current.value = ''; // Clear the input fields
      Email.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Nameref = Name.current.value;
    const EmailRef = Email.current.value;

 
      
      setListValue([...listValue, { Name: Nameref, Email: EmailRef }]);
      Name.current.value = ''; // Clear the input fields
      Email.current.value = '';
  
  };

  const reset = (e) => {
    Name.current.value = ''; // Clear the input fields
      Email.current.value = '';
    e.preventDefault();
    setListValue([]);
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
          <button type="submit">submit</button>
          <button type="reset" onClick={reset}>Cancel</button>
          <button onClick={handelUpdate} disabled={!editMode}>Update</button>
        </div>
      </form>
      <List listValue={listValue} onDelet={onDelet} onEdit={onEdit} />
    </div>
  );
}

export default App;
