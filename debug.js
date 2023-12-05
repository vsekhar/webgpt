import { settings } from './settings.js';

export function debug(message) {
    if (settings.debug) {
        console.log(message);
    }
}
