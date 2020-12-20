$(document).ready(function(){
  var title;
  var tip;  
  var year;
 // nakon klika ocistiti prozor od prethodne pretrage
 // i poslati zahtjev api-u
  $("#submit").on("click", function(event){
    event.preventDefault();
   
    $("#movies").empty();
    

    // Smjestiti unesene parametre u promjenljive
    title = $("#pretraga").val();
    year = $("#godina").val();
    tip = $("#tip").val();

    $.ajax({
      type: 'GET',
      url: "https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey=b420a820&t="+title+"&type="+tip+"&y="+year,
      success: (response)=>{
        displayResults(response);
      },
      fail: ()=>{
        alert('Greska u slanju zahtjeva');
      }
    });
  }); 
});


  // Funkcija koja prikazuje dobijene rezultate 
  function displayResults(response){
    var html = "";
    console.log(response);

    // Ukoliko nismo pronasli film ili seriju sa postavljenim kriterijumima
    if (response.Response == "False") {
       html=`<h2 style="color:white">Nema filmova sa trazenim kriterijumima</h2>`;
    } else {
        var poster;
        //console.log(response);
        //Primijetio sam da neki filmovi nemaju poster
        if (response.Poster == "N/A"){
          poster = "<i class='material-icons poster-placeholder'>crop_original</i>";
        } else {
          poster = "<img class='movie-poster' src=" + response.Poster + ">";
        }

         html = `<div class="card-container">
         <div class="float-layout">
           <div class="card-image">
           <a href=''>${poster}</a>
             <div class="card">
               <div class="card-title">
               <label for="test">Naslov:</label> 
                <span> 
                  <p>${response.Title}</p> 
                </span> </div>
               <div class="card-desc">
               <label for="test">Godina:</label> 
               <span> 
                 <p>${response.Year}</p> 
               </span> 
               <label for="test">Datum objavljivanja:</label> 
               <span> 
                 <p>${response.Released}</p> 
               </span>
               <label for="test">Trajanje:</label> 
               <span> 
                 <p>${response.Runtime}</p> 
               </span>
               <label for="test">Reziser:</label> 
               <span> 
                 <p>${response.Director}</p> 
               </span>
               <label for="test">Glumci:</label> 
               <span> 
                 <p>${response.Actors}</p> 
               </span>
               <label for="test">Radnja:</label> 
               <span> 
                 <p>${response.Plot}</p> 
               </span> `;
               if(response.Type == "series"){
                 html+=`<label for="test">Broj sezona:</label> 
                 <span> 
                   <p>${response.totalSeasons}</p> 
                 </span>`;
               }
               html+=`<label for="test">Ocjene gledalaca:</label>`;
               var rejting = response.Ratings;
               let tek = rejting.length;
               for(let i=0; i<tek; i++) {
                html+=` 
                <span> 
                  <p>${rejting[i].Source}     ${rejting[i].Value}</p> 
                </span>`;
               };

               html += `</div>
               </div>
             </div>
           </div>
         </div>`;
       
    }
    $("#movies").append(html);
    
  } 


