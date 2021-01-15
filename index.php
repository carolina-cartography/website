<?php include("header.php"); ?>

<?php

// Get of articles in blog directory
$files = new DirectoryIterator(dirname(".")."/blog");
$sortedFilepaths = array();

// Sort articles
foreach ($files as $fileinfo) {
    if (!$fileinfo->isDot() && $fileinfo->getExtension() == "php") {
        $articlePath = $fileinfo->getPath()."/".$fileinfo->getFilename();

        // Include file without printing content
        ob_start();
        include($articlePath);
        ob_get_clean();

        // Add to sorted list of filepaths
        $sortedFilepaths[$sortKey] = $articlePath;
    }
}

// Sort in reverse order
krsort($sortedFilepaths);

foreach ($sortedFilepaths as $articlePath) {

    // Include file without printing content
    ob_start();
    include($articlePath);
    ob_get_clean();

    // Print article link in list
    echo "<div class='section section-text article'>";
    
        echo "<a href='". $articlePath . "'>";
        if (isset($articleTitleES)) {
            echo "<h2 class='lang-en'>" . $articleTitle . "</h2>";
            echo "<h2 class='lang-es'>" . $articleTitleES . "</h2>";
        } else {
            echo "<h2>" . $articleTitle . "</h2>";
        }
        echo "</a>";

        if (isset($articleDateES)) {
            echo "<span class='article-date lang-en'>" . $articleDate . "</span>";
            echo "<span class='article-date lang-es'>" . $articleDateES . "</span>";
        } else {
            echo "<span class='article-date'>" . $articleDate . "</span>";
        }
        
        if (isset($articleDescriptionES)) {
            echo "<p class='lang-en'>" . $articleDescription . "</p>";
            echo "<p class='lang-es'>" . $articleDescriptionES . "</p>";
        } else {
            echo "<p>" . $articleDescription . "</p>";
        }

        echo "<a href='". $articlePath . "' class='article-link lang-en'>Read more</a>";
        echo "<a href='". $articlePath . "' class='article-link lang-es'>Lee mas</a>";
    echo "</div>";
}

?>

<?php include("footer.php"); ?>