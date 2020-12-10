const pitanja = [
    {
      // tekst pitanja
      pitanje: "Ko je osnivač kompanije <em>Apple</em>?", 
      // ponudjeni odgovori
      odgovori: {
        a: "Bil Gejts",
        b: "Ilon Maks",
        c: "Stiv Džobs"
      },
      // koji od ponudjenih odgovora je tacan
      tacanOdgovor: "c"
    },
    {
      pitanje: "Kako se zvala prva programerka? Jedan progamski jezik nosi njeno ime.",
      odgovori: {
        a: "Ada Bajron",
        b: "Karmen Elektra",
        c: "Java Script"
      },
      tacanOdgovor: "a"
    },
    {
      pitanje: "Kako se zove čuveni naučnik o kome govori film <em>The Immitation Game</em> ",
      odgovori: {
        a: "Nikola Tesla",
        b: "Alen Tjuring",
        c: "Tomas Edison"
      },
      tacanOdgovor: "b",
      get: function() {
          return pitanje;
      }
    },
    {
        pitanje: "Koje godine je osnovana kompanija Ford?",
        odgovori: {
            a: "1905",
            b: "1903",
            c: "1901"
        },
        tacanOdgovor: "b"
    },
    {
        pitanje: "Koja je hemijska oznaka za Argon?",
        odgovori: {
            a: "Ar",
            b: "Ag",
            c: "An"
        },
        tacanOdgovor: "a"

    },
    {
        pitanje: "Koliko mačaka u Disneyland-u lovi miševe kada padne mrak?",
        odgovori: {
            a: "200",
            b: "300",
            c: "500"
        },
        tacanOdgovor: "a"

    },
    {
        pitanje: "Glavni grad Australije je?",
        odgovori: {
            a: "Sidnej",
            b: "Kanbera",
            c: "Brisbejn"
        },
        tacanOdgovor: "b"

    },
    {
        pitanje: "Na kom kontinentu se nalazi najsuvlje mjesto na planeti?",
        odgovori: {
            a: "Azija",
            b: "Afrika",
            c: "Antarktik"
        },
        tacanOdgovor: "c"

    }
];

const kvizDiv = document.getElementById('kviz')
const rezultatDiv = document.getElementById('rezultat')
const zavrsiBtn = document.getElementById('zavrsi')

function pokreniKviz(){

    const output = [];
    pitanja.forEach(function(trenutnoPitanje, pitanjeInd){
       
        const odgovori = [];
        for(slovo in trenutnoPitanje.odgovori){
            odgovori.push(
                `<label>
                    <input type="radio" name="odgovor${pitanjeInd}" value="${slovo}">
                    ${slovo} : ${trenutnoPitanje.odgovori[slovo]}
                    </label>
                `
            );
        }

        output.push(
            `<div class="pitanje" >${trenutnoPitanje.pitanje}</div>
             <div class="odgovori"> ${odgovori.join('')} </div> 
            `
        );
        
    });

    kvizDiv.innerHTML = output.join('');
}
function prikaziRezultat(){
    let brTacnih = 0;
    const sviOdgovori = kvizDiv.querySelectorAll('.odgovori');
    pitanja.forEach(function(trenutnoPitanje, pitanjeInd){
        
        const selektor = `input[name=odgovor${pitanjeInd}]:checked`; //daj mi sve cekirane odgovore(0,1,2..) za svako pitanje(pitanjeIND=0,1,2)
        const odgovoreno = (document.querySelector(selektor) || {} ).value;
        console.log(odgovoreno, trenutnoPitanje.odgovori); //prikazace u konzoli odabran odgovor i tacan odgovor za to pitanje
        
        
        if(odgovoreno === trenutnoPitanje.tacanOdgovor){
            brTacnih++;

            /*2. zadatak sa domaceg, obojati tekst u zeleno ili crveno u zavisnosti
              od toga da li je odgovor tacan ili netacan, iskoristicu 
              ovaj uslov sa predavanja i nadograditi ga*/
              sviOdgovori[pitanjeInd].style.color = 'green';
        }else{
              sviOdgovori[pitanjeInd].style.color = 'red';
        }

    });

    //Dio za 1. zadatak, poziv funkcije ce uslijediti ili nakon isteka vremena ili nakon klika na IZVRSI
    //u slucaju da je na klik, mora se obustaviti rad ugnjezdene funkcije u funkciji setInterval
    //to dobijam time sto promjenljiva 'prekid' igra ulogu prekidaca
    prekid = false; 
    //Uklonjam Zavrsi dugme, estetike radi
    zavrsiBtn.remove();
    timer.remove();
    
    //console.log(brTacnih, pitanja.length);
    rezultatDiv.innerHTML = `Ostvarili ste sledeci rezultat: <h3>${brTacnih} od ${pitanja.length}</h3>`
}

//Zadatak 1. tajmer
var prekid = true;
const timer = document.getElementById('timer');
var counter = 60;
var interval = setInterval(function() {
    if(prekid){
    counter--;
    // Display 'counter' wherever you want to display it.
        if (counter <= 0) {
                clearInterval(interval);
                prikaziRezultat();
            return;
        }else{
    	    $('#time').text(counter);
          console.log("Timer --> " + counter);
        } 
    }
}, 1000);

    
zavrsiBtn.addEventListener('click', prikaziRezultat);
pokreniKviz();