#!/usr/bin/env python
from http import server # Python 3

class CSPHTTPRequestHandler(server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_my_headers()

        server.SimpleHTTPRequestHandler.end_headers(self)

    def send_my_headers(self):
        self.send_header("Content-Security-Policy:", "'self'")

if __name__ == '__main__':
    server.test(HandlerClass=CSPHTTPRequestHandler)
