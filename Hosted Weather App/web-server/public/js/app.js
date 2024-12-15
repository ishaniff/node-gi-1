// LINKING AND DECLARING MY VALUES WITH DOM
const weatherForm = document.querySelector("form");
const inputForm = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");
// WAITING FOR SUBMIT BUTTON TO SUBMIT, INCLUDES PREVENTION OF RELOADING ON CLICK, SETTING THE VALUE OF THE INPUT FORM TO ADD INTO URL FOR THE SEARCH QUERY, UPDATES TEXT ON HTML SITE WHEN DATA HAS BEEN RECIEVED
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
