<?php 

$articleTitle = "Visualizing Vieques";
$articleDate = "April 2019";
$articleDescription = "This visualization shows Vieques in 1937, 1977, and 1983. We created each map using smaller aerial images that we processed using GIS to make into a full visualization of the island.";

$articleTitleES = "Visualizando Vieques";
$articleDateES = "Abril 2019";
$articleDescriptionES = "Este visualización ilustra Vieques en 1937, 1977, y 1983. Creímos cada mapa usando imágenes más pequeñas que tratamos usando una sistema de información geográfica para crear un visualización completa de la isla.";

?>

<?php include("../header.php"); ?>

<div class="project section">
    <div class="project-heading section-text lang-en">
        <h2>Visualizing Vieques</h2>
        <p><i>Visualizing Vieques</i> is the first project of the Collective. Our projects integrate the insights and methodologies from our various backgrounds, which include creative writing, geography, history, environmental science, art history, and urban planning. The interdisciplinary nature of this project is reflected in the variety of visualizations and projects that we are working on. Our maps incorporate themes of health, transportation, environmental change, land dispossession, and gentrification. Our next steps are to install a physical exhibit in Vieques and incorporate community feedback into our continued work.</p>
        <p>This visualization shows Vieques in 1937, 1977, and 1983. We created each map using smaller aerial images that we processed using GIS to make into a full visualization of the island. Then, we ‘georectified’ each image by aligning them with the coordinates of a world map. We chose to create these historic maps as the first step in this larger project because we did not encounter any complete aerial maps of the island in our research. We wanted to see what the island looked like as a whole before the Navy occupation, which led us to the 1937 images. In order to see how the landscape has changed, we decided to also create the 1977 and 1983 maps. We hope that these maps illustrate the changes and part of the history of Vieques in a geographic and interesting way.</p>
        <p><i>Hover over the years to view layers.</i></p>
    </div>
    <div class="project-heading section-text lang-es">
        <h2>Visualizando Vieques</h2>
        <p><i>Visualizando Vieques</i> es el primero proyecto del Colectivo. Nuestros proyectos integran los conocimientos y las metodologías de nuestros fondos diferente, que incluyen la escritura creativa, historia, geografía, historia del arte, las ciencias ambientales, y el planeamiento urbano. El carácter interdisciplinario de este proyecto se refleja en la variedad de visualizaciones y proyectos en los que estamos trabajando. Nuestras mapas incorporan temas de la salud, la transportación, los cambios ambientales, el despojo de tierras, y la gentrificación. Nuestros próximos pasos son instalar una exhibición física en Vieques y incorporar comentarios de la comunidad en nuestro trabajo continuo.</p>
        <p>Este visualización ilustra Vieques en 1937, 1977, y 1983. Creímos cada mapa usando imágenes más pequeñas que tratamos usando una sistema de información geográfica para crear un visualización completa de la isla. Luego, nosotros georectificamos cada imágen alineándolas con coordenadas de el mapa mundial. Elegimos crear estas mapas históricos como un primer paso en el proyecto más grande porque no nos encontramos ningún mapa aéreo completo de la isla en nuestros investigaciones. Queríamos ver cómo se veía la isla completa antes de la ocupación del Marino, lo que nos llevó a las imágenes de 1937. Para ver cómo ha cambiado el paisaje, decidimos crear también los mapas de 1977 y 1983. Esperamos que estos mapas ilustran los cambios y parte de la historia de Vieques en una manera interesante y geográfica.</p>
        <p><i>Pose el mouse sobre los años para ver las capas diferentes.</i></p>
    </div>
    <div class="project-body">
        <div class="years">
            <div class="year" id="showLayer1937">1937</div>
            <div class="year" id="showLayer1977">1977</div>
            <div class="year" id="showLayer1983">1983</div>
            <div class="year" id="showLayer2009">2009</div>
        </div>
        <div id="primary-map" class="map"></div>
    </div>
</div>

<script type="text/javascript">

	// Initialize map
	var primaryMap = L.map('primary-map', {
		scrollWheelZoom: false
	});

	// Position zoom controls
	primaryMap.zoomControl.setPosition('bottomright');

	// Position map for Vieques
	primaryMap.setView([18.14, -65.43], 12);

	// Add background layer at front on load
	L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/rasters/contour/{z}/{x}/{y}.png', {
		tms: true
	}).addTo(primaryMap).bringToFront();

	// Add layers
	var layer1937 = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/v1937/{z}/{x}/{y}.png',
		{tms: false}
	).addTo(primaryMap).setOpacity(0);
	var layer1977 = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/v1977/{z}/{x}/{y}.png',
		{tms: false}
	).addTo(primaryMap).setOpacity(0);
	var layer1983 = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/v1983/{z}/{x}/{y}.png',
		{
			tms: false,
			maxZoom: 24,
		}
	).addTo(primaryMap).setOpacity(0);
	var layer2009 = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/v2009/{z}/{x}/{y}.png',
		{tms: false}
	).addTo(primaryMap).setOpacity(0);

	function hideLayers () {
		layer1937.setOpacity(0);
		layer1977.setOpacity(0);
		layer1983.setOpacity(0);
		layer2009.setOpacity(0);
	}

	// Setup layer hover effects
	$("#showLayer1937").mouseenter(function () {
		hideLayers();
		layer1937.setOpacity(1);
	});
	$("#showLayer1977").mouseenter(function () {
		hideLayers();
		layer1977.setOpacity(1);
	});
	$("#showLayer1983").mouseenter(function () {
		hideLayers();
		layer1983.setOpacity(1);
	});
	$("#showLayer2009").mouseenter(function () {
		hideLayers();
		layer2009.setOpacity(1);
    });
    
    // Setup year hover
	$(".year").hover(function () {
		$(".year").each(function () {
			$(this).removeClass('active');
		})
		$(this).addClass('active');
	});
</script>

<?php include("../footer.php"); ?>