import { tap } from 'rxjs';
import { Disco } from './../../interfaces/disco';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { carDisco } from '../../interfaces/coche-disco';
import { KeyValuePipe, } from '@angular/common'
import { RouterLink } from "@angular/router";

@Component({
  selector: 'listado-discos',
  imports: [KeyValuePipe, RouterLink],
  templateUrl: './listado-discos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListadoDiscos {

  listDiscPerCar = input.required<carDisco[] | []>()



  listProcessed=computed(()=>{

    let data = this.listDiscPerCar()
    let consolidedData=data.map((discAsociation) => {
      const pcdBase=discAsociation.disc.pcd??''
      const holes=discAsociation.disc.holes??''

      const pcd = (pcdBase && holes)? `${discAsociation.disc.pcd??''}x${discAsociation.disc.holes??''}`:''

      let pcdObj = {
        pcdConsolided: pcd
      }

      return {...discAsociation,
        disc:{...discAsociation.disc,...pcdObj}};


    })
    return consolidedData
  })




  readonly Order = ["RotorDiameter", "RotorHeight", "PCD","RotorHoles", "pcdConsolided", "Centerbore", "RotorThicknessNew", "RotorThicknessMin", "RotorStyle", "RotorAxle", ]
  customOrder = (param1: any, param2: any) => {

    return this.Order.indexOf(param1.key) - this.Order.indexOf(param2.key)
  }




}
