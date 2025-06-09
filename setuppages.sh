#!/bin/bash
DEPLOY_URL='https://app-illinois.github.io/Design-Resources'
mkdir -p ./docs/css
mkdir -p ./docs/js
find ./applications -iregex .*[.]js$ -exec cp {} ./docs/js \;
find ./applications -name *.css -exec cp {} ./docs/css \;
find ./applications -iregex .*[.]part[.]html$ -exec cp {} ./docs/partials \;
sed "s;DEPLOY_URL;$COOKIE_URL;" ./docs/js/ila-cookie-banner.js

# Allows ila.cookie.banner.js to function with only a single js import.
cat applications/ila-slideovers/ila-slideover.js >> docs/js/ila-cookie-banner.js
