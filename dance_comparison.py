import json

import numpy as np
from dtaidistance import dtw
import json

frames_walking = []
frames_aerobics = []
for i in range(0, 356):
    with open(f"walking/{i}.json") as f:
        frames_walking.append(json.load(f)[0])  # taking first person in the thing

for i in range(0, 125):
    with open(f"aerobics/{i}.json") as f:
        frames_aerobics.append(json.load(f)[0])  # only first and only person


def frames_to_movements(frames):
    movements = [
        [] for i in range(0, 17)
    ]  # all relative to upper left corner of the bounding box
    for frame in frames:
        for i in range(0, 17):
            x = frame["keypoints"]["x"][i]
            if x != 0:
                x -= frame["box"]["x1"]

            y = frame["keypoints"]["y"][i]
            if y != 0:
                y -= frame["box"]["y1"]

            movements[i].append((x, y))
    movements = np.asarray(movements)

    for i in range(0, 17):
        if np.linalg.norm(movements[i, :, 0]) != 0:
            movements[i, :, 0] = movements[i, :, 0] / np.linalg.norm(movements[i, :, 0])

        if np.linalg.norm(movements[i, :, 1]) != 0:
            movements[i, :, 1] = movements[i, :, 1] / np.linalg.norm(movements[i, :, 1])
    return movements


def distance(move1, move2):
    dists = []
    for i in range(0, 17):
        for j in range(0, 2):
            dist = dtw.distance(move1[i, :, j], move2[i, :, j])
            dists.append(dist)
    # print(dists)

    return np.mean(dists)


movements_walk = frames_to_movements(frames_walking)
movements_aero = frames_to_movements(frames_aerobics)


# distance(movements_walk[:, :160, :], movements_walk[:, 160:, :])
distance(movements_walk, movements_aero)

# 356 / 2
