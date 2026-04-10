const selectRadio: HTMLSelectElement = document.getElementById('selectRadio') as HTMLSelectElement
const nameParag: HTMLParagraphElement = document.getElementById('nameParag') as HTMLParagraphElement
const ApiLink: string = `https://mp3quran.net/api/v3/radios`

interface Api {
    radios: radios[]
}

interface radios {
    name: string,
    url: string,
}

async function getName() {
    const req: Response = await fetch(ApiLink)
    const response: Api = await req.json()
    for (let i: number = 0; i < response.radios.length; i++) {

        const option: HTMLOptionElement = document.createElement('option')
        option.id = 'optionRadio'
        option.setAttribute(`data-server`, response.radios[i].url)
        selectRadio.appendChild(option).innerHTML += `${response.radios[i].name}`

    }


}
getName().catch(_ => {
    ContinerContent.style.display = 'none'
    erorr_in_network.style.display = 'flex'
}
)

const audioRadio: HTMLAudioElement = document.getElementById('audioRadio') as HTMLAudioElement

selectRadio.onchange = function (e: Event) {
    const target: HTMLSelectElement = e.target as HTMLSelectElement
    nameParag.innerHTML = `راديو: ${target.value}`
    const selectedIndex: number = target.selectedIndex
    const optionRadio: HTMLOptionElement = target.options[selectedIndex];
    console.log(optionRadio)
    const server: any = optionRadio.dataset.server
    console.log(server)
    audioRadio.src = server
    audioRadio.play()
    if (selectedIndex == 0) {
        nameParag.innerHTML = `راديو`
    }

}
