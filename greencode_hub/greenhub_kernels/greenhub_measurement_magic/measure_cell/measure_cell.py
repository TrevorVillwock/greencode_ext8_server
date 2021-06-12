import requests
import time 
import os
import sys

from IPython.core.magic import register_line_cell_magic

# registers with IPython as a magic cell
@register_line_cell_magic 
def measure(line, cell):

    try:
        base_url = os.environ['DISPATCH_SERVER']
    except KeyError:
        print('Please set environment variable DISPATCH_SERVER')
        sys.exit(1)

    # create file containing all code within the magic cell
    file_name = "user_code.py"
    # user_code = open(file_name, "w")
    # user_code.write(cell)
    # user_code.close()
    
    # send file and get ID 
    url_id = base_url + '/id'
    files = {'file': open(file_name, 'rb')} # opens file into buffer; rb = read buffer
    getID = requests.post(url_id, files=files)
    ID = getID.json().get('id')

    print("Running Code...")
    
    # send ID and get gpu results
    url_results_gpu = base_url + '/results/gpu?id={}'.format(ID)
    gpu_results = requests.get(url_results_gpu)
    print(gpu_results.text)
    
    # send ID and get cpu results
    url_results_cpu = base_url + '/results/cpu?id={}'.format(ID)
    cpu_results = requests.get(url_results_cpu)
    print(cpu_results.text)
