// DOG PROJECT

const dogButton = document.getElementById('dogBtn');

dogButton.addEventListener('click', function () {
    const image = document.getElementById('dogImage');

    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            image.src = data.message;

            addRequestToCarousel(data);
        })
        .catch(error => console.log(error));
});

// WEATHER PROJECT

const weatherForm = document.getElementById('weatherForm');

weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const city = document.getElementById('city').value;

    fetch(`https://goweather.herokuapp.com/weather/${city}`)
        .then(response => response.json())
        .then(data => {
            const description = document.getElementById('weatherDescription');
            const temperature = document.getElementById('weatherTemperature');
            const wind = document.getElementById('weatherWind');

            description.innerHTML = `${city} weather: <strong>${data.description}</strong>`;
            temperature.innerHTML = `${city} temperature: <strong>${data.temperature}</strong>`;
            wind.innerHTML = `${city} wind speed: <strong>${data.wind}</strong>`;

            addRequestToCarousel(data);
        })
        .catch(error => console.log(error));
});

// STRETCH GOALS

const bitcoinForm = document.getElementById('bitcoinForm');

bitcoinForm.addEventListener('submit', function (e) {
    e.preventDefault();

    fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
        .then(response => response.json())
        .then(data => {
            const description = document.getElementById('bitcoinUsd');
            const temperature = document.getElementById('bitcoinEur');

            description.innerHTML = `Bitcoin Price In USD: <strong>$${data.market_data.current_price.usd}</strong>`;
            temperature.innerHTML = `Bitcoin Price In EUR: <strong>${data.market_data.current_price.eur} € </strong>`;

            addRequestToCarousel(data.market_data.current_price);
        })
        .catch(error => console.log(error));
});

function addRequestToCarousel(data) {
    const carouselContent = document.getElementById('carouselInner');

    const carouselItems = document.querySelectorAll('.carousel-item');

    for (let i = 0; i < carouselItems.length; i++) {
        carouselItems[i].classList.remove('active');
    }

    const parent = document.createElement('div');
    parent.className = 'carousel-item active';

    const child = document.createElement('div');
    child.className = 'carousel-request';

    const text = document.createElement('p');
    text.textContent = JSON.stringify(data);

    child.appendChild(text);
    parent.appendChild(child);

    carouselContent.appendChild(parent);
}
