<?php 
    // By default, key is set to domain-restricted API production API key
    $google_api_key = "AIzaSyBmiPKIXenHNGBis-EAC4oWsgRMED-Krag";
    if ($_SERVER['HTTP_HOST'] == "localhost") {
        $google_api_key = getenv("HTTP_LOCAL_GOOGLE_API_KEY");
    }
?>

<html>
    <head>
        <title>Visualizando Vieques: Bombardea mi patio</title>

        <!-- jQuery -->
        <script src="https://unpkg.com/jquery@3.3.1/dist/jquery.min.js"></script>

        <!-- Leaflet -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

        <!-- Google Places API -->
        <script src="https://maps.googleapis.com/maps/api/js?key=<?php echo $google_api_key; ?>&libraries=places"></script>

        <!-- Local Imports -->
        <link rel="stylesheet" href="main.css" />
        <script src="main.js"></script>
    </head>
    <body>
        <div class="container">
            <div id="leaflet"></div>
            <div class="control">
                <span class="title">Bombardea mi patio / Bomb my backyard</span>
                <input type="text" id="address-input" placeholder="Ingrese su direccion / enter your address..."/>
            </div>
            <div id="query"></div>
        </div>
    </body>
</html>