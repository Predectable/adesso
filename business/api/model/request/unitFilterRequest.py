from pydantic import BaseModel, conint
from typing import List, Optional

class ResourceFilterParameters(BaseModel):
    resourceTypeId : int
    minValue : conint(ge=0)
    maxValue : conint(le=200)

class UnitFilterRequest(BaseModel):
    ageId : Optional[int] = None
    resource : Optional[List[ResourceFilterParameters]] = None
    
    