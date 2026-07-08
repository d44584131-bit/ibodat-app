# Ibodat Kuzatuvi — Deploy qilish

## Papka tuzilmasi
```
ibadat-app/
├── api/
│   └── send-feedback.js   ← Serverless function (token shu yerda yashirin saqlandi)
├── public/
│   └── index.html         ← Asosiy ilova
└── vercel.json            ← Vercel konfiguratsiyasi
```

---

## 1-qadam — Vercel ga yuklash

1. https://vercel.com ga kiring (GitHub bilan)
2. **"Add New Project"** → **"Upload"** ni tanlang
3. Butun `ibadat-app` papkasini yuklang
4. Deploy tugmasini bosing
5. URL ni nusxalang: `https://ibadat-app-xxx.vercel.app`

---

## 2-qadam — Muhit o'zgaruvchilarini sozlash (TOKEN)

Vercel dashboard → Project → **Settings** → **Environment Variables**

Quyidagi ikkita o'zgaruvchini qo'shing:

| Name           | Value                        |
|----------------|------------------------------|
| BOT_TOKEN      | 123456:ABCdef...  (BotFather dan) |
| ADMIN_CHAT_ID  | 123456789  (@userinfobot dan) |

Saqlang → **Redeploy** qiling.

---

## 3-qadam — BotFather da sozlash

```
1. @BotFather → /newbot
   → Nom: Ibodat Kuzatuvi
   → Username: ibadat_tracker_bot (o'zingiz tanlang)
   → Tokenni nusxalang → Vercel ga qo'ying (yuqorida)

2. @BotFather → /setmenubutton
   → Botni tanlang
   → URL: https://ibadat-app-xxx.vercel.app
   → Tugma matni: 📖 Ilovani ochish

3. @BotFather → /setdescription
   → Botni tanlang
   → Namoz, Qur'on va Dalāʾil kuzatuvi uchun ilova
```

---

## 4-qadam — index.html da username ni o'zgartiring

`public/index.html` faylida toping:
```js
const BOT_USERNAME = 'YOUR_BOT_USERNAME';
```
Va o'zgartiring:
```js
const BOT_USERNAME = 'ibadat_tracker_bot'; // o'zingizning bot username
```

Keyin qayta Vercel ga yuklang.

---

## Xavfsizlik

- `BOT_TOKEN` va `ADMIN_CHAT_ID` faqat Vercel serverida saqlanadi
- Foydalanuvchi hech qachon tokenni ko'ra olmaydi
- Barcha so'rovlar `/api/send-feedback` orqali o'tadi
- Ilova faqat Telegram ichida ishlaydi — brauzerda ochilsa botga yo'naltiriladi
