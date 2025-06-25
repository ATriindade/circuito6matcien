export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Método não permitido');
    return;
  }

  // Recebe os dados do formulário (FormData)
  let body = {};
  if (req.headers['content-type']?.includes('multipart/form-data')) {
    // Vercel não faz o parse automático de multipart, então não funciona para FormData puro
    res.status(400).send('Use application/x-www-form-urlencoded');
    return;
  } else {
    // Para application/x-www-form-urlencoded
    body = req.body;
  }

  // Monta os dados para enviar ao Apps Script
  const params = new URLSearchParams();
  for (const key in body) {
    params.append(key, body[key]);
  }

  // URL do seu Apps Script
  const scriptUrl = 'https://script.google.com/macros/s/AKfycby98QSShGazbsbesfqjbCRAKWpTA-aRCapgUkECZ0GqqmlsxDz9F2nQm0yKkHwHeApK/exec';

  // Envia para o Apps Script
  const response = await fetch(scriptUrl, {
    method: 'POST',
    body: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const text = await response.text();
  res.status(200).send(text);
}
