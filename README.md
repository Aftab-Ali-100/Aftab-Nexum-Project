# 🍳 AI Recipe Generator

*Transform your ingredients into culinary masterpieces with the power of AI*

An intelligent web application that generates personalized recipes based on your available ingredients, dietary preferences, and cooking style. Powered by advanced AI technology and seamless user authentication.

## ✨ Features

- 🤖 *AI-Powered Recipe Generation* - Smart recipe creation based on your ingredients
- 🔐 *Magic Link Authentication* - Secure, passwordless login via email
- 🥗 *Dietary Preferences* - Support for vegetarian, vegan, gluten-free, and custom diets
- 📱 *Responsive Design* - Perfect experience across all devices
- ⚡ *Real-time Processing* - Instant recipe generation with n8n workflow automation
- 💾 *Recipe History* - Save and revisit your favorite AI-generated recipes
- 🔄 *Smart Suggestions* - Ingredient recommendations and substitutions



## 🛠 Tech Stack

### Frontend
- *Next.js 14* - React framework with App Router
- *React 18* - UI library
- *Tailwind CSS* - Utility-first CSS framework
- *TypeScript* - Type-safe development

### Backend & AI
- *n8n* - Workflow automation for AI logic
- *Supabase* - Authentication and real-time database
- *MongoDB* - Primary database for recipe storage
- *OpenAI API* - AI recipe generation engine

### DevOps & Deployment
- *Vercel* - Hosting and CI/CD
- *GitHub Actions* - Automated testing and deployment
- *ESLint & Prettier* - Code quality and formatting

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- MongoDB database
- n8n instance (self-hosted or cloud)

### Setup Instructions

1. *Clone the repository*
bash
git clone https://github.com/yourusername/ai-recipe-generator.git
cd ai-recipe-generator


2. *Install dependencies*
bash
npm install


3. *Environment Configuration*
bash
cp .env.example .env.local


Add your environment variables:
env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://jhfshdnbvgybzibdhytx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZnNoZG5idmd5YnppYmRoeXR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MzE5MDMsImV4cCI6MjA2OTMwNzkwM30.hTfAczcZWKuzVNSq0DvOCyCnng-Nrn7yyBVoXmrVpm8



# App Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret


4. *Database Setup*
bash
# Run Supabase migrations
npx supabase db push

# MongoDB collections will be created automatically


5. *Start Development Server*
bash
npm run dev




## 🎯 Usage

### Generate Your First Recipe

1. *Sign In* - Use the magic link authentication with your email
2. *Add Ingredients* - List what you have in your kitchen
3. *Set Preferences* - Choose dietary restrictions and cuisine type
4. *Generate Recipe* - Let AI create your personalized recipe
5. *Cook & Enjoy* - Follow the step-by-step instructions

### Example API Usage

javascript
// Generate recipe via API
const response = await fetch('/api/generate-recipe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ingredients: ['chicken', 'tomatoes', 'basil'],
    dietary: ['gluten-free'],
    cuisine: 'italian',
    servings: 4
  })
});

const recipe = await response.json();


## 🏗 Project Structure


ai-recipe-generator/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase client
│   ├── mongodb.ts        # MongoDB connection
│   └── n8n.ts           # n8n workflow functions
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── docs/                 # Documentation


## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/auth/magic-link | POST | Send magic link email |
| /api/generate-recipe | POST | Generate AI recipe |
| /api/recipes | GET | Get user recipes |
| /api/recipes/[id] | GET | Get specific recipe |
| /api/ingredients/suggest | GET | Get ingredient suggestions |

## 🧪 n8n Workflow

The AI recipe generation is powered by a sophisticated n8n workflow that:

1. *Receives ingredients* from the web app
2. *Processes dietary restrictions* and preferences
3. *Calls OpenAI API* with optimized prompts
4. *Formats the response* into structured recipe data
5. *Returns JSON* with ingredients, instructions, and metadata

## 🚀 Deployment

### Automated Deployment (Recommended)

The app automatically deploys to Vercel on every push to the main branch.

1. *Connect Repository* to Vercel
2. *Set Environment Variables* in Vercel dashboard
3. *Deploy* - Automatic with Git integration

### Manual Deployment

bash
# Build the application
npm run build

# Deploy to Vercel
npx vercel --prod


## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. *Fork the repository*
2. *Create a feature branch*
   bash
   git checkout -b feature/amazing-feature
   
3. *Make your changes*
4. *Run tests*
   bash
   npm run test
   npm run lint
   
5. *Commit your changes*
   bash
   git commit -m 'Add amazing feature'
   
6. *Push to branch*
   bash
   git push origin feature/amazing-feature
   
7. *Open a Pull Request*

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- *OpenAI* for providing the AI capabilities
- *Supabase* for authentication and real-time features
- *n8n* for workflow automation
- *Vercel* for seamless deployment
- *Next.js team* for the amazing framework

## 📧 Contact

*Your Name* - Aftab Ali (soomroaftab2004@gmail.com)





<div align="center">
  <p>Made with ❤ and lots of ☕</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
