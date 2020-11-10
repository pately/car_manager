#!/usr/bin/env sh

echo "Purging node_modules..."
find . -name "node_modules" -exec rm -rf '{}' +
echo "Deleted."

echo "Purging dist folders..."
find . -name "dist" -exec rm -rf '{}' +
echo "Deleted."

echo "Install node_modules..."
npm install
echo "Installed."

echo "Starting transpilation..."
npm run build
echo "Transpilation done."

echo "Setting up oas-tools..."

# Merge swagger references for oas-generator
node_modules/.bin/swagger-merger -i ./docs/api_spec/v0.1.0_carManagerAPI/swagger.yaml -o ./docs/api_spec/v0.1.0_carManagerAPI/swagger-merger.yaml

# Generate the oas project
node_modules/.bin/oas-generator ./docs/api_spec/v0.1.0_carManagerAPI/swagger-merger.yaml -n generatedServer

# Remove swagger-merger.yaml
rm ./docs/api_spec/v0.1.0_carManagerAPI/swagger-merger.yaml

# Change extension of ControllerService files
find ./generatedServer/controllers -name "*ControllerService.js" -exec sh -c 'mv "$1" "${1%ControllerService.js}ControllerService.ts"' _ {} \;

# Change extension of Controller files
find ./generatedServer/controllers -name "*Controller.js" -exec sh -c 'mv "$1" "${1%Controller.js}Controller.ts"' _ {} \;

# Copy generated oas-tools code into the project
mv generatedServer/api/oas-doc.yaml dist/commonjs/adapter/oas-doc.yaml
cp -n generatedServer/controllers/*Controller*.ts src/adapter/controllers/

# Check if the same amount of Controller exists
conSer=$(find ./src/adapter/controllers -name "*Controller.ts" -prune -print | grep -c /)
con=$(find ./generatedServer/controllers -name "*Controller.ts" -prune -print | grep -c /)
if [ $conSer -ne $con ]; then
  tput setaf 1;
  echo "Error - Mismatching Controller file(s) found! Please check for changed/deleted routes.";
  tput sgr0;
  echo
  rm -r ./generatedServer
  exit 1;
fi

# Check if a Controller doesn't exists
for i in ./generatedServer/controllers/*Controller.ts
do
	if [ ! -e ./src/adapter/controllers/`basename $i` ]
	then
	  tput setaf 1;
    echo "Error - Mismatching Controller file(s) found! Please check for changed/deleted routes.";
    tput sgr0;
    echo
    rm -r ./generatedServer
    exit 1;
	fi
done

# Remove the generated project
rm -r ./generatedServer
echo "oas-tools setup done."

echo "Checking outdated npm packages..."
npm outdated --long
echo "Checked."

echo "car manager api installed successfully"
echo "run 'npm start' to start the application"
