import os
import sys
import nbformat
from nbconvert import PythonExporter

notebook = 'nbtest.ipynb' # alternatively sys.argv[1]

def convertNotebook(notebookPath):
    with open(notebookPath) as fh:
        nb = nbformat.reads(fh.read(), nbformat.NO_CONVERT)
    exporter = PythonExporter()
    source, meta = exporter.from_notebook_node(nb)
    with open('temp.py', 'w+') as fh:
        fh.writelines(source)
        
convertNotebook(notebook)