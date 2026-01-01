#!/bin/bash

echo "🧹 Temizleniyor..."
rm -rf node_modules package-lock.json

echo "📦 Bağımlılıklar yükleniyor..."
npm install

echo "🚀 Sunucu başlatılıyor..."
npm run dev

