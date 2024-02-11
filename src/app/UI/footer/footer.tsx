import Link from "next/link";

const Footer = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "#2e2828",
        padding: "20px",
        textAlign: "center",
        width: "100%",
      }}
    >
      <p style={{ color: "white" }}>
        powered by{" "}
        <Link style={{ textDecoration: "none", color: "white" }} href="https://polygon.io/">
          Polygon.io
        </Link>
      </p>
    </div>
  );
};

export default Footer;
