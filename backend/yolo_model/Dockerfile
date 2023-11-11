FROM python:3.10-slim

ENV VIRTUAL_ENV=/opt/venv

WORKDIR /app

ENV PATH="${VIRTUAL_ENV}/bin:${PATH}"

RUN apt update -y && apt upgrade -y && apt install -y libgl1-mesa-glx libglib2.0-0

COPY . /app

EXPOSE 5000

CMD ["python3", "main.py"]
