console.log("js here");
async function gesongs() {
  let a = await fetch("http://127.0.0.1:5500/css/mussic/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;

  let as = div.getElementsByTagName("a");
  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("mussic")[1]);
    }
  }

  return songs;
}
async function main() {
  let aud = await gesongs();
  console.log(aud);

  //var audio = new Audio(aud[0]);
  //audio.play();
  // Assuming 'aud' is an object containing songs or an array of song names

  // Select the <ul> element with class "songlis" (assuming it exists in your HTML)
  let songul = document.querySelector(".songlis").getElementsByTagName("ul")[0];

  // Iterate over each property in the 'aud' object (assuming 'aud' is an object)
  for (const key in aud) {
    if (aud.hasOwnProperty(key)) {
      songul.innerHTML += `<li>${aud[key].replaceAll("%20", " ")}</li>`;
    }
  }
}

main();
