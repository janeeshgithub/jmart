import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  const [search, setSearch] = useState("");
  const [itemsCat, setItemsCat] = useState([]);
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    let response = await fetch("http://localhost:5000/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setItems(response[0]);
    setItemsCat(response[1]);
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="container-fluid">
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://wallpapers-clan.com/wp-content/uploads/2024/05/marvel-star-lord-with-quad-blasters-desktop-wallpaper-cover.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(95%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://wallpapers-clan.com/wp-content/uploads/2024/04/marvel-scary-venom-dark-blue-purple-desktop-wallpaper-cover.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(95%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://wallpapers-clan.com/wp-content/uploads/2024/04/marvel-spiderman-night-cityscape-desktop-wallpaper-preview.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(95%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {itemsCat.length > 0
          ? itemsCat.map((data) => (
              <div key={data.id} className="row mb-3">
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {items.length > 0 ? (
                  items
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => (
                      <div
                        key={filterItems._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Card
                          itemsName={filterItems}
                          options={filterItems.options[0]}
                        />
                      </div>
                    ))
                ) : (
                  <div>No Such Data</div>
                )}
              </div>
            ))
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
