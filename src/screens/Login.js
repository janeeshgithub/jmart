import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [cred, setcred] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (jp) => {
    jp.preventDefault();
    console.log(
      JSON.stringify({
        email: cred.email,
        password: cred.password,
      })
    );
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cred.email,
        password: cred.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("OPEN YOUR EYES AND SEE");
    }
    if (json.success) {
      localStorage.setItem("userEmail", cred.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };
  const onChange = (event) => {
    setcred({ ...cred, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div
        className="container form-container"
        style={{
          backgroundImage:
            "url(https://wallpapers-clan.com/wp-content/uploads/2024/02/spiderman-miles-morales-night-city-desktop-wallpaper-preview.jpg)", // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Ensure the background covers the entire viewport height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label "
              style={{ fontSize: "1.2rem" }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={cred.email}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text text-bg-dark">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ fontSize: "1.2rem" }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={cred.password}
              id="password"
              onChange={onChange}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className="btn btn-success me-5">
              Submit
            </button>
            <Link to="/signup" className="btn btn-danger me-2">
              New User?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
