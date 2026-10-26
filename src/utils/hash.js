/**
 * Hash password using Web Crypto API (SHA-256).
 *
 * NOTE: Demo-level security only, since there is no backend server.
 * In a production architecture, password hashing must be performed on a secure backend
 * using a slow, salted algorithm such as Argon2id or bcrypt.
 */
export async function hashPassword(plainTextPassword) {
  if (typeof plainTextPassword !== 'string') {
    throw new TypeError('Password must be a string');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(plainTextPassword);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');

  return hashHex;
}
