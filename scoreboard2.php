<head>
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
        padding: 5px;
    }

    tr:nth-child(even){
        background-color: #D6FFCD
    }

    tr:nth-child(odd){
        background-color: #2EFF00
    }

</style>

<body>
    <div id= "background">
        <div id= "page">
            <title>Leaderboard 2</title>

            <header>
                <br/>
                <h1 align="center">Leaderboard 2</h1>
                <br/>
            </header>

            <center>
                <?php
                    echo file_get_contents("https://spreadsheets.google.com/tq?tqx=out:html&tq=SELECT%20B%2CC%2CD%20ORDER%20BY%20D%20DESC%2C%20C%20DESC%20LIMIT%2010&key=1FqdcKIYFWrmFpRDSdiviI8bEQQgX-lVUI6iCJ6MXaus&gid=63438493");
                ?><br/>
                <br/>
                <a href = "http://comp2910.azurewebsites.net/"><div class = "returnbutton"></div></a> <br/>
            </center>
        </div>
    </div>
</body>
