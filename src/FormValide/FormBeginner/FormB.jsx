import {useReducer, useRef } from "react";
const Myreducer =(stateReducer ,action )=>{
    switch(action.type){
        case "ADD_ERROR":
            return [...stateReducer ,[action.payload]]
       case "CLEAR_ERROR":
        return []
        default:
            stateReducer;
            

    }
    
}
const [statdis,dispatch]=useReducer(Myreducer,[]);

export default function FormValidationBeginner() {

    const nameField = useRef()
    const emailField = useRef()
    const messageField = useRef()
    const countryField = useRef()
    const acceptConditionsField = useRef()
    
    
    const validateForm = () => {
        const nameValue = nameField.current.value
        const emailValue = emailField.current.value
        const messageValue = messageField.current.value
        const countryValue = countryField.current.value
        const acceptConditionsValue = acceptConditionsField.current.checked
        let isFormValid = true

        if(nameValue.trim() === '') {
            nameField.current.style.border=" 1px solid red"
            dispatch({
                type:"ADD_ERROR",payload:"Hahah Namee is failed"

            })

          


         
            isFormValid = false
        }

        if(emailValue.trim() === '') {
            emailField.current.style.border=" 1px solid red"
          
            dispatch({
                type:"ADD_ERROR",payload:"Hahah Email is failed"

            })

            isFormValid = false
        } else if(!emailValue.match(/^\S+@\S+\.\S+$/)) {
           
            dispatch({
                type:"ADD_ERROR",payload:"HHHHH forma not avaible"

            })

           
            isFormValid = false
        }

        if(messageValue.trim() === ' ') {
            messageField.current.style.border=" solid red"
            dispatch({
                type:"ADD_ERROR",payload:"HahahHHH maseage error"

            })

            isFormValid = false
        }
      

        if(countryValue.trim() === '') {
            countryField.current.style.border=" 1px solid red"
            dispatch({
                type:"ADD_ERROR",payload:"Hahah country is failed"

            })

            isFormValid = false
        }

        if(!acceptConditionsValue) {
            acceptConditionsField.current.style.border=" 1px solid red"
            dispatch({
                type:"ADD_ERROR",payload:"Hahah condition is failed"

            })

            isFormValid = false
        }

        return isFormValid
    }

    const handleSubmit = (e) => {
      dispatch([])
        if(!validateForm()) {
            e.preventDefault()
        }

    }
   
    return <div className={'container-fluid w-75 mx-auto my-5'}>

        {statdis.length > 0 ?
            <div className="alert alert-danger" role="alert">
                <strong>Error</strong>
                <ul>
                    {statdis.map((error,key) => <li key={key}>{error}</li> )}
                </ul>
            </div>
            :''
        }
        <form onSubmit={handleSubmit}>
            <h1>Contact form</h1>
            <hr/>
            {/*<-- Name input -->*/}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" ref={nameField}/>
            </div>

            {/*<-- Email input -->*/}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">Email address</label>
                <input type="text" id="email" className="form-control" ref={emailField}/>
            </div>

            {/*<-- Message input -->*/}
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea className="form-control" id="message" rows="4" ref={messageField}></textarea>
            </div>

            {/*<-- Country select -->*/}
            <div className="form-group mb-4">
                <label>Country</label>
                <label htmlFor="country"></label>
                <select className="form-control" id="country" ref={countryField}>
                    <option value=''>Select country</option>
                    <option value='MA'>Maroc</option>
                    <option value='DZ'>Algérie</option>
                    <option value='TN'>Tunisie</option>
                </select>
            </div>

            {/*<-- Checkbox -->*/}
            <div className="form-check mb-4">
                <div className="d-flex">
                    <input className="form-check-input me-2" type="checkbox" id="acceptAllConditions" ref={acceptConditionsField}/>
                    <label className="form-check-label" htmlFor="acceptAllConditions">
                        Accept all conditions
                    </label>
                </div>
            </div>

            {/*<-- Submit -->*/}
            <button type="submit" className="btn btn-primary w-100 mb-4" >Submit</button>
        </form>
    </div>
}
