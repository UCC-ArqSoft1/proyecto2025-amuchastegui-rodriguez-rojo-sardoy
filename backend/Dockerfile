FROM golang:1.24

WORKDIR /app

COPY . .

RUN go mod tidy
RUN go build -o server .

RUN chmod +x /app/wait-for-mysql.sh

ENTRYPOINT ["/app/wait-for-mysql.sh"]