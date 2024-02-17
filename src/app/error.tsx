"use client";

import { Button, Link } from "@mui/material";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.log(error.message);
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div>
        <p>There was a problem</p>
        <h1>Something went wrong</h1>
        <p>Please try again later...</p>
        <Button onClick={reset}>Try again</Button>
        <Link style={{ textDecoration: "none", color: "black", display: "block", marginTop: "10px" }} href="/">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default error;
