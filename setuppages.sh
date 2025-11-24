#!/bin/bash
DEPLOY_URL='https://app-illinois.github.io/Design-Resources'
STAGE_DIR='docs'

mkdir -p $STAGE_DIR/css
mkdir -p $STAGE_DIR/js
mkdir -p $STAGE_DIR/partials

find ./applications -iregex .*[.]js$ -exec cp {} $STAGE_DIR/js \;
find ./applications -name *.css -exec cp {} $STAGE_DIR/css \;
find ./applications -iregex .*[.]part[.]html$ -exec cp {} $STAGE_DIR/partials \;

if [[ $OSTYPE == darwin* ]]; then
    sed -i '' -e "s;DEPLOY_URL;$DEPLOY_URL;" $STAGE_DIR/js/ila-cookie-banner.js
else
    sed -i "s;DEPLOY_URL;$DEPLOY_URL;" $STAGE_DIR/js/ila-cookie-banner.js
fi

# Allows ila.cookie.banner.js to function with only a single js import.
cat applications/ila-slideovers/ila-slideover.js >> $STAGE_DIR/js/ila-cookie-banner.js

# Build Cookie Demo pages
cat $STAGE_DIR/Cookie-Banner.part.html > $STAGE_DIR/Cookie-Banner.html
cat $STAGE_DIR/Cookie-Banner-UIUC.part.html >> $STAGE_DIR/Cookie-Banner.html

cat $STAGE_DIR/Cookie-Banner.part.html > $STAGE_DIR/Cookie-Banner-UIC.html
cat $STAGE_DIR/Cookie-Banner-UIC.part.html >> $STAGE_DIR/Cookie-Banner-UIC.html

cat $STAGE_DIR/Cookie-Banner.part.html > $STAGE_DIR/Cookie-Banner-UIS.html
cat $STAGE_DIR/Cookie-Banner-UIS.part.html >> $STAGE_DIR/Cookie-Banner-UIS.html

cat $STAGE_DIR/Cookie-Banner.part.html > $STAGE_DIR/Cookie-Banner-CSP.html
cat $STAGE_DIR/Cookie-Banner-CSP.part.html >> $STAGE_DIR/Cookie-Banner-CSP.html
# Append ila-cookie-banner.part.html to Cookie-Banner-CSP.html, immitating a Server Side Include
cat applications/ila-cookie-banner/ila-cookie-banner-content.part.html >> $STAGE_DIR/Cookie-Banner-CSP.html

