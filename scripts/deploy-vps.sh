#!/usr/bin/env bash
set -Eeuo pipefail

: "${DEPLOY_PATH:?DEPLOY_PATH is required}"
cd "$DEPLOY_PATH"
set -a
. ./.env.production
set +a

git pull --ff-only origin main
npm ci
npx drizzle-kit migrate
npm run build
pm2 restart cibione-cms --update-env
pm2 save
pm2 describe cibione-cms > /dev/null
for attempt in 1 2 3 4 5; do
  curl --fail --silent --show-error --max-time 10 http://127.0.0.1:3000/ > /dev/null && exit 0
  sleep 2
done
echo "Application health check failed" >&2
exit 1
