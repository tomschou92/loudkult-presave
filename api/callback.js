import fetch from 'node-fetch';

export default async function handler(req, res) {
  const code = req.query.code;
  const state = JSON.parse(Buffer.from(req.query.state, 'base64').toString('utf-8'));

  const client_id = process.env.27d859e89c644ee983b1df2524c13218;
  const client_secret = process.env.f4639ad7fe9a496c963415a16b2027fd;
  const redirect_uri = process.env.https://loudkult-presave.vercel.app/api/callback;

  // Exchange code for access token
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri
    })
  });

  const tokenData = await tokenResponse.json();

  // Her kan du senere lagre tokenData og gjøre Pre-save via Spotify API
  res.send(`Pre-save connected! 🎵 Type: ${state.type}, ID: ${state.id}`);
}
