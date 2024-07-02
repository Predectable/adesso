# Core
from .base import Base

#Constant
from ..constant.relationship import UNITS_RELATIONSHIP,UNIT_RELATIONSHIP
from ..constant.tableNames import UNITS,UNIT_TYPES,AGES,EXPANSIONS

#Third Party
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
import uuid

#Orm
from .unitType import UnitType
from .age import Age
from .expansion import Expansion
from .cost import Cost
from .attackBonus import AttackBonus
from .armorBonus import ArmorBonus

class Unit(Base):
    __tablename__ = UNITS
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    uuid = Column(String(32), unique=True, default=lambda: uuid.uuid4().hex)
    unitTypeId = Column(Integer, ForeignKey(f'{UNIT_TYPES}.id'))
    ageId = Column(Integer, ForeignKey(f'{AGES}.id'))
    expansionId = Column(Integer, ForeignKey(f'{EXPANSIONS}.id'))
    buildTime = Column(Integer)
    reloadTime = Column(Float)
    attackDelay = Column(Float)
    movementRate = Column(Float)
    lineOfSight = Column(Integer)
    hitPoints = Column(Integer)
    range = Column(String)
    attack = Column(Integer)
    armor = Column(String)
    accuracy = Column(String)
    
    unitType = relationship(UnitType, back_populates=UNITS_RELATIONSHIP)
    age = relationship(Age, back_populates=UNITS_RELATIONSHIP)
    expansion = relationship(Expansion, back_populates=UNITS_RELATIONSHIP)
    costs = relationship(Cost, back_populates=UNIT_RELATIONSHIP)
    attackBonuses = relationship(AttackBonus, back_populates=UNIT_RELATIONSHIP)
    armorBonuses = relationship(ArmorBonus, back_populates=UNIT_RELATIONSHIP)
