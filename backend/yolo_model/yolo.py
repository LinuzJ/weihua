import numpy as np
from ultralytics import YOLO

model = YOLO("yolov8n-pose.pt")


def inference(input):
    results_generator = model(source=input, conf=0.5, stream=True)
    res = []
    for frame in results_generator:
        # frame.orig_img = np.asarray([])  # don't send back whole image
        res.append(frame.cpu().numpy())
    return res
