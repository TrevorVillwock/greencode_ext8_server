import requests
import time 
import os
import sys

try:
    base_url = os.environ['DISPATCH_SERVER']
except KeyError:
    print('Please set environment variable DISPATCH_SERVER')
    sys.exit(1)

if len(sys.argv) != 2:
    print('Please include file name')
    sys.exit(1)

file_name = sys.argv[1]

# send file and get ID 
url_id = base_url + '/id'
files = {'file': open(file_name, 'rb')} # opens file into buffer; rb = read buffer
getID = requests.post(url_id, files=files)
ID = getID.json().get('id')

print("Running Code...")
print(ID)

# send ID and get gpu results
url_results_gpu = base_url + '/results/gpu?id={}'.format(ID)
gpu_results = requests.get(url_results_gpu)
print(gpu_results.text)

# send ID and get cpu results
url_results_cpu = base_url + '/results/cpu?id={}'.format(ID)
cpu_results = requests.get(url_results_cpu)
print(cpu_results.text)
