FROM debian:stable-slim

RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    # Getting some libGL errors without libgl1-mesa-glx,
    # standard answer was to install this
    libgl1-mesa-glx \
    libglib2.0-0 \
    virtualenv \
    wget

# RUN wget \
#     https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n-pose.pt

RUN virtualenv /venv
RUN . /venv/bin/activate && pip install ultralytics

CMD . /venv/bin/activate && /usr/bin/bash
