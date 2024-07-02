# Common
from typing import List, Optional
from pydantic import BaseModel


# Model
from .costResponse import CostResponse
from .ageResponse import AgeResponse
from .expansionResponse import ExpansionResponse
from .unitType import UnitTypeResponse

class UnitBase(BaseModel):
    uuid: str
    buildTime: Optional[int]
    reloadTime: Optional[float]
    attackDelay: Optional[float]
    movementRate: Optional[float]
    lineOfSight: Optional[int]
    hitPoints: Optional[int]
    range: Optional[str]
    attack: Optional[int]
    armor: Optional[str]
    accuracy: Optional[str]

class UnitResponse(UnitBase):
    id: int
    age: AgeResponse
    costs: List[CostResponse]
    expansion : ExpansionResponse
    unitType : UnitTypeResponse

    class Config:
        orm_mode = True