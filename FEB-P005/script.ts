function getJoke(): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch('https://v2.jokeapi.dev/joke/Any?type=single')
      .then(response => response.json())
      .then(data => {
        if (data.joke) {
          resolve(data.joke);
        } else {
          reject('Não foi possível obter uma piada.');
        }
      })
      .catch(error => reject(error));
  });
}

function getWeatherForecast(): Promise<string> {
  const apiKey = 'dfc6e6f95cb1b848d967fa9239a0fbae';
  const cidade = 'Ilheus';

  return new Promise((resolve, reject) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.weather && data.weather.length > 0) {
          const description = data.weather[0].description;
          resolve(`A previsão do tempo em ${cidade} é: ${description}`);
        } else {
          reject('Não foi possível obter a previsão do tempo.');
        }
      })
      .catch(error => reject(error));
  });
}

function preencherNoticiasComPiada(piada: string) {
  const noticiasElement = document.getElementById('noticias');

  if (noticiasElement) {
    const piadaElement = document.createElement('p');
    piadaElement.textContent = piada;

    noticiasElement.appendChild(piadaElement);
  } else {
    console.error('Elemento de notícias não encontrado.');
  }
}

async function getCountryInfo(): Promise<string> {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();

    const randomCountry = data[Math.floor(Math.random() * data.length)];
    const countryName = randomCountry.name.common;
    const capital = randomCountry.capital[0];

    return `País: ${countryName} | Capital: ${capital}`;
  } catch (error) {
    console.error('Erro ao obter informações sobre países:', error);
    return 'Não foi possível obter informações sobre países.';
  }
}

async function getRandomDogImages(amount = 3) {
  try {
    const response = await fetch(`https://dog.ceo/api/breeds/image/random/${amount}`);
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Erro ao obter imagens de cachorro:', error);
    return [];
  }
}

async function preencherDestaquesComImagens() {
  try {
    const imagens = await getRandomDogImages();
    const destaqueElement = $('.destaque-carousel');

    if (destaqueElement && imagens.length > 0) {
      imagens.forEach(imagemUrl => {
        destaqueElement.slick('slickAdd', `<img src="${imagemUrl}" alt="Imagem Aleatória de Cachorro">`);
      });
    } else {
      console.error('Elemento de destaques não encontrado ou imagens não obtidas.');
    }
  } catch (error) {
    console.error('Erro ao preencher destaques com imagens:', error);
  }
}

async function preencherQuadrosAleatorios() {
  const noticiasElement = document.getElementById('noticias');
  if (noticiasElement) {
    const piada = await getJoke();
    const piadaElement = document.createElement('p');
    piadaElement.textContent = piada;
    noticiasElement.appendChild(piadaElement);
  }

  preencherQuadroServicos();

  const resultadosElement = document.querySelector('.resultados');
  if (resultadosElement) {
    const infoPais = await getCountryInfo();
    const infoPaisElement = document.createElement('p');
    infoPaisElement.textContent = infoPais;
    resultadosElement.appendChild(infoPaisElement);
  }

  preencherDestaquesComImagens();
}

document.addEventListener('DOMContentLoaded', preencherQuadrosAleatorios);

async function preencherQuadroServicos() {
  const quadroServicosElement = document.querySelector('.servicos h3');
  const previsaoTempoElement = document.createElement('p');
  previsaoTempoElement.id = 'previsao-tempo';

  if (quadroServicosElement) {
    try {
      const previsaoTempo = await getWeatherForecast();
      previsaoTempoElement.textContent = previsaoTempo;
      quadroServicosElement.parentNode.appendChild(previsaoTempoElement);
    } catch (error) {
      console.error('Erro ao preencher o quadro de Serviços:', error);
    }
  } else {
    console.error('Elemento não encontrado.');
  }
}
