const isDev = process.env.NODE_ENV === 'development';
const host = isDev ? 'http://127.0.0.1:3000' : 'https://quora.kyrie.top';

export const ROOT_URL = host;
