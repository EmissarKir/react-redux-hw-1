import { TASK_UPDATED, TASK_DELETED } from "./actionTypes";

export function taskReducer(state = [], action) {
  switch (action.type) {
    case TASK_UPDATED:
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (item) => item.id === action.payload.id
      );
      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
      return newArray;
    case TASK_DELETED:
      console.log("payload", action);
      const newArr = [...state];
      const arr = newArr.filter((item) => item.id !== action.payload.id);
      return arr;
    default:
      return state;
  }
}
