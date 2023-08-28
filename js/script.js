//Magnetometer


if (window.DeviceOrientationEvent && window.DeviceMotionEvent) {
    window.addEventListener('deviceorientation', function(event) {
        const absolute = event.absolute;
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;
        console.log(`Absolute: ${absolute}, Alpha: ${alpha}, Beta: ${beta}, Gamma: ${gamma}`);
    });
} else {
    console.log('Magnetometer wordt niet ondersteund in deze browser.');
}


//gps ophalen

const getLocationButton = document.getElementById('get-location');
const locationElement = document.getElementById('location');


getLocationButton.addEventListener('click', () => {

    if ('geolocation' in navigator) {

        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            locationElement.textContent = `GPS-locatie: Latitude ${latitude}, Longitude ${longitude}`;
        }, function (error) {

            locationElement.textContent = `Fout bij het ophalen van de locatie: ${error.message}`;
        });
    } else {
  
        locationElement.textContent = 'Geolocation wordt niet ondersteund in deze browser.';
    }
});








const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Microsoft Deana Online (Natural) - Dutch (Belgium) (nl-BE)" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});






