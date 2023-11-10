
import { useRef, useState } from "react"

export default function MyTst(){
const FirstLastName=useRef();
const Email =useRef();
const Pass=useRef();
const Options=useRef();
const AcceptCondition=useRef();
const [error , setError]=useState([])


const displayValue=()=>{
    const FirstLastNameValue=FirstLastName.current.value;
    const EmailValue=Email.current.value;
    const PassValue=Pass.current.value;
    const OptionsValue=Options.current.value;
    const AcceptConditionValue=AcceptCondition.current.checked;
    let isFailed=true;
    
    if(FirstLastNameValue.trim()===''){
      
          document.querySelector("#FirstLastName").style.border = " solid red"
        setError(prevState =>{
            return ([...prevState,'Name is failed'])

        })
    }
    isFailed=false
     
    if(EmailValue.trim()===''){
        console.log("Email is failed")
        document.querySelector("#Email").style.border = " solid red"
        setError(prevState =>{
            return ([...prevState,'Email is failed'])

        })
    }
    else if(!EmailValue.match(/^\S+@\S+\.\S+$/)){
      setError(prevState=>{
        return ([...prevState,'The format email is not valide'])
      })
    }
    isFailed=false
    if(PassValue.trim()===''){
        setError(prevState =>{
            return ([...prevState,'Password is failed'])

        })
        document.querySelector("#pass").style.border = " solid red"
    } 
    isFailed=false
    if(OptionsValue.trim()===''){

        setError(prevState =>{
            return ([...prevState,'Options is failed'])

        })
        document.querySelector("#OptionFiler").style.border = " solid red"
    }
    isFailed=false
    if(!AcceptConditionValue){
        setError(prevState =>{
            return ([...prevState,'Accepte is failed'])

        })
        document.querySelector("#accept").style.accent.color = "  red"
    }
    isFailed=false


}


const handelSubmit=(e)=>{
    setError([])
    e.preventDefault()
    displayValue()


}
   const handelRest=(e)=>{
    e.preventDefault()

   }
    return(

        <>
        
        {
           error.length>0 ? <div><strong>Error</strong>
                <ul>
                    {error.map((err,key) => <li key={key}>{err}</li> )}
                </ul>    </div>   :''
                
                
             }
        <form>
        
            <label>Sisair votre name complet :</label>
            <input type="text" id="FirstLastName" ref={FirstLastName} ></input><br></br>
            <label>Sisair votre email :</label>
            <input type="text" id="Email" ref={Email} ></input><br></br>
            <label>Sisair votre mot de pass :</label>
            <input type="password" id="pass" ref={Pass}></input><br></br>
            <select id="OptionFiler" ref={Options}>
            <option value="">--------choisi----</option>
                <option value="Dev">Developpemrnt</option>
                <option value="Inf">Infrastaure</option>
                <option value="GE">Gestion</option>

            </select><br></br>
            <input type="checkbox" id="accept" ref={AcceptCondition}></input>  Accept your condition<br></br>
            <button onClick={handelSubmit}>Submit</button>  <button onClick={handelRest}>Cancel</button>

        </form>
        
        
        </>
    )
}