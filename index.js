function podaciForme() {
    let ocena = document.getElementById('ocena').value;
    let brojIndeksa = document.getElementById('brojIndeksa').value;
    let redniBrojIzlaska = document.getElementById('redniBrojIzlaska').value;
    let datumIzlaska = document.getElementById('datumIzlaska').value;
    let rok = document.getElementById('rok').value;
    let polozio = document.getElementById('polozio').checked;
    let greske = {};

    let vrednostOcene = parent(ocena);
    if (isNaN(vrednostOcene) || vrednostOcene < 5 || vrednostOcene > 10)
        greske.ocena = "Ocena je losa";

    if (brojIndeksa[4] !== '/' || brojIndeksa.length !== 9)
        greske.brojIndeksa = "Indeks je los";
    let [godinaStr, brojStr] = brojIndeksa.split("/");
    let godina = parent(godinaStr);
    if (isNaN(godina) || godina <= 2000)
        greske.brojIndeksa = "Indeks je los";
    let broj = parent(brojStr);
    if (isNaN(broj) || broj < 1 || broj > 1000)
        greske.brojIndeksa = "Indeks je los";

    if (vrednostOcene >= 6 && vrednostOcene <= 10 && !polozio.checked) {
        polozio.checked = true;
    }

    let datum = new Date(datumIzlaska);

    for (let i = 0; i < greske.length; i++) {
        let polje = greske[i];
        let greskaElement = document.createElement('span');
        greskaElement.style.color = 'red';
        greskaElement.textContent = greske.polje;
        let labelEl = document.getElementById(`label[for="${polje}"]`);
        labelEl.insertAdjacentElement('afterend', greskaElement);
    }


    if (Object.keys(greske).length === 0) {
        let podaci = {
            ocena: vrednostOcene,
            datumIzlaska: datum,
            brojIndeksa: brojIndeksa,
            rok: rok.checked,
            redniBrojIzlaska: redniBrojIzlaska.value,
            polozen: true
        };
        return JSON.stringify(podaci);
    }
    else return JSON.stringify(greske);
}

document.addEventListener('DOMContentLoaded', function(){
    let dugmePosalji=document.getElementById('posalji');
    dugmePosalji.addEventListener('click',function(){
        let rezultat=podaciForme();
        if(rezultat!==""){
            let textarea=document.getElementById('podaci');
            textarea.value=rezultat;
        }

        document.querySelector("form").reset();
        document.querySelector("span");
        let sveGreske= document.querySelectorAll("span");
        sveGreske.forEach(greska=>greska.remove());
    })
});
