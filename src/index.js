import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";

const store = initiateStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (id) => {
    store.dispatch(actions.taskCompleted(id));
  };
  const changeTitle = (id) => {
    store.dispatch(actions.titleChanged(id));
  };
  const removeTask = (id) => {
    store.dispatch(actions.taskRemove(id));
  };

  return (
    <>
      <h1>App</h1>
      <ul>
        {state.length > 0
          ? state.map((el) => (
              <li key={el.id}>
                <p>{el.title}</p>
                <p>{`Completed: ${el.completed}`}</p>
                <button onClick={() => completeTask(el.id)}>Complete</button>
                <button onClick={() => changeTitle(el.id)}>СhangeTitle</button>
                <button onClick={() => removeTask(el.id)}>Delete</button>
                <hr />
              </li>
            ))
          : "Задач нет"}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
