//store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  listValue: [],
  editMode: false,
  editIndex: null,
  refresh: true,
  isloading:true
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        //listValue: Array.isArray(state.listValue) ? [...state.listValue, action.payload] : [action.payload],
    refresh:true,
    isloading:true

      };
    case 'DELETE_ITEM':
      return {
        ...state,
        listValue: state.listValue.filter((item, index) => index !== action.payload),
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        editMode: true,
        editIndex: action.payload,
      };
    case 'UPDATE_ITEM':
      

      
      return {
        ...state,
        
        editMode: false,
        editIndex: null,
        refresh:true,
        isloading:true
       
      };
    case 'RESET_LIST':
      return {
        ...state,
        listValue: [],
      };
      case 'LOAD_DATA':
        console.log("list is:"+ Object.keys(action.payload.data) )
        
  return {
    ...state,

    listValue:[...action.payload.data],
    refresh:false,
    isloading:false,

  
    
    
  };
 case 'REFRESH_DATA':
   return{
    ...state,
    refresh:true
   };

   case 'SEARCH':
    return{
      ...state,
      listValue:state.listValue.filter((item)=>item.attributes.Name.toLowerCase().includes(action.payload.toLowerCase()))
    }
  

    default:
      return state;
  }
};

const store = createStore(rootReducer, applyMiddleware(thunk));


export default store;






