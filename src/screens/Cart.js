import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data.length === 0) {
    return (
      <div
        style={{
          backgroundImage: `url('https://wallpapers-clan.com/wp-content/uploads/2024/02/aesthetic-spiderman-logo-desktop-wallpaper-preview.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          textAlign: "center",
          color: "white",
          fontSize: "2rem",
        }}
      >
        The Cart is Empty!
      </div>
    );
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:5000/api/OrderData", {
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

      if (response.status === 200) {
        dispatch({ type: "DROP" });
        setSuccess(true);
      } else {
        setError("Failed to complete the checkout. Please try again.");
      }
    } catch (error) {
      setError("Checkout error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = data.reduce((total, item) => total + item.price, 0);

  return (
    <div
      style={{
        backgroundImage: `url('https://wallpapers-clan.com/wp-content/uploads/2023/11/dc-comics-batman-bats-dark-red-desktop-wallpaper-cover.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md"
        style={{
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <table className="table table-hover">
          <thead
            className="text-success fs-4"
            style={{ color: "red", fontSize: "1.25rem" }}
          >
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
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => dispatch({ type: "REMOVE", index })}
                    style={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{ marginTop: "20px", fontSize: "1.5rem", fontWeight: "bold" }}
        >
          <h1>Total Price: {totalPrice}/-</h1>
        </div>
        {error && (
          <div
            className="alert alert-danger mt-3"
            role="alert"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="alert alert-success mt-3"
            role="alert"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            Checkout completed successfully!
          </div>
        )}
        <div
          className="checkout-button-container"
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            className="btn checkout-btn"
            onClick={handleCheckOut}
            disabled={loading}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px 20px",
              fontSize: "1.25rem",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Processing..." : "Check Out"}
          </button>
        </div>
      </div>
    </div>
  );
}
