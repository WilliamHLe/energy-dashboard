# TRDK02: Misc Tools

Tools used for data transformation and other operations not specifically related to frontend/backend service.

## Data transformation

### Source data

The data is located in `./data` and consist of multiple `.csv` files. The content of the files varies and is described closer in the functions which handle the importing of the data.

### Parsing the data

#### Development environment

1. Setup a virtual environment: `python3 -m venv env`
2. Activate the virtual environment: `source env/bin/activate`
3. Install requirements: `pip install -r requirements.txt`

To deactivate the virtual environment: `deactivate`

#### Scripts

The script `datatransform.py` handles parsing the data from `.csv` to the format used to populate the MongoDB.

### Generate data and prepare for seeding

1. Inside the virtual environment run: `python datatransformation.py`
2. Move the generated seeds to the seed location: `mv -v ./out/* ../backend/database/mongodb/seed`

In short the files generated in the `tools/out` folder needs to be moved to `backend/database/mongodb/seed`.
