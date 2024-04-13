// react hook
import { useEffect } from "react";

// react router
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Navbar from "./nabar";

// render error page
export function Error() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "15%" }}>
        <h1 style={{ fontWeight: "900" }}>404 - PAGE NOT FOUND</h1>
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unvailable.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Go back to Home Page
          </Button>
        </Link>
      </div>
    </>
  );
}
