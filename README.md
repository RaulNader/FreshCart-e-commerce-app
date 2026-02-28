# FreshCart E-commerce App

FreshCart is a modern e-commerce web app built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Authentication (login/register) with NextAuth
- Browse products, categories, and brands
- Product details with related products
- Add to cart and wishlist
- Checkout with cash or credit payment
- View all user orders
- Responsive UI with loading skeletons

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS + shadcn/ui
- React Hook Form + Zod
- NextAuth
- Sonner (toast notifications)

## API

This project uses the Route E-commerce API:
`https://ecommerce.routemisr.com/api/v1`

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Add environment variables in `.env.local`

```env
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your_secret_here
API=https://ecommerce.routemisr.com/api/v1
```

### 3) Run development server

```bash
npm run dev
```

Open `http://localhost:3000`

## Project Structure

- `src/app` pages and routes
- `src/api` API helper functions
- `src/CartActions`, `src/WishlistActions`, `src/CheckOutActions` server actions
- `src/context` global context (cart count)
- `src/types` TypeScript interfaces

## Author

Built by RaulNader.
