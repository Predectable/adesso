# Core
from .base import Base

#Constant
from ..constant.relationship import UNIT_TYPE_RELATIONSHIP
from ..constant.tableNames import UNIT_TYPES
from ..constant.modelRelationships import UNIT

#Third Party
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class UnitType(Base):
    __tablename__ = UNIT_TYPES
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    description = Column(String)
    
    units = relationship(UNIT, back_populates=UNIT_TYPE_RELATIONSHIP)
