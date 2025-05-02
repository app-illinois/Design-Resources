## Debugging

Modern browsers tend not to allow dynamic loading of page elements from local files, so a mini web server is needed when working on the cookie banner.

If Python is available, a simple web server can be launched for testing using this command:

```shell
python -m http.server 8888
```

Once this mini web server is running, the pages can be tested by visiting `http://localhost:8888`.

> Standard disclaimer: the Python mini web server is not acceptable for any production hosting.