import{key} from './ignore2.js';


function chosenState() {
    let chosenInput = document.getElementById("selectCountry");
    chosenInput.addEventListener('change', getState);

    function getState(e){
        let country = chosenInput.value;
        e.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('GET',`http://api.airvisual.com/v2/states?country=${country}&key=`+key,true);
        xhr.onload = function () {
            if (this.status == 200) {
                const response = JSON.parse(this.responseText);
                changeDom(response);
            }

        }
        xhr.send();
    }

    function changeDom(response) {
        let selectFather = document.getElementById("state");
        let select = document.getElementById('selectState')
        let labelState = document.getElementById('labelState');
        let selectCity = document.getElementById('selectCity');           
        if (select != null) {
            select.remove();
            labelState.remove();
            selectCity.remove();
            labelCity.remove();
        }
        labelState = document.createElement('label');
        labelState.innerHTML="Choose a State";
        labelState.style.paddingTop = "10px";
        labelState.id = "labelState";
        select = document.createElement('select');
        select.className = "form-control";
        select.id=  "selectState";
        selectFather.appendChild(labelState);
        selectFather.appendChild(select);

        


        for (let i = 0; i<response.data.length; i++){
            let opt = document.createElement('option');
            opt.value = response.data[i].state;
            opt.innerHTML = response.data[i].state;
            select.appendChild(opt);
        }
        chosenCity(chosenInput,select);
    }


   
}
function chosenCity(country,state){
    if (state == null) {
        return;
    }
    state.addEventListener('change', getCity);
        function getCity(e) {
            e.preventDefault();
            let xhr = new XMLHttpRequest();
            xhr.open('GET',`http://api.airvisual.com/v2/cities?state=${state.value}&country=${country.value}&key=`+key,true);
            xhr.onload = function () {
            if (this.status == 200) {
                const response = JSON.parse(this.responseText);
                //console.log(response);
                changeDom2(response);
            }

        }
        xhr.send();
            
        } 
}
//make one changeDom function, this is awful
function changeDom2(response) {
    let selectFather = document.getElementById("state");
    let selectCity = document.getElementById('selectCity');
    let labelCity = document.getElementById('labelCity');           
    if (selectCity != null) {
        selectCity.remove();
        labelCity.remove();
    }
    labelCity = document.createElement('label');
    labelCity.innerHTML="Choose a City";
    labelCity.style.paddingTop = "10px";
    labelCity.id = "labelCity";
    selectCity = document.createElement('select');
    selectCity.className = "form-control";
    selectCity.id=  "selectCity";
    selectFather.appendChild(labelCity);
    selectFather.appendChild(selectCity);
    

    for (let i = 0; i<response.data.length; i++){
        let opt = document.createElement('option');
        opt.value = response.data[i].city;
        opt.innerHTML = response.data[i].city;
        selectCity.appendChild(opt);
    }
}

chosenState();
