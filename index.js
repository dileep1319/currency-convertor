






const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"


const drpSelect = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");




for (let select of drpSelect) {
    for (code in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = code;
        newOpt.value = code;

        if (select.name === "from" && code === "USD") {
            newOpt.selected = "selected";
        } else if (select.name === "to" && code === "PKR") {
            newOpt.selected = "selected";
        }
        select.appendChild(newOpt);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {

    let amount = document.querySelector(".amount input");
    let amntValue = amount.value;
    if (amntValue === "" || amntValue < 0) {
        amntValue = 1;
        amount.value = "1";
    }

    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let resopnse = await fetch(url);
    let zata = await resopnse.json();

    let rate = zata[toCurr.value.toLowerCase()];
    let finalAmount = amntValue * rate;

    msg.innerText = `${amntValue}${fromCurr.value} = ${finalAmount}${toCurr.value}`
}

const updateFlag = (element) => {
    let currCode = element.value;
    let cntryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${cntryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});


