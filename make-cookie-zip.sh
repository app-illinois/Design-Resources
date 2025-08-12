#!/bin/bash
CHANGELOG=./applications/ila-cookie-banner/CHANGELOG.md
VERSION=$(cat ./applications/ila-cookie-banner/VERSION)
echo "Creating cookie zip for version $VERSION"
DEPLOY_URL="https://onetrust.techservices.illinois.edu/$VERSION"
STAGE_DIR=cookie-zip-stage

if ! grep -q $VERSION $CHANGELOG; then
    echo "Error: version $VERSION not found in CHANGELOG.md."
    echo "Please update the changelog: $CHANGELOG"
    exit 1
fi

mkdir -p $STAGE_DIR/js
mkdir -p $STAGE_DIR/css
mkdir -p $STAGE_DIR/partials

# Start staging
cp ./applications/ila-cookie-banner/*.js $STAGE_DIR/js
cp ./applications/ila-cookie-banner/*.css $STAGE_DIR/css
cp ./applications/ila-slideovers/*.css $STAGE_DIR/css
cp ./applications/ila-cookie-banner/*.part.html $STAGE_DIR/partials
cp ./applications/ila-cookie-banner/RELEASE.md $STAGE_DIR

if [[ $OSTYPE == darwin* ]]; then
    sed -i '' -e "s;DEPLOY_URL;$DEPLOY_URL;" $STAGE_DIR/js/ila-cookie-banner.js
else
    sed -i "s;DEPLOY_URL;$DEPLOY_URL;" $STAGE_DIR/js/ila-cookie-banner.js
fi

# Pack slideover in with cookie banner
cat applications/ila-slideovers/ila-slideover.js >>$STAGE_DIR/js/ila-cookie-banner.js

# Leave a copy under the old name for old hardcoded URLs
cp $STAGE_DIR/js/ila-cookie-banner.js $STAGE_DIR/otSDKStub.js
