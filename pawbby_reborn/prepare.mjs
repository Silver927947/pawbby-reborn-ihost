import fs from 'node:fs';

const schemaPath = 'prisma/schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');
const oldGenerator = /generator client\s*\{[^}]*\}/m;
const newGenerator = `generator client {
  provider   = "prisma-client"
  output     = "../generated/prisma"
  engineType = "client"
}`;
if (!oldGenerator.test(schema)) {
  throw new Error('Non trovo il blocco generator client atteso in prisma/schema.prisma');
}
schema = schema.replace(oldGenerator, newGenerator);
fs.writeFileSync(schemaPath, schema);

const utilPath = 'server/utils/prisma.ts';
let util = fs.readFileSync(utilPath, 'utf8');
const oldImport = "from '@prisma/client'";
const newImport = "from '../../generated/prisma/client'";
if (!util.includes(oldImport)) {
  throw new Error('Non trovo l’import @prisma/client atteso in server/utils/prisma.ts');
}
util = util.replace(oldImport, newImport);
fs.writeFileSync(utilPath, util);
console.log('Patch Prisma applicata.');
