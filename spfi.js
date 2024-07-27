console.log("js here");

async function gesongs() {
  try {
    let response = await fetch("http://127.0.0.1:5501/mussic/");
    let htmlContent = await response.text();
    let div = document.createElement("div");
    div.innerHTML = htmlContent;

    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
      const element = as[index];
      if (element.href.endsWith(".mp3")) {
        songs.push(element.href.split("mussic/")[1]);
      }
    }

    return songs;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return []; // Return empty array if there's an error
  }
}

var currentAudio = null;
var currentSongUrl = "";

async function main() {
  let aud = await gesongs();
  console.log(aud);
  let cd = document.querySelector(".cards");
  cd.innerHTML = "";
  let songul = document.querySelector(".songlis ul");

  songul.innerHTML = "";

  for (const song of aud) {
    songul.innerHTML += `
      <li>
        <div style="display: flex; gap: 10px; padding: 10px">
          <img class="headphns inver" src="headphns.svg" alt="" />
          <div class="info">
            <div style="font-size: 8px;">${song.replaceAll("%20", " ")}</div>
            <div style="font-size: 9px;">artist name</div>
          </div>
        </div>
        <div class="planow">
          <span style="font-weight: bold;">play now</span>
          <img class="plicon inver" src="plasng.svg" alt="" />
        </div>
      </li>`;
    cd.innerHTML += `
      <div class="card">
        <div class="pla"><img src="greenplay.svg" alt="" /></div>
        <img src="heroicons-music_note-circle_cloudly.svg" alt="img"/>
        <div class="hide" style="overflow-x: hidden;">
          <h2>${song.replaceAll("%20", " ")}</h2>
        </div>
      </div>`;
  }

  songul.querySelectorAll("li").forEach((li, index) => {
    li.addEventListener("click", () => {
      let songUrl = aud[index].trim();
      playPauseSong(songUrl);
    });
  });

  Array.from(document.getElementsByClassName("card")).forEach((div, index) => {
    div.addEventListener("click", () => {
      let songUrl = aud[index].trim();
      playPauseSong(songUrl);
    });
  });

  document.querySelector(".plabar .plabn").addEventListener("click", () => {
    if (currentAudio.paused) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }
  });

  document.querySelector(".plabar .plaprev").addEventListener("click", () => {
    if (currentAudio.paused) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }
  });

  let crs = document.querySelector(".cross");
  crs.addEventListener("click", () => {
    document.querySelector(".lef").style.left = "-100%";
  });

  let ham = document.querySelector(".ham");
  ham.addEventListener("click", () => {
    document.querySelector(".lef").style.left = "0";
    document.querySelector(".lef").style.zIndex = "1";
    Array.from(document.getElementsByClassName("info")).forEach((element) => {
      element.style.display = "block";
    });
    document.querySelector(".lef").style.width = "50vh";
  });
}

function playPauseSong(songUrl, element) {
  if (currentSongUrl === songUrl) {
    if (currentAudio.paused) {
      currentAudio.play();
      updateIcon(element, true);
    } else {
      currentAudio.pause();
      updateIcon(element, false);
    }
  } else {
    if (currentAudio) {
      currentAudio.pause();
    }
    currentAudio = new Audio("/mussic/" + songUrl);
    currentAudio.play();
    currentSongUrl = songUrl;

    currentAudio.addEventListener("ended", () => {
      updateIcon(element, true);
      currentAudio = null;
      currentSongUrl = "";
    });
  }

  function updateIcon(element, isPlaying) {
    const icon =
      element.querySelector(".plicon") || element.querySelector(".pla img");
    if (icon) {
      icon.src = isPlaying ? "pause.svg" : "plasng.svg";
    }
  }
}

main();
