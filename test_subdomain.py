import subprocess
import time
import re

cmd = ['ssh', '-o', 'StrictHostKeyChecking=no', '-R', 'karthikeyan-portfolio:80:localhost:4173', 'serveo.net']
p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)

for _ in range(15):
    line = p.stdout.readline()
    if not line:
        break
    print('SERVO_LINE:', line.strip())
