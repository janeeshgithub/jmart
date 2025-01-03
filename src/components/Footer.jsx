import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-black">
        <div className="col-md-4 d-flex align-items-center">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img
              src="data:image/png;base64,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"
              alt="logo"
              className="me-2 w-25"
            />
          </Link>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <span className="mx-2">
            © 2024 Jmart Icons, Inc. All rights reserved.
          </span>
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          <a
            href="https://www.janeesh.me"
            className="me-3 text-body-secondary text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Me
          </a>
        </div>
      </footer>
    </div>
  );
}
