# Core
from .base import Base

#Constant
from ..constant.relationship import AGE_RELATIONSHIP
from ..constant.tableNames import AGES
from ..constant.modelRelationships import UNIT

#Third Party
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class Age(Base):
    __tablename__ = AGES
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    
    units = relationship(UNIT, back_populates=AGE_RELATIONSHIP)