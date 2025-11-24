#!/bin/pwsh
# This script is not used in deployment, but assists in local development.
# This script is meant to exactly replicate `setuppages.sh`, on Windows.
# Apple and Linux developers should just run `setuppages.sh`.
$STAGE_DIR = 'docs'

mkdir -p "$($STAGE_DIR)/css" -Force
mkdir -p "$($STAGE_DIR)/js" -Force
mkdir -p "$($STAGE_DIR)/partials" -Force

Get-ChildItem -Recurse -Filter *.js -Path .\applications\ | Copy-Item -Destination "$($STAGE_DIR)\js\" -Force
Get-ChildItem -Recurse -Filter *.css -Path .\applications\ | Copy-Item -Destination "$($STAGE_DIR)\css\" -Force
Get-ChildItem -Recurse -Filter *.part.html -Path .\applications\ | Copy-Item -Destination "$($STAGE_DIR)\partials\" -Force

Get-Content .\applications\ila-slideovers\ila-slideover.js | Out-File -Append "$($STAGE_DIR)\js\ila-cookie-banner.js"


# Append ila-cookie-banner.part.html to Cookie-Banner-CSP.html, immitating a Server Side Include
Get-Content "$(STAGE_DIR)\Cookie-Banner-CSP.part.html" | Out-File "$(STAGE_DIR)\Cookie-Banner-CSP.html"
Get-Content .\applications\ila-cookie-banner\ila-cookie-banner-content.part.html | Out-File -Append "$(STAGE_DIR)\Cookie-Banner-CSP.html"

