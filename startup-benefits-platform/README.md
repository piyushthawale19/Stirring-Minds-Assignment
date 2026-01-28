# Startup Benefits Platform (Stirring Minds Assignment)

## 👋 Project Overview
This is a full-stack web application designed to help startups access exclusive benefits and deals. I built this platform with a focus on a **premium user experience**, ensuring that the interface feels modern, responsive, and trustworthy—essential qualities for any B2B product.

The core functionality revolves around a "tiered access" system where verified startups get access to premium deals (like AWS credits), while unverified users can only see public offers.

## 🛠️ Tech Stack & Design Decisions
I chose a decoupled architecture to ensure scalability and clean separation of concerns:

- **Frontend**: **Next.js 14** (App Router). I really enjoy the performance benefits of Server Components, but I used Client Components for the interactive parts like the dashboard and authentication flow.
- **Styling**: **Tailwind CSS**. It allowed me to rapidly build a custom "Dark Mode" aesthetic without fighting with specificity issues. I used deep slate colors to give it that "SaaS" vibe.
- **Backend**: **Node.js & Express**. I went with a solid, typed Express server to handle the API logic. It's robust and handles the JWT authentication middleware perfectly.
- **Database**: **MongoDB**. Since deal structures can vary, a document store was the flexible choice here.
- **State Management**: React Context API for managing the user's auth session globally.

## ✨ Key Features I Implemented
1.  **Authentication System**: A complete JWT-based auth flow. You can register, login, and the session persists securely.
2.  **Smart Deal Locking**: This was the most interesting part to build. The system checks if a user is `verified` before returning the claim instructions for premium deals. If you aren't verified, you get a "Locked" UI state.
3.  **Visual Polish**: I authenticated the "claim" action with a confetti pop (using `canvas-confetti`) because positive reinforcement is great for UX!
4.  **Responsive Design**: The grid layouts for the deals adapt smoothly from mobile to desktop.

---

## 💻 How to Run This Project Locally

I've set up everything to be pretty plug-and-play. Here is how you can get it up and running on your machine.

### 1. Prerequisites
Make sure you have Node.js installed.
*Note: I verified this project using MongoDB Atlas (cloud), but the config is set up to easily switch between local or cloud mongo via the `.env` file.*

### 2. Setting up the Backend
Navigate to the server folder and install dependencies:
```bash
cd server
npm install
```

**Database Seeding**:
I wrote a seed script to populate the database with some sample data (AWS, Notion, HubSpot, etc.) so you don't have to enter them manually.
```bash
npm run seed
```

**Run the Server**:
```bash
npm run dev
```
The server will start listening on port `5000`.

### 3. Setting up the Frontend
Open a new terminal tab, navigate to the client folder, and start the Next.js app:
```bash
cd client
npm install
npm run dev
```
The application will be live at `http://localhost:3000`.

---

## 🧪 Testing the "Locked" Feature

Since I haven't built a full Admin Panel UI yet, I created a simple CLI script to verify users (simulating an admin approval).

1.  **Register** a new user on the frontend (you'll start as 'Unverified').
2.  **Check a deal**: Try to click on "AWS Activate". You'll see it's locked.
3.  **Verify yourself**:
    Switch to your server terminal and run this custom script I added:
    ```bash
    npm run verify your-email@example.com
    ```
4.  **Refresh**: Go back to the dashboard, and you should see the "Verified Startup" badge. The AWS deal is now unlocked!

---

## � Future Improvements
If I had more time, here is what I would add next:
- **Admin Dashboard**: A UI for admins to approve/reject startup applications.
- **Email Notifications**: Integration with Resend or SendGrid to notify users when they claim a deal.
- **Company Profile**: A deeper profile page where startups can upload their pitch decks.

Enjoy checking out the code! Let me know if you have any questions.
