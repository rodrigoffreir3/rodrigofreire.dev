#!/usr/bin/env bash
# Script de deploy automatizado para a VM1 (Oracle Cloud)
set -e

echo "🚀 Compilando build de produção e SEO..."
npm run build

echo "📡 Sincronizando arquivos com /var/www/html na VM1..."
rsync -avz --delete --rsync-path="sudo rsync" -e "ssh -i ~/.ssh/oracle-hs.key" dist/ ubuntu@163.176.125.251:/var/www/html/

echo "🔄 Ajustando permissões e recarregando Nginx na VM1..."
ssh -i ~/.ssh/oracle-hs.key ubuntu@163.176.125.251 "sudo chown -R www-data:www-data /var/www/html && sudo systemctl reload nginx"

echo "✅ Deploy concluído com sucesso em https://rodrigofreire.dev.br !"
