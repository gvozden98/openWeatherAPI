<?php
/* Add your API key here and remove the require "ignore.php"
   This is done to keep my API key and ip adress hidden when uploading
   The IP is used for testing because its on localhost
*/
//define("KEY", ""); 
define("URL", "http://api.airvisual.com/v2/");

require "ignore.php";

$countries = array();
requestCountries();
function requestCountries()
{

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://api.airvisual.com/v2/countries?key=' . KEY);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $resp = curl_exec($ch);
    //get countries
    if ($e = curl_error($ch)) {
        echo $e;
    } else {
        $decoded = json_decode($resp, true);
        getCountries($decoded);
    }

    curl_close($ch);
}



function getCountries($decoded)
{
    global $countries;
    for ($i = 0; $i < 100; $i++) {
        $countries[$i] = $decoded["data"][strval($i)]["country"];
    }
}




//get user ip

// if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
//     $ip = $_SERVER['HTTP_CLIENT_IP'];
// } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
//     $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
// } else {
//     $ip = $_SERVER['REMOTE_ADDR'];
// }

// dummy ip because on localhost
$ip = "";

//get nearest city data
$closeCity = array();
function nearestCity($ip)
{
    global $closeCity;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://api.airvisual.com/v2/nearest_city?key=' . KEY);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "x-forwarded-for : $ip"
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $resp = curl_exec($ch);
    //get countries
    if ($e = curl_error($ch)) {
        echo $e;
    } else {
        $closeCity = json_decode($resp, true);
        //print_r($decoded);
        //print_r($closeCity["data"]["current"]["pollution"]);
    }

    curl_close($ch);
}
nearestCity($ip);

?>


<?php include "header.php" ?>
<link rel="stylesheet" href="aqStyle.css">
<div class="container">
    <div id="pollutionI">
        <img src="test.svg" alt="Air Pollution chart picture" id="pollutionChart" style="margin-bottom: 10px;border: 1px solid rgba(0, 0, 0, 0.125);">
    </div>
    <div class="card-deck">
        <div class="card bg-light">
            <div class="card-body text-center">
                <div class="form-group">
                    <label for="selectCity">Choose a Country</label>
                    <select class="form-control" id="selectCity">
                        <?php
                        echo $countries[0];
                        foreach ($countries as $country) {
                            echo "<option>$country</option>";
                        }
                        ?>
                    </select>
                </div>
            </div>
        </div>
        <div class="card bg-light">
            <!-- add a function for changing bg color on this card -->
            <div class="card-body text-center d-flex p-2 container" id="pollutionData" style="background-color: #42f55d;">
                <div class="container" id="testiram">
                    <img src="ic-face-green.svg" alt="index picture" id="pollutionEmoji">
                </div>
                <div class="container">
                    <?php
                    $aqiIndex = $closeCity["data"]["current"]["pollution"]["aqius"];
                    echo "<span style=\"font-size: 30px;\">$aqiIndex</span> Aqi";
                    ?>

                </div>
                <div class="container">
                    <?php
                    $city = $closeCity["data"]["city"];
                    $countryN = $closeCity["data"]["country"];
                    echo "<h3>$city, $countryN</h3>";
                    ?>
                </div>
            </div>
        </div>

        <div class="card bg-danger">
            <div class="card-body text-center">
                <p class="card-text">Some text inside the fourth card</p>
            </div>
        </div>
    </div>
</div>
<script src="scrpitAirVisual.js"></script>
<?php include "footer.php" ?>