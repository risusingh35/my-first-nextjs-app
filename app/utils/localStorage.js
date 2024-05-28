// utils/localStorage.js
export const loadState = () => {
    try {
      if (typeof window !== 'undefined') {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
          return undefined;
        }
        return JSON.parse(serializedState);
      }
      return undefined;
    } catch (err) {
      console.error("Error loading state from local storage:", err);
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      if (typeof window !== 'undefined') {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
      }
    } catch (err) {
      console.error("Error saving state to local storage:", err);
    }
  };
  