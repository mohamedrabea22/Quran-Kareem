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
const SelectReader = document.getElementById('SelectReader');
const body = document.body;
const selectNovel = document.getElementById('selectNovel');
const SuratAl_Quran = document.getElementById('SuratAl_Quran');
const erorr_in_network = document.getElementById('erorr_in_network');
const ContinerContent = document.getElementById('ContinerContent');
const rewayh_dont_complete = document.getElementById('rewayh_dont_complete');
const btn_rewayh_dont_complete = document.getElementById('btn_rewayh_dont_complete');
const overlay = document.getElementById('overlay');
const loader = document.getElementById('loader');
const ApiUrlReciters = 'https://mp3quran.net/api/v3/reciters';
const lang = 'ar';
// reciters القارئ
const optionReader = document.getElementById('optionReader');
optionReader.style.display = 'none';
function getReciters() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${ApiUrlReciters}`);
        const getData = yield response.json();
        for (let i = 0; i < getData.reciters.length; i++) {
            SelectReader.innerHTML += `<option value="${getData.reciters[i].id}">${getData.reciters[i].name}</option>`;
        }
    });
}
getReciters().catch(_ => {
    ContinerContent.style.display = 'none';
    erorr_in_network.style.display = 'flex';
});
// __________________________________________________________________________________
// Noval الروايه
const optionNoval = document.getElementById('optionNoval');
SelectReader.onchange = function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        const target = e.target;
        console.log(target.value);
        const response = yield fetch(`https://www.mp3quran.net/api/v3/reciters?language=ar&reciter=${target.value}`);
        const getData = yield response.json();
        selectNovel.innerHTML = `  <option>اختر روايه</option>`;
        for (let i = 0; i < getData.reciters[0].moshaf.length; i++) {
            selectNovel.innerHTML += `  <option value="${getData.reciters[0].moshaf[i].id}" data-surah_list="${getData.reciters[0].moshaf[i].surah_list}" data-server="${getData.reciters[0].moshaf[i].server}">${getData.reciters[0].moshaf[i].name}</option>`;
        }
        loader.style.display = 'block';
    });
};
selectNovel.onchange = function (e) {
    const target = e.target;
    const selectedIndex = target.selectedIndex;
    const selectNovelOption = target.options[selectedIndex];
    const surah_list = selectNovelOption.dataset.surah_list;
    const server = selectNovelOption.dataset.server;
    // // الروايه
    // console.log(server)
    // // console.log(surah_list)
    // console.log(selectNovel.value.length)
    loader.style.display = 'none';
    getSurah(surah_list, server);
};
function getSurah(surah_list, server) {
    return __awaiter(this, void 0, void 0, function* () {
        const linkApisurah = yield fetch(`https://mp3quran.net/api/v3/suwar`);
        const getData = yield linkApisurah.json();
        const surahlist = surah_list.split(',');
        SuratAl_Quran.innerHTML = `  <option >اختر سورة القرأن</option>`;
        let num = '00';
        for (let i = 0; i < surahlist.length; i++) {
            if (getData.suwar[i].id == Number(surahlist[i])) {
                if (getData.suwar[i].id == 100) {
                    num = '';
                }
                else if (getData.suwar[i].id == 10) {
                    num = '0';
                }
                SuratAl_Quran.innerHTML += `  <option id="optionSuratAl_Quran" value="${server}${num}${getData.suwar[i].id}.mp3">${getData.suwar[i].name}</option>`;
            }
            else if (getData.suwar[i].id != Number(surahlist[i])) {
                rewayh_dont_complete.style.display = 'flex';
                overlay.style.display = 'block';
                SuratAl_Quran.innerHTML = `  <option >اختر سورة القرأن</option>`;
                body.style.overflow = 'hidden';
            }
        }
        SuratAl_Quran.onchange = function (e) {
            const target = e.target;
            const selectedIndex = target.selectedIndex;
            const selectoptionSuratAl_Quran = target.options[selectedIndex];
            const server = selectoptionSuratAl_Quran.value;
            playsurah(server);
        };
    });
}
btn_rewayh_dont_complete.onclick = function () {
    rewayh_dont_complete.style.display = 'none';
    overlay.style.display = 'none';
    SuratAl_Quran.innerHTML = `  <option >اختر سورة القرأن</option>`;
    body.style.overflow = 'auto';
};
function playsurah(surahMp3) {
    const audio = document.getElementById('audio');
    audio.src = surahMp3;
    console.log(surahMp3);
    audio.play();
}
// body.onscroll = function (): void {
//     if (window.scrollY >= 510) {
//         window.document.body.style.setProperty('--scrollbar-thumb-color', '#020617')
//     } else { window.document.body.style.setProperty('--scrollbar-thumb-color', '#a16207') }
// }
