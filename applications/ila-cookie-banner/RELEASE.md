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
+ Click on the the latest successful run - the top one with a green icon

	> Warning: Failed runs are not expected. Contact the development team if the most recent `Cookie banner zip` GitHub action failed (indicated by a red icon).

+ Find and click `cookie-banner` under the `Artifacts` section of the `GitHub Actions Cookie banner zip` page
+ Find the Zip file in your browser downloads directory
	
### Step 3. Extract & upload the contents of the zip file to the path created in step one

After the zip file contents are extracted & uploaded, the contents of the `x.y.z` folder should look like:

    x.y.z
    ├── css
    │   ├── ila-cookie-banner.css
    │   ├── ila-cookie-uic-colors.css
    │   ├── ila-cookie-uis-colors.css
    │   ├── ila-cookie-uiuc-colors.css
    │   └── ila-slideover.css
    ├── js
    │   └── ila-cookie-banner.js
    ├── otSDKStub.js
    ├── partials
    │   └── ila-cookie-banner-content.part.html
    └── RELEASE.md

For the purpose of each included file, see `### Appendix A: Guide to Release File Contents`, below.

### Step 4. Verify the main JavaScript file

+ With a text editor, open `otSDKStub.js`
+ For release `1.0.0`, verify that the first line of `otSDKStub.js` contains `1.0.0`:
	
	```javascript
	let cookie_url = 'https://onetrust.techservices.illinois.edu/1.0.0';
	```
	
	> Warning: If the version number (such as `1.0.0`) in the first line does not match the expected release version, the new version will not load properly. Reach out to the development team.
	
## Production Release

### Step 5. Activate the New Release

+ Make a backup copy of `https://onetrust.techservices.illinois.edu/scripttemplates/otSDKStub.js` to `YYYY.MM.DD.otSDKStub.js`

	> Warning: The next step causes the new version of the cookie banner to start appearing across all sites that use the file.

+ Copy `otSDKStub.js` from `1.0.0` to the `scripttemplates` folder on the CDN
 
	> Tip: The file `otSDKStub.js` in the CDN root determines which version of the cookie notice is activated.

	> For example: copy `https://onetrust.techservices.illinois.edu/1.0.0/otSDKStub.js` to `https://onetrust.techservices.illinois.edu/scripttemplates/otSDKStub.js`

### Step 6. Verify the Release

+ In a browser, visit a website that imports `https://onetrust.techservices.illinois.edu/scripttemplates/otSDKStub.js` with a `<script src=...>` line. For example, we have been testing with https://app-illinois.github.io/Design-Resources/

+ Press F12 to open the `Developer Tools`
+ Find and open the `Network` tab of `Developer Tools`
+ Ensure that `Disable Cache` is checked (Otherwise the browser may re-use old downloaded files to save time, but break this test)
+ Reload the page, to capture a copy of all network traffic
+ Review the rows returned - find the rows from our CDN domain (`onetrust.techservices.illinois.edu`)

	> Tip: If no such rows are found, then the deployment was not fully successful. Follow `How to Roll Back a Release` below, and then reach out to the development team.

+ In these rows, confirm that the expected release number (i.e. `1.0.0`) appears in the `GET URL` details. For example:

	```
	GET https://onetrust.techservices.illinois.edu/1.0.0/partials/ila-cookie-banner-content.part.html
	```

	```
	GET https://onetrust.techservices.illinois.edu/1.0.0/css/ila-cookie-banner.css
	```
	
	> Tip: If these URLs *do not include* the expected `onetrust.techservices.illinois` and the current release version (such as `1.0.0`), then the deployment was not fully successful. Follow `How to Roll Back a Release` below, and then reach out to the development team.
	
### How to Roll Back a Release

The file `otSDKStub.js` in the CDN root determines which version of the cookie notice is activated. You can roll back to the previous version by restoring the most recent `YYYY.MM.DD.otSDKStub.js` to `otSDKStub.js` in the `scripttemplates` folder. Rolling back is recommended if any part of `Step 6: Verify the Release` fails.


### Appendix A: Guide to Release File Contents

- `ila-cookie-banner.js` contains the main JavaScript.
- `otSDKStub.js` is the main JavaScript file copied and renamed to support legacy configurations.
- `ila-cookie-banner.css` and `ila-slideover.css` contain styles necessary for the banner and 'About Cookies' slide-over to function.
- `ila-cookie-<campus>-colors.css` contain campus branded accessible colors.
- `ila-cookie-banner-content.part.html` contains the HTML and text content of the cookie notice banner and the `About Cookies` slide-over.

