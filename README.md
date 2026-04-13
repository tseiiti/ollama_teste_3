```
cd backend/
django-admin startproject _core .
python manage.py startapp api 

npm create vite@latest frontend -- --template react
npm install axios react-router-dom jwt-decode
npm install lucide-react motion tailwindcss @tailwindcss/vite

https://aistudio.google.com/apps/7056d18d-5a19-43f7-bf6e-9c39d2968bfa?showAssistant=true&showCode=true
```

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/7056d18d-5a19-43f7-bf6e-9c39d2968bfa

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
