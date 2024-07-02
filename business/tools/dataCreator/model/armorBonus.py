from .base import Base

#Constant
from ..constant.relationship import ARMOR_BONUSES_RELATIONSHIP,UNITS_RELATIONSHIP
from ..constant.tableNames import UNITS,ARMOR_BONUSES
from ..constant.modelRelationships import UNIT

#Third Party
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

class ArmorBonus(Base):
    __tablename__ = ARMOR_BONUSES
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    unitId = Column(Integer, ForeignKey(f'{UNITS}.id'))
    bonus = Column(String)
    
    unit = relationship(UNIT, back_populates=ARMOR_BONUSES_RELATIONSHIP)
