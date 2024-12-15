console.log("client js loaded");
const weatherForm = document.querySelector("form");
const inputForm = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = inputForm.value;
  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  fetch("http://127.0.0.1:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
