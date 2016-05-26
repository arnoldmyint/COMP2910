<!DOCTYPE>
<html>
<head>
<title>CSS Tabs</title>
<link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>

<h1>Pure CSS Tabs</h1>


    <ul class="tabs">
        <li class="labels">
            <label for="tab1" id="label1">tab 1</label>
            <label for="tab2" id="label2">tab 2</label>
        </li>
        <li>
            <input type="radio" checked name="tabs" id="tab1">
            <div id="tab-content1" class="tab-content">
                <h3>Tab 1</h3>
                <?php
                    echo file_get_contents("https://spreadsheets.google.com/tq?tqx=out:html&tq=SELECT%20B%2CC%20ORDER%20BY%20C%20DESC%2C%20B%20ASC%20LIMIT%2010%0A&key=1jxu_-FvWdRQT_SSnDS8CY-mBTeHgq_CV7THxCRwbITc&gid=0");
            ?><br/>
            </div>
        </li>
        <li>
            <input type="radio" name="tabs" id="tab2">
            <div id="tab-content2" class="tab-content">
                <h3>Tab 2</h3>
                         echo file_get_contents("https://spreadsheets.google.com/tq?tqx=out:html&tq=SELECT%20B%2CC%2CD%20ORDER%20BY%20D%20DESC%2C%20C%20DESC%20LIMIT%2010&key=1FqdcKIYFWrmFpRDSdiviI8bEQQgX-lVUI6iCJ6MXaus&gid=63438493");
                ?><br/>
            </div>
        </li>
    </ul>  

</body>
</html>