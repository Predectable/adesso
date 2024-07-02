from pydantic import BaseModel

class ResourceTypeResponse(BaseModel):
    id : int
    name : str 
    
    class Config:
        orm_mode = True
    
    