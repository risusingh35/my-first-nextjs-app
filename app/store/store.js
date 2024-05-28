// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/app/store/Feature/counter/counterSlice";
import { loadState, saveState } from '@/app/utils/localStorage';

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
