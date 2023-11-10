import React, { useReducer, useRef } from "react";

// Define action types
const SET_ERRORS = "SET_ERRORS";
const RESET_FORM = "RESET_FORM";

const initialState = {
  name: "",
  email: "",
  message: "",
  acceptAllConditions: false,
  errors: {},
  isFormSent: false,
  isFormValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
        isFormValid: false,
      };
    case RESET_FORM:
      return {
        ...initialState,
        isFormSent: true,
      };
    default:
      return state;
  }
};

export default function FormValidation() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const name = useRef();
  const email = useRef();
  const message = useRef();
  const acceptAllConditions = useRef();

  const validateRequiredElement = (ref) => {
    if (ref.current.value.trim() === "") {
      dispatch({
        type: SET_ERRORS,
        payload: { [ref.current.id]: "field required" },
      });
    }
  };

  const validateForm = () => {
    const emailValue = email.current.value;
    const acceptAllConditionsValue = acceptAllConditions.current.checked;
    let isFormValid = true;

    dispatch({ type: SET_ERRORS, payload: {} });

    validateRequiredElement(name);
    validateRequiredElement(email);

    if (!emailValue.match(/^\S+@\S+\.\S+$/)) {
      dispatch({
        type: SET_ERRORS,
        payload: { email: "Email incorrect" },
      });
      isFormValid = false;
    }

    const minMessageLength = 200;
    const currentMessageLength = message.current.value.length;

    if (currentMessageLength < minMessageLength) {
      dispatch({
        type: SET_ERRORS,
        payload: {
          [message.current.id]: `Message should be greater than ${minMessageLength} (${currentMessageLength}/${minMessageLength})`,
        },
      });
      isFormValid = false;
    }

    if (!acceptAllConditionsValue) {
      dispatch({
        type: SET_ERRORS,
        payload: { [acceptAllConditions.current.id]: "the checkbox must be checked" },
      });
      isFormValid = false;
    }

    dispatch({ type: "SET_IS_FORM_VALID", payload: isFormValid });

    return isFormValid;
  };

  const resetForm = () => {
    name.current.value = "";
    email.current.value = "";
    message.current.value = "";
    acceptAllConditions.current.checked = false;
  };

  const handleChange = () => {
    validateForm();
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch({ type: SET_ERRORS, payload: {} });
    if (validateForm()) {
      dispatch({ type: RESET_FORM });
      resetForm();
    }
  };

  const getError = (fieldName) => {
    return state.errors[fieldName];
  };

  const hasError = (fieldName) => {
    return getError(fieldName) !== undefined;
  };

  const displayError = (ref) => {
    if (ref.current !== undefined) {
      const fieldName = ref.current.id;
      if (hasError(fieldName)) {
        ref.current.style.border = "1px solid red";
        ref.current.style.backgroundColor = "rgba(255,0,0,0.1)";
        return <div className={"text-danger"}>{getError(fieldName)}</div>;
      }
      ref.current.style.border = "1.5px solid green";
      ref.current.style.backgroundColor = "rgba(0,255,0,0.1)";
    }
  };

  const displayErrors = () => {
    return Object.entries(state.errors).map((error, key) => {
      const [field, message] = error;
      return (
        <li key={key}>
          {field} : {message}
        </li>
      );
    });
  };

  return (
    <div className={"container-fluid w-75 mx-auto my-5"}>
      {state.isFormSent ? (
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-3">Message sent successfully !!</h1>
            <p className="lead">Thank you for your message</p>
            <hr className="my-2" />
            <p>More info</p>
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="" role="button">
                Return to the contact page
              </a>
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={submitForm} onChange={handleChange}>
          {Object.keys(state.errors).length > 0 ? (
            <div className="alert alert-danger" role="alert">
              <strong>Errors</strong>
              <ul>{displayErrors()}</ul>
            </div>
          ) : (
            ""
          )}
          <h1>Contact form</h1>
          <hr />
          {/*<-- Name input -->*/}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input type="text" id="name" className="form-control" ref={name} />
            {displayError(name)}
          </div>

          {/*<-- Email input -->*/}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input type="text" id="email" className="form-control" ref={email} />
            {displayError(email)}
          </div>

          {/*<-- Message input -->*/}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="message">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              ref={message}
            ></textarea>
            {displayError(message)}
          </div>

          {/*<-- Checkbox -->*/}
          <div className="form-check mb-4">
            <div className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="acceptAllConditions"
                ref={acceptAllConditions}
              />
              <label className="form-check-label" htmlFor="acceptAllConditions">
                Accept all conditions
              </label>
            </div>

            {displayError(acceptAllConditions)}
          </div>

          {/*<-- Submit -->*/}
          <button
            disabled={!state.isFormValid}
            type="submit"
            className="btn btn-primary w-100 mb-4"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}