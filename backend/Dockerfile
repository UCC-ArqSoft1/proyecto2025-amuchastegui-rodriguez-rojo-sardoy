# Imagen base con Go
FROM golang:1.24

# Crear directorio de trabajo
WORKDIR /app

# Instalar netcat para verificar disponibilidad de MySQL
RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copiar todos los archivos al contenedor
COPY . .

# Asegurar que el script tenga permisos de ejecución
RUN chmod +x /app/wait-for-mysql.sh

# Descargar dependencias de Go y compilar
RUN go mod tidy
RUN go build -o server .

# Usar el script como punto de entrada
ENTRYPOINT ["/app/wait-for-mysql.sh"]
