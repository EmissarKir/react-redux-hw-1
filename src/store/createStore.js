export function createStore(reducer, initialState) {
  let state = initialState;
  // массив слушателей
  let listeners = [];

  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listner = listeners[i];
      listner();
    }
  }
  // функция которая будет добавлять новых слушаталей, которым необходимо получать обновления
  function subscribe(listner) {
    listeners.push(listner);
  }
  return { getState, dispatch, subscribe };
}
