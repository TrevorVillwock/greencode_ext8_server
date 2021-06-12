#!/bin/bash
#
#SBATCH --ntasks=1
#SBATCH --time=1:00

srun ./powerlog.sh 1 test 10 ${fileNum}
srun python done.py ${fileNum}
