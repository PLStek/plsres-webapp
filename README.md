## Getting Started

First, install the dependencies

```bash
npm i
```

Then, create the `.env` file from `.env.example` and fill it with your own values

Initialize the database
```bash
npx prisma migrate dev
```

Run the app
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
