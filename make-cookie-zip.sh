#!/bin/bash
if [[ -z "$GITHUB_REF_NAME" ]]; then
    echo "GITHUB_REF_NAME is not set. Please set it to the version tag."
    exit 1
fi
DEPLOY_URL="https://onetrust.techservices.illinois.edu/$GITHUB_REF_NAME"
STAGE_DIR=cookie-zip-stage

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
