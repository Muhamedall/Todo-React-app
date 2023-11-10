const types ={
    Add:"INCREMENT",
    Dec:"DECREMENT",
    AddAction:"ADD_ACTION",
    Remove:"REMOVE_ACTION",



}

const increment ={type:types.Add};
const decrement ={type:types.Dec};
const addaction={type:types.AddAction,payload:"Buy"}
const removeaction={type:types.Remove,id:1};