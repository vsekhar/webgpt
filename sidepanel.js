import { settings } from './settings.js';
import { debug } from './debug.js';

debug("WebGPT panel loaded");

document.getElementById("raw").style.visibility = settings.debug ? 'visible' : 'hidden';
