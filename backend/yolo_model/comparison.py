import json

import numpy as np
from dtaidistance import dtw


# call only this one!
def score(frames1, frames2):
    # high means good match
    return 100 * (
        1 - _distance(_frames_to_movements(frames1), _frames_to_movements(frames2))
    )


def _frames_to_movements(frames):
    frames = json.loads(frames)
    # assert len(np.asarray(frames).shape) == 1, 'Take only one person for each frame'
    # all relative to upper left corner of the bounding box
    movements = [[] for _ in range(0, 17)]
    for frame in [f[0] for f in frames]:  # first person in the frame
        box = frame["box"]
        box_center_x = (box["x2"] - box["x1"]) / 2
        box_center_y = (box["y2"] - box["y1"]) / 2

        x_series = frame["keypoints"]["x"]
        y_series = frame["keypoints"]["y"]
        for i in range(0, 17):
            x = x_series[i]
            if x != 0:
                x -= box_center_x

            y = x_series[i]
            if y != 0:
                y -= box_center_y

            movements[i].append((x, y))
    movements = np.asarray(movements)

    for i in range(0, 17):
        if np.linalg.norm(movements[i, :, 0]) != 0:
            movements[i, :, 0] = movements[i, :, 0] / np.linalg.norm(movements[i, :, 0])

        if np.linalg.norm(movements[i, :, 1]) != 0:
            movements[i, :, 1] = movements[i, :, 1] / np.linalg.norm(movements[i, :, 1])
    return movements


def _distance(move1, move2):
    dists = []
    for i in range(0, 17):
        for j in range(0, 2):
            dist = dtw.distance(move1[i, :, j], move2[i, :, j])
            dists.append(dist)
    # print(dists)

    return np.mean(dists)
