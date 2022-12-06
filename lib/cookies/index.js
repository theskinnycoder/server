async function parseCookie() {
  const cookie = req.headers.cookie;
  if (!cookie) {
    return null;
  }
  const cookies = cookie.split(";");
  const cookieObj = {};
  for (const c of cookies) {
    const [key, value] = c.split("=");
    cookieObj[key.trim()] = value.trim();
  }
  return cookieObj;
}
