import { mkdir } from "node:fs/promises";
import { createClient } from "@libsql/client";

const dbPath = "/data/pawbby.db";
await mkdir("/data", { recursive: true });

const db = createClient({ url: `file:${dbPath}` });

await db.executeMultiple(`
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS User (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  passwordHash TEXT,
  avatarUrl TEXT,
  weightUnit TEXT NOT NULL DEFAULT 'kg',
  webhookUrl TEXT,
  role TEXT NOT NULL DEFAULT 'USER',
  timezone TEXT DEFAULT 'UTC',
  enableAutomatedBackups INTEGER NOT NULL DEFAULT 1,
  notifyPushVisit INTEGER NOT NULL DEFAULT 1,
  notifyPushAutoClean INTEGER NOT NULL DEFAULT 0,
  notifyPushManualClean INTEGER NOT NULL DEFAULT 0,
  notifyPushEmpty INTEGER NOT NULL DEFAULT 0,
  notifyPushFlatten INTEGER NOT NULL DEFAULT 0,
  notifyPushError INTEGER NOT NULL DEFAULT 0,
  notifyDashVisit INTEGER NOT NULL DEFAULT 1,
  notifyDashAutoClean INTEGER NOT NULL DEFAULT 1,
  notifyDashManualClean INTEGER NOT NULL DEFAULT 1,
  notifyDashEmpty INTEGER NOT NULL DEFAULT 1,
  notifyDashFlatten INTEGER NOT NULL DEFAULT 1,
  notifyDashError INTEGER NOT NULL DEFAULT 1,
  apiKey TEXT,
  mqttEnabled INTEGER NOT NULL DEFAULT 0,
  mqttHost TEXT,
  mqttPort INTEGER DEFAULT 1883,
  mqttUsername TEXT,
  mqttPassword TEXT,
  mqttBaseTopic TEXT DEFAULT 'pawbby'
);

CREATE TABLE IF NOT EXISTS Pet (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  birthDate TEXT,
  weight REAL NOT NULL,
  imageBase64 TEXT
);

CREATE TABLE IF NOT EXISTS Device (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'local',
  deviceId TEXT NOT NULL,
  ipAddress TEXT,
  localKey TEXT,
  tuyaClientId TEXT,
  tuyaClientSecret TEXT,
  tuyaRegion TEXT,
  deodorizerLastReset TEXT,
  deodorizerDuration INTEGER NOT NULL DEFAULT 30
);

CREATE TABLE IF NOT EXISTS LitterEvent (
  id TEXT PRIMARY KEY NOT NULL,
  timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  petId TEXT,
  weight REAL,
  duration INTEGER,
  type TEXT NOT NULL,
  rawData TEXT,
  deviceId TEXT,
  FOREIGN KEY (deviceId) REFERENCES Device(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS LitterEvent_deviceId_idx ON LitterEvent(deviceId);
`);
await db.close();
