#!/bin/sh

echo "Esperando a que MySQL esté disponible..."

# Esperar hasta que el host 'mysql' (nombre del servicio) y puerto 3306 estén listos
until nc -z -v -w30 mysql 3306
do
  echo "Esperando a MySQL... (Intentando conectar a mysql:3306)"
  sleep 5
done

echo "MySQL está listo, iniciando la aplicación..."
echo "Conectando a la base de datos con DSN: root:250498La@tcp(mysql:3306)/GYM?parseTime=true"

# Ejecutar el servidor
exec /app/server


#esto hace que el script espere hasta que el servicio MySQL esté disponible antes de iniciar la aplicación.