from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import shutil
import os

from ai.enhance import remove_background
from ai.grayscale import convert_to_grayscale
from ai.stl_generator import create_stl_from_heightmap

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create folders
os.makedirs("uploads", exist_ok=True)
os.makedirs("outputs", exist_ok=True)

# Serve static files
app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.get("/")
def home():
    return {"message": "AI Wood Carving Backend Running"}


@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):

    # Save uploaded file
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Background removed image
    cleaned_output = f"outputs/cleaned_{file.filename.split('.')[0]}.png"
    remove_background(file_path, cleaned_output)

    # Grayscale image
    grayscale_output = f"outputs/grayscale_{file.filename.split('.')[0]}.png"
    convert_to_grayscale(cleaned_output, grayscale_output)

    # STL file
    stl_output = f"outputs/model_{file.filename.split('.')[0]}.stl"
    create_stl_from_heightmap(grayscale_output, stl_output)

    return {
        "cleaned_image": cleaned_output,
        "grayscale_image": grayscale_output,
        "stl_file": stl_output
    }