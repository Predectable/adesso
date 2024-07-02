from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from model.base import Base
from core.utils import Utils

class Database:
    def __init__(self, settings) -> None:
        self.utils = Utils()
        self.settings = settings
        
        self.session = self.createDatabase()
    
    def createDatabase(self):
        databaseFile = f"{self.settings['databaseFileName']}.db"
        databaseExists = self.utils.checkExist(self.utils.mergePath([self.utils.BASE_PATH,databaseFile]))

        engine = create_engine(f'sqlite:///{databaseFile}')

        if not databaseExists:
            Base.metadata.create_all(engine)

        Session = sessionmaker(bind=engine)
        session = Session()
        
        return session