<head>
<link rel="stylesheet" type="text/css" href="styles/styles.css" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="js/Navigation.js"></script>
</head>
<body>
    <title>Leaderboard</title>

<header>
<h1 align="center">Score</h1>
</header>

<center>
	<?php
  echo file_get_contents("https://spreadsheets.google.com/tq?tqx=out:html&tq=SELECT%20B%2CC%20ORDER%20BY%20C%20DESC%2C%20B%20ASC%20LIMIT%2010%0A&key=1jxu_-FvWdRQT_SSnDS8CY-mBTeHgq_CV7THxCRwbITc&gid=0");
    ?><br>
    <br>
    <a href = "http://comp2910.azurewebsites.net/"><div class = "returnbutton"></div></a> <br/>

</center>

</body>
