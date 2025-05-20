## Local Testing / Debugging the Cookie Banner

1. Swap the commented URL at the top of `ila-cookie-banner.js` so that the version with `'.'` is un-commented.

2. Copy all necessary files to the `docs/js`, `docs/css`, and `docs/partials` folder.

This happens automatically when the site is deployed, but must be done manually locally.

On Linux or Mac run `setuppages.sh`.

On Windows, use run `setuppages.ps1`.

3. Run a mini local webserver.

Modern browsers tend not to allow dynamic loading of page elements from local files, so a mini web server is needed when working on the cookie banner.

If Python is available, a simple web server can be launched for testing using this command:

```shell
python -m http.server 8888
```

Once this mini web server is running, the pages can be tested by visiting `http://localhost:8888`.

> Standard disclaimer: the Python mini web server is not acceptable for any production hosting.

