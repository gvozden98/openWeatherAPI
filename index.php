<?php include 'header.php'; ?>
<br>
<div class="container">
  <div class="row">
    <div class="col-md-4" style="margin-bottom: 1em;">
      <div class="card h-100" id="nameCard">
        <div class="card-body" id="cardCityName">
          <h5 class="card-title h2">Choose your city</h5>
          <hr>
          <input class="form-control" type="text" placeholder="City name" id="inputCityName">
          <br>
          <p class="card-text text-center">Access current weather data for any location including over 200,000 cities
            Current weather is frequently updated based on global models and data from more than 40,000 weather stations</p>
          <div class="card-footer">
            <a href="#" class="btn btn-dark color btn-block" id="btnName" type="">Submit</a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4" style="margin-bottom: 1em;">
      <div class="card h-100">
        <div class="card-body" id="locationCard">
          <h5 class="card-title h2 text-center" id="yourLocation">Your Location...</h5>
          <hr id="hr2">
          <p class="card-text" id="userWeather" style="font-size: 19px;">You need to enable your location to view the current weather in your area!</p>
        </div>
      </div>
    </div>
    <div class="col-md-4" style="margin-bottom: 1em;">
      <div class="card h-100">
        <div class="card-body" style="background-color: #D3D3D3;">
          <h5 class="card-title h2 text-center">Next Three Days</h5>
          <hr>
          <p class="card-text text-center" id="dailyTxt">Daily forecast</p>

        </div>
      </div>
    </div>
  </div>
  <div class="row" style="margin-bottom: 1em;">
    <div class="col-sm" style="margin-bottom: 1em;">
      <div class="card text-center ">
        <div class="card-body" id="insertCard">

          <p class="card-text h3" id="cardResponse">Waiting for your entry!</p>
        </div>
        <div class="card-footer text-muted" id="footerTime">

        </div>
      </div>
    </div>
    <div class="col-md-4" style="margin-bottom: 1em;">
      <div class="card h-100">
        <div class="card-body" style="background-color: #D3D3D3;">
          <h5 class="card-title h2 text-center">Hourly</h5>
          <hr>
          <div class="slidecontainer" id="slidecontainerId">
            <input type="range" min="1" max="24" value="1" class="slider" id="myRange">
            <div class="wrapper">
              <div class="container" id="testDiv" style="height: 100px; margin-bottom: 5px;">
                <hr id="testhr">
              </div>
              <div class="container" id="hourlyDegrees">
              </div>
            </div>
            <p class="card-text text-center" id="hourlyTxt"></p>
          </div>

        </div>
        <div class="card-footer text-muted" id="footerTime">

        </div>
      </div>
    </div>

  </div>

  <!-- Footer -->
  <?php include 'footer.php'; ?>


  <!-- Footer -->
  <!-- Optional JavaScript -->
  <script src="script.js"></script>
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->