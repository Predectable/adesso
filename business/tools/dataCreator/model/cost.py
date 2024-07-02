# Core
from .base import Base

#Constant
from ..constant.relationship import COSTS_RELATIONSHIP,UNITS_RELATIONSHIP,RESOURCE_TYPE_RELATIONSHIP
from ..constant.tableNames import UNITS,COSTS,RESOURCE_TYPES
from ..constant.modelRelationships import UNIT

#Third Party
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

#Orm
from .resourceType import ResourceType

class Cost(Base):
    __tablename__ = COSTS
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    unitId = Column(Integer, ForeignKey(f'{UNITS}.id'))
    resourceTypeId = Column(Integer, ForeignKey(f'{RESOURCE_TYPES}.id'))
    amount = Column(Integer)
    
    unit = relationship(UNIT, back_populates=COSTS_RELATIONSHIP)
    resourceType = relationship(ResourceType, back_populates=COSTS_RELATIONSHIP)
