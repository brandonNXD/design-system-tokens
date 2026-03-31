import http.server
import os
import sys

PORT = int(os.environ.get("PORT", 3456))
DIRECTORY = "/Users/brandonherdrick/Documents/Claude Code to Figma"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

with http.server.HTTPServer(("", PORT), Handler) as httpd:
    print(f"Serving {DIRECTORY} on port {PORT}", flush=True)
    httpd.serve_forever()
