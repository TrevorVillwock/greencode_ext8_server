ipARG BASE_CONTAINER=jupyter/tensorflow-notebook:b2562c469cdd
FROM $BASE_CONTAINER

LABEL maintainer="Texas State EECS Group"

# Install C++ Kernel and fix permissions
RUN conda install --quiet --yes \
	xeus-cling -c conda-forge \
	&& \
	conda clean --all -f -y && \
	fix-permissions "${CONDA_DIR}" && \ 
	fix-permissions "/home/${NB_USER}"

ADD /greenhub_measurement_magic /greenhub_measurement_magic
WORKDIR /app
RUN pip install /greenhub_measurement_magic 

WORKDIR "/home/${NB_USER}"

RUN fix-permissions "/home/${NB_USER}" && \
	fix-permissions "${CONDA_DIR}"


