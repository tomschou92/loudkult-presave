export default function handler(req, res) {
  const client_id = process.env.27d859e89c644ee983b1df2524c13218;
  const redirect_uri = process.env.https://loudkult-presave.vercel.app/api/callback;

  const { type, id } = req.query; // track or playlist + ID

  const scope = 'user-library-modify user-follow-modify';
  const state = Buffer.from(JSON.stringify({ type, id })).toString('base64');

  const queryParams = new URLSearchParams({
    client_id,
    response_type: 'code',
    redirect_uri,
    scope,
    state
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams.toString()}`);
}
