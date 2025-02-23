#!/bin/bash

set -eo pipefail  # Para interromper o script em caso de erro e capturar falhas em pipelines

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "Docker não está instalado. Instale o Docker antes de continuar."
    exit 1
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose não está instalado. Instale o Docker Compose antes de continuar."
    exit 1
fi

trap 'echo "Erro ocorrido. Verificando logs..."; docker-compose logs --tail=50; exit 1' ERR

echo "Iniciando os containers com Docker Compose..."
docker-compose up -d || { echo "Falha ao iniciar os containers."; exit 1; }

echo "Containers em execução:"
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"

echo "Para verificar os logs use: docker-compose logs -f"
echo "Para parar os containers use: docker-compose down --volumes"
