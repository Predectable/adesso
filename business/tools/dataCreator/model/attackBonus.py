# Core
from .base import Base

#Constant
from ..constant.relationship import ATTACK_BONUSES_RELATIONSHIP
from ..constant.tableNames import UNITS,ATTACK_BONUSES
from ..constant.modelRelationships import UNIT

#Third Party
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

class AttackBonus(Base):
    __tablename__ = ATTACK_BONUSES
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    unitId = Column(Integer, ForeignKey(f'{UNITS}.id'))
    bonus = Column(String)
    
    unit = relationship(UNIT, back_populates=ATTACK_BONUSES_RELATIONSHIP)
