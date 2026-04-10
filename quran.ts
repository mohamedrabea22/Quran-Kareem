const SelectReader: HTMLInputElement = document.getElementById('SelectReader') as HTMLInputElement
const body: HTMLBodyElement = document.body as HTMLBodyElement
const selectNovel: HTMLInputElement = document.getElementById('selectNovel') as HTMLInputElement
const SuratAl_Quran: HTMLInputElement = document.getElementById('SuratAl_Quran') as HTMLInputElement
const erorr_in_network: HTMLDivElement = document.getElementById('erorr_in_network') as HTMLDivElement
const ContinerContent: HTMLDivElement = document.getElementById('ContinerContent') as HTMLDivElement
const rewayh_dont_complete: HTMLDivElement = document.getElementById('rewayh_dont_complete') as HTMLDivElement
const btn_rewayh_dont_complete: HTMLButtonElement = document.getElementById('btn_rewayh_dont_complete') as HTMLButtonElement
const overlay: HTMLDivElement = document.getElementById('overlay') as HTMLDivElement
const loader: HTMLDivElement = document.getElementById('loader') as HTMLDivElement


const ApiUrlReciters: string = 'https://mp3quran.net/api/v3/reciters'

const lang: string = 'ar'




// interfaces


interface ApiResponse {
    reciters: reciters[],
}

interface reciters {
    id: string,
    name: string,
    moshaf: moshaf[],
}

interface moshaf {
    name: string,
    id: number,
    surah_list: string,
    server: string,
}



// reciters القارئ
const optionReader: HTMLOptionElement = document.getElementById('optionReader') as HTMLOptionElement


optionReader.style.display = 'none'



async function getReciters() {

    const response: Response = await fetch(`${ApiUrlReciters}`)
    const getData: ApiResponse = await response.json()

    for (let i: number = 0; i < getData.reciters.length; i++) {
        SelectReader.innerHTML += `<option value="${getData.reciters[i].id}">${getData.reciters[i].name}</option>`

    }


}
getReciters().catch(_ => {
    ContinerContent.style.display = 'none'
    erorr_in_network.style.display = 'flex'

})


// __________________________________________________________________________________


// Noval الروايه

const optionNoval: HTMLOptionElement = document.getElementById('optionNoval') as HTMLOptionElement

SelectReader.onchange = async function (e: Event) {

    const target = e.target as HTMLSelectElement;
    console.log(target.value)
    const response: Response = await fetch(`https://www.mp3quran.net/api/v3/reciters?language=ar&reciter=${target.value}`)
    const getData: ApiResponse = await response.json()
    selectNovel.innerHTML = `  <option>اختر روايه</option>`

    for (let i: number = 0; i < getData.reciters[0].moshaf.length; i++) {

        selectNovel.innerHTML += `  <option value="${getData.reciters[0].moshaf[i].id}" data-surah_list="${getData.reciters[0].moshaf[i].surah_list}" data-server="${getData.reciters[0].moshaf[i].server}">${getData.reciters[0].moshaf[i].name}</option>`


    }
    loader.style.display = 'block'

}



selectNovel.onchange = function (e: Event) {
    const target = e.target as HTMLSelectElement
    const selectedIndex = target.selectedIndex
    const selectNovelOption: HTMLOptionElement = target.options[selectedIndex];

    const surah_list: any = selectNovelOption.dataset.surah_list
    const server: any = selectNovelOption.dataset.server
    // // الروايه
    // console.log(server)
    // // console.log(surah_list)
    // console.log(selectNovel.value.length)
    loader.style.display = 'none'
    getSurah(surah_list, server)


}


interface ApiResponse2 {
    suwar: suwar[],
}
interface suwar {
    name: string,
    id: number,
}






async function getSurah(surah_list: string, server: string) {
    const linkApisurah: Response = await fetch(`https://mp3quran.net/api/v3/suwar`)
    const getData: ApiResponse2 = await linkApisurah.json()
    const surahlist: string[] = surah_list.split(',')


    SuratAl_Quran.innerHTML = `  <option >اختر سورة القرأن</option>`

    let num: number | string = '00'

    for (let i: number = 0; i < surahlist.length; i++) {

        if (getData.suwar[i].id == Number(surahlist[i])) {


            if (getData.suwar[i].id == 100) {
                num = ''
            }
            else if (getData.suwar[i].id == 10) {
                num = '0'
            }



            SuratAl_Quran.innerHTML += `  <option id="optionSuratAl_Quran" value="${server}${num}${getData.suwar[i].id}.mp3">${getData.suwar[i].name}</option>`

        }
        else if (getData.suwar[i].id != Number(surahlist[i])) {
            rewayh_dont_complete.style.display = 'flex'
            overlay.style.display = 'block'
            SuratAl_Quran.innerHTML = `  <option >اختر سورة القرأن</option>`
            body.style.overflow = 'hidden'
        }


    }



    SuratAl_Quran.onchange = function (e: Event): void {
        const target = e.target as HTMLSelectElement
        const selectedIndex = target.selectedIndex
        const selectoptionSuratAl_Quran: HTMLOptionElement = target.options[selectedIndex];
        const server: any = selectoptionSuratAl_Quran.value
        playsurah(server)
    }




}


btn_rewayh_dont_complete.onclick = function (): void {
    rewayh_dont_complete.style.display = 'none'
    overlay.style.display = 'none'
    SuratAl_Quran.innerHTML = `  <option >اختر سورة القرأن</option>`
    body.style.overflow = 'auto'
}




function playsurah(surahMp3: string): void {
    const audio: HTMLAudioElement = document.getElementById('audio') as HTMLAudioElement
    audio.src = surahMp3
    console.log(surahMp3)
    audio.play()


}



// body.onscroll = function (): void {

//     if (window.scrollY >= 510) {
//         window.document.body.style.setProperty('--scrollbar-thumb-color', '#020617')

//     } else { window.document.body.style.setProperty('--scrollbar-thumb-color', '#a16207') }

// }

