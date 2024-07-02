from fastapi import APIRouter, Depends, HTTPException

# Model
from model.response.resourceTypeResponse import ResourceTypeResponse
from tools.dataCreator.model.resourceType import ResourceType

#Orm
from sqlalchemy.orm import Session

def getResourceTypeRouter(database):
    router = APIRouter(
        prefix="/resourceType",
    )

    @router.get("/getResourceTypes",response_model=list[ResourceTypeResponse])
    async def getResourceTypes(database: Session = Depends(database.getDatabase)):
        types = database.query(ResourceType).all()
        
        if types is None:
            raise HTTPException(status_code=404, detail="Type not found.")
    
        return types
    
    return router