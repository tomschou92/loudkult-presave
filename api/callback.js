import fetch from 'node-fetch';

export default async function handler(req, res) {
  const code = req.query.code;
  const state = JSON.parse(Buffer.from(req.query.state, 'base64').toString('utf-8'));

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

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
