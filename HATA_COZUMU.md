# Hata Çözümü

## Sorun
1. `npm install` hatası: `ENOTEMPTY` - node_modules bozuk
2. `vite: command not found` - Bağımlılıklar yüklenmedi

## Çözüm

Terminal'de şu komutları sırayla çalıştırın:

```bash
# 1. Bozuk klasörleri temizle
rm -rf node_modules package-lock.json

# 2. Bağımlılıkları yeniden yükle
npm install

# 3. Sunucuyu başlat
npm run dev
```

## Veya Tek Komutla:

```bash
./fix-and-run.sh
```

## Hala Çalışmıyorsa:

Eğer hala hata alıyorsanız:

```bash
# npm cache'i temizle
npm cache clean --force

# Sonra tekrar dene
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Başarılı Olursa:

Terminal'de şöyle bir mesaj göreceksiniz:
```
➜  Local:   http://localhost:5173/
```

Bu URL'yi tarayıcıda açın!

