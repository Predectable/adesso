import sys
import os

projectRoot = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(projectRoot)

from core.utils import Utils
from helper.settings import Settings as SettingsHelper
from helper.database import Database as DatabaseHelper
from business.dataCreator import DataCreator


if __name__ == '__main__':
    utils = Utils()
    print('Database tool runs...')
    
    settingsHelper = SettingsHelper()
    
    print('Settings initialized...')
    
    databaseHelper = DatabaseHelper(settingsHelper.settings)
    
    print('Database initialized...')
    
    dataCreator = DataCreator(databaseHelper.session)
    dataCreator.readData(utils.mergePath([settingsHelper.settings['dataPath'],settingsHelper.settings['dataFileName']]))
    dataCreator.create()
    
    print('Data created...')
    
    