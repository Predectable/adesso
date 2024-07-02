# Common
from typing import List
from fastapi import APIRouter, Depends, HTTPException

# Model
from model.response.unitResponse import UnitResponse
from model.request.unitFilterRequest import UnitFilterRequest
from tools.dataCreator.model.unit import Unit
from tools.dataCreator.model.cost import Cost

# Orm
from sqlalchemy.orm import Session,joinedload

def getUnitRouter(database):
    router = APIRouter(
        prefix="/unit",
    )

    @router.post("/getUnits",response_model=List[UnitResponse])
    async def getUnits(parameters : UnitFilterRequest,database: Session = Depends(database.getDatabase)):
        query = database.query(Unit).options(joinedload(Unit.age),joinedload(Unit.unitType),joinedload(Unit.expansion),joinedload(Unit.costs).joinedload(Cost.resourceType))
        
        if parameters.ageId is not None:
            query = query.filter(Unit.ageId == parameters.ageId)

        if parameters.resource:
            for resource in parameters.resource:
                subquery = database.query(Cost.unitId).filter(
                    Cost.resourceTypeId == resource.resourceTypeId,
                    Cost.amount >= resource.minValue,
                    Cost.amount <= resource.maxValue
                ).subquery()
                query = query.filter(Unit.id.in_(subquery))
        
        units = query.all()
        
        if units is None:
            units = []
        
        return units
    
    return router