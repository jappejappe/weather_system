const container = document.getElementById("#container");
const buscador = document.getElementById("#buscador button");
const error404 = document.getElementById("#not_found");
const resultado = document.getElementById("#resultado");
const detalhes = document.getElementById("#detalhes");

search.addEventListener('click', ()=>{
    const API_KEY = "703b44dd379b4c2e947a4a37e1918d3d";
    const cidade = document.querySelector('#buscador input').value;

    if (cidade === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}`).then(response => response.json()).then(json => {
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

        const imagem = document.querySelector('resultado img');
        const temperatura = document.querySelector('resultado #temperatura')
        const detalhes = document.querySelector('resultado #detalhes');
        const umidade = document.querySelector('detalhes #umidade span');
        const vento = document.querySelector('detalhes #vento span');

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

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
        detalhes.innerHTML = `${json.weather[0].detalhes}`;
        umidade.innerHTML = `${json.main.umidade}%`;
        vento.innerHTML = `${parseInt(json.main.vento)}Km/h`;

        resultado.style.display = '';
        detalhes.style.display = '';
        resultado.classList.add('fadeIn');
        detalhes.classList.add('fadeIn');
        container.style.height = '590px';

    });

});
