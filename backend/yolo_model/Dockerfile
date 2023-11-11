FROM python:3.10-slim

WORKDIR /app

RUN apt update -y && apt upgrade -y && apt install -y gcc python3-dev libgl1-mesa-glx libglib2.0-0

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

EXPOSE 5000

CMD ["python", "main.py"]
