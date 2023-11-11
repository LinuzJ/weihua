from ultralytics import YOLO
import json

# Load model
model = YOLO("yolov8n-pose.pt")
video = "./walking.mp4"

# Make generator - evaluates when iterated
results = model(source=video, save=True, conf=0.5, stream=True)  # predict on an image

# Save pose data to json files - one file per frame
i = 0
for r in results:
    with open(f"./poses/{i}.json", "w") as f:
        f.write(r.tojson())
    i += 1
