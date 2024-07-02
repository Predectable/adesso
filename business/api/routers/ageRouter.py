from fastapi import APIRouter, Depends, HTTPException

# Model
from model.response.ageResponse import AgeResponse
from tools.dataCreator.model.age import Age

#Orm
from sqlalchemy.orm import Session

def getAgeRouter(database):
    router = APIRouter(
        prefix="/age",
    )

    @router.get("/getAges",response_model=list[AgeResponse])
    async def getAges(database: Session = Depends(database.getDatabase)):
        ages = database.query(Age).all()
        
        if ages is None:
            raise HTTPException(status_code=404, detail="Age not found.")
    
        return ages
    
    return router