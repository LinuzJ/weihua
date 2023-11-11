# YOLO

Play around with the model:
```bash
export IMAGE_NAME='yolo'
docker build . -t ${IMAGE_NAME}
docker run -it --name yolo --mount type=bind,source=$(pwd),target=/yolo ${IMAGE_NAME}
```

Inside docker:
```bash
cd /yolo
python main.py
```

Inferenced output goes into ./runs/predictX/video.avi, while pose data goes into ./poses/X.json
