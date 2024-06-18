import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [cred, setcred] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cred.name,
        email: cred.email,
        password: cred.password,
        location: cred.location,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Error: User creation failed");
    } else {
      window.location.href = "/login";
    }
  };

  const onChange = (event) => {
    setcred({ ...cred, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div
        className="container"
        style={{
          backgroundImage: `url('https://wallpapers-clan.com/wp-content/uploads/2023/11/marvel-iron-man-in-destroyed-suit-desktop-wallpaper-preview.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ padding: "20px", borderRadius: "10px" }}
        >
          <h1>&nbsp;JMART &nbsp;Icons&nbsp;</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={cred.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
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
            <div id="emailHelp" className="form-text">
              Never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={cred.password}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={cred.location}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
}
