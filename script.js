// VIIKKOTEHTÄVÄ 3: JavaScriptin perusteet

const paikka = "Heureka";
let lipunHinta = 25;

console.log("Tervetuloa tiedekeskukseen:", paikka);
console.log("Lipun hinta on", lipunHinta, "euroa");


// Ehtolause

let ika = 10;

if (ika < 18) {
    console.log("Kävijä on lapsi tai nuori.");
} else {
    console.log("Kävijä on aikuinen.");
}


// Funktio

function laskeAlennus(hinta) {
    let alennettuHinta = hinta * 0.8;
    return alennettuHinta;
}

console.log(
    "Alennettu lipun hinta:",
    laskeAlennus(lipunHinta),
    "euroa"
);


// Lista ja silmukka

const nayttelyt = [
    "Tiede",
    "Avaruus",
    "Luonto",
    "Teknologia"
];

nayttelyt.forEach(function(nayttely) {
    console.log("Näyttely:", nayttely);
});


// Painikkeen toiminto

function naytaViesti() {
    alert("Tervetuloa Heurekaan!");
}


// VIIKKOTEHTÄVÄ 4: API

const haeNappi = document.getElementById("haeNappi");
const tulosTeksti = document.getElementById("tulosTeksti");
const maaraValinta = document.getElementById("maara");

haeNappi.addEventListener("click", function() {

    const maara = Number(maaraValinta.value);

    tulosTeksti.innerHTML = "Haetaan tietoa...";

    // Tyhjennetään aikaisemmat tulokset
    let neuvot = [];

    // Haetaan valittu määrä neuvoja
    for (let i = 0; i < maara; i++) {

        fetch("https://api.adviceslip.com/advice", {
            cache: "no-cache"
        })

        .then(function(response) {
            return response.json();
        })

        .then(function(data) {

            console.log("Rajapinnan vastaus:", data);

            neuvot.push(data.slip.advice);

            // Kun kaikki haut ovat valmistuneet,
            // näytetään ne sivulla
            if (neuvot.length === maara) {

                tulosTeksti.innerHTML = "";

                neuvot.forEach(function(neuvo) {

                    const p = document.createElement("p");
                    p.innerText = neuvo;

                    tulosTeksti.appendChild(p);
                });
            }
        })

        .catch(function(error) {

            console.error("Virhe haussa:", error);

            tulosTeksti.innerText =
                "Tiedon hakeminen epäonnistui.";
        });
    }
});