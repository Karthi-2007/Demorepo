import os
import json
import urllib.request
import ssl

ctx = ssl._create_unverified_context()
dist_dir = r'c:\Myself\Portfolio\dist'

files_payload = []

for root, dirs, files in os.walk(dist_dir):
    for f in files:
        full_p = os.path.join(root, f)
        rel_p = os.path.relpath(full_p, dist_dir).replace('\\', '/')
        
        # Read file data
        with open(full_p, 'rb') as fp:
            data = fp.read()
            
        try:
            # Try text decoding
            text_content = data.decode('utf-8')
            files_payload.append({
                "file": rel_p,
                "data": text_content
            })
        except UnicodeDecodeError:
            # Binary file
            import base64
            b64_content = base64.b64encode(data).decode('utf-8')
            files_payload.append({
                "file": rel_p,
                "data": b64_content,
                "encoding": "base64"
            })

print(f'Total files prepared for Vercel deployment payload: {len(files_payload)}')

payload = {
    "name": "karthikeyan-portfolio",
    "target": "production",
    "files": files_payload,
    "projectSettings": {
        "framework": None
    }
}

json_bytes = json.dumps(payload).encode('utf-8')
print(f'Payload size: {len(json_bytes)} bytes')

# Submit deployment to Vercel API
url = 'https://api.vercel.com/v13/deployments'
req = urllib.request.Request(url, data=json_bytes, headers={
    'Content-Type': 'application/json'
})

try:
    with urllib.request.urlopen(req, context=ctx) as resp:
        res_data = json.loads(resp.read().decode('utf-8'))
        print('=== VERCEL DEPLOYMENT SUCCESS ===')
        print('URL:', res_data.get('url'))
        print('Alias:', res_data.get('alias'))
except Exception as e:
    print('Vercel API error:', e)
