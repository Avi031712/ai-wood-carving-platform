import numpy as np
from PIL import Image, ImageFilter, ImageEnhance
import trimesh


def load_heightmap(image_path):

    image = Image.open(image_path).convert("L")

    # Increase resolution
    image = image.resize((200, 200))

    # Sharpen image
    image = image.filter(ImageFilter.SHARPEN)

    # Increase contrast
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(2.5)

    # Convert to numpy
    data = np.array(image) / 255.0

    # Smooth depth map
    data = np.clip(data, 0, 1)

    return data


def create_mesh(heightmap):

    rows, cols = heightmap.shape

    vertices = []
    faces = []

    depth_strength = 40

    # Create vertices
    for y in range(rows):
        for x in range(cols):

            z = heightmap[y][x] * depth_strength

            vertices.append([
                (x - cols / 2) * 0.12,
                -(y - rows / 2) * 0.12,
                z
            ])

    # Create faces
    for y in range(rows - 1):
        for x in range(cols - 1):

            i = y * cols + x

            faces.append([i, i + 1, i + cols])
            faces.append([i + 1, i + cols + 1, i + cols])

    mesh = trimesh.Trimesh(
        vertices=np.array(vertices),
        faces=np.array(faces)
    )

    return mesh


def create_stl_from_heightmap(image_path, output_path):

    mesh = create_mesh(load_heightmap(image_path))
    mesh.export(output_path)


def create_obj_from_heightmap(image_path, output_path):

    mesh = create_mesh(load_heightmap(image_path))
    mesh.export(output_path)


def create_gltf_from_heightmap(image_path, output_path):

    mesh = create_mesh(load_heightmap(image_path))

    # Add scene
    scene = trimesh.Scene()

    scene.add_geometry(mesh)

    export = scene.export(file_type="glb")

    with open(output_path, "wb") as f:
        f.write(export)