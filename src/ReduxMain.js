import { counterAction } from "./store/redux";

import { useSelector, useDispatch } from "react-redux";

const ReduxMain = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch(counterAction.increase(5));
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={incrementHandler}>HAHAHHAAHHHAHAHAHHA</button>
    </div>
  );
};

export default ReduxMain;
