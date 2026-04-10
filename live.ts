// import Hls from 'hls.js';

// const btn_sunna: HTMLButtonElement = document.getElementById('btn_sunna') as HTMLButtonElement
// const btn_quran: HTMLButtonElement = document.getElementById('btn_quran') as HTMLButtonElement
// const video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement

// const linkApi: string = 'https://mp3quran.net/api/v3/live-tv?language=eng'


// interface livetv {
// livetv : livetv[],
//    url: string,
// }
//  onload = async function ()  {
//     const getData = await fetch(linkApi)
//     const response = await getData.json()
//     if (Hls.isSupported()) {
//         var hls = new Hls();
//         hls.loadSource(video.src = response.livetv[0].url);
//         hls.attachMedia(video);
//         hls.on(Hls.Events.MANIFEST_PARSED, function () {
//             video.play();
//         });
//     }

// }

// btn_quran.addEventListener('click',async function name()  {
//     const getData : Response = await fetch(linkApi)
//     const response: livetv = await getData.json()
//     if (Hls.isSupported()) {
//         var hls = new Hls();
//         hls.loadSource(video.src = response.livetv[0].url);
//         hls.attachMedia(video);
//         hls.on(Hls.Events.MANIFEST_PARSED, function () {
//             video.play();
//         });
//     }

 
// })
// btn_sunna.addEventListener('click',async function name()  {
//     const getData : Response = await fetch(linkApi)
//     const response: livetv = await getData.json()
//     if (Hls.isSupported()) {
//         var hls = new Hls();
//         hls.loadSource(video.src = response.livetv[1].url);
//         hls.attachMedia(video);
//         hls.on(Hls.Events.MANIFEST_PARSED, function () {
//             video.play();
//         });
//     }

 
// })