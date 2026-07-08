// api/send-feedback.js
// Токен и chat_id хранятся в Vercel Environment Variables — никогда не видны пользователю

export default async function handler(req, res) {
  // Только POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Берём токен и chat_id из переменных окружения Vercel (не из кода!)
  const BOT_TOKEN    = process.env.BOT_TOKEN;
  const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

  if (!BOT_TOKEN || !ADMIN_CHAT_ID) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  // Проверяем тело запроса
  const { message } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Empty message' });
  }

  // Ограничение длины
  if (message.length > 1000) {
    return res.status(400).json({ error: 'Message too long' });
  }

  // Отправляем в Telegram
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: ADMIN_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      }
    );

    const data = await response.json();

    if (data.ok) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(500).json({ error: data.description });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Network error' });
  }
}
