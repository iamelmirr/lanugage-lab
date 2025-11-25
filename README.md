## 📜 License
This project is licensed under the **Creative Commons BY-NC 4.0 License**.  
**Commercial use is strictly prohibited** without permission.  

🔗 [Read the full license](LICENSE)  


# LanguageLab - AI Language Learning Platform

# https://language1ab.netlify.app/

LanguageLab is an interactive language learning platform that leverages AI to provide personalized language tutoring experiences.

## Features

### Immersive Learning Modes
- **Chat Mode**: Practice general conversations with AI tutors
- **Dialogue Mode**: Engage in pre-scripted scenarios
- **Roleplay Mode**: Simulate real-life situations
- **Debate Mode**: Discuss various topics to improve argumentation skills
- **Scenario Mode**: Practice specific situations like shopping or traveling

### Key Functionalities
- Real-time voice synthesis for pronunciation practice
- Multi-language support (English, Spanish, French, German, Italian)
- Progress tracking and level system
- Customizable learning paths
- Translation support
- Streak tracking for consistent learning

### Learning Tools
- Speech recognition for conversation practice
- Instant feedback on language usage
- Customizable difficulty levels (A1-A2, B1-B2, C1-C2)
- Progress analytics and performance tracking

## Technical Stack
- React.js for frontend development
- Firebase for authentication and data storage
- Azure Speech Services for voice synthesis
- OpenAI API for conversation generation (via Netlify serverless functions)
- Netlify for hosting and serverless backend

## Environment Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your API credentials** (see `.env.example` for all required variables)

3. **Important Notes:**
   - Do NOT use quotes around environment variable values
   - The `.env.local` file is git-ignored for security
   - See `DEPLOYMENT_GUIDE.md` for production deployment instructions

### Required Environment Variables

| Variable | Used for |
| --- | --- |
| `VITE_FIREBASE_APIKEY`, `VITE_AUTHDOMAIN`, `VITE_FIREBASE_PROJECTID`, `VITE_STORAGEBUCKET`, `VITE_MESSAGINGSENDERID`, `VITE_FIREBASE_APPID` | Firebase authentication and data storage |
| `VITE_AZURE_SPEECH_KEY`, `VITE_AZURE_REGION` | Azure speech synthesis and recognition |
| `VITE_OPENAI_API_KEY` | OpenAI API (used by serverless functions only) |
| `VITE_AWS_ACCESS_KEY_ID`, `VITE_AWS_SECRET_ACCESS_KEY` | AWS SDK configuration |

**Security Note:** OpenAI API calls are proxied through Netlify serverless functions (`netlify/functions/chat.js`) to keep your API key secure and avoid CORS issues.

## Development

### Local Development
```bash
# Install dependencies
npm install

# Run with Vite only (OpenAI features won't work)
npm run dev

# Run with Netlify CLI (includes serverless functions)
netlify dev
```

### Building for Production
```bash
npm run build
```

## Deployment

See `DEPLOYMENT_GUIDE.md` for detailed instructions on:
- Setting up Netlify environment variables
- Configuring Firebase security rules
- Troubleshooting CORS and authentication issues

## Usage

1. Create an account or log in
2. Select your target language and proficiency level
3. Choose a learning mode that matches your goals
4. Start practicing with the AI tutor

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
