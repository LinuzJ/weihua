![logo_16x9.jpg](logo_16x9.jpg)
![yolo deployment](https://github.com/LinuzJ/weihua/actions/workflows/yolo.yml/badge.svg)
![yolo deployment](https://github.com/LinuzJ/weihua/actions/workflows/dance-app.yml/badge.svg)
![yolo deployment](https://github.com/LinuzJ/weihua/actions/workflows/weihua.yml/badge.svg)


# Weihua - Learn the moves

### [Junction'23](https://www.junction2023.com/), Huawei challenge

## Context

More and more concerns are being voiced about mental health situation, especially among young ([1]). The Covid-19 pandemic made us
more isolated and less physically active. What's more, rise of addictive social media apps that use techniques like eroding natural cues
and the slot machine effect ([2]) further promotes harmful sedentary lifestyle.

## Concept

![linus_cropped.gif](examples%2Fpumpkin%2Flinus_cropped.gif)
![reference.gif](examples%2Fpumpkin%2Freference.gif)
![tobias.gif](examples%2Fpumpkin%2Ftobias.gif)

Weihua is social media of the new age. 
Combining many features of the apps young people enjoy, it is created with wellbeing of its users at the core. 

Weihua is a fun way to challenge yourself and your friends, while learning some moves to show off at a party later, 
together with your friend group. Every day there are 5 new challenges of different difficulty, which you can try to complete.
You will see how well you managed to reproduce the dance, and compete against your friends and people in your country 
(within your difficulty level). No users are able to see others' videos, only scores. 

Key features include

- watching the dance challenge and recording your own attempt in the app
- scoring of how well your dance matches the dance in today's challenge
- leaderboard within your friend group for the current day 

The app builds on success of popular apps like BeReal and TikTok to encourage people to move, in a fun and engaging way.
We hope that by trying again and again to reproduce a challenging dance our users will receive the necessary minutes of 
daily physical activity. 

We take concerns about social media seriously and design our app in a way that avoids body-shaming, discrimination, hate speech.

## Implementation

We used state-of-the-art computer vision models to extract pose data from video data.
With this we can compare user submissions to a reference choreography, and give user scores depending on how accurately they follow the original moves.

We used the _YOLOv8n-pose_ model to extract pose data efficiently on the server after streaming webcam footage from the client. The pose data is compared using _dynamic time warping_, which can alleviate syncing issues between the submission and reference.

### YOLO

YOLO stands for You Only Look Once, and works by being incredibly efficient on single images, which means this can be done repeatedly for every image in a videostream.
Ready-trained models can be downloaded online, and are easy to get up and running with.

![inferenced.gif](examples/inferenced.gif)

### Dynamic time warping

With time-series analysis, one of the most challenging aspects is the synchronisation of the two different clips. The choreography is with high probability shifted in time in some way, which makes frame-to-frame distances infeasible without further work.
Dynamic time warping works by matching up peaks and throughs, and allows for some shifts in time between the datasets.
DTW requires one-dimensional data, so we split up the data into multiple one-dimensional curves, and calculated the total penalty as a weighted sum of the DTW algorithm on these curves.

![dtw.png](dtw.png)



### Architecture
![architecture.png](architecture.png)

The front end is implemented using React (Vite). 


## References

[1]: https://www.who.int/news/item/22-11-2019-new-who-led-study-says-majority-of-adolescents-worldwide-are-not-sufficiently-physically-active-putting-their-current-and-future-health-at-risk
[2]: https://www.researchgate.net/publication/328801640_Adolescent_social_networking_How_do_social_media_operators_facilitate_habitual_use
