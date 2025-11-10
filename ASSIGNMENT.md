# Fullstack Assignment – Rate Limiting Environment

### Goal
Build a small full-stack system where a user can call an API and that API is rate limited per-user.

This assignment tests: FE + BE + DB + Docker + pragmatic decision making + speed.

You may use AI tools (ChatGPT, Cursor, Claude, Copilot etc).  
Optimize for clarity + correctness. Do not over-engineer.

---

## Requirements

### Functional Requirements
- Create a simple UI (Next.js App Router + TypeScript) with 1 input field for `user_id` and a button: **"Call API"**
- When user clicks the button → call backend endpoint `/api/ping`
- The backend returns JSON containing:
  - `allowed: boolean`
  - `remaining: number` (remaining quota)
- Enforce rate limit: **10 requests per user per 1 minute window**

### Technical Requirements

#### Frontend
- Next.js (App Router)
- TypeScript mandatory
- UI can use Tailwind or shadcn/ui (your choice)
- Only 1 screen needed (no routing complexity)

#### Backend
- Node.js backend (Express / Fastify / Nest or similar)
- Endpoint: `/api/ping`
- Implement token bucket or sliding window (your choice)
- MUST store rate limit state in DB, not in-memory

#### Database
- Postgres required

#### Infra
- Everything MUST run via `docker-compose up`
  - container 1 = frontend
  - container 2 = backend
  - container 3 = postgres

---

## Deliverables
- Public GitHub Repository link
- `docker-compose.yml` in root
- Running system must boot with a SINGLE command:  
  `docker-compose up`
- README notes section filled (below)

---

## Time Expectation
~2–3 hours (honor system)

---

## Evaluation Criteria

| Criteria | Weight |
|---------|--------|
| Correctness of rate limiting logic | 35% |
| Architecture clarity FE + BE separation | 25% |
| DB usage / schema sanity (NOT in memory) | 15% |
| Dockerization quality (single up command) | 15% |
| Code readability & TypeScript hygiene | 10% |

We do not care about animations, styling beauty, marketing polish.

We care about correctness, clarity, reliability.

---

## Tools Policy
You may use AI to help you accelerate — just like real work.

You may use open source NPM packages.

You may NOT:
- store rate limit data purely in memory
- bypass docker
- skip Postgres

---

## Notes (candidate must fill)

### Approach Notes
- How did you implement the rate limit?
- Why token bucket vs sliding window (or vice versa)?
- Anything you compromised given 2–3 hour time constraint?
- Any deviations from requirements + reasoning?

---

Good luck