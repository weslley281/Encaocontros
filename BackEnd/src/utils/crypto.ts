import crypto from 'crypto';

// Chave e IV para a criptografia
const ENCRYPTION_KEY = crypto.randomBytes(32); // Tamanho de 256 bits (32 bytes)
const IV_LENGTH = 16; // AES usa um vetor de inicialização (IV) de 16 bytes

// Função para criptografar
function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

// Função para descriptografar
function decrypt(text: string): string {
  const [iv, encryptedText] = text.split(':');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(iv, 'hex')
  );
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export { encrypt, decrypt };
