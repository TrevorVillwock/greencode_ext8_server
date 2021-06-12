## Cloning Repository

The Node server and custom Docker image projects are tracked as separate submodules. After cloning this repository run

```
git submodule init
```
and 
```
git submodule update
```
to pull the correct versions of those repositories

## Installing Node Server

to get the node server running first make sure node and npm are installed, 

you can check if node an npm are installed on your machine with the following commands

```
node -v
```
and 
```
npm -v
```

if node or npm are not installed, you can use the tutorial listed [here](https://https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/) 

Once you've verified then install packages from the package.json with :

```
npm i
```

## jupyterhub

to interact with kubernettes cluster you need kubectl. install link [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

before you can do the minkube tuturial, you need to install Docker as your containter/VM. NOTE: If you are using WSL, you will need to install Docker for both [Windows and Linux](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly).
To install Docker, use this link [here](https://minikube.sigs.k8s.io/docs/drivers/)

for testing/development we are using minikube. find install links [here](https://minikube.sigs.k8s.io/docs/start/)

before starting the zero-to-jupyterhub tutorial run 

```
minikube start
```

This will start up the testing kubernettes cluster. You can then install the helm chart and it will deploy from the config.yaml file.

Setting up jupyterhub follows this [tutorial](https://zero-to-jupyterhub.readthedocs.io/en/latest/kubernetes/index.html)

for now we are testing with a tunneling service ngrok. Once you finish the tutorial above, run: 
```
minikube --namespace jhub service proxy-public --url
```
this will tell the cluster what to use for tunneling. 