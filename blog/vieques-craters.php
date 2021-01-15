<?php 

$articleTitle = "Vieques: Navy bombing (in your backyard)";
$articleDate = "January 2020";
$articleDescription = "Description here";

?>

<?php include("../header.php"); ?>

<div class="project craters section">
    <div class="project-heading section-text lang-en">
        <h2><?php echo $articleTitle ?></h2>
        <p>Allow your browser to access your location, then click 'Bomb my backyard' below.</p>
        <div class="button" id="bomb">Finding your backyard...</div>
        <div class="button" id="back">Back to Vieques</div>
    </div>
    <div class="project-body">
        <div id="primary-map" class="map"></div>
    </div>
</div>

<style type="text/css">
    .craters .button {display:inline-block; margin-right:10px; padding:8px 10px; color:white;}
    .craters .project-body {height:800px}
    .craters #bomb {background:#ccc;}
    .craters #bomb.ready {cursor:pointer; background:red;}
    .craters #back {background:#333; cursor:pointer;}
</style>

<script type="text/javascript">

    // To find center...
    // primaryMap.on("mouseup", () => console.log(primaryMap.getCenter() + " / " + primaryMap.getZoom()))

    // Initialize center
    let originalCenter = [18.137776, -65.298173];

    // Initialize map
	var primaryMap = L.map('primary-map', {
		scrollWheelZoom: false
    })

    // Initialize array of places
    var places;

    var dropOnMyLocation = function (newCenter) {
        // primaryMap.flyTo(newCenter)
        primaryMap.setView(newCenter, 16)
    }

    var backToVieques = function() {
        primaryMap.setView(originalCenter, 16)
    }

    var getLocation = function(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {

                var newCenter = [position.coords.latitude, position.coords.longitude]
                var bombButton = $("#bomb")

                bombButton.addClass("ready")
                bombButton.text("Bomb my backyard")
                bombButton.click(function() {
                    dropOnMyLocation(newCenter)
                    addPlacesToMap(places, newCenter)
                })

            });
        }
    }

    // Function to load bomb outlines
    var dropBombs = function() {
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/place.get",
            headers: {
                'Access-Control-Allow-Origin': "*",
				'Content-Type': "application/json",
            },
            data: JSON.stringify({
                map: "4b506606-831c-4094-9840-6c091f60a8e7",
            }),
            dataType: 'json',
            success: function(response) {
                places = response.places;
                addPlacesToMap(places)
            },
        })
    }

    var addPlacesToMap = function(places, offset) {
        for (var place of places) {
            var coordinates = place.location.coordinates
            if (offset) coordinates = getRelativeCoordinatesForNewCenter(coordinates, offset)
            var leafletPlace = L.circle(coordinates, { radius: place.radius, place })
            leafletPlace.addTo(primaryMap)
        }
    }

    var getRelativeCoordinatesForNewCenter = function (coordinates, newCenter) {

        // Initialize
        var originalCenterLat = originalCenter[0]
        var originalCenterLng = originalCenter[1]
        var newCenterLat = newCenter[0]
        var newCenterLng = newCenter[1]
        var originalLat = coordinates[0]
        var originalLng = coordinates[1]

        // Get offset
        var latDiff = originalLat - originalCenterLat
        var lngDiff = originalLng - originalCenterLng

        // Get new lat and long
        var newLat = newCenterLat + latDiff
        var newLng = newCenterLng + lngDiff

        return [newLat, newLng]
    }
    
    // Add tile layer
    L.tileLayer( 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		tms: false
    }).addTo(primaryMap)

	// Position zoom controls, set view, drop bombs
	primaryMap.zoomControl.setPosition('bottomright')
    primaryMap.setView(originalCenter, 16)
    primaryMap.whenReady(function() {
        dropBombs()
        getLocation()
    })

    $(document).ready(function() {
        $("#back").click(function () {
            backToVieques()
        })
    })

</script>

<?php include("../footer.php"); ?>