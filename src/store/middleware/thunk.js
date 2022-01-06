export function thunk({ dispatch, getState }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if (typeof action === "function") {
        action(dispatch, getState);
        console.log("function");
      } else {
        return next(action);
      }
    };
  };
}
