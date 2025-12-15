import { getServerConfig } from '@/lib/services/config/config.server';
import { getLogger } from '@/lib/server/logging';
import { error, json } from "@sveltejs/kit";
import type { KojiFeatures } from "@/lib/features/koji";

const log = getLogger("koji")

export async function fetchKojiGeofences(thisFetch?: typeof fetch): Promise<KojiFeatures | undefined> {
	const config = getServerConfig();
	if (!config.koji || !config.koji.url) {
		log.warning("Koji was called, but is not configured")
		return
	}

	const url = config.koji.url + '/api/v1/geofence/FeatureCollection/' + config.koji.projectName;
	log.info(`Fetching Koji geofences from: ${url}`);

	let response: Response;
	try {
		response = await (thisFetch ?? fetch)(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.koji.secret}`,
				'Content-Type': 'application/json'
			}
		});
	} catch (err) {
		log.error(`Failed to fetch Koji geofences from ${url}: ${err}`);
		return {
			error: `Fetch failed: ${err}`,
			result: {}
		};
	}

	if (!response.ok) {
		log.error(`Koji returned HTTP ${response.status} ${response.statusText} from ${url}`);
		return {
			error: `HTTP ${response.status}: ${response.statusText}`,
			result: {}
		};
	}

	if (!response.ok) {
		log.error("Koji Error: %d (%s)", response.status, await response.text())
		return
	}

	const data = await response.json();
	return data?.data?.features ?? [] as KojiFeatures
}