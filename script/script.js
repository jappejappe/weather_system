const container = document.getElementById("container");
const buscador = document.querySelector("#buscador button");
const error404 = document.getElementById("not_found");
const resultado = document.getElementById("resultado");
const detalhes = document.getElementById("detalhes");

buscador.addEventListener('click', ()=>{
    const API_KEY = "e81b6040c779024fd6466a0e67b4c5bf";
    const cidade = document.querySelector('#buscador input').value;

    if (cidade === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}`).then(response => response.json()).then(json => {
        const detalhes = document.getElementById("detalhes");

        if (json.cod === '404'){
            container.style.height = '400px';
            resultado.style.display = 'none';
            detalhes.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const imagem = document.querySelector('#resultado img');
        const temperatura = document.querySelector('#resultado #temperatura')
        const umidade = document.querySelector('#detalhes #umidade span');
        const vento = document.querySelector('#detalhes #vento span');

        switch(json.weather[0].main){
            case 'Clear':
                imagem.src = '../images/sol.gif';
                break;
            
            case 'Rain':
                imagem.src = '../images/chuva.gif';
                break;

            case 'Snow':
                imagem.src = '../images/neve.gif';
                break;

            case 'Clouds':
                imagem.src = '../images/nuvens.gif';
                break;

            case 'Haze':
                imagem.src = '../images/nevoa.gif';
                break;

            default:
                imagem.src = '';
        }

        console.log(json)

        const weather = json.weather[0].main;
        const humidity = json.main.humidity;
        const temp = json.main.temp;
        const speed = json.wind.speed;

        temperatura.innerHTML = `${parseInt(temp)}<span>ºC</span>`;
        detalhes.innerHTML = `${weather}`;
        umidade.innerHTML = `${humidity}%`;
        vento.innerHTML = `${parseInt(speed)}Km/h`;

        console.log(weather, humidity, temp, speed);

        console.log('Estado antes:', resultado.style.display, detalhes.style.display);

        resultado.style.display = 'block';
        detalhes.style.display = 'block';
        resultado.classList.add('fadeIn');
        detalhes.classList.add('fadeIn');
        container.style.height = '590px';

        console.log('Estado depois:', resultado.style.display, detalhes.style.display);

    });

});
