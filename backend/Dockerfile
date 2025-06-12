FROM golang:1.24

WORKDIR /app

# Instalar netcat y otras dependencias necesarias
RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copiar los archivos
COPY . .

# Compilar la aplicación
RUN go mod tidy
RUN go build -o server .

# Dar permisos de ejecución al script
RUN chmod +x /app/wait-for-mysql.sh

# Usar el script de espera como punto de entrada
ENTRYPOINT ["/app/wait-for-mysql.sh"]