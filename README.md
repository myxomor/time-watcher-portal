
# time-watcher-portal
Портал для учета задач, проектов и времени затраченного на выполнения заданий.


## Installation & Setup
### Clone repository
```
git clone https://github.com/myxomor/time-watcher-portal.git
cd time-watcher-portal
```

### Install dependencies
Install frontend dependencies
```
npm install
```
Install backend dependencies
```
cd BE
python -m venv venv 
./venv\Scripts\activate.bat
pip -m install -r requirements.txt
```

### Compiles and hot-reloads for development
Start frontend
```
npm run serve
```
Start backend
```
cd BE
./venv\Scripts\activate.bat
python app.py
```
