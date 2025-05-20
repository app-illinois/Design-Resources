#!/bin/pwsh
# This script is not used in deployment, but assists in local development.
# This script is meant to exactly replicate `setuppages.sh`, on Windows.
# Apple and Linux developers should just run `setuppages.sh`.
Copy-Item .\applications\ila-cookie-banner\ila-cookie-banner-content.part.html .\docs\partials\
Copy-Item .\applications\ila-cookie-banner\*.css .\docs\css\
Copy-Item .\applications\ila-cookie-banner\ila-cookie-banner.js .\docs\js\
Get-Content .\applications\ila-slideovers\ila-slideover.js | Out-File -Append docs\js\ila-cookie-banner.js