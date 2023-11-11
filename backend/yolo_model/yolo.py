import numpy as np
from ultralytics import YOLO

model = YOLO("yolov8n-pose.pt")


def inference(input):
    results_generator = model(source=input, conf=0.5, stream=True)
    res = []
    for frame in results_generator:
        frame.orig_img = np.asarray([])  # don't send back whole image

        # below copied from source code of ultralytics
        results = []
        data = frame.boxes.data.cpu().tolist()
        h, w = (1, 1)
        for i, row in enumerate(data):  # xyxy, track_id if tracking, conf, class_id
            box = {'x1': row[0] / w, 'y1': row[1] / h, 'x2': row[2] / w, 'y2': row[3] / h}
            conf = row[-2]
            class_id = int(row[-1])
            name = frame.names[class_id]
            result = {'name': name, 'class': class_id, 'confidence': conf, 'box': box}
            if frame.boxes.is_track:
                result['track_id'] = int(row[-3])  # track ID
            if frame.masks:
                x, y = frame.masks.xy[i][:, 0], frame.masks.xy[i][:, 1]  # numpy array
                result['segments'] = {'x': (x / w).tolist(), 'y': (y / h).tolist()}
            if frame.keypoints is not None:
                x, y, visible = frame.keypoints[i].data[0].cpu().unbind(dim=1)  # torch Tensor
                result['keypoints'] = {'x': (x / w).tolist(), 'y': (y / h).tolist(), 'visible': visible.tolist()}
            results.append(result)

        res.append(results)
    return res
