//Struktura strony

const app = document.getElementById("app");

const header = document.createElement("header");
app.appendChild(header);

const main = document.createElement("main");
app.appendChild(main);

const footer = document.createElement("footer");
app.appendChild(footer);

//Zawartość header

const logo = document.createElement("section");
header.appendChild(logo);
logo.id ="logo";

const logoImg = document.createElement("img");
logoImg.src ='./media/logo_color.png';
logoImg.id = "logoImg";
logo.alt = "logo";
logo.appendChild(logoImg);

const logoText = document.createElement('p');
logoText.id = 'logoText';
logoText.innerText = "BEAT!";
logo.appendChild(logoText);

const title = document.createElement("section");
header.appendChild(title);
title.id = "title";
title.innerText = "The Virtual Drum Kit Experience";

//Zawartość main

const aside = document.createElement("aside");
main.appendChild(aside);
aside.innerText = 'Bring the power of full drum set to your fingertips, anytime, anywhere!';

const article = document.createElement("article");
main.appendChild(article);

//Dodanie buttonów do main (powstają w oparciu o obiekty z tablicy soundArray z pliku sound.js )

soundArray.forEach((element) => {

  const el = document.createElement("div");
  el.classList.add("button");
  el.id = element.soundKey;

  const elSound = document.createElement('p');
  elSound.innerText = element.soundKey.toUpperCase();
  elSound.classList.add("sound");

  const elName = document.createElement('p');
  elName.innerText = element.name;

  article.appendChild(el);
  el.appendChild(elSound);
  el.appendChild(elName);

  //dodanie funkcji wywołującej dźwięk do buttonów
  //funkcja zawiera funkcje addElementToHistory- dodaje element do historii

  el.addEventListener("click", () => {
    let sound = new Audio(element.soundSample);
    sound.play();
    soundHistory.push(element.name);
    addElementToHistory(element.name);
   });

   //animacja przycisku po przycisku po kliknięciu myszką
   
   el.addEventListener("click", () => animateButton(element));
});

//Zawartość footer

const topF = document.createElement("section");
footer.appendChild(topF);
topF.id = "top";
const bottomF = document.createElement("section");
footer.appendChild(bottomF);
bottomF.id = "bottom";

const drumHistory = document.createElement("section");
topF.appendChild(drumHistory);
drumHistory.id = "drumHistory";
drumHistory.innerText = "App history:";

const clearHistory = document.createElement("button");
topF.appendChild(clearHistory);
clearHistory.innerText = "Clear history";

//Dodanie funkcji która przypisze wywołanie dźwięku do klawiszy klawiatury- funkcja przeszukuje obiekty tablicy soundArray 
//Klawiszom przypisane są elementy soundKey

document.addEventListener("keypress", logKey);

function logKey(e) {
  soundArray.forEach((element) => {
    if(e.key == element.soundKey){
      console.log(element.soundSample);
      let sound = new Audio(element.soundSample);
      sound.play();
      soundHistory.push(element.name);
      addElementToHistory(element.name);
    }
  });
}

//funkcja dodaje elementy do historii

function addElementToHistory(a){
  let drumHistoryElement = document.createElement('div');
    drumHistoryElement.innerText = a;
    drumHistoryElement.classList.add('drumHistoryElement');
    bottomF.appendChild(drumHistoryElement);
}
 
//funkcja czyści historie

clearHistory.addEventListener("click", () =>{
  const historyElements = document.querySelectorAll('.drumHistoryElement');
  historyElements.forEach(element => {
    element.remove();
  });
})

//animacja przycisku po przycisku po wciśnięciu klawisza

document.addEventListener("keypress", colorKey);

function colorKey(e) {
  soundArray.forEach((element) => {
    if(e.key == element.soundKey) animateButton(element);
  });
}

//funckja animująca przycisk - zmiana przeźroczystości tła, zmiana rozmiaru

function animateButton (e){
    {
        let elStyle = document.getElementById(e.soundKey);
        let id = null;
        let scale = 1;
        let op = 0;
        clearInterval(id);
        let reverseAnimation = 0;
        id = setInterval(() => {
          if (scale < 0.9){
            reverseAnimation = 1 ;
          }
          if(scale > 1){
           clearInterval(id);
          }
          if(reverseAnimation){
            elStyle.style.transform = `scale(${scale})`;
            elStyle.style.backgroundColor = `rgba(255,255, 255, ${op})`;
            scale += 0.01;
            op -= 0.05;   
          }
          else {
            elStyle.style.transform = `scale(${scale})`;
            elStyle.style.backgroundColor = `rgba(255,255, 255, ${op})`;
            scale -= 0.01;
            op += 0.05;
          }
        }, 5);
      }
}
