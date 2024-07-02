from core.utils import Utils
from exception.exception import SettingsFileNotFoundException,NullException

class Settings:
    def __init__(self) -> None:
        self.utils = Utils()
        self.settings = None
        
        self.readSettings()
    
    def readSettings(self):
        settingsFilePathArray = [self.utils.BASE_PATH,'appsettings.json']
        settingsFilePath = self.utils.mergePath(settingsFilePathArray)
        
        if(self.utils.checkExist(settingsFilePath)):
            self.settings = self.utils.readJsonFile(settingsFilePath)
            
            if not(self.settings):
                raise NullException()
        else:
            raise SettingsFileNotFoundException()