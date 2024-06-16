import React, { createContext, useContext, useReducer } from "react";

// Create context for state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to manage cart state
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE":
      return state.filter((item, index) => index !== action.index);

    case "UPDATE":
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            qty: parseInt(action.qty) + item.qty,
            price: action.price + item.price,
          };
        }
        return item;
      });
    case "DROP":
      return [];

    default:
      console.log("Error in Reducer");
      return state;
  }
};

// CartProvider component to provide state and dispatch
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks to use the cart state and dispatch function
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
