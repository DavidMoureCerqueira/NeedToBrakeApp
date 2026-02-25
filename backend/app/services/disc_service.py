from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.models.models import DiscoFreno
from app.repositories.cascade_repo import get_modelsID_by_maker_id, get_versionID_by_model_id, get_versionsID_by_models_id
from app.repositories.disc_model_repo import get_disc_version_id, get_discs_versionsID_in, get_full_discs_by_maker_id, get_full_discs_by_model_id, get_full_discs_by_version_id
from app.repositories.disc_property_repo import get_full_discs_by_measurement
from app.schemas.schemas import AxleInfo, CarModelVersionRead, DiscAxleRead, DiscoFullDetailRead


class DiscoService:
    @staticmethod
    def data_extractor(consolidated_data: dict) -> List[AxleInfo]:
        results = []
        for value in consolidated_data.values():
            maker_name, model_name, version_obj = value['context']
            front_disc = value['front']
            rear_disc = value['rear']
            front_style = front_disc.style if front_disc else None
            front_holes = front_disc.holes if front_disc else None
            front_diameter = front_disc.diameter if front_disc else None
            front_height = front_disc.height if front_disc else None
            front_thickness_new = front_disc.thickness_new if front_disc else None
            front_thickness_min = front_disc.thickness_min if front_disc else None
            front_pcd = front_disc.pcd if front_disc else None
            front_centerbore = front_disc.centerbore if front_disc else None

            rear_style = rear_disc.style if rear_disc else None
            rear_holes = rear_disc.holes if rear_disc else None
            rear_diameter = rear_disc.diameter if rear_disc else None
            rear_height = rear_disc.height if rear_disc else None
            rear_thickness_new = rear_disc.thickness_new if rear_disc else None
            rear_thickness_min = rear_disc.thickness_min if rear_disc else None
            rear_pcd = rear_disc.pcd if rear_disc else None
            rear_centerbore = rear_disc.centerbore if rear_disc else None

            consolidated_pcd = front_pcd
            if not consolidated_pcd and rear_pcd:
                consolidated_pcd = rear_pcd
            consolidated_holes = front_holes
            if not consolidated_holes and rear_holes:
                consolidated_holes = rear_holes
            consolidated_centerbore = front_centerbore
            if not consolidated_centerbore and rear_centerbore:
                consolidated_centerbore = rear_centerbore
            car = CarModelVersionRead(
                maker_name=maker_name,
                model_name=model_name,
                version_id=version_obj.id,
                version_details=f"{version_obj.engine} | {version_obj.bhp} hp ({version_obj.year})",
                
            )
            if (front_disc):
                f_disc = DiscAxleRead(
                    axle='front',
                    style=front_style,
                    holes=consolidated_holes,
                    diameter=front_diameter,
                    height=front_height,
                    thickness_new=front_thickness_new,
                    thickness_min=front_thickness_min,
                    centerbore=consolidated_centerbore,
                    pcd=consolidated_pcd,
                )
                results.append(AxleInfo(
                    car=car,
                    disc=f_disc))
            if (rear_disc):

                r_disc = DiscAxleRead(axle='rear',
                                      style=rear_style,
                                      holes=consolidated_holes,
                                      diameter=rear_diameter,
                                      height=rear_height,
                                      thickness_new=rear_thickness_new,
                                      thickness_min=rear_thickness_min,
                                      centerbore=consolidated_centerbore,
                                      pcd=consolidated_pcd )
                results.append(AxleInfo(
                    car=car,
                    disc=r_disc
                ))

        return results

    @staticmethod
    def data_consolider(data_disc_tuple):
        consolidated_data = {}
        for maker_name, model_name, version_obj, disc_obj in data_disc_tuple:
            version_id = version_obj.id
            eje = disc_obj.eje.upper()
            if version_id not in consolidated_data:
                consolidated_data[version_id] = {
                    'context': (maker_name, model_name, version_obj),
                    'front': None,
                    'rear': None
                }
            if eje == 'FRONT':
                consolidated_data[version_id]['front'] = disc_obj
            elif eje == 'REAR':
                consolidated_data[version_id]['rear'] = disc_obj
        return consolidated_data

    def __init__(self, session: AsyncSession):
        self.session = session

    async def search_disc_version_id(self, version_id: int) -> List[DiscoFreno]:
        discos = await get_disc_version_id(self.session, version_id)

        return discos

    async def search_disc_model_id(self, model_id: int) -> List[DiscoFreno]:
        versions_id = await get_versionID_by_model_id(self.session, model_id)
        discos = await get_discs_versionsID_in(self.session, versions_id)
        return discos

    async def search_disc_maker_id(self, maker_id: int) -> List[DiscoFreno]:
        models_id = await get_modelsID_by_maker_id(self.session, maker_id)
        versions_id = await get_versionsID_by_models_id(self.session, models_id)
        discos = await get_discs_versionsID_in(self.session, versions_id)
        return discos

    async def search_full_disc_maker_id(self, maker_id: int) -> List[AxleInfo]:
        data_disc_tuple = await get_full_discs_by_maker_id(self.session, maker_id)
        if not data_disc_tuple:
            return []
        consolidated_data = DiscoService.data_consolider(data_disc_tuple)
        return DiscoService.data_extractor(consolidated_data)

    async def search_full_disc_model_id(self, model_id: int) -> List[AxleInfo]:
        data_disc_tuple = await get_full_discs_by_model_id(self.session, model_id)
        if not data_disc_tuple:
            return []
        consolidated_data = DiscoService.data_consolider(data_disc_tuple)
        return DiscoService.data_extractor(consolidated_data)

    async def search_full_disc_version_id(self, version_id: int) -> List[AxleInfo]:
        data_disc_tuple = await get_full_discs_by_version_id(self.session, version_id)
        if not data_disc_tuple:
            return []
        consolidated_data = DiscoService.data_consolider(data_disc_tuple)
        return DiscoService.data_extractor(consolidated_data)

    async def search_full_discs_by_measurement(self,
                                               eje: Optional[str] = None,
                                               style: Optional[str] = None,
                                               holes: Optional[float] = None,
                                               diameter: Optional[float] = None,
                                               height: Optional[float] = None,
                                               thickness_new: Optional[float] = None,
                                               thickness_min: Optional[float] = None,
                                               pcd: Optional[float] = None,
                                               centerbore: Optional[float] = None,) -> List[DiscoFullDetailRead]:
        data_disc_tuple = await get_full_discs_by_measurement(self.session, eje, style, holes, diameter, height, thickness_new, thickness_min, pcd, centerbore)
        if not data_disc_tuple:
            return []
        consolidated_data = DiscoService.data_consolider(data_disc_tuple)
        return DiscoService.data_extractor(consolidated_data)
