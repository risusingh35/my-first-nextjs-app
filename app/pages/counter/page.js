"use client";

import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/app/store/Feature/counter/counterSlice";

export default function Counter() {
  // useSelector gets the state from store
  const count = useSelector((state) => state.counter.value); // Access the counter state

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center p-28 h-full bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Counter: {count}</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => dispatch(increment())}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Increment
          </button>
          <button
            onClick={() => dispatch(decrement())}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}
