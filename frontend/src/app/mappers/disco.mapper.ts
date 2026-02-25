import { Disco } from '../interfaces/disco';
import { RESTFullDisco } from '../interfaces/rest-full-disco';

export class DiscMapper {


  static mapRestFullDiscToDisc(restDisc: RESTFullDisco): Disco {
    let posicion;
    let values = Object.values(restDisc)
    let valuesString = values.filter((value) => typeof (value) == 'string')

    if (valuesString.some((value) => value.includes('front'))) {
      posicion = 'Delantero'
    } else {
      posicion = 'Trasero'
    }


    return {
      axle: restDisc.axle,
      style: restDisc.style,
      diameter: restDisc.diameter,
      height: restDisc.thicknessMin,
      thicknessNew: restDisc.height,
      thicknessMin: restDisc.height,
      pcd: restDisc.pcd,
      holes: restDisc.holes,
      centerbore: restDisc.Centerbore,


    }
  }
  static mapPropertiesToDisc(axel: string, style: string, holes: number, diameter: number, height: number, thicknessNew: number, thicknessMin: number, pcd: number, centerbore: number): Disco {
    return {
      axle: axel,
      style: style,
      diameter: diameter,
      height: height,
      thicknessNew: thicknessNew,
      thicknessMin: thicknessMin,
      pcd: pcd,
      holes: holes,
      centerbore: centerbore
    }

  }
}
