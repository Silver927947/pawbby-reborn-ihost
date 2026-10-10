import fs from 'node:fs';
import { createClient } from '@libsql/client';

fs.mkdirSync('/data', { recursive: true });
const db = createClient({ url: 'file:/data/pawbby.db' });

const statements = [
`CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT,
  "avatarUrl" TEXT,
  "weightUnit" TEXT NOT NULL DEFAULT 'kg',
  "webhookUrl" TEXT,
  "role" TEXT NOT NULL DEFAULT 'USER',
  "timezone" TEXT DEFAULT 'UTC',
  "enableAutomatedBackups" BOOLEAN NOT NULL DEFAULT 1,
  "notifyPushVisit" BOOLEAN NOT NULL DEFAULT 1,
  "notifyPushAutoClean" BOOLEAN NOT NULL DEFAULT 0,
  "notifyPushManualClean" BOOLEAN NOT NULL DEFAULT 0,
  "notifyPushEmpty" BOOLEAN NOT NULL DEFAULT 0,
  "notifyPushFlatten" BOOLEAN NOT NULL DEFAULT 0,
  "notifyPushError" BOOLEAN NOT NULL DEFAULT 0,
  "notifyDashVisit" BOOLEAN NOT NULL DEFAULT 1,
  "notifyDashAutoClean" BOOLEAN NOT NULL DEFAULT 1,
  "notifyDashManualClean" BOOLEAN NOT NULL DEFAULT 1,
  "notifyDashEmpty" BOOLEAN NOT NULL DEFAULT 1,
  "notifyDashFlatten" BOOLEAN NOT NULL DEFAULT 1,
  "notifyDashError" BOOLEAN NOT NULL DEFAULT 1,
  "apiKey" TEXT,
  "mqttEnabled" BOOLEAN NOT NULL DEFAULT 0,
  "mqttHost" TEXT,
  "mqttPort" INTEGER DEFAULT 1883,
  "mqttUsername" TEXT,
  "mqttPassword" TEXT,
  "mqttBaseTopic" TEXT DEFAULT 'pawbby'
)`,
`CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`,
`CREATE TABLE IF NOT EXISTS "Pet" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "birthDate" TEXT,
  "weight" REAL NOT NULL,
  "imageBase64" TEXT
)`,
`CREATE TABLE IF NOT EXISTS "Device" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "mode" TEXT NOT NULL DEFAULT 'local',
  "deviceId" TEXT NOT NULL,
  "ipAddress" TEXT,
  "localKey" TEXT,
  "tuyaClientId" TEXT,
  "tuyaClientSecret" TEXT,
  "tuyaRegion" TEXT,
  "deodorizerLastReset" DATETIME,
  "deodorizerDuration" INTEGER NOT NULL DEFAULT 30
)`,
`CREATE TABLE IF NOT EXISTS "LitterEvent" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "petId" TEXT,
  "weight" REAL,
  "duration" INTEGER,
  "type" TEXT NOT NULL,
  "rawData" TEXT,
  "deviceId" TEXT,
  CONSTRAINT "LitterEvent_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE SET NULL ON UPDATE CASCADE
)`,
`CREATE INDEX IF NOT EXISTS "LitterEvent_deviceId_idx" ON "LitterEvent"("deviceId")`
];

try {
  for (const sql of statements) await db.execute(sql);
  console.log('Database Pawbby inizializzato.');
} finally {
  db.close();
}
