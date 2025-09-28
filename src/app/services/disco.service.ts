

import { Disco } from './../interfaces/disco';
import { Injectable, WritableSignal } from '@angular/core';



@Injectable({
  providedIn: 'root'
})


export class DiscoService {

  constructor() {
  }




  searchDataBase(discoExistente: Disco, discoDeseado: Disco) {
    console.log("Disco Existente en el service", discoExistente);
    console.log("Disco Deseado en el service", discoDeseado);

  }


    igualarDatos(discoExistente:Disco, discoDeseado:Disco){
      (Object.keys(discoExistente)as Array<keyof typeof discoExistente>).forEach(key=>{
        const existente=discoExistente[key];
        let deseado=discoDeseado[key];
        if(deseado==0){
          deseado=existente;
          console.log("Deseado:",deseado)
        }
      })
    }



    // let discoBase: Disco
    //Vamos a crear otro objeto ya que vamos a implementar un boton que transpase los datos del del existente al deseado, de esa manera dejamos el valor 0 para que sea un *
    //Asi mandamos un objeto al back para que haga la transformacion para la base de datos

    // Object.keys(discoDeseado).forEach(key=>{
    //   const k=key as keyof Disco;



    // })










}


