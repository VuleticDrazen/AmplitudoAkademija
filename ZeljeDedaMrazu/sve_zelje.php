<?php

    /* U ovoj skripti se Deda Mrazu prikazuju sve zelje upisane u bazu pomocu ugradjene funkcije scandir prikazati sve zelje u vidu jednostavne html tabele*/
    


    $niz_fajlova = scandir('./zelje_db');
    $assoc_array = [];

    $html_table = '<table ><tr><th>Ime</th><th>Prezime</th><th>Adresa</th><th>Grad</th><th>Zelja</th><th>EsiMiDobar</th><th>Datum</th></tr>';

    $br = count($niz_fajlova);
    
    for($i=2; $i<$br; $i++){ //stavio sam brojac da ide od dva kako bih preskocio nevidljive direktorijume . i ..
        $fajl_temp = $niz_fajlova[$i];
        $json = file_get_contents('./zelje_db/'.$fajl_temp);
        $json_data = json_decode($json,true);
        //echo '<pre>' , var_dump($json_data) , '</pre>';

        $html_table .= '<tr><td>'.$json_data['ime'].'</td><td>'.$json_data['prezime'].'</td><td>'.$json_data['adresa'].'</td><td>'.$json_data['grad'].'</td><td>'.$json_data['zelja'].'</td><td>'.$json_data['esi_mi_dobar'].'</td><td>'.$json_data['datum'].'</td></tr>';

    }

    $html_table .= '</table></div>'; 

    echo $html_table;       

?>
<link rel="stylesheet" href="./css/style.css">
<script src="./js/snijeg.js"></script>
