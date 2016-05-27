<!DOCTYPE>
<html>
    <head>
        <title>Leaderboard</title>
        <link rel="stylesheet" type="text/css" href="styles/styles.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="js/Navigation.js"></script>
        <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">

    </head>
    <style>
        table {
        border-collapse: collapse;
        }
        th, td {
        text-align: center;
        }
    </style>
    <body>
        <div id="background">
            <center>
                <ul class="tabs">
                    <li class="labels"><br/><br/>

                        <label for="tab1" id="label1" text-align="center">Scoreboard</label>
                        <label for="tab2" id="label2">Challenge</label>
                        <label for="tab3" id="label3">Unlockables</label><br/>
                    </li>
                    <li>
                        <input type="radio" checked name="tabs" id="tab1">
                        <div id="tab-content1" class="tab-content"><br/>
                            <?php
                                echo file_get_contents("https://spreadsheets.google.com/tq?tqx=out:html&tq=SELECT%20B%2CC%20ORDER%20BY%20C%20DESC%2C%20B%20ASC%20LIMIT%2010%0A&key=1jxu_-FvWdRQT_SSnDS8CY-mBTeHgq_CV7THxCRwbITc&gid=0");
                            ?>
                        </div><br/>
                    </li>
                    <li>
                        <input type="radio" name="tabs" id="tab2">
                        <div id="tab-content2" class="tab-content">
                            <?php
                                echo file_get_contents("https://docs.google.com/spreadsheets/d/1q43CKVF9EhCKDZGA3OGlwDoXJgG1EkBwJznnagBxWgQ/gviz/tq?tqx=out:html&tq=SELECT+B,C,D+ORDER+BY+D+DESC,+C+DESC+LIMIT+10&gid=0");
                            ?>
                        </div><br/>
                    </li>
                    <li>
                        <input type="radio" name="tabs" id="tab3">
                        <div id="tab-content3" class="tab-content">
                            <p>&#11088</p>
                            <p>10 wins in a row!</p><br/>
                            <br/>
                            <p>&#128273</p>
                            <p>10 wins without undo/clear!</p>
                            <br/>
                            <p>&#127942</p>
                            <p>50 wins in a row!!!</p>
                        </div><br/>
                    </li>
                </ul>
                <a href = "/index.html"><div class = "navigation return"></div></a>
            </center>
        </div>
    </body>
</html>