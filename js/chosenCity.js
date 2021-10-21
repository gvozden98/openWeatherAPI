import{key} from './ignore2.js';

function chosenState() {
    let chosenInput = document.getElementById("selectCity");
    chosenInput.addEventListener('change', getState);

    function getState(e){
        let state = chosenInput.value;
        e.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('GET',`http://api.airvisual.com/v2/states?country=${state}&key=`+key,true);
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
        labelState.innerHTML="Choose a state";
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
    }

    let chosenState = document.getElementById("selectState");
    chosenState.addEventListener('change', getCity);

    function getCity() {
        getAsync(`http://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=${key}`).then(data =>{
                changeDom2(data);
            })
    }


}

async function getAsync(url) {
    let response = await fetch(url);
    let data= await response.json();
    console.log(data);
    return data
}

function changeDom2(data) {
    
}

chosenCity();