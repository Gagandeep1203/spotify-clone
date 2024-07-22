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
  // Select the <ul> element with class "songlis" (assuming it exists in your HTML)
  let songul = document.querySelector(".songlis").getElementsByTagName("ul")[0];

  // Clear previous content if necessary
  songul.innerHTML = "";

  // Iterate over each song in 'aud' array and generate <li> elements
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
    cd.innerHTML += `<div class="card">
<div class="pla"><img src="greenplay.svg" alt="" /></div>
<img 
  src= "heroicons-music_note-circle_cloudly.svg"
  alt="img"
/> 
<div class ="hide " style="overflow-x: hidden;">
<h2>${song.replaceAll("%20", " ")}</h2> </div>

 
</div>`;
  }

  songul.querySelectorAll("li").forEach((li, index) => {
    li.addEventListener("click", () => {
      // Retrieve the song URL and trim it if necessary
      let songUrl = aud[index].trim();
      playPauseSong(songUrl);
    });
  });

  Array.from(document.getElementsByClassName("card")).forEach((div, index) => {
    div.addEventListener("click", () => {
      // Retrieve the song URL and trim it if necessary
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
}

function playPauseSong(songUrl) {
  // Check if the selected song is the same as the currently playing song
  if (currentSongUrl === songUrl) {
    // If it's the same song, toggle play/pause
    if (currentAudio.paused) {
      currentAudio.play();
    } else {
      currentAudio.pause();
    }
  } else {
    // If it's a different song, pause the current song (if any) and play the new one
    if (currentAudio) {
      currentAudio.pause();
    }
    currentAudio = new Audio("/mussic/" + songUrl);
    currentAudio.play();
    currentSongUrl = songUrl;

    // Add event listener to reset currentAudio when the song ends
    currentAudio.addEventListener("ended", () => {
      currentAudio = null;
      currentSongUrl = "";
    });
  }
}

main();
/*#box {
  background: orange;
  height: 180px;
  width: 400px;
  margin: 10px -400px;
  -webkit-animation-name: move;
  -webkit-animation-duration: 4s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: right;
  -webkit-animation-timing-function: linear;
}

#box:hover {
  -webkit-animation-play-state: paused;
}

@-webkit-keyframes move {
  0% {
    margin-left: -400px;
  }
  100% {
    margin-left: 800px;
  }
}*/
