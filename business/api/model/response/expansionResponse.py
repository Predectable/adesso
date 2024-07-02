from pydantic import BaseModel

class ExpansionResponse(BaseModel):
    id : int
    name : str 
    
    