"""
from https://stackoverflow.com/questions/12544056/how-do-i-get-the-current-ipython-jupyter-notebook-name
answer by P. Toccaceli
"""


import jupyterlab
if jupyterlab.__version__.split(".")[0] == "3":
    from jupyter_server import serverapp as app
    key_srv_directory = 'root_dir'
else : 
    from notebook import notebookapp as app
    key_srv_directory = 'notebook_dir'
import urllib
import json
import os
import ipykernel

def notebook_path(key_srv_directory, ):
    """Returns the absolute path of the Notebook or None if it cannot be determined
    NOTE: works only when the security is token-based or there is also no password
    """
    connection_file = os.path.basename(ipykernel.get_connection_file())
    kernel_id = connection_file.split('-', 1)[1].split('.')[0]

    for srv in app.list_running_servers():
        try:
            if srv['token']=='' and not srv['password']:  # No token and no password, ahem...
                req = urllib.request.urlopen(srv['url']+'api/sessions')
                print('no token or password')
            else:
                req = urllib.request.urlopen(srv['url']+'api/sessions?token='+srv['token'])
            sessions = json.load(req)
            
            for sess in sessions:
                if sess['kernel']['id'] == kernel_id:
                    print(os.path.join(srv[key_srv_directory],sess['notebook']['path']))
        except:
            print('failed')
            pass  # There may be stale entries in the runtime directory 
    return None
