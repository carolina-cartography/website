<?php 
    // By default, key is set to domain-restricted API production API key
    $google_api_key = "AIzaSyBmiPKIXenHNGBis-EAC4oWsgRMED-Krag";
    if ($_SERVER['HTTP_HOST'] == "localhost") {
        $google_api_key = getenv("HTTP_LOCAL_GOOGLE_API_KEY");
    }
?>

<html>
    <head>
        <title></title>

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
                <div id="header" class="column"></div>
                <input type="text" id="address-input" class="column" />
                <div class="controls">
                    <div id="translate">
                        <label class="switch">
                            <input id="language-switch" type="checkbox" /><span class="slider"></span>
                        </label>
                        <span id="en" class="name"></span>
                        <span id="es" class="name"></span>
                        <div class="clear"></div>
                    </div>
                    <div id="reset" class="column"></div>
                </div>
            </div>
            <div id="query"></div>
        </div>
    </body>
</html>