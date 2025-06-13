#!/bin/bash

# Esperar a que MySQL esté disponible
echo "Esperando a que MySQL esté disponible..."
while ! nc -z mysql 3306; do
  sleep 1
done

echo "MySQL está disponible, iniciando la aplicación..."

# Ejecutar la aplicación
exec ./server


#esto hace que el script espere hasta que el servicio MySQL esté disponible antes de iniciar la aplicación.