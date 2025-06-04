#!/bin/sh

echo "Esperando a que MySQL esté disponible..."

# Esperar hasta que el host 'mysql' (nombre del servicio) y puerto 3306 estén listos
until nc -z -v -w30 mysql 3306
do
  echo "Esperando a MySQL..."
  sleep 5
done

echo "MySQL está listo, iniciando la aplicación..."
/app/server


#esto hace que el script espere hasta que el servicio MySQL esté disponible antes de iniciar la aplicación.