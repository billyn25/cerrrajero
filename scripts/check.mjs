import {existsSync} from 'node:fs';
await import(existsSync('dist/coverage-manifest.json')?'./audit-consolidated-coverage.mjs':'./check-full-inventory.mjs');
