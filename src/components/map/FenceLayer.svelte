<script lang="ts">
	import { FillLayer, GeoJSON, LineLayer, SymbolLayer } from "svelte-maplibre";
	import type { FeatureCollection, Polygon } from "geojson";
	import { MapSourceId } from "@/lib/map/layers";

	let {
		data
	}: {
		data: FeatureCollection<Polygon>
	} = $props();
</script>

<GeoJSON
	id={MapSourceId.MAP_FENCES}
	{data}
>
	<FillLayer
		paint={{
			'fill-color': ["get", "fillColor"],
			'fill-opacity': 0.5,
		}}
	/>
	<LineLayer
		layout={{ 'line-cap': 'round', 'line-join': 'round' }}
		paint={{
			'line-color': ["get", "strokeColor"],
			'line-width': 2
		}}
	/>
	<SymbolLayer
		layout={{
			'text-field': ["get", "name"],
			'text-size': 14,
			'text-font': ["Open Sans Bold", "Arial Unicode MS Bold"],
			'text-anchor': 'center',
			'text-allow-overlap': false,
			'text-ignore-placement': false,
		}}
		paint={{
			'text-color': '#ffffff',
			'text-halo-color': 'rgba(0, 0, 0, 0.8)',
			'text-halo-width': 2,
		}}
	/>
</GeoJSON>
