<head>
<link rel="stylesheet" type="text/css" href="stylesheet.css">
</head>
<body>
<center>
<div class="tabs">
    
   <div class="tab">
       <input type="radio" id="tab-1" name="tab-group-1" checked>
       <label for="tab-1">Leaderboard</label>
       
       <div class="contentt">
           <?php
                    echo file_get_contents("https://spreadsheets.google.com/tq?tqx=out:html&tq=SELECT%20B%2CC%20ORDER%20BY%20C%20DESC%2C%20B%20ASC%20LIMIT%2010%0A&key=1jxu_-FvWdRQT_SSnDS8CY-mBTeHgq_CV7THxCRwbITc&gid=0");
            ?><br/>
       </div> 
   </div>
    
   <div class="tab">
       <input type="radio" id="tab-2" name="tab-group-1">
       <label for="tab-2">Challenge Mode</label>
       
       <div class="contentt">
           <?php
                    echo file_get_contents("https://spreadsheets.google.com/tq?tqx=out:html&tq=SELECT%20B%2CC%2CD%20ORDER%20BY%20D%20DESC%2C%20C%20DESC%20LIMIT%2010&key=1FqdcKIYFWrmFpRDSdiviI8bEQQgX-lVUI6iCJ6MXaus&gid=63438493");
                ?><br/>
            <br/>
       </div> 
   </div>
</center>
    
</div>
</body>