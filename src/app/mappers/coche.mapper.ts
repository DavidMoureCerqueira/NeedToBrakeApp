
import { car } from '../interfaces/coche';
import type { RESTFullDisco } from '../interfaces/rest-full-disco';
import type { carFR } from '../interfaces/coche-fr';
import { RESTFullcar } from '../interfaces/rest-full-coche';
import { DiscMapper } from './disco.mapper';
import { RESTcar } from '../interfaces/rest-coche';
import { carDisco } from '../interfaces/coche-disco';
import { Disco } from '../interfaces/disco';



export class carMapper {

  static mapRestcartocarDisco(restCar: RESTcar): carDisco {
    /**
     * Mapeo desde Restcar a carSingle, como objetos separados car & disco
     */
    let car: car = this.mapPropertiesToCar(restCar.make, restCar.model, restCar.version_id, restCar.versionDetails)
    let disco: Disco = DiscMapper.mapPropertiesToDisc(
      restCar.axel,
      restCar.style,
      restCar.holes,
      restCar.Rotordiameter,
      restCar.height,
      restCar.thicknessNew,
      restCar.thicknessMin,
      restCar.pcd,
      restCar.centerbore
    )
    return { car: car, disc: disco }

  }

  static mapArrayRestcartocarDisco(restcars: Array<RESTcar>): carDisco[] {
    return restcars.map((restcar) => this.mapRestcartocarDisco(restcar))
  }






  static mapPropertiesToCar(make: string, model: string, version_id: number, versionDetails: string): car {
    return {
      make: make,
      model: model,
      version_id: version_id,
      versionDetails: versionDetails,
    }
  }

  static mapRestCarToSimpleCar(restCar: RESTcar): car {

    return this.mapPropertiesToCar(restCar.make, restCar.model, restCar.version_id, restCar.versionDetails)!


  }
  static mapRestCarToSimpleCarToArray(restCarArray: Array<RESTcar>): Array<car> {
    return restCarArray.map((restCar) => this.mapRestCarToSimpleCar(restCar))
  }


  static mapRestFullCarToCar(restCar: RESTFullcar): carFR {
    let DiscoDelanteroObj: RESTFullDisco = {
      axle: 'front',
      style: restCar.frontstyle,
      holes: restCar.frontholes,
      diameter: restCar.frontRotordiameter,
      height: restCar.frontheight,
      thicknessNew: restCar.frontthicknessMin,
      thicknessMin: restCar.frontthicknessMin,
      pcd: restCar.frontpcd,
      Centerbore: restCar.frontCenterbore
    }
    let DiscoTraseroObj: RESTFullDisco = {
      axle: 'rear',
      style: restCar.rearstyle,
      holes: restCar.rearholes,
      diameter: restCar.rearRotordiameter,
      height: restCar.rearheight,
      thicknessNew: restCar.rearthicknessMin,
      thicknessMin: restCar.rearthicknessMin,
      pcd: restCar.rearpcd,
      Centerbore: restCar.rearCenterbore
    }
    let car: car = this.mapPropertiesToCar(
      restCar.make,
      restCar.model,
      restCar.version_id,
      restCar.versionDetails,
    )
    return {
      car: car,
      frontDisc: DiscMapper.mapRestFullDiscToDisc(DiscoDelanteroObj),
      rearDisc: DiscMapper.mapRestFullDiscToDisc(DiscoTraseroObj)
    }

  }
}
