# Startup Benefits & Partnerships Platform

A premium, full-stack benefits platform for startups. Built with Next.js 14, Node.js, and TypeScript.

## 🌟 Key Features
- **Premium UI**: Dark-mode aesthetic with glassmorphism and Framer Motion animations.
- **Role-Based Access**: "Locked" deals are only claimable by verified accounts.
- **Secure Claims**: Middleware validates deal eligibility and prevents duplicate claims.
- **REST API**: Fully typed and structured Node/Express backend.

## 🏗️ Architecture
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion, Axios.
- **Backend**: Express.js, MongoDB (Mongoose), JWT Auth.
- **Database**: MongoDB.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally on port 27017)

### 1. Setup Backend
```bash
cd server
npm install
```

**Configuration**:
A `.env` file is already created for you in `server/`:
```env
MONGO_URI=mongodb://localhost:27017/startup-benefits
JWT_SECRET=supersecretkey_change_this_in_production
PORT=5000
```

**Seed Database (Important!)**:
Populate the database with initial deals (AWS, Notion, etc.):
```bash
npm run seed
```
*Note: This will clear existing deals and insert fresh ones.*

**Start Server**:
```bash
npm run dev
```
Server runs at `http://localhost:5000`.

### 2. Setup Frontend
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
Client runs at `http://localhost:3000`.

## 🧪 How to Test

1. **Register**: Go to `http://localhost:3000/register` and create an account.
   - You will be **Unverified** by default.
2. **Browse Deals**: Go to `/deals`. You will see locked and unlocked deals.
   - Try viewing "Stripe Atlas" (Unlocked) -> You can claim it.
   - Try viewing "AWS Activate" (Locked) -> You will see a "Verification Required" message.
3. **Verify User (Manual)**:
   - Since there is no Admin UI, you can manually verify a user by connecting to MongoDB:
   - `db.users.updateOne({ email: "your@email.com" }, { $set: { isVerified: true } })`
   - Log out and Log back in to refresh your token claims.
   - Now you can claim the Locked deals!

## 📂 Project Structure
```
/client          # Next.js Frontend
  /src/app       # App Router Pages
  /src/components # UI Components (Button, Navbar, DealCard)
  /src/context   # AuthContext (Global State)
  /src/lib       # Utils & API Client

/server          # Express Backend
  /src/models    # Mongoose Models (User, Deal, Claim)
  /src/routes    # API Routes
  /src/controllers # Business Logic
```

## ⚠️ Notes
- The app uses a local MongoDB instance. Ensure `mongod` is running.
- Verification logic is simulated via the database flag `isVerified`.

 