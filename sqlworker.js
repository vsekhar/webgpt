"using strict";

console.log('Loading and initializing sqlite3 module...');

import sqlite3InitModule from './jswasm/sqlite3.mjs';

sqlite3InitModule({
//    print: log,
//    printErr: error,
  })
  .then(function (sqlite3) {
    console.log('Done initializing sqlite.');
    try {
        const capi = sqlite3.capi; /*C-style API*/
        const oo = sqlite3.oo1; /*high-level OO API*/
        console.log('sqlite3 version', capi.sqlite3_libversion(), capi.sqlite3_sourceid());
    } catch (e) {
      error('Exception:', e.message);
    }
  });
