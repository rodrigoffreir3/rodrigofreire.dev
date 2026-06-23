#!/bin/bash
set -e

export PATH="$HOME/.local/bin:$PATH"

case "$1" in
    "dev")
        echo "[*] Iniciando servidor local Hugo em http://localhost:1313..."
        hugo server -D -F --navigateToChanged
        ;;
    "build")
        echo "[*] Gerando artefatos estáticos otimizados na pasta public/..."
        hugo --gc --minify
        ;;
    *)
        echo "Uso: ./run.sh {dev|build}"
        exit 1
        ;;
esac
