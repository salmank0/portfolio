# Mohammad Salman Khan | Full-Stack Developer Portfolio

A premium, interactive developer portfolio built with **Next.js (App Router)**, **Tailwind CSS**, and **Framer Motion**.

Since enterprise projects are closed-source and protected by NDAs, this portfolio is engineered to demonstrate engineering depth and proof-of-work through **Interactive Case Studies**, **Visual System Architectures**, and a **Live Performance Sandbox (Query Optimizer Simulator)**.

---

## 🚀 Key Features

*   **Interactive Case Studies:** Deep-dives into system designs for major clients (Yash Raj Films, Cinépolis Global, KOZO) outlining problem scopes, core architectures, and key leadership outcomes.
*   **Performance Playground (Query Optimizer):** An interactive terminal simulator showing the performance benefits of composite indexing, covering queries, and pagination. Users can execute a slow sequential query scan on a mock table of 10M rows (taking ~40s) and optimize it to run in 18ms.
*   **Dynamic Tech Stack Map:** Grouped category columns of developer capabilities (Frontend, Backend, Database, Practices). Hovering over a card highlights its dependencies across other columns (e.g., hovering over *Prisma* lights up *TypeScript*, *PostgreSQL*, and *Node.js*).
*   **3D Interactive Particle Field:** A lightweight custom HTML5 Canvas background that shifts coordinates and rotates in 3D perspective based on real-time mouse movements.
*   **Anti-Spam Contact Form:** Form submissions are integrated with **Web3Forms** for zero-backend email forwarding. Includes:
    *   **Honeypot Trap:** A hidden `botcheck` input field that traps and silently drops automated spam-bot crawls.
    *   **Rate Limiting:** A client-side submission limit utilizing `localStorage` to restrict form submissions to once every 60 seconds per user.

---

## 🛠️ Getting Started & Local Setup

### 1. Clone the repository and install dependencies:
```bash
git clone https://github.com/salmank0/portfolio.git
cd portfolio
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```
*(Get a free access key in 10 seconds at [web3forms.com](https://web3forms.com/))*

### 3. Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the portfolio.

---

## ☁️ Deployment on Vercel

The application is fully optimized for one-click deployment on **Vercel**:

### Direct Deploy via Vercel Dashboard
1. Push your repository to **GitHub**.
2. Log into [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import your GitHub repository.
4. Expand **Environment Variables** and add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` along with your access key.
5. Click **Deploy**.

---

## 📌 Resolving Git Push Error

When setting up your repository, if you encountered `error: src refspec main does not match any` during `git push`, it is because you have not committed your files yet. Follow these steps in order to push your initial code:

```bash
# 1. Stage all files
git add .

# 2. Commit the staged files
git commit -m "feat: initial commit of Next.js portfolio website"

# 3. Push to GitHub
git push -u origin main
```
