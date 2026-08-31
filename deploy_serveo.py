import subprocess
import time
import re
import sys

cmd = ['ssh', '-o', 'StrictHostKeyChecking=no', '-i', r'C:\Users\Karth\.ssh\id_ed25519', '-R', 'karthikeyan-portfolio:80:localhost:4173', 'serveo.net']
p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)

url = None
for _ in range(20):
    line = p.stdout.readline()
    if not line:
        break
    print('LOG:', line.strip())
    m = re.search(r'https?://[^\s]+', line)
    if m:
        url = m.group(0)
        print('CUSTOM_SUBDOMAIN_URL:', url)
        with open('public_url.txt', 'w') as f:
            f.write(url)
        break
