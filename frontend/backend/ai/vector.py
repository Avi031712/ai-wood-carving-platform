import cv2


def create_vector_outline(input_path, output_path):

    image = cv2.imread(input_path)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    edges = cv2.Canny(gray, 100, 200)

    cv2.imwrite(output_path, edges)

    return output_path