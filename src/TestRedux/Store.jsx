import { createStore } from "redux";

// 1) initialise state 
const initialState={count :0}
// 2)  function Reducer
const reducer =(state=initialState,action)=>{
    switch(action.type){
        case 'INCREMENT':
            return{count:state.count+1}
        case 'DECREMENT' :
            return {count:state.count-1}
            default :
            return state

    }

   

} 


// 3)  create reduce store 

const store =createStore(reducer);