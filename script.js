let play = document.getElementById("play");
let audioElement = new Audio("songs/0.mp3");
let gif = document.getElementById("gif");
let myProgressBar = document.getElementById("myProgressBar");
let songitems = Array.from(document.getElementsByClassName("songItems"));
let songIndex = 0;
let onGoingSong = document.getElementById("onGoingSong");

let songs = [
  {
    fileName: "Break My Baby",
    fileCover: "covers/break.jpg",
    filePath: "songs/0",
    fileDuration: "04:25",
  },
  {
    fileName: "Champion",
    fileCover: "covers/champion.jpg",
    filePath: "songs/1",
    fileDuration: "03:54",
  },
  {
    fileName: "Fire To The Night",
    fileCover: "covers/fire.jpg",
    filePath: "songs/2",
    fileDuration: "03:10",
  },
  {
    fileName: "For The Glory",
    fileCover: "covers/glory.jpg",
    filePath: "songs/3",
    fileDuration: "04:39",
  },
  {
    fileName: "Kingdom",
    fileCover: "covers/kingdom.jpg",
    filePath: "songs/4",
    fileDuration: "03:22",
  },
  {
    fileName: "Legendary",
    fileCover: "covers/Legendary.jpg",
    filePath: "songs/5",
    fileDuration: "03:50",
  },
  {
    fileName: "Mad World",
    fileCover: "covers/mad-world.jpg",
    filePath: "songs/6",
    fileDuration: "04:16",
  },
  {
    fileName: "Only One",
    fileCover: "covers/only-one.jpg",
    filePath: "songs/7",
    fileDuration: "03:47",
  },
];

//File Fetching

songitems.forEach((item, i) => {
  item.getElementsByClassName("songNames")[0].innerHTML = songs[i].fileName;
  item.getElementsByTagName("img")[0].src = songs[i].fileCover;
  item.getElementsByClassName("timeStamp")[0].innerHTML = songs[i].fileDuration;
});

//Event Listener

Array.from(document.getElementsByClassName("songState")).forEach((e) => {
  e.addEventListener("click", (e) => {
    makeAllStop();
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    songIndex = parseInt(e.target.id);
    audioElement.currentTime = 0;

    // playbutton();

    if (audioElement.paused && audioElement.currentTime <= 0) {
      audioElement.src = `songs/${songIndex}.mp3`;

      audioElement.play();
      onGoingSong.innerText = songs[songIndex].fileName;
      gif.style.opacity = 1;
      e.target.classList.remove("fa-circle-play");
      play.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      play.classList.add("fa-circle-pause");
      console.log("play");
    } else {
      audioElement.pause();
      console.log("pause");
      gif.style.opacity = 0;
      e.target.classList.remove("fa-circle-pause");
      play.classList.remove("fa-circle-pause");
      e.target.classList.add("fa-circle-play");
      play.classList.add("fa-circle-play");
    }
  });
});

play.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    // tap.classList.remove("fa-circle-play");
    // tap.classList.add("fa-circle-pause");

    audioElement.play();
    onGoingSong.innerText = songs[songIndex].fileName;
    gif.style.opacity = 1;
    play.classList.remove("fa-circle-play");
    play.classList.add("fa-circle-pause");
  } else {
    // tap.classList.add("fa-circle-play");
    // tap.classList.remove("fa-circle-pause");
    audioElement.pause();
    gif.style.opacity = 0;
    play.classList.remove("fa-circle-pause");
    play.classList.add("fa-circle-play");
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllStop = () => {
  Array.from(document.getElementsByClassName("songState")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

document.getElementById("next").addEventListener("click", () => {
  console.log("clicked");
  if (songIndex > 7) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  onGoingSong.innerText = songs[songIndex].fileName;
  gif.style.opacity = 1;
  play.classList.remove("fa-circle-play");
  play.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  console.log("clicked");
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  onGoingSong.innerText = songs[songIndex].fileName;
  gif.style.opacity = 1;
  play.classList.remove("fa-circle-play");
  play.classList.add("fa-circle-pause");
});

document.getElementById("reload").addEventListener("click", () => {
  location.reload();
});
