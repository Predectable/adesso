from pydantic import BaseModel

# Model
from .resourceTypeResponse import ResourceTypeResponse

class CostResponse(BaseModel):
    id: int
    amount: int
    resourceType: ResourceTypeResponse

    class Config:
        orm_mode = True