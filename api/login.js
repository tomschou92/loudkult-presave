// api/login.js
export default function handler(req, res) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const scope = 'user-library-modify user-follow-modify';
  const state = Math.random().toString(36).substring(2, 15);

  const queryParams = new URLSearchParams({
    client_id,
    response_type: 'code',
    redirect_uri,
    scope,
    state
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams.toString()}`);
}
