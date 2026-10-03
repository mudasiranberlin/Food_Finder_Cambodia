# 🍜 Food Finder Cambodia

A mobile-first food discovery website for Cambodia. Visitors can find restaurants, cafés and street food near them,
read reviews, and add new spots. Every new spot waits for an administrator to approve it before the public can see it.

```
Food_Finder_Cambodia/
├── backend/     Node.js + Express + MongoDB (the API, login, uploads)
└── frontend/    React + Vite (the website and the admin dashboard)
```

Your original project (FoodieFind, React + Vite, data in the browser) is now the `frontend/`. The look is the same
(orange and deep green, rounded cards, dark mode). What changed is that everything now talks to a real server and database.

---

## What you need first

- **Node.js 18.18 or newer** (check with `node -v`). Download it from https://nodejs.org
- **MongoDB** running on your computer (step 3 below), or a free MongoDB Atlas database

---

## Setup, step by step

### 1. Install the dependencies

Open two terminals, one in each folder:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Set up the `.env` file

```bash
cd backend
cp .env.example .env
```

