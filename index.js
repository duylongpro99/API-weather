window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDesciprtion = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let tempSpan = document.querySelector('.tempSpan');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long,lat);
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/54c4624e3c6431e65dc1b383e29473b6/${lat},${long}`;

            fetch(api)
            .then(respone =>{
                return respone.json();
            })
            .then(data=>{
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDesciprtion.textContent = summary;
                locationTimezone = data.timezone;
                setIcons(icon,document.querySelector('.icon'));
                let celius = (temperature-32)*(5/9);
                temperatureSection.addEventListener('click',()=>{
                    if(tempSpan.textContent === "F"){
                        tempSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celius);
                    }else{
                        tempSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                });
            })
        });
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});