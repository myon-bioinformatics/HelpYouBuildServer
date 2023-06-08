import http.server
import urllib.parse
from http import HTTPStatus


class ControlMessage:
    def __init__(self, text, number):
        self.text = text
        self.number = number


class AdminHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        parsed_path = urllib.parse.urlparse(self.path)
        if parsed_path.path == "/admin":
            self.handle_admin_post()
        else:
            self.send_error(HTTPStatus.NOT_FOUND, "Not Found")

    def handle_admin_post(self):
        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length).decode("utf-8")
        parsed_data = urllib.parse.parse_qs(post_data)

        text = parsed_data.get("text", [""])[0]
        number = parsed_data.get("number", [None])[0]

        if not text or not number.isdigit():
            self.send_error(HTTPStatus.BAD_REQUEST, "Bad Request")
            return

        message = ControlMessage(text, number)
        process_message(message)

        self.send_response(HTTPStatus.OK)
        self.send_header("Content-type", "text/plain")
        self.end_headers()

def process_message(message):
    # Print the accepted control message
    print("Accepted Control message about Text and Number: {}, Number: {}".format(
        message.text, message.number))


if __name__ == "__main__":
    # Set up the server
    server_address = ("", 3020)
    admin_handler = AdminHandler

    httpd = http.server.HTTPServer(server_address, admin_handler)
    print("Server is started at http://localhost:"+str(server_address[1]))

    try:
        # Start serving requests
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass

    # Shut down the server
    httpd.server_close()
