#!/bin/bash
mkdir -p ./cookie-zip-stage
mkdir -p ./cookie-zip-stage/js
mkdir -p ./cookie-zip-stage/css
mkdir -p ./cookie-zip-stage/partials

# Start staging
cp ./applications/ila-cookie-banner/*.js ./cookie-zip-stage/js
cp ./applications/ila-cookie-banner/*.css ./cookie-zip-stage/css
cp ./applications/ila-cookie-banner/*.part.html ./cookie-zip-stage/partials

# Pack slideover in with cookie banner
cat applications/ila-slideovers/ila-slideover.js >>./cookie-zip-stage/js/ila-cookie-banner.js

# Leave a copy under the old name for old hardcoded URLs
cp ./cookie-zip-stage/js/ila-cookie-banner.js ./cookie-zip-stage/otSDKStub.js
