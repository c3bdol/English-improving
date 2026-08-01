import os
import sys
import json
import urllib.request
import urllib.error
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8085

class BulletproofAIServer(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, x-goog-api-key')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        # /api/gemini/models — Proxy ListModels (zero quota cost) for key validation
        if self.path.startswith('/api/gemini/models'):
            from urllib.parse import urlparse, parse_qs
            query = parse_qs(urlparse(self.path).query)
            api_key = query.get('apiKey', [''])[0]

            if not api_key:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Missing apiKey parameter'}).encode('utf-8'))
                return

            list_url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
            try:
                req = urllib.request.Request(list_url)
                with urllib.request.urlopen(req, timeout=8) as resp:
                    resp_data = resp.read()
                    print(f"[PROXY] [OK] ListModels success for key {api_key[:10]}...")
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(resp_data)
            except urllib.error.HTTPError as e:
                err_content = e.read().decode('utf-8')
                print(f"[PROXY] [ERR] ListModels error HTTP {e.code}: {err_content[:100]}")
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(err_content.encode('utf-8'))
            except Exception as e:
                print(f"[PROXY] [ERR] ListModels exception: {e}")
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
            return

        # Default: serve static files
        super().do_GET()

    def do_POST(self):
        if self.path.startswith('/api/gemini'):
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)

            try:
                payload = json.loads(post_data.decode('utf-8'))
                api_key = payload.get('apiKey', '')
                prompt = payload.get('prompt', '')
                model = payload.get('model', 'gemini-2.0-flash')
                ver = payload.get('version', 'v1beta')
                system_instruction = payload.get('systemInstruction', '')

                if not api_key:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'Missing API Key'}).encode('utf-8'))
                    return

                target_url = f"https://generativelanguage.googleapis.com/{ver}/models/{model}:generateContent?key={api_key}"

                full_text = (system_instruction + "\n\n" + prompt) if system_instruction else prompt
                google_payload = {
                    "contents": [
                        {
                            "parts": [
                                {"text": full_text}
                            ]
                        }
                    ]
                }

                if payload.get('responseMimeType'):
                    google_payload["generationConfig"] = {"responseMimeType": payload.get('responseMimeType')}
                elif payload.get('generationConfig'):
                    google_payload["generationConfig"] = payload.get('generationConfig')

                print(f"[PROXY] >> Forwarding to {model} (prompt: {prompt[:50]}...)")
                req = urllib.request.Request(
                    target_url,
                    data=json.dumps(google_payload).encode('utf-8'),
                    headers={'Content-Type': 'application/json'}
                )

                with urllib.request.urlopen(req, timeout=15) as resp:
                    resp_data = resp.read()
                    # Log success with response preview
                    try:
                        resp_json = json.loads(resp_data)
                        text_preview = resp_json.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', '')[:60]
                        print(f"[PROXY] [OK] Success! Response: {text_preview}...")
                    except:
                        print(f"[PROXY] [OK] Success! (raw response)")
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(resp_data)

            except urllib.error.HTTPError as e:
                err_content = e.read().decode('utf-8')
                print(f"[PROXY] [ERR] Google API error HTTP {e.code}: {err_content[:150]}")
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(err_content.encode('utf-8'))
            except Exception as e:
                print(f"[PROXY] [ERR] Server exception: {e}")
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Not found'}).encode('utf-8'))

    def log_message(self, format, *args):
        # Suppress default access logs for static files to keep console clean
        if '/api/' in str(args[0]) if args else False:
            super().log_message(format, *args)

if __name__ == '__main__':
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    server_address = ('0.0.0.0', PORT)
    httpd = HTTPServer(server_address, BulletproofAIServer)
    print(f"[OK] Bulletproof AI Server v3 running on http://0.0.0.0:{PORT}")
    print(f"   Endpoints: POST /api/gemini | GET /api/gemini/models")
    print(f"   Serving static files from: {web_dir}")
    httpd.serve_forever()
