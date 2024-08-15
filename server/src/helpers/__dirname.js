import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Esto exporta el equivalente de __dirname en ES6
export const __dirname = dirname(fileURLToPath(import.meta.url));
