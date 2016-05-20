<!DOCTYPE html>
<html lang="en">
    <head>
        <title>The Ball Game - Test</title>
        <script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
        <script src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
        <script src="js/device.js"></script>
        <script src="js/Control.js"></script>
        <script src="js/GameFrame.js"></script>
        <script src="js/Main.js"></script>
        <script src="js/Navigation.js"></script>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="stylesheet" type="text/css" href="styles/styles.css" />
        <link rel="apple-touch-icon-precomposed" href="apple-touch-icon-iphone.png" />
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="apple-touch-icon-iphone.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="apple-touch-icon-ipad.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-touch-icon-iphone-retina-display.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="apple-touch-icon-ipad-retina-display.png" />
    </head>

<body>

<header>
<h1 align="center">Score</h1>
</header>

<style>
<div>
	<?php

  echo file_get_contents("https://spreadsheets.google.com/tq?tqx=out:html&tq=SELECT%20B%2CC%20ORDER%20BY%20C%20DESC%2C%20B%20ASC%20LIMIT%2010%0A&key=1jxu_-FvWdRQT_SSnDS8CY-mBTeHgq_CV7THxCRwbITc&gid=0");
    ?>
</div>
</body>
</html>