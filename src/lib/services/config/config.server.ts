import { parse } from "toml";
import type { Config } from "@/lib/services/config/configTypes";
import fs from "node:fs";

const configFile = fs.readFileSync("./src/lib/server/config.toml", "utf8");
const config: Config = parse(configFile);

// Log configured service URLs on startup
console.log('[config] Server configuration:');
console.log(`[config]   Golbat URL: ${config.server.golbat?.url ?? 'not configured'}`);
console.log(`[config]   Dragonite URL: ${config.server.dragonite?.url ?? 'not configured'}`);
console.log(`[config]   Koji URL: ${config.server.koji?.url ?? 'not configured'}`);
console.log(`[config]   Nominatim URL: ${config.server.nominatim?.url ?? 'not configured'}`);
console.log(`[config]   Internal DB: ${config.server.internalDb?.host}:${config.server.internalDb?.port}/${config.server.internalDb?.database}`);
console.log(`[config]   External DB: ${config.server.db?.host}:${config.server.db?.port}/${config.server.db?.database}`);

export function getServerConfig() {
	return config.server;
}

export function getClientConfig() {
	return config.client;
}

export function isAuthRequired() {
	return config.server.auth.enabled && !config.server.auth.optional;
}