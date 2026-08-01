import urllib.request
import urllib.error
import json

# Read key saved in localStorage or test keys
keys_to_test = [
    "AQ.Ab8RN6JoqcEFyszfShkPV0DGaokA3HW0eXXbJc7OVsx76hwQzw",
    "AQ.Ab8RN6Ig_FGLmBQ4ySv-c4gb9Bd2DsOE8ivUfavIAvo9O-kdnQ"
]

models = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-flash-latest",
    "gemini-2.0-flash-exp",
    "gemini-1.5-pro",
    "gemini-1.0-pro",
    "gemini-pro"
]

for key in keys_to_test:
    print(f"================ Testing Key: {key[:10]}... ================")
    
    # 1. Test ListModels API
    list_url = f"https://generativelanguage.googleapis.com/v1beta/models?key={key}"
    try:
        req = urllib.request.Request(list_url)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print("SUCCESS ListModels! Available models count:", len(data.get('models', [])))
            for m in data.get('models', []):
                if 'generateContent' in m.get('supportedGenerationMethods', []):
                    print("  - Available:", m['name'])
    except urllib.error.HTTPError as e:
        print(f"FAILED ListModels: HTTP {e.code} - {e.read().decode('utf-8')[:200]}")
    except Exception as e:
        print("FAILED ListModels:", e)

    # 2. Test generateContent on candidate models
    for m in models:
        gen_url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={key}"
        payload = {"contents": [{"parts": [{"text": "Say Hello"}]}]}
        try:
            req = urllib.request.Request(
                gen_url,
                data=json.dumps(payload).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                text = data['candidates'][0]['content']['parts'][0]['text']
                print(f"SUCCESS generateContent [{m}]: {text.strip()[:60]}")
                break
        except urllib.error.HTTPError as e:
            print(f"FAILED [{m}]: HTTP {e.code} - {e.read().decode('utf-8')[:120]}")
        except Exception as e:
            print(f"FAILED [{m}]: {e}")
