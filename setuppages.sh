#cp ./applications/buttons/*.css ./docs/css 
#cp ./applications/buttons/*.js ./docs/js
find ./applications -name *.js -exec cp {} ./docs/js \;
find ./applications -name *.css -exec cp {} ./docs/css \;
