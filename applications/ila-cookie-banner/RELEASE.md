# Cookie Banner Release Process

This is a guide for installing a new release of the campus cookie banner to the Content Delivery Network (CDN).

The target audience for this document is the team that maintains the CDN that serves the shared cookie banner.

## Stage the New Release

### Step 1. Create the new release folder

+ Create a new folder, named for the versioned release, at the root of `onetrust.techservices.illinois.edu`

	> For example, if `1.0.0`: https://onetrust.techservices.illinois.edu/1.0.0
		
### Step 2. Get the latest cookie banner zip file from GitHub Actions

+ Visit https://github.com/app-illinois/Design-Resources/actions
+ Click on [`Cookie banner zip`](https://github.com/app-illinois/Design-Resources/actions/workflows/cookie-banner-zip.yaml)
+ Click on the the latest successful run - the top one with a green icon.

	> Warning: Failed runs are not expected. Contact the development team if the most recent `Cookie banner zip` GitHub action failed (indicated by a red icon).

+ Find and click `cookie-banner` under the `Artifacts` section of the `GitHub Actions Cookie banner zip` page.
+ Find the Zip file in your browser downloads directory.
	
### Step 3. Extract & upload the contents of the zip file to the path created in step one

After the zip file contents are extracted & uploaded, the contents of the `1.0.0` folder should look like:

	1.0.0
	├── css
	│   ├── ila-cookie-banner.css
	│   ├── ila-cookie-uic-colors.css
	│   ├── ila-cookie-uis-colors.css
	│   └── ila-cookie-uiuc-colors.css
	├── js
	│   └── ila-cookie-banner.js
	├── otSDKStub.js
	├── partials
	│   └── ila-cookie-banner-content.part.html
	└── RELEASE.md

### Step 4. Verify the main JavaScript file

+ With a text editor, open `otSDKStub.js`.
+ For release `1.0.0`, verify that the first line of `otSDKStub.js` contains `1.0.0`:
	
	```javascript
	let cookie_url = 'https://onetrust.techservices.illinois.edu/1.0.0';
	```
	
	> Warning: If the version number (such as `1.0.0`) in the first line does not match the expected release version, the new version will not load properly. Reach out to the development team.
	
## Production Release

### Step 5. Activate the New Release

+ Make a backup copy of `https://onetrust.techservices.illinois.edu/otSDKStub.js` to `YYYY.MM.DD.otSDKStub.js`

	> Warning: The next step causes the new version of the cookie banner to start appearing across all sites that use the file.

+ Put the new `otSDKStub.js` at the CDN root. - Copy the file verified in step 3 - `https://onetrust.techservices.illinois.edu/1.0.0/otSDKStub.js` to the CDN root `https://onetrust.techservices.illinois.edu/otSDKStub.js`.

	> Tip: You can roll back to the previous version by restoring `YYYY.MM.DD.otSDKStub.js` to `otSDKStub.js`.
	> This is recommended if any part of `Step 6: Verify the Release` fails.

### Step 6. Verify the Release

+ In a browser, visit a website that imports `https://onetrust.techservices.illinois.edu/otSDKStub.js` with a `<script src=...>` line. For example: https://cookieme.rslater.web.illinois.edu/

+ Press F12 to open the `Developer Tools`.
+ Find and open the `Network` tab of `Developer Tools`.
+ Ensure that `Disable Cache` is checked. (Otherwise the browser may re-use old downloaded files to save time, but break this test.)
+ Reload the page, to capture a copy of all network traffic.
+ Review the rows returned - find the rows from our CDN domain (`onetrust.techservices.illinois.edu`).

	> Tip: If no such rows are found, then the deployment was not fully successful. Restore `YYYY.MM.DD.otSDKStub.js` to `otSDKStub.js` and reach out to the development team.

+ In these rows, confirm that the expected release number (i.e. `1.0.0`) appears in the `GET URL` details. For example:

	```http
	GET https://onetrust.techservices.illinois.edu/1.0.0/partials/ila-cookie-banner-content.part.html 200
	```

	```http
	GET https://onetrust.techservices.illinois.edu/1.0.0/css/ila-cookie-banner.css 200
	```
	
	> Tip: If these URLs *do not include* the expected `onetrust.techservices.illinois` and the current release version (such as `1.0.0`), then the deployment was not fully successful. Restore `YYYY.MM.DD.otSDKStub.js` to `otSDKStub.js` and reach out to the development team.