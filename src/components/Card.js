import React from "react";

export default function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);

  return (
    <div className="col-12 col-md-6 col-lg-12 d-flex justify-content-center my-3">
      <div
        className="card mt-3"
        style={{ width: "20rem", maxHeight: "500px", borderRadius: "15px" }}
      >
        <img
          src={props.imgSrc}
          alt="..."
          className="card-img-top"
          style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" ,height:"120"}}
        />
        <div className="card-body">
          <h5 className="card-title">{props.itemsName}</h5>
          <p className="card-text">DATA</p>
          <div className="container w-100">
            <div className="d-flex justify-content-between">
              <select className="m-2 h-100 bg-success rounded">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded">
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-inline mt-2">Price</div>
          </div>
        </div>
      </div>
    </div>
  );
}
