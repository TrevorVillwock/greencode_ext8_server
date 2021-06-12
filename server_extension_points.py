# did I do this import right?
from greencode_ext8_server.handlers import _load_jupyter_server_extension

def _jupyter_server_extension_points():
    """
    Returns a list of dictionaries with metadata describing
    where to find the `_load_jupyter_server_extension` function.
    """
    return [
        {
            "module": "greencode_ext8_server"
        }
    ]