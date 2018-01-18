from http.server import BaseHTTPRequestHandler,HTTPServer
import time
import sys
 
HOST_NAME = 'localhost'
PORT_NUMBER = 8080
REDIRECTIONS = {
}
LAST_RESORT = "http://localhost:8080/"

class RedirectHandler(BaseHTTPRequestHandler):
    def __init__(self, request, client_address, server):
        BaseHTTPRequestHandler.__init__(self, request, client_address, server)
    def do_HEAD(self):
        self.send_response(301)
        self.send_header("Location", REDIRECTIONS.get(self.path, LAST_RESORT))
        self.end_headers()
    def do_GET(self):
        print('PATH: ' + self.path)
        if self.path == "/app/bundle.js":
            with open("./app/bundle.js", "rb") as js:
                bundleJs = js.read()
            self.send_response(200)
            self.send_header('Content-type', 'application/javascript')
            self.end_headers()
            self.wfile.write(bundleJs)
        elif self.path == "/index.css":
            with open("./index.css", "rb") as css:
                css = css.read()
            self.send_response(200)
            self.send_header('Content-type', 'text/css')
            self.end_headers()
            self.wfile.write(css)
        elif self.path != "/":
            self.do_HEAD()
        else:
            with open("./index.html", "rb") as html:
                self.html = html.read()
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(self.html)

if __name__ == '__main__':
    server_class = HTTPServer
    httpd = server_class((HOST_NAME, PORT_NUMBER), RedirectHandler)
    print(time.asctime(), "Server Starts - %s:%s" % (HOST_NAME, PORT_NUMBER))
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print(time.asctime(), "Server Stops - %s:%s" % (HOST_NAME, PORT_NUMBER))