# Core
from .base import Base

#Constant
from ..constant.relationship import RESOURCE_TYPE_RELATIONSHIP
from ..constant.tableNames import RESOURCE_TYPES
from ..constant.modelRelationships import COST

#Third Party
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class ResourceType(Base):
    __tablename__ = RESOURCE_TYPES
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    
    costs = relationship(COST, back_populates=RESOURCE_TYPE_RELATIONSHIP)
