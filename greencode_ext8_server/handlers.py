import json

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
import tornado

class RouteHandler(APIHandler): # change to inherit from JupyterHandler instead?
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        GET '/api/contents/nbtest1.ipynb';
        # APIHandler has method .finish
        # nbconvert here
        # use magic code to send to svr.js and put what it sends back
        #
        self.finish(json.dumps({
            "data": "This is /greencode_ext8_server/get_example endpoint!"
        }))
        
    @tornado.web.authenticated
    def post(self):
        pass


def setup_handlers(web_app):
    host_pattern = ".*$"

    base_url = web_app.settings["base_url"]
    route_pattern = url_path_join(base_url, "greencode_ext8_server", "get_example")
    handlers = [(route_pattern, RouteHandler)]
    web_app.add_handlers(host_pattern, handlers)

# not sure if this is the right place to put this
def _load_jupyter_server_extension(serverapp: jupyter_server.serverapp.ServerApp):
    """
    This function is called when the extension is loaded.
    """
    handlers = [
        ('/greencode_ext8_server/hello', RouteHandler)
    ]
    serverapp.web_app.add_handlers('.*$', handlers)
