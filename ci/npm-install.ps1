$ErrorActionPreference = "Stop"
cd ./angular

npm install --prefer-offline --no-audit --registry http://192.168.1.6:4873/ 

git clean -f

cd ..