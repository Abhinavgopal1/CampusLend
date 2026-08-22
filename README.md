# CampusLend

CampusLend is a campus-only marketplace where verified students can buy, sell, rent, and lend everyday gear safely. It combines discovery, anonymous price negotiation, protected purchase checkout, rental tracking, damage support, and a two-party handoff protocol in one responsive web app.

## The problem

Students regularly need expensive items for a few hours or days—a camera for a club event, a calculator for an exam, a suit for placements, or sports equipment. Buying is wasteful, while borrowing informally has no record of condition, payment, or return.

CampusLend turns that informal exchange into a transparent campus workflow.

## Standout feature: CampusTrust Handoff

Every pickup and return can be verified through:

1. Before/after condition photographs
2. A shared condition checklist
3. A one-time code matched by both students
4. A timestamped pickup or return confirmation
5. Automatic rental and item availability updates

This creates proof for both sides before a deposit dispute happens.

## Features

- Campus marketplace with separate rent and buy filters, saved items, and category browsing
- Multi-step listing creation for rental-only, sale-only, or combined listings
- Protected purchase checkout, reservation state, pickup code, and purchase/sale tracking
- Booking flow with deposits, pricing breakdowns, and rental records
- Anonymous negotiation and transaction rooms with deterministic campus aliases
- Automatic blocking of names, phone numbers, email addresses, social handles, links, student IDs, and private locations in chat
- Automated safety, order, booking, offer, and handoff messages
- CampusTrust pickup and return verification
- Rental dashboard for active, pending, overdue, and completed rentals
- Damage recovery and payment-support experiences
- Student profiles, ratings, administration views, and dark mode
- Fully responsive desktop and mobile interface

## Tech stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Zustand with browser persistence
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo flow

1. Browse the marketplace and filter between rentals and items for sale.
2. Rent an item with deposit escrow, or buy it through the protected demo checkout.
3. Open the automatically created anonymous transaction chat.
4. Use the public handoff point and one-time pickup code instead of sharing personal information.
5. Track the rental, purchase, or sale from the marketplace dashboard.
6. For rentals, use **Secure Return** to repeat the proof flow and release the deposit.

## Current scope

This hackathon build persists listings, rentals, orders, and safe-chat history locally in the browser. Payment, identity verification, cloud image storage, realtime moderation, and AI vision analysis are represented as product-ready demo experiences and need server-side integrations for a production deployment.

## Product vision

> CampusLend is not just another marketplace—it is trust infrastructure for borrowing inside verified college communities.
