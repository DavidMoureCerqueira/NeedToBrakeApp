

import { HttpClient, HttpParams } from '@angular/common/http';
import { Disco } from '../interfaces/disco';
import { inject, Injectable, WritableSignal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CascadaMarca, CascadaModelo, CascadaVersion } from '../interfaces/cascada';
import { RESTCascadaVersion } from '../interfaces/rest-cascada';
import { CascadaMapper } from '../mappers/cascada.mapper';
import { RESTcar } from '../interfaces/rest-coche';
import { carMapper } from '../mappers/coche.mapper';
import { carDisco } from '../interfaces/coche-disco';


const API_URL = "http://localhost:8000"


@Injectable({
  providedIn: 'root'
})


export class DiscoService {
  private http = inject(HttpClient)


  constructor() {
  }
  // buscarMarcas(): Observable<CascadaMarca[]> {
  //   const url = `${API_URL}/read_makes`
  //   return this.http.get<CascadaMarca[]>(url).pipe(catchError(error=>{
  //       console.log('Error de busqueda', error)
  //       return of([])
  //     })
  //   );

  // }
  // buscarModeloPorMarca(id:Number):Observable<CascadaModelo[]>{
  //   const url=`${API_URL}/models_by_ID/${id}`
  //   return this.http.get<CascadaModelo[]>(url).pipe(
  //     catchError(error=>{
  //       console.log('Error de busqueda', error)
  //       return of([])
  //     })
  //   )
  // }
  // buscarVersionPorModelo(id:Number):Observable<CascadaVersion[]>{
  //   const url=`${API_URL}/version_by_ID/${id}`
  //   return this.http.get<RESTCascadaVersion[]>(url).pipe(
  //     map((resp)=>CascadaMapper.mapArrayRESTCascadaVersionToCascadaVersion(resp)),
  //   )
  // }

  buscarPorMedidas(disco: Disco): Observable<carDisco[]> {
    let params = new HttpParams();

    (Object.entries(disco) as [keyof Disco, string | number][]).forEach(([clave, valor]) => {
      if (valor) {
        params = params.append(clave.toString(), valor)
        console.log('clave,', clave.toString())
        console.log('clave,', valor)
      }



    });

    const url = `${API_URL}/disc_measurement/?${params}`
    console.log(url)

    return this.http.get<carDisco[]>(url).pipe(
      // map((resp) => carMapper.mapArrayRestcartocarDisco(resp))
    )


  }
  igualarDatos(discoExistente: Disco, discoDeseado: Partial<Disco>) {
    const discoModificado: Disco = { ...discoExistente };
    (Object.entries(discoDeseado) as [keyof Disco, string | number][]).forEach(([key, valor]) => {
      if (valor != 0) {
        discoModificado[key] = valor;
      }
    })
    return discoModificado;
  }

}


