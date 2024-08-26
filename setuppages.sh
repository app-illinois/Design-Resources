mkdir -p ./docs/css
mkdir -p ./docs/js
find ./applications -name *.js -exec cp {} ./docs/js \;
find ./applications -name *.css -exec cp {} ./docs/css \;
