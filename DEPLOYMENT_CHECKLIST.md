# ✅ Deployment Checklist - LanguageLab

## 🎯 Pre-Deployment (Local)

- [x] Environment variables removed quotes in `.env.local`
- [x] Created Netlify serverless function (`netlify/functions/chat.js`)
- [x] Created OpenAI utility (`src/utils/openaiApi.js`)
- [x] Updated all 7 OpenAI API calls in `Chat.jsx`
- [x] Created `netlify.toml` configuration
- [x] Local dev server running successfully
- [x] Created documentation (`DEPLOYMENT_GUIDE.md`, `FIXES_SUMMARY.md`)

## 📤 Git Push

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Fix CORS errors and secure OpenAI API with serverless functions"

# Push to GitHub
git push origin master
```

## 🌐 Netlify Deployment

### Automatic Steps (Netlify will handle):
- [ ] Build the Vite project
- [ ] Deploy serverless functions to `/.netlify/functions/`
- [ ] Load environment variables from Netlify dashboard
- [ ] Deploy to https://language1ab.netlify.app/

### Manual Verification:
- [ ] Check Netlify deploy logs for errors
- [ ] Verify build succeeded
- [ ] Test serverless function: https://language1ab.netlify.app/.netlify/functions/chat

## 🔥 Firebase Configuration

### 1. Update Firestore Security Rules

1. **Go to:** https://console.firebase.google.com/
2. **Select:** `languagelab-6dc8e`
3. **Navigate to:** Firestore Database → Rules
4. **Update rules to:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

5. **Click:** Publish

- [ ] Firestore rules updated
- [ ] Rules published successfully

### 2. Add Authorized Domain

1. **Go to:** Authentication → Settings → Authorized domains
2. **Click:** Add domain
3. **Enter:** `language1ab.netlify.app`
4. **Add wildcard for previews (optional):** `*.netlify.app`

- [ ] Netlify domain added to authorized domains
- [ ] Changes saved

## 🧪 Testing

### On Production (https://language1ab.netlify.app/)

1. **Basic Functionality:**
   - [ ] Site loads without errors
   - [ ] Can log in / create account
   - [ ] Chat interface appears

2. **OpenAI Integration:**
   - [ ] Start a new chat
   - [ ] Send a message in target language
   - [ ] AI responds (no blank responses)
   - [ ] No CORS errors in console
   - [ ] Translation feature works
   - [ ] Grammar feedback works
   - [ ] Suggested answers work

3. **Firebase Integration:**
   - [ ] Chat history saves
   - [ ] Can load previous chats
   - [ ] User data persists
   - [ ] No 401 errors in console

4. **Browser Console:**
   - [ ] No CORS errors
   - [ ] No 401 authentication errors
   - [ ] No "Origin not allowed" errors

### Debug Commands (Browser Console)

```javascript
// Check if user is authenticated
console.log('Auth user:', auth.currentUser);

// Check environment variables loaded
console.log('Env loaded:', import.meta.env.VITE_FIREBASE_APIKEY ? 'Yes' : 'No');

// Test API endpoint (after sending a message)
fetch('/.netlify/functions/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Hello' }]
  })
}).then(r => r.json()).then(console.log);
```

## 🐛 Troubleshooting

### If OpenAI doesn't work:

1. **Check Netlify Function Logs:**
   - Go to: Netlify Dashboard → Site → Functions → chat
   - Look for errors in recent invocations

2. **Verify Environment Variables:**
   - Go to: Netlify Dashboard → Site settings → Environment variables
   - Ensure `VITE_OPENAI_API_KEY` exists and has NO quotes
   - Format: `sk-proj-...` (not `"sk-proj-..."`)

3. **Test Function Directly:**
   ```bash
   curl -X POST https://language1ab.netlify.app/.netlify/functions/chat \
     -H "Content-Type: application/json" \
     -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"Hi"}]}'
   ```

### If Firebase shows 401:

1. **Check Authentication:**
   - Browser console: `auth.currentUser`
   - Should show user object when logged in

2. **Verify Firestore Rules:**
   - Firebase Console → Firestore → Rules
   - Ensure rules allow authenticated users

3. **Check Authorized Domains:**
   - Firebase Console → Authentication → Settings → Authorized domains
   - Must include `language1ab.netlify.app`

### If nothing works:

- [ ] Clear browser cache
- [ ] Hard refresh (Cmd/Ctrl + Shift + R)
- [ ] Try incognito/private window
- [ ] Check all environment variables (no typos, no quotes)
- [ ] Redeploy from Netlify dashboard (Deploys → Trigger deploy)

## 📊 Success Criteria

✅ **All of these should work:**
- AI responds to messages in chat
- No CORS errors in browser console
- No 401 authentication errors
- Chat history saves to Firebase
- Can log in and create account
- Translation feature works
- Grammar feedback displays
- Suggested answers generate

## 🎉 Post-Deployment

Once everything works:
- [ ] Test on mobile devices
- [ ] Share with beta testers
- [ ] Monitor Netlify function usage
- [ ] Check Firebase Firestore quotas
- [ ] Monitor OpenAI API usage/costs

## 📝 Notes

- **Serverless function endpoint:** `/.netlify/functions/chat`
- **Main site:** https://language1ab.netlify.app/
- **Firebase project:** languagelab-6dc8e
- **Environment:** Production

## 🆘 Support Resources

- **Netlify Docs:** https://docs.netlify.com/functions/overview/
- **Firebase Docs:** https://firebase.google.com/docs/firestore/security/get-started
- **OpenAI API Docs:** https://platform.openai.com/docs/api-reference
- **Project Docs:** `DEPLOYMENT_GUIDE.md`, `FIXES_SUMMARY.md`

---

**Last Updated:** $(date)
**Status:** Ready for deployment ✅
