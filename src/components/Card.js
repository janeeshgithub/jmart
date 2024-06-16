import React, { useEffect, useState ,useRef} from "react";
import { useDispatchCart,useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch=useDispatchCart();
  let Cart=useCart();
  const priceRef=useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty,setQty]=useState(1)
  const [size,setSize]=useState("")

  const handleAddToCart = async() => { await dispatch({type:"ADD",id:props.itemsName._id,
    name:props.itemsName,price:Price,qty:qty,size:size})
  await console.log(Cart)};
  let Price=qty * parseInt(options[size]);
  useEffect(() => { 
    setSize(priceRef.current.value)
  },[])

  return (
    <div className="col-12 col-md-6 col-lg-12 d-flex justify-content-center my-3">
      <div
        className="card mt-3"
        style={{ width: "20rem", maxHeight: "500px", borderRadius: "15px" }}
      >
        <img
          src={props.itemsName.img}
          alt="..."
          className="card-img-top"
          style={{
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            height: "120",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.itemsName.name}</h5>
          <p className="card-text">{props.itemsName.description}</p>
          <div className="container w-100">
            <div className="d-flex justify-content-between">
              <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) =>
              setSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-inline mt-2">${Price}/-</div>
          </div>
          <hr></hr>
          <button
            className={`btn btn-success justify-center ms-2`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
