from rembg import remove
from PIL import Image


def remove_background(input_path, output_path):

    input_image = Image.open(input_path)

    output = remove(input_image)

    output.save(output_path)

    return output_path


def convert_to_grayscale(input_path, output_path):

    image = Image.open(input_path)

    grayscale = image.convert("L")

    grayscale.save(output_path)

    return output_path