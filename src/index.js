import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

import {
  titleChanged,
  taskRemove,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  taskCreate,
} from "./store/task";
import configureStore from "./store/store";
import { getError } from "./store/errors";

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (id) => {
    dispatch(titleChanged(id));
  };
  const removeTask = (id) => {
    dispatch(taskRemove(id));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <h1>App</h1>
      <ul>
        {state.length > 0
          ? state.map((el) => (
              <li key={el.id}>
                <p>{el.title}</p>
                <p>{`Completed: ${el.completed}`}</p>
                <button onClick={() => dispatch(completeTask(el.id))}>
                  Complete
                </button>
                <button onClick={() => changeTitle(el.id)}>СhangeTitle</button>
                <button onClick={() => removeTask(el.id)}>Delete</button>
                <button
                  onClick={() =>
                    dispatch(
                      taskCreate({
                        title: `asasdasddsa`,
                        completed: false,
                        userId: 1,
                      })
                    )
                  }
                >
                  New task
                </button>
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
