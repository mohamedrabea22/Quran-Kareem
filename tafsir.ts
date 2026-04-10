const selectTafsir: HTMLSelectElement = document.getElementById('selectTafsir') as HTMLSelectElement
const optionTafasir: HTMLOptionElement = document.getElementById('optionTafasir') as HTMLOptionElement
const nameParagraph: HTMLParagraphElement = document.getElementById('name') as HTMLParagraphElement

const linkApi: string = `https://mp3quran.net/api/v3/tafsir`


interface ApiRes {
    tafasir: tafasir,
  
    
}

interface tafasir {

    name : string , 
    soar : soar[],
}

interface soar {
    name: string,
    id: number,
    sura_id : number ,
    url : string ,
}



async function getNameTafasir(){
    const res: Response  = await  fetch(linkApi)
    const getData: ApiRes = await res.json()
    nameParagraph.innerHTML = `«${getData.tafasir.name}»` 
    
    for(let i : number = 0 ; i < getData.tafasir.soar.length; i++){
        // const option: HTMLOptionElement = document.createElement('option')
        // selectTafsir.appendChild(option).innerHTML += ` <option id="optionTafasir" value="${getData.tafasir.soar[i].sura_id}" data-server="${getData.tafasir.soar[i].url}"> ${getData.tafasir.soar[i].name}</option>`
        selectTafsir.innerHTML += ` <option id="optionTafasir" value="${getData.tafasir.soar[i].sura_id}" data-server="${getData.tafasir.soar[i].url}"> ${getData.tafasir.soar[i].name}</option>`
    }

}
getNameTafasir().catch(_ => {
    ContinerContent.style.display = 'none'
    erorr_in_network.style.display = 'flex'

})



const audio: HTMLAudioElement = document.getElementById('audio') as HTMLAudioElement
selectTafsir.onchange = function(e : Event){
    const target = e.target as HTMLSelectElement
    const selectedIndex : number = target.selectedIndex
    
    const optionTafasir: HTMLOptionElement = target.options[selectedIndex];
    nameParagraph.innerHTML = `تفسير: ${optionTafasir.innerHTML}`
    const server: any = optionTafasir.dataset.server
    audio.src = server
    audio.play()
    if (selectedIndex == 0) {
        nameParagraph.innerHTML = `الخلاصة من تفسير الطبري`
    }

}