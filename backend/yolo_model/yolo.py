from ultralytics import YOLO

model = YOLO("yolov8n-pose.pt")


def inference(input):
    results_generator = model(source=input, conf=0.5, stream=True)
    res = []
    for frame in results_generator:
        frame.orig_img = None  # don't send back whole image
        res.append(frame.numpy())
    return res
