import{key} from './ignore2.js';


function chosenState() {
    let chosenInput = document.getElementById("selectCity");
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
        if (select != null) {
            select.remove();
            labelState.remove();
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
        let selectCountry = document.getElementById('selectCountry');
        if (selectCountry!=null) {           
            selectFather.appendChild(labelCountry);
            selectFather.appendChild(selectCountry);
        }
        


        for (let i = 0; i<response.data.length; i++){
            let opt = document.createElement('option');
            opt.value = response.data[i].state;
            opt.innerHTML = response.data[i].state;
            select.appendChild(opt);
        }
        chosenCity(chosenInput.value,select.value);
    }


   
}
function chosenCity(country,state){
    let chosenStateElement = document.getElementById("selectState");
    if (chosenStateElement == null) {
        return;
    }
        chosenStateElement.addEventListener('change', getCity);
        function getCity(e) {
            e.preventDefault();
            let xhr = new XMLHttpRequest();
            xhr.open('GET',`http://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=`+key,true);
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
    let selectCountry = document.getElementById('selectCountry');
    let labelCountry = document.getElementById('labelCountry');           
    if (selectCountry != null) {
        selectCountry.remove();
        labelCountry.remove();
    }
    labelCountry = document.createElement('label');
    labelCountry.innerHTML="Choose a City";
    labelCountry.style.paddingTop = "10px";
    labelCountry.id = "labelCountry";
    selectCountry = document.createElement('select');
    selectCountry.className = "form-control";
    selectCountry.id=  "selectCountry";
    selectFather.appendChild(labelCountry);
    selectFather.appendChild(selectCountry);
    

    for (let i = 0; i<response.data.length; i++){
        let opt = document.createElement('option');
        opt.value = response.data[i].city;
        opt.innerHTML = response.data[i].city;
        selectCountry.appendChild(opt);
    }
}

chosenState();
