import os
from typing import List
import json

class Utils():
    def __init__(self) -> None:
        self.BASE_PATH = os.getcwd()
        
    def mergePath(self,pathList : List[str]) -> str:
        return os.path.join(*pathList)
        
    def checkExist(self,path : str) -> bool:
        return os.path.exists(path)
    
    def readJsonFile(self,path : str):
        if not(self.checkExist(path)):
            raise FileNotFoundError
        
        data = None
        
        with open(path, 'r') as file:
            data = json.load(file)
            
        return data