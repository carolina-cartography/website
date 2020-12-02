<?php
$PROJECT_ROOT = str_replace($_SERVER['DOCUMENT_ROOT'], "", dirname(__FILE__));
?>

<html>
	<head>
		<title>Carolina Cartography Collective</title>
		<meta charset="UTF-8">

		<!-- Fonts & Libraries -->
		<link href="https://fonts.googleapis.com/css?family=Work+Sans:400,700" rel="stylesheet">
		<script src="https://code.jquery.com/jquery-3.4.0.min.js"
			integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=" crossorigin="anonymous"></script>
		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
			integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
			crossorigin=""/>
		<script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
			integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
			crossorigin=""></script>

		<link rel="stylesheet" href="<?= $PROJECT_ROOT ?>/css/main.css" />
		<script src="<?= $PROJECT_ROOT ?>/js/main.js"></script>
	</head>

	<body>
		<header class="section-text">
			<a href="<?= $PROJECT_ROOT ?>"><h1>Carolina Cartography Collective</h1></a>
			<div class="navigation lang-en">
				<a href="<?= $PROJECT_ROOT ?>/about.php">About</a>
				<a href="#" class="switch-language" id="show-es">En Español</a>
			</div>
			<div class="navigation lang-es">
				<a href="<?= $PROJECT_ROOT ?>/about.php">Sobre</a>
				<a href="#" class="switch-language" id="show-en">In English</a>
			</div>
        </header>