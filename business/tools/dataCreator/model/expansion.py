# Core
from .base import Base

#Constant
from ..constant.relationship import UNITS_RELATIONSHIP,EXPANSION_RELATIONSHIP
from ..constant.tableNames import EXPANSIONS
from ..constant.modelRelationships import UNIT

#Third Party
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class Expansion(Base):
    __tablename__ = EXPANSIONS
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    
    units = relationship(UNIT, back_populates=EXPANSION_RELATIONSHIP)
