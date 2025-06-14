# Three Goals 🎯

A minimalist, full-stack goal tracking app built with Next.js, PostgreSQL, and Shadcn UI—designed to help users set, track, and reflect on **three meaningful daily goals**.

---

## 🧩 Features

* **Three Daily Goal Slots**: Set and review three targeted goals each day.
* **Completion Tracking**: Check off goals and monitor daily progress via a visual progress bar.
* **History & Recap**: View past goals in a tabular format for reflection and habit-building.
* **User Authentication & Settings**: Secure login with Lucia Auth; personal settings, themes, and more.
* **Dark/Light Mode**: Toggle between themes effortlessly.
* **Modular UI**: Built using Shadcn UI, Radix components, and Tailwind CSS for crisp, responsive design.

---

## 🛠 Tech Stack

* **Frontend**: Next.js 15 (App Router), React 19, Shadcn UI, Radix, Tailwind CSS, Sonner
* **Forms & Validation**: react-hook-form + Zod
* **Styling & Utilities**: clsx, Tailwind Merge, Radix UI primitives
* **State & Feedback**: Sonner toast notifications, Next Themes
* **Auth**: Lucia (username/password)
* **Backend**: Node.js with PostgreSQL via Kysely
* **Database Migrations**: `kysely-ctl`
* **Serverless Data**: Vercel KV & Edge functions for caching/rate-limiting
* **Utilities**: PG driver, Luxon, UUIDs, Upstash Redis (rate limit)

---

## 🛠 Installation

### Prerequisites

* Node.js ≥18
* PostgreSQL instance
* Vercel account for deployment (optional)

### Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/oggiwks/three-goals.git
   cd three-goals
   ```

2. **Install dependencies**

   ```bash
   pnpm i
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the project root:

   ```
   DATABASE_URL=postgres://<user>:<pass>@<host>:<port>/<db>
   LUCIA_SECRET_KEY=your-secret
   NEXT_PUBLIC_VERCEL_KV_URL=...
   NEXT_PUBLIC_RATE_LIMIT=...
   ```

4. **Run migrations**

   ```bash
   pnpm run migrate:up
   ```

### Development

Start the app in development mode on port 9001:

```bash
pnpm run dev
```

Visit `http://localhost:9001` to get started.

---

## 🚀 Usage

1. **Sign up / log in** through the Lucia-powered form.
2. **Set today's goals** using the “Today’s Goals” view—max three.
3. **Check off tasks** as you complete them and watch your progress bar update.
4. **Browse historical goals** via the “My Goals” page.
5. **Adjust preferences** (theme, notifications, account settings) in Settings.
6. **Log out** anytime using the navbar button.

---

## 🎨 UI Screenshots

![Homepage – Welcome & Navigation](<path or URL to first screenshot>)
![Today’s Goals input form](<path or URL to second screenshot>)
![Progress view with checked goals](<path or URL to third screenshot>)

---

## 📄 Project Structure

```
src/
├── app/               # Next.js pages (app router)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── goals/
│   ├── settings/
│   └── ...
├── components/        # Shared UI components (header, forms, progress bar, etc.)
├── lib/               # lucia auth, db (Kysely), utils
├── styles/            # Tailwind + Shadcn config
└── prisma/            # Optional if prisma used, otherwise migrations folder managed by kysely-ctl
```

---

## 🔧 Scripts

| Command                            | Description                                  |
|------------------------------------| -------------------------------------------- |
| `pnpm dev`                         | Launches the Next.js dev server at port 9001 |
| `pnpm build`                       | Builds production optimized app              |
| `pnpm start`                       | Starts production server using port 9001     |
| `pnpm migrate:up` / `migrate:down` | Apply or undo database migrations            |
| `pnpm lint`                        | Run ESLint and fix formatting issues         |

---

## 🌱 Future Enhancements

* 🚀 Calendar-style overview
* 🔔 Reminder emails / push notifications
* 📘 Weekly or monthly goal summaries
* 🔗 Social features: share progress with friends/team
* 📊 Analytics dashboard & habit streak tracking 
* 📲 Native mobile app wrap via Next.js PWA or Capacitor

---

## 🤝 Contributing

Contributions are welcome! To get involved:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-cool-feature`
3. Commit your changes: `git commit -m "Add some feature"`
4. Push to branch: `git push origin feature/my-cool-feature`
5. Open a PR and reference relevant issues

---

## 📜 License

MIT © 2025 oggiwks