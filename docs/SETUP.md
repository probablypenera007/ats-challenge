Setup Instructions

This guide provides step-by-step instructions for running the AI-Powered Dynamic Interview Assistant locally and deploying it to Vercel.

Prerequisites:
Node.js (v18 or higher)
npm or yarn
A Vercel account
OpenAI API Key
MongoDB connection string


1. Clone the Repository
git clone https://github.com/probablypenera007/ats-challenge.git

2. Install Dependencies
npm install
# or
yarn install


3. Configure Environment Variables
Create a .env.local file at the root of the project with the following:
OPENAI_API_KEY=your-openai-api-key
MONGODB_URI=your-mongodb-connection-string


4. Run Locally
npm run dev
# or
yarn dev


5. Deployment to Vercel
Push your code to GitHub.
Go to vercel.com and import your repository.
In the project settings, add the same environment variables from .env.local.
Deploy the project.


6. Linting & Build
Run lint and type checks:
npm run lint
npm run build


7. Troubleshooting
API Errors: Check if your OpenAI key or MongoDB URI is missing.
Build Errors: Confirm Node.js version and dependencies are installed correctly.
404 or Crashes: Check console logs and backend routes.

8. Running Tests
This project uses Jest and React Testing Library for unit tests
to run tests:
npm run test