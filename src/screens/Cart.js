import React, { useEffect } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    try {
      const response = await fetch("http://localhost:5000/api/auth/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      console.log("JSON RESPONSE:::::", response.status);
      if (response.status === 200) {
        dispatch({ type: "DROP" });
      } else {
        // handle server errors
        console.error("Failed to checkout:", response.status);
      }
    } catch (error) {
      // handle network errors
      console.error("Checkout error:", error);
    }
  };

  const totalPrice = data.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.size}</td>
                <td>{item.price}</td>
                <td>
                  <button type="button" className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index })}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
