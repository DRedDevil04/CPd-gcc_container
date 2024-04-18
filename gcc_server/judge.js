import { readFileSync } from 'fs';
import { readFile } from 'fs/promises';

async function validateFile(output, compareString) {
    try {
        if (output.replace(/\s+/g, ' ') === compareString.replace(/\s+/g, ' ')) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

export { validateFile }