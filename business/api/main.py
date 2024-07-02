import sys
import os

projectRoot = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(projectRoot)

from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

# Model
from model.response.healthResponse import HealthResponse

# Router
from routers.ageRouter import getAgeRouter
from routers.resourceTypeRouter import getResourceTypeRouter
from routers.unitRouter import getUnitRouter

# Common
from common.utils import Utils
from common.database import Database

origins = ["http://localhost:4200"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

utils = Utils()
settings = utils.readJsonFile(utils.mergePath([utils.BASE_PATH,'appsettings.json']))
database = Database(settings)

app.include_router(getAgeRouter(database))
app.include_router(getResourceTypeRouter(database))
app.include_router(getUnitRouter(database))

@app.get("/")
async def root():
    return RedirectResponse(url="/health")

@app.get("/health", response_model=HealthResponse)
async def root():
    return HealthResponse(message='API runs successfully!')