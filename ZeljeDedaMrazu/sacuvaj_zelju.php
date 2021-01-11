<?php
    /*ovdje se vrsi validacija unesenih podataka
    -ime i prezime sadrze samo slova(u slucaju imena Ana Marija space se ne tretira kao nepozeljan karakter)
    -grad je odabran iz padajuce liste
    -polje za zelju je popunjeno
    
    ukoliko unos nije ispravan korisnika redirektovati na index.html 
    ukoliko je unos pravilan zelja se cuva na serveru u folderu zelje_db kao novi txt fajl u JSON formatu. Naziv svakog fajla mora biti jedinstven uz pomoc ugradjene fun-je uniqid
    Nakon uspjesnog skladistenja tj upisa zelje u fajl, korisnika poslati na stranicu zelja_poslata.html uz prikaz poruke da je slanje uspjesno izvrseno
    */
function validacija(){

    $validacija = true;

    if(!ctype_alpha(str_replace(' ','', $_REQUEST['ime']))){
        $validacija=false;
    }

    if(!ctype_alpha(str_replace(' ','', $_REQUEST['prezime']))){
            $validacija=false;
    }

    if(str_replace(' ','', $_REQUEST['adresa']) == ''){
        $validacija=false;
    } 
    
    if($_REQUEST['grad'] == '') { 
        $validacija=false;
    } 

    if(str_replace(' ','', $_REQUEST['zelja']) == ''){
        $validacija=false;
    }

    $validacija ? upisiDB() : header('Location: /PHP/ZeljeDedaMrazu/index.html');

}
    
function upisiDB(){
     $zelja = ['ime'=>$_REQUEST['ime'],'prezime'=>$_REQUEST['prezime'],'adresa'=>$_REQUEST['adresa'],'grad'=>$_REQUEST['grad'],'zelja'=>$_REQUEST['zelja'],'esi_mi_dobar'=>$_REQUEST['esi_mi_dobar'],'datum'=>date("d-m-Y H:i:s")];
       
    $db_folder = 'zelje_db';
    if(!file_exists($db_folder)){
        mkdir($db_folder);
    }

    $ime_fajla = uniqid();
    $h = fopen($db_folder.'/'.$ime_fajla.'.txt', 'a+');
    fwrite($h,json_encode($zelja));
    fclose($h);

    header('Location: /PHP/ZeljeDedaMrazu/zelja_poslata.html');
}

    validacija();

?>