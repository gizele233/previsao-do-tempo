"use strict";
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-info");
form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!input || !sectionTempoInfo)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("O local precisa ter pelo menos 3 letras");
        return;
    }
    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=951776e7694bd0a7e04329ecd7844458&units=metric&lang=pt_br`);
        const dados = await resposta.json();
        const info = {
            temperatura: Math.round(dados.main.temp),
            local: dados.name,
            icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
        };
        sectionTempoInfo.innerHTML = `
        <div class="tempo-dados">
            <h2>${info.local}</h2>
            <span>${info.temperatura}°C</span>
        </div>
            <img src="${info.icone}">
    `;
    }
    catch (error) {
        console.log("Deu um erro na obtenção dos dados da API", error);
    }
});
