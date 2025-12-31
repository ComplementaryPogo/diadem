import type { Feature, Polygon } from 'geojson';

type KojiProperties = {
	name: string
	lucideIcon?: string
	group?: string
}
export type KojiFeature = Feature<Polygon, KojiProperties>
export type KojiFeatures = KojiFeature[]
let geofences: KojiFeatures = []

let onGeofencesLoadedCallback: (() => void) | null = null

export async function loadKojiGeofences() {
	const result = await fetch("/api/koji")

	if (!result.ok) {
		console.error("Error while fetching geofences")
	}

	geofences = await result.json()
	if (onGeofencesLoadedCallback) {
		onGeofencesLoadedCallback()
	}
}

export function getKojiGeofences() {
	return geofences
}

export function onGeofencesLoaded(callback: () => void) {
	onGeofencesLoadedCallback = callback
	// If already loaded, call immediately
	if (geofences.length > 0) {
		callback()
	}
}
