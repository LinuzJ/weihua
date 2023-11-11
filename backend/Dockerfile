FROM golang:alpine AS builder

RUN apk update && apk add --no-cache git

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build

FROM scratch

COPY --from=builder /app/weihua /app/

EXPOSE 8080

ENTRYPOINT [ "/app/weihua", "serve", "--http=0.0.0.0:8080" ]
