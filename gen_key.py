import subprocess
import os

ssh_dir = r'C:\Users\Karth\.ssh'
os.makedirs(ssh_dir, exist_ok=True)

key_path = os.path.join(ssh_dir, 'id_ed25519')
if not os.path.exists(key_path):
    cmd = ['ssh-keygen', '-t', 'ed25519', '-f', key_path, '-N', '']
    res = subprocess.run(cmd, capture_output=True, text=True)
    print('Keygen stdout:', res.stdout)
    print('Keygen stderr:', res.stderr)
else:
    print('Key already exists:', key_path)
