import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const data = useCart(); // Assuming this fetches current cart items

  // Options from props
  const options = props.options;
  const priceOptions = Object.keys(options);

  // Calculate price based on quantity and selected size
  const Price = qty * parseInt(options[size] || 0);

  // Function to handle adding item to cart
  const handleAddToCart = async () => {
    let items = data.find(
      (item) => item.id === props.itemsName._id && item.size === size
    );

    if (items) {
      // If item exists with the same id and size, update it
      await dispatch({
        type: "UPDATE",
        id: props.itemsName._id,
        name: props.itemsName.name,
        price: Price,
        qty: qty,
      });
    } else {
      // If item does not exist with the same id and size, add it
      await dispatch({
        type: "ADD",
        id: props.itemsName._id,
        name: props.itemsName.name,
        price: Price,
        qty: qty,
        size: size,
      });
    }
  };

  // Effect to initialize size state with the initial value from priceRef
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="col-12 col-md-6 col-lg-12 d-flex justify-content-center my-3">
      <div
        className="card mt-3"
        style={{ width: "20rem", maxHeight: "500px", borderRadius: "15px" }}
      >
        <img
          src={
            props.itemsName.img ||"https://janeesh.me/assets/me-D54fZ-Xy.png"
            
          }
          alt="..."
          className="card-img-top"
          style={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            height: "120px",
            objectFit:"cover",
            width:"100" // Add "px" for height value
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.itemsName.name}</h5>
          <p className="card-text">{props.description}</p>
          <div className="container w-100">
            <div className="d-flex justify-content-between">
              <select
                className="m-2 h-100 bg-success rounded"
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value))}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                className="m-2 h-100 bg-success rounded"
                ref={priceRef}
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-inline mt-2">₹{Price}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
