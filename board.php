<!DOCTYPE>
<html>
    <head>
        <title>Leaderboard</title>
        <link rel="stylesheet" type="text/css" href="styles/styles.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="js/Navigation.js"></script>
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
                    <li class="labels">                        <br/><br/><br/><br/>

                        <label for="tab1" id="label1" text-align="center">Scoreboard</label>
                        <label for="tab2" id="label2">Challenge</label><br/>
                    </li>
                    <li>
                        <input type="radio" checked name="tabs" id="tab1">
                        <div id="tab-content1" class="tab-content">
                            <?php
                                echo file_get_contents("https://spreadsheets.google.com/tq?tqx=out:html&tq=SELECT%20B%2CC%20ORDER%20BY%20C%20DESC%2C%20B%20ASC%20LIMIT%2010%0A&key=1jxu_-FvWdRQT_SSnDS8CY-mBTeHgq_CV7THxCRwbITc&gid=0");
                            ?>
                        </div><br/>
                    </li>
                    <li>
                        <input type="radio" name="tabs" id="tab2">
                        <div id="tab-content2" class="tab-content">
                            <?php
                                echo file_get_contents("https://spreadsheets.google.com/tq?tqx=out:html&tq=SELECT%20B%2CC%2CD%20ORDER%20BY%20D%20DESC%2C%20C%20DESC%20LIMIT%2010&key=1FqdcKIYFWrmFpRDSdiviI8bEQQgX-lVUI6iCJ6MXaus&gid=63438493");
                            ?>
                        </div><br/>
                    </li>
                </ul>
                <a href = "/index.html"><div class = "navigation return"></div></a>
            </center>
        </div>
    </body>
</html>