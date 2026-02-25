import { CascadaVersion } from "../interfaces/cascada";
import { RESTCascadaVersion } from "../interfaces/rest-cascada";

export class CascadaMapper{

  static mapRESTCascadaVersionToCascadaVersion(restVersion:RESTCascadaVersion):CascadaVersion{
    let version='';

    if(restVersion.engine){
      version+=restVersion.engine +" - ";
    }
    if(restVersion.bhp!=null){
      version+=restVersion.bhp +" cv - ";
    }

    if(restVersion.year){
      version+=restVersion.year ;
    }
    if(restVersion.submodelo){
      version+=restVersion.submodelo;
    }
    return {

      id:restVersion.id,
      version: version
    }
  }

  static mapArrayRESTCascadaVersionToCascadaVersion(restVersions:Array<RESTCascadaVersion>):CascadaVersion[]{
    return(restVersions.map((restVersion)=>this.mapRESTCascadaVersionToCascadaVersion(restVersion)))
  }
}
