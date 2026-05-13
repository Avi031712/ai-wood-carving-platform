"use client";

import { useState } from "react";
import ModelViewer from "./components/ModelViewer";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #0f172a, #111827, #1e293b)",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          AI Wood Carving Platform
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: "40px",
            fontSize: "18px",
          }}
        >
          Upload an image and generate a 3D wood carving model instantly.
        </p>

        {/* Upload Card */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "20px",
            marginBottom: "30px",
            boxShadow: "0 0 20px rgba(0,0,0,0.3)",
          }}
        >
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
            style={{
              marginBottom: "20px",
              color: "white",
            }}
          />

          <br />

          <button
            onClick={uploadImage}
            disabled={loading}
            style={{
              background: "#f59e0b",
              color: "black",
              border: "none",
              padding: "14px 30px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {loading ? "Processing..." : "Upload & Generate"}
          </button>
        </div>

        {/* Output */}
        {result && (
          <div>
            <h2
              style={{
                marginBottom: "20px",
                fontSize: "32px",
              }}
            >
              Generated Results
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "30px",
              }}
            >
              {/* Images */}
              <div
                style={{
                  background: "#1e293b",
                  padding: "20px",
                  borderRadius: "20px",
                }}
              >
                <h3>Background Removed</h3>

                <img
                  src={`http://127.0.0.1:8000/${result.cleaned_image}`}
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    marginTop: "10px",
                  }}
                />

                <h3 style={{ marginTop: "30px" }}>Grayscale Image</h3>

                <img
                  src={`http://127.0.0.1:8000/${result.grayscale_image}`}
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    marginTop: "10px",
                  }}
                />
              </div>

              {/* 3D Preview */}
              <div
                style={{
                  background: "#1e293b",
                  padding: "20px",
                  borderRadius: "20px",
                }}
              >
                <h3>3D Model Preview</h3>

                <ModelViewer
                  modelUrl={`http://127.0.0.1:8000/${result.gltf_file}`}
                />

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    marginTop: "20px",
                  }}
                >
                  <a
                    href={`http://127.0.0.1:8000/${result.stl_file}`}
                    download
                    style={{
                      background: "#10b981",
                      color: "white",
                      padding: "12px 20px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Download STL
                  </a>

                  <a
                    href={`http://127.0.0.1:8000/${result.obj_file}`}
                    download
                    style={{
                      background: "#3b82f6",
                      color: "white",
                      padding: "12px 20px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Download OBJ
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}