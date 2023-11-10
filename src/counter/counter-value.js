import React from "react";
import store from '../Redux/myindextwo'
import { useSelector } from "react-redux";

const CounterValue = () => {
  const count = useSelector(store => store.count);
  console.log("store obj "+store.getState())
  return <div className="counter-value">{count}</div>;
};

export default CounterValue;
