import React, { useRef, useReducer } from "react";

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
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "UPDATE_ERRORS":
      return { ...state, errors: { ...state.errors, ...action.errors } };
    case "RESET_FORM":
      return initialState;
    case "SET_IS_FORM_VALID":
      return { ...state, isFormValid: action.value };
    case "SET_IS_FORM_SENT":
      return { ...state, isFormSent: action.value };
    default:
      return state;
  }
};

export default function FormValidation() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value: type === "checkbox" ? checked : value });
  };

  const validateRequiredElement = (field, value) => {
    if (value.trim() === "") {
      dispatch({
        type: "UPDATE_ERRORS",
        errors: { [field]: "Field required" },
      });
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const { email, acceptAllConditions, name, message } = state;
    const errors = {};

    const isNameValid = validateRequiredElement("name", name);
    const isEmailValid = validateRequiredElement("email", email);

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = "Email incorrect";
      isEmailValid = false;
    }

    const minMessageLength = 200;
    if (message.length < minMessageLength) {
      errors.message = `Message should be greater than ${minMessageLength} (${message.length}/${minMessageLength})`;
      isEmailValid = false;
    }

    if (!acceptAllConditions) {
      errors.acceptAllConditions = "The checkbox must be checked";
      isEmailValid = false;
    }

    dispatch({ type: "UPDATE_ERRORS", errors });
    const isFormValid = isNameValid && isEmailValid;
    dispatch({ type: "SET_IS_FORM_VALID", value: isFormValid });
    return isFormValid;
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_IS_FORM_SENT", value: false });
    if (validateForm()) {
      dispatch({ type: "SET_IS_FORM_SENT", value: true });
      resetForm();
    }
  };

  const getError = (fieldName) => {
    return state.errors[fieldName];
  };

  const hasError = (fieldName) => {
    return getError(fieldName) !== undefined;
  };

  const displayError = (field) => {
    if (hasError(field)) {
      return (
        <div className={"text-danger"}>
          {getError(field)}
        </div>
      );
    }
    return null;
  };

  const displayErrors = () => {
    return Object.entries(state.errors).map(([field, message], key) => (
      <li key={key}>
        {field} : {message}
      </li>
    ));
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
              <a className="btn btn-primary btn-lg" href="" role="button">Return to contact page</a>
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={submitForm} onChange={handleChange}>
          {Object.keys(state.errors).length > 0 ? (
            <div className="alert alert-danger" role="alert">
              <strong>Errors</strong>
              <ul>
                {displayErrors()}
              </ul>
            </div>
          ) : (
            ""
          )}
          <h1>Contact form</h1>
          <hr />
          {/*<-- Name input -->*/}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="name">Name</label>
            <input type="text" id="name" name="name" className="form-control" value={state.name} onChange={handleChange} />
            {displayError("name")}
          </div>

          {/*<-- Email input -->*/}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">Email address</label>
            <input type="text" id="email" name="email" className="form-control" value={state.email} onChange={handleChange} />
            {displayError("email")}
          </div>

          {/*<-- Message input -->*/}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="message">Message</label>
            <textarea id="message" name="message" className="form-control" rows="4" value={state.message} onChange={handleChange} />
            {displayError("message")}
          </div>

          {/*<-- Checkbox -->*/}
          <div className="form-check mb-4">
            <div className="d-flex">
              <input
                className
