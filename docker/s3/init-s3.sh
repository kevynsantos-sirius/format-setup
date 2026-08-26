#!/bin/bash
set -e

export AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID:-test}"
export AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY:-test}"
export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-us-east-1}"

create_bucket() {
  local bucket="$1"
  if awslocal s3api head-bucket --bucket "$bucket" >/dev/null 2>&1; then
    echo "Bucket ja existe: $bucket"
  else
    awslocal s3api create-bucket --bucket "$bucket" >/dev/null
    echo "Bucket criado: $bucket"
  fi
}

echo "==> Inicializando buckets S3 no LocalStack..."

create_bucket format
WEB_BUCKET="${FORMAT_WEB_S3_BUCKET:-format-web-bucket}"
API_BUCKET="${FORMAT_API_S3_BUCKET:-format-api-bucket}"

create_bucket "$WEB_BUCKET"
create_bucket "$API_BUCKET"

awslocal s3api put-bucket-cors \
  --bucket "$WEB_BUCKET" \
  --cors-configuration '{
    "CORSRules": [{
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
      "AllowedOrigins": ["*"],
      "ExposeHeaders": ["ETag"]
    }]
  }'

echo "==> Buckets disponiveis:"
awslocal s3 ls

if [ -f /opt/format-s3-console/s3-console-runtime.py ]; then
  echo "==> Iniciando console web S3 em http://localhost:4570 ..."
  nohup python3 /opt/format-s3-console/s3-console-runtime.py >/tmp/format-s3-console.log 2>&1 &
fi

echo "==> LocalStack S3 pronto!"