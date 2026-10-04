import { readFileSync, writeFileSync } from "node:fs";

const schemaPath = "prisma/schema.prisma";
let schema = readFileSync(schemaPath, "utf8");
schema = schema.replace(
  `generator client {
  provider = "prisma-client-js"
}`,
  `generator client {
  provider   = "prisma-client"
  output     = "../generated/prisma"
  engineType = "client"
}`
);
if (!schema.includes('provider   = "prisma-client"')) {
  throw new Error("Pawbby schema format changed: Prisma generator block not found.");
}
writeFileSync(schemaPath, schema);

const prismaPath = "server/utils/prisma.ts";
let prisma = readFileSync(prismaPath, "utf8");
if (!prisma.includes("from '@prisma/client'")) {
  throw new Error("Pawbby prisma.ts format changed: @prisma/client import not found.");
}
prisma = prisma.replace(
  "from '@prisma/client'",
  "from '../../generated/prisma/client'"
);
writeFileSync(prismaPath, prisma);
