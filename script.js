
//Call by Name
document.getElementById('btnName').addEventListener('click',loadName);
// Listen for the enter key press.
document.getElementById('inputCityName').addEventListener( 'keyup', function (e) {
    if ( e.code === 'Enter' ) {
        loadName();
    }
});

//xhr hardcoded, moze na lepsi nacin 
function loadName() {
    const cityName=document.getElementById('inputCityName');
    const xhr = new XMLHttpRequest();
    xhr.open('Get',`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&appid=db30a0d6b8effaec3310a7703223e2bd`,true);
    xhr.onload = function(){
        if (this.status===200) {
            const response = JSON.parse(this.responseText);
            printData(response);
            const exists = document.getElementById('newImg');
            const icon = response.weather[0].icon;
            if(exists===null){ //Ako slika ne postoji, kreiraj, u suprotnom obrisi pa kreiraj                
                crtImgFinal('insertCard','newImg',icon,'cardResponse');
            }else{
                exists.remove();
                crtImgFinal('insertCard','newImg',icon,'cardResponse');

            }
            const lrt=document.getElementById('alrtid')
            if (lrt!=null) { //ako postoji alert za pogresno upisan grad, obrisi ga
                lrt.remove();
            }            
        }
        else{
            // u suprotnom ga napravi
            if (document.getElementById('alrtid')===null) {
            const inputNameCard =document.getElementById('cardCityName');
            const newAlert = document.createElement('div');
            newAlert.classList.add("alert","alert-danger");
            newAlert.id='alrtid';
            newAlert.textContent='Not a valid name!'
            inputNameCard.insertBefore(newAlert,cityName);
            }
        }
    }
    xhr.send();
}
function printData(response) {
    const element=document.getElementById('cardResponse');
    element.innerHTML = `<h1 class="display-3">${response.name}</h1>${response.weather[0].description}<hr>Temperature: ${Math.floor(response.main.temp)} &#8451;<br>Feels like: ${Math.floor(response.main.feels_like)} &#8451; <br> Humidity: ${response.main.humidity}%<br> Wind speed: ${response.wind.speed}km/h`;
}

function geo() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position){
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getAsync(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=db30a0d6b8effaec3310a7703223e2bd`).then(data =>{                
                visitorWeather(data);
                nextDays(data);
                hourly(data);
            })

        })
    }else{
        alert("geolocation unavailable");
    }
}
//proveri
async function getAsync(url) {
    let response = await fetch(url);
    let data= await response.json();
    console.log(data);
    return data
}
//user weather
function visitorWeather(data) {
    const cityName=document.getElementById('yourLocation');
    const userWeather = document.getElementById('userWeather');
    const dataCityName = data.timezone.split('/');
    crtImgFinal('locationCard','newIMG', data.current.weather[0].icon,'hr2','rounded mx-auto d-block','150px','150px');
    let desc = data.current.weather[0].description;
    desc = desc[0].toUpperCase() + desc.slice(1);
    cityName.innerHTML= `<h1>${dataCityName[1]}</h1><hr><small>${desc}</small>`;
    userWeather.innerHTML = `Current: <b>${Math.floor(data.current.temp)}</b> &#8451;<br> Feels like: ${Math.floor(data.current.feels_like)} &#8451; <br> Wind speed: ${data.current.wind_speed} km/h <br> Humidity: ${data.current.humidity}%`;    
}

// Daily weather
function nextDays(data) {
    const dailyTxt = document.getElementById('dailyTxt');    
    for (let index = 1; index < 4 ; index++) {        
        switch (index) {
            case 1:
                dailyTxt.innerHTML=`${dayOfTheWeek(data.daily[index].dt)}: <h1>${Math.floor(data.daily[index].temp.day)} &#8451;</h1><br>`;
                break;
            case 2:
                dailyTxt.innerHTML+=`${dayOfTheWeek(data.daily[index].dt)}: <h1>${Math.floor(data.daily[index].temp.day)} &#8451;</h1><br>`;
                break;
            case 3:
                dailyTxt.innerHTML+=`${dayOfTheWeek(data.daily[index].dt)}: <h1>${Math.floor(data.daily[index].temp.day)} &#8451;</h1>`;
                break;
        
            default:
                break;
        }
        
    }
    
}
//convert unix to days
function dayOfTheWeek(unixTime) {
    var a = new Date(unixTime*1000);
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dayOfWeek = days[a.getDay()]
    return dayOfWeek;
}

function hourly(data) {    
    let rangeValue = document.getElementById('myRange');
    let hourlyTxt = document.getElementById('hourlyTxt');
    let hourlyDeg = document.getElementById('hourlyDegrees');
    let getHour=unixHourly(data.hourly[1].dt);
    crtImgFinal('testDiv','hourlyImg',data.hourly[1].weather[0].icon,'testhr');
    hourlyTxt.innerHTML=`<p class="display-4">${getHour}</p><span class="h5">${data.hourly[1].weather[0].description}</span>`;     
    hourlyDeg.innerHTML=`<p class="display-4 para">${Math.floor(data.hourly[1].temp)} &#8451;</p>`;
    rangeValue.addEventListener('input',function(){
        let range = event.target.value;
        let getHour = unixHourly(data.hourly[range].dt);
        const exists=document.getElementById('hourlyImg');
        if (exists!=null) {
            exists.remove();
        }
        crtImgFinal('testDiv','hourlyImg',data.hourly[range].weather[0].icon,'testhr');
        hourlyTxt.innerHTML=`<p class="display-4">${getHour}</p> <span class="h5">${data.hourly[range].weather[0].description}</span>`;     
        hourlyDeg.innerHTML=`<p class="display-4 para">${Math.floor(data.hourly[range].temp)} &#8451;</p>`;
    })    
}
//creates an image
function crtImgFinal(container,newId,imgName,insertBeforeId,classNames,height,width) {
    const imgCointainer=document.getElementById(container);
    let newIMG = document.createElement('img');
    newIMG.id=newId;
    newIMG.src=`http://openweathermap.org/img/wn/${imgName}@2x.png`;
    newIMG.className=classNames;
    newIMG.style.height= height;
    newIMG.style.width= width; 
    const before =document.getElementById(insertBeforeId);
    imgCointainer.insertBefore(newIMG,before);
}

//unix to hours
function unixHourly(unixTime) {
    let unix_timestamp = unixTime;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var formattedTime = hours +':00';
    return formattedTime;
}
geo();

