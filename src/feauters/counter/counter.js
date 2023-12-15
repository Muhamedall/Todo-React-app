import { useSelector,useDispatch } from "react-redux";
import { increment,
    decrement ,
    incrDecrValue,
    reset,

} from "./counterSlice";
import { useState } from "react";

const Counter =()=>{
    const count = useSelector((state)=>state.counter.count);
    const dispatch =useDispatch();
    const [incrementAmount, setIncrementAmount] = useState(0);
    
    

    const addValue=Number(incrementAmount)||0;
    const resset =()=>{
       setIncrementAmount(0)
        dispatch(reset())
       
    }


    const Ajoute=()=>{
        dispatch(incrDecrValue(addValue))
        setIncrementAmount("")
    }
    
    
    return(
    <>
    <section>
        <div>
            <p>{count}</p>
        </div>
        <div>
       
        <button onClick={()=>dispatch(increment())}>+</button>
        <button onClick={()=>dispatch(decrement())}>-</button>
        </div>
        <input type="text" name="val" onChange={(e)=>(setIncrementAmount(e.target.value))} value={incrementAmount} />
        <button onClick={Ajoute}>Ajoute par value</button>
        <button onClick={resset}>Resset</button>


    </section>
    
    </>
    )

}
export default Counter;