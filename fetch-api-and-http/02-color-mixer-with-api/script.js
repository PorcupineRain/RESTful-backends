const body = document.querySelector("body");
const p = document.querySelector("p");
const slider1 = document.querySelector("#red");
const slider2 = document.querySelector("#green");
const slider3 = document.querySelector("#blue");
const button = document.querySelector("button")


slider1.addEventListener("input", function () {
  changeBackground();
});
slider2.addEventListener("input", function () {
  changeBackground();
});
slider3.addEventListener("input", function () {
  changeBackground();
});

function changeBackground() {
  let red = slider1.value;
  let green = slider2.value;
  let blue = slider3.value;
  let hexR = parseInt(red).toString(16);
  let hexG = parseInt(green).toString(16);
  let hexB = parseInt(blue).toString(16);
  if (hexR.length === 1) {
    hexR = "0" + hexR;
  }
  if (hexG.length === 1) {
    hexG = "0" + hexG;
  }
  if (hexB.length === 1) {
    hexB = "0" + hexB;
  }
  p.innerText = "#" + hexR + hexG + hexB;
  body.style.background = "rgba(" + red + "," + green + "," + blue + ")";
}

changeBackground();

button.addEventListener("click", function(){
    fetch("https://dummy-apis.netlify.app/api/color")
    .then((response) =>{
        if(response.ok){
            return response.json();
        }
    })
    .then((data) => {
        slider1.value = data.rgb.r;
        slider2.value = data.rgb.g;
        slider3.value = data.rgb.b;
    })
    changeBackground();
})