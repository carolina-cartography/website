
// Initialize constants
const CENTER = [18.14, -65.43]
const ZOOM = 12
const FORTIN = [18.147407888387857, -65.43913891363856]
const SHOW_VIEQUES_OUTLINE = true
const LANGUAGE = {
	es: {
		lang: "Espa&ntilde;ol",
		title: "&iexcl;Bombardea mi patio!",
		input: "Ingrese su direccion...",
		marker: "Est&aacute;s aqu&iacute; (El Fort&iacute;n Conde de Mirasol)",
		address: "Su direccion, como El Fort&iacute;n",
		reset: "De nuevo",
		about: {
			title: "Sobre",
			content:  "Explanation here",
		}
	},
	en: {
		lang: "English",
		title: "Bomb my backyard!",
		input: "Enter your address...",
		marker: "You are here (El Fort&iacute;n Conde de Mirasol)",
		address: "Your address, as El Fort&iacute;n",
		reset: "Reset",
		about: {
			title: "About",
			content: "Explanation here",
		}
	}
}

// Initialize variables
let map, language, fortinMarker, newFortinMarker, outlineData, outline, newOutline

$(document).ready(() => {
	initializeLanguage()
	initializeReset()
	initializeAbout()
	initializeLeaftlet()
	initializeAddressFinder()
	loadOutline()
})

function setLanguage() {
	$("#en").html(LANGUAGE.en.lang)
	$("#es").html(LANGUAGE.es.lang)
	$("title").html(LANGUAGE[language].title)
	$("#header").html(LANGUAGE[language].title)
	$("#address-input").attr("placeholder", LANGUAGE[language].input)
	$("#reset").html(LANGUAGE[language].reset)
	$("#about-button").html(LANGUAGE[language].about.title)
	$("#about-title").html(LANGUAGE[language].about.title)
	$("#about-content").html(LANGUAGE[language].about.content)
	if (fortinMarker !== undefined) {
		fortinMarker.setTooltipContent(LANGUAGE[language].marker)
	}
	if (newFortinMarker !== undefined) {
		newFortinMarker.setTooltipContent(LANGUAGE[language].address)
	}
}

function initializeLanguage() {
	language = "en"
	setLanguage()
	$("#language-switch").change(function() {
		console.log(language)
		if (language == "en") language = "es"
		else language = "en"
		setLanguage()
	})
}

function initializeReset() {
	$("#reset").click(function() {
		center()
		reset()
		clear()
	})
}

function initializeAbout() {
	$("#about-button").click(function () {
		$("#about").addClass("visible")
	})
	$("#about-underlay").click(function() {
		$("#about").removeClass("visible")
	})
}

function center() {
	// Position map for Vieques, centered on Fortin
	map.setView(CENTER, ZOOM)
}

function clear() {
	$("#address-input").val("")
}

function reset() {
	if (newFortinMarker !== undefined) {
		map.removeLayer(newFortinMarker)
	}
	if (newOutline !== undefined) {
		map.removeLayer(newOutline)
	}

	newFortinMarker = undefined
	newOutline = undefined

	$("#reset").removeClass("active")
}

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

    // Add marker to Fortin
    fortinMarker = L.marker(FORTIN).addTo(map)
	fortinMarker.bindTooltip(LANGUAGE[language].marker, {
		direction: 'auto',
		permanent: true,
	}).openTooltip()

	// Default center
	center()
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
					outline = getNewGeoJSONBounday(data)
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

	// Clear last marker and outline
	reset()

	// Handle non-existent place input
	if (!place.geometry || !place.geometry.location) {
		window.alert("No details available for input: '" + place.name + "'")
		return;
	}

	// Setup reset button
	$("#reset").addClass("active")

	// Get coordinates
	const newFortinCoords = [place.geometry.location.lat(), place.geometry.location.lng()]

	// Get new center
	const newCenter = getRelativeCoordinatesForNewPoint(newFortinCoords, CENTER, FORTIN)

	// Trace new outline on map
	let newOutlineData = JSON.parse(JSON.stringify(outlineData))
	shiftGeoJSONPolygonDataForNewPoint(newOutlineData.geometry.coordinates, newFortinCoords)
	newOutline = getNewGeoJSONBounday(newOutlineData)
	newOutline.addTo(map)

	// Add pointer to map
	newFortinMarker = L.marker(newFortinCoords).addTo(map)
	newFortinMarker.bindTooltip(LANGUAGE[language].address, {
		direction: 'auto',
		permanent: true,
	}).openTooltip()

	// Fly to 'new Fortin'
	map.setView(newCenter, ZOOM)
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