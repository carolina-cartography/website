
// Initialize constants
const CENTER = [18.14, -65.43]
const FORTIN = [18.147407888387857, -65.43913891363856]
const SHOW_VIEQUES_OUTLINE = false

// Initialize variables
let map
let outlineData

$(document).ready(() => {
    initializeLeaftlet()
	initializeAddressFinder()
	loadOutline()
})

function initializeLeaftlet() {

    // Initialize map
	map = L.map('leaflet', { 
		attributionControl:false,  
		scrollWheelZoom: true
	})

    // Add Open Street Map layer
    L.tileLayer( 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		tms: false
    }).addTo(map)

	// Position zoom controls
	map.zoomControl.setPosition('bottomright')

	// Position map for Vieques, centered on Fortin
	map.setView(CENTER, 12)

    // Add marker to Fortin
    const fortinMarker = L.marker(FORTIN).addTo(map)
	fortinMarker.bindTooltip("Museo El Fort&iacute;n", {
		direction: 'auto',
		permanent: true,
	}).openTooltip()
}

function loadOutline() {
	$.ajax({
		dataType: "json",
		url: "outline.geojson",
		success: function(data) {
			$(data.features).each(function(key, data) {

				// Save outline data to global scope
				outlineData = data

				// Add Vieques outline to map
				if (SHOW_VIEQUES_OUTLINE) {
					const outline = getNewGeoJSONBounday(data)
					outline.addTo(map)
				}
			})
		}
	})
}

function initializeAddressFinder() {
	const input = document.getElementById("address-input")
	const autocomplete = new google.maps.places.Autocomplete(input, {
		fields: ["formatted_address", "geometry", "name"],
		strictBounds: false,
	})
	autocomplete.addListener("place_changed", () => {
		handleAddressChange(autocomplete.getPlace())
	});
}

function getNewGeoJSONBounday(data) {
	return new L.geoJson(data, {
		style: {
			fillOpacity: 0,
			color: '#3388ff'
		}
	})
}

function handleAddressChange(place) {

	// Handle non-existent place input
	if (!place.geometry || !place.geometry.location) {
		window.alert("No details available for input: '" + place.name + "'")
		return;
	}

	// Get coordinates
	const newFortinCoords = [place.geometry.location.lat(), place.geometry.location.lng()]

	// Get new center
	// TODO: This isn't working yet, figure this out
	// const newCenter = getRelativeCoordinatesForNewPoint(newFortinCoords, FORTIN, CENTER)

	// Trace new outline on map
	let newOutlineData = JSON.parse(JSON.stringify(outlineData))
	shiftGeoJSONPolygonDataForNewPoint(newOutlineData.geometry.coordinates, newFortinCoords)
	const newOutline = getNewGeoJSONBounday(newOutlineData)
	newOutline.addTo(map)

	// Add pointer to map
	const newFortinMarker = L.marker(newFortinCoords).addTo(map)
	newFortinMarker.bindTooltip("Su casa, como Museo El Fort&iacute;n", {
		direction: 'auto',
		permanent: true,
	}).openTooltip()

	// Fly to 'new Fortin'
	map.flyTo(newFortinCoords)
}

function shiftGeoJSONPolygonDataForNewPoint(polygonArray, newPoint) {
	for (let i in polygonArray) {
		for (let j in polygonArray[i]) {
			for (let k in polygonArray[i][j]) {
				polygonArray[i][j][k] = getRelativeCoordinatesForNewGeoJSONPoint(polygonArray[i][j][k], newPoint, FORTIN)
			}
		}
	}
}

function getRelativeCoordinatesForNewPoint(coordinates, newPoint, originalPoint) {
	return [
		newPoint[0] + (coordinates[0] - originalPoint[0]),
		newPoint[1] + (coordinates[1] - originalPoint[1])
	]
}

function getRelativeCoordinatesForNewGeoJSONPoint(coordinates, newPoint, originalPoint) {
	return [
		newPoint[1] + (coordinates[0] - originalPoint[1]),
		newPoint[0] + (coordinates[1] - originalPoint[0])
	]
}