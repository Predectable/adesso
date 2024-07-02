from core.utils import Utils
from constant.tableColumns import ACCURACY, AGE, ARMOR, ARMOR_BONUS, ATTACK, ATTACK_BONUS, ATTACK_DELAY, BUILD_TIME, COST, DESCRIPTION, EXPANSION, HIT_POINTS, ID, LINE_OF_SIGHT, MOVEMENT_RATE, NAME, RANGE, RELOAD_TIME
from model.age import Age
from model.armorBonus import ArmorBonus
from model.attackBonus import AttackBonus
from model.cost import Cost
from model.expansion import Expansion
from model.resourceType import ResourceType
from model.unit import Unit
from model.unitType import UnitType

class DataCreator:
    def __init__(self,session) -> None:
        self.session = session
        self.data = None
        self.utils = Utils()
        
    def readData(self,path : str):
        self.data = self.utils.readJsonFile(path)
    
    def create(self):
        resourceTypes = {}
        for unit in self.data['units']:
            if COST in unit and unit[COST] != None:
                for resource in unit[COST].keys():
                    if resource not in resourceTypes:
                        resourceType = ResourceType(name=resource)
                        self.session.add(resourceType)
                        resourceTypes[resource] = resourceType

        ages = {}
        expansions = {}
        unitTypes = {}
        for unit in self.data['units']:
            ageName = unit[AGE]
            expansionName = unit[EXPANSION]
            unitTypeName = unit[NAME]
            unitDescription = unit[DESCRIPTION]
            
            if ageName not in ages:
                age = Age(name=ageName)
                self.session.add(age)
                ages[ageName] = age

            if expansionName not in expansions:
                expansion = Expansion(name=expansionName)
                self.session.add(expansion)
                expansions[expansionName] = expansion

            if unitTypeName not in unitTypes:
                unitType = UnitType(name=unitTypeName, description=unitDescription)
                self.session.add(unitType)
                unitTypes[unitTypeName] = unitType

        for unit in self.data['units']:
            newUnit = Unit(
                unitType=unitTypes[unit[NAME]],
                age=ages[unit[AGE]],
                expansion=expansions[unit[EXPANSION]],
                buildTime=unit.get(BUILD_TIME),
                reloadTime=unit.get(RELOAD_TIME),
                attackDelay=unit.get(ATTACK_DELAY),
                movementRate=unit.get(MOVEMENT_RATE),
                lineOfSight=unit.get(LINE_OF_SIGHT),
                hitPoints=unit.get(HIT_POINTS),
                range=unit.get(RANGE),
                attack=unit.get(ATTACK),
                armor=unit.get(ARMOR),
                accuracy=unit.get(ACCURACY)
            )
            self.session.add(newUnit)
            
            if COST in unit:
                if(unit[COST] != None):
                    for resource, amount in unit[COST].items():
                        newCost = Cost(resourceType=resourceTypes[resource], amount=amount, unit=newUnit)
                        self.session.add(newCost)
            
            if ATTACK_BONUS in unit:
                for bonus in unit[ATTACK_BONUS]:
                    new_attack_bonus = AttackBonus(bonus=bonus, unit=newUnit)
                    self.session.add(new_attack_bonus)
        
            if ARMOR_BONUS in unit:
                for bonus in unit[ARMOR_BONUS]:
                    new_armor_bonus = ArmorBonus(bonus=bonus, unit=newUnit)
                    self.session.add(new_armor_bonus)

        self.session.commit()
  