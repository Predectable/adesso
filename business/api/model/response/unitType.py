from pydantic import BaseModel

class UnitTypeResponse(BaseModel):
    id : int
    name : str
    description : str
    
    