"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const selectTafsir = document.getElementById('selectTafsir');
const optionTafasir = document.getElementById('optionTafasir');
const nameParagraph = document.getElementById('name');
const linkApi = `https://mp3quran.net/api/v3/tafsir`;
function getNameTafasir() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(linkApi);
        const getData = yield res.json();
        nameParagraph.innerHTML = `«${getData.tafasir.name}»`;
        for (let i = 0; i < getData.tafasir.soar.length; i++) {
            // const option: HTMLOptionElement = document.createElement('option')
            // selectTafsir.appendChild(option).innerHTML += ` <option id="optionTafasir" value="${getData.tafasir.soar[i].sura_id}" data-server="${getData.tafasir.soar[i].url}"> ${getData.tafasir.soar[i].name}</option>`
            selectTafsir.innerHTML += ` <option id="optionTafasir" value="${getData.tafasir.soar[i].sura_id}" data-server="${getData.tafasir.soar[i].url}"> ${getData.tafasir.soar[i].name}</option>`;
        }
    });
}
getNameTafasir().catch(_ => {
    ContinerContent.style.display = 'none';
    erorr_in_network.style.display = 'flex';
});
const audio = document.getElementById('audio');
selectTafsir.onchange = function (e) {
    const target = e.target;
    const selectedIndex = target.selectedIndex;
    const optionTafasir = target.options[selectedIndex];
    nameParagraph.innerHTML = `تفسير: ${optionTafasir.innerHTML}`;
    const server = optionTafasir.dataset.server;
    audio.src = server;
    audio.play();
    if (selectedIndex == 0) {
        nameParagraph.innerHTML = `الخلاصة من تفسير الطبري`;
    }
};
