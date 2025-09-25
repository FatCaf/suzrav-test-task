# Setup

## Frontend (Next.js)

1. **Go to folder**

   ```bash
   cd frontend
   ```
2. **Install deps**

   ```bash
   npm i
   ```
3. **Create env file**

   ```bash
   cp .env.example .env
   ```

   Use the same variable names and formats as in the example file.
4. **Run dev server**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000`.

---

## Server (Sanity Studio)

1. **Go to folder**

   ```bash
   cd server
   ```
2. **Install deps**

   ```bash
   npm i
   ```
3. **Create env file**

   ```bash
   cp .env.example .env
   ```

   Use the same variable names and formats as in the example file.
4. **Run Studio**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3333` and sign in.
5. **(Optional) Seed content**

   * In Studio: **Product → Create → Publish**.
6. **(Optional, if fetching from browser) Add CORS origin**

   * Studio → **Manage project** → **Settings → API → CORS origins** → add `http://localhost:3000`.

---

