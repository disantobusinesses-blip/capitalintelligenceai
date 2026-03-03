from PIL import Image
import numpy as np
import urllib.request
import os

url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d91d1f36-5c68-48c3-9175-665929bd8103.jpeg"
output_path = "/vercel/share/v0-project/public/images/is-logo.png"

os.makedirs(os.path.dirname(output_path), exist_ok=True)

urllib.request.urlretrieve(url, "/tmp/is-logo-orig.jpg")
img = Image.open("/tmp/is-logo-orig.jpg").convert("RGBA")

data = np.array(img)
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# White background threshold — pixels close to white become transparent
threshold = 230
white_mask = (r > threshold) & (g > threshold) & (b > threshold)
data[white_mask, 3] = 0

result = Image.fromarray(data)
result.save(output_path, "PNG")
print(f"Saved transparent PNG to {output_path}")
print(f"Image size: {result.size}")
