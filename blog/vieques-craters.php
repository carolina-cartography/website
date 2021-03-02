<?php 

$sortKey = 1;
$articleTitle = "US Navy bombing, if Vieques was your neighborhood";
$articleDate = "January 2020";
$articleDescription = "Visualize some of the bomb craters left in Vieques by the US Navy as if they'd been dropped in your backyard.";

$articleTitleES = null;
$articleDateES = null;
$articleDescriptionES = null;

?>

<?php include("../header.php"); ?>

<div class="project craters section">
    <div class="project-heading section-text lang-en">
        <h2><?php echo $articleTitle ?></h2>
        <p>The United States Navy <a href="https://en.wikipedia.org/wiki/United_States_Navy_in_Vieques,_Puerto_Rico">conducted training excersizes</a> in Vieques, Puerto Rico beginning in 1941. This map allows you visualize some of the bomb craters left in Vieques by the Navy as if the bombs had been dropped in your own backyard.</p>
        <p>To see the visualization, please allow your browser to access your location, then click 'Bomb my backyard' below.</p>
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

    // Initialize Vieques region center
    let originalCenter = [18.137776, -65.298173];

    // Initialize map
	var primaryMap = L.map('primary-map', {
		scrollWheelZoom: false
    })

    // Initialize state
    var places;
    var bombsDropped = false;

    // Helper functions
    var dropOnMyLocation = function (newCenter) {
        primaryMap.setView(newCenter, 16)
        if (!bombsDropped) addPlacesToMap(places, newCenter)
        bombsDropped = true;
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
                })
            });
        }
    }
    var getAndAddBombs = function() {
        $.ajax({
            type: "POST",
            url: "https://maps.carolinacartography.org/api/place.get",
            headers: {
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
        return [
            newCenter[0] + (coordinates[0] - originalCenter[0]),
            newCenter[1] + (coordinates[1] - originalCenter[1])
        ]
    }
    
    // Add tile layer
    L.tileLayer( 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		tms: false
    }).addTo(primaryMap)

	// Position zoom controls, set view, drop bombs
	primaryMap.zoomControl.setPosition('bottomright')
    primaryMap.setView(originalCenter, 16)
    primaryMap.whenReady(function() {
        getAndAddBombs()
        getLocation()
    })

    // Setup back button
    $("#back").click(function () {
        primaryMap.setView(originalCenter, 16)
    })

</script>

<?php include("../footer.php"); ?>