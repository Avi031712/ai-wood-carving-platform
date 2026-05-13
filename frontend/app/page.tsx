"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        AI Wood Carving Platform
      </h1>

      <input
        type="file"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />

      {image && (
        <div style={{ marginTop: "30px" }}>
          <img
            src={image}
            alt="preview"
            style={{
              width: "400px",
              borderRadius: "20px",
            }}
          />
        </div>
      )}
    </main>
  );
}