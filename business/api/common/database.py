from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

class Database():
    def __init__(self,settings) -> None:
        self.settings = settings
        self.dataBaseUrl = self.settings["database"]["url"]
        self.sessionLocal = None
        
        self.createDatabaseVariables()
    
    def createDatabaseVariables(self):
        engine = create_engine(self.dataBaseUrl,
                            pool_size=10,
                            max_overflow=20,
                            pool_timeout=30,
                            pool_recycle=3600,
                            connect_args={"check_same_thread": False}
                            )
        self.sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    def getDatabase(self):
        try:
            yield self.sessionLocal()
        finally:
            self.sessionLocal().close()