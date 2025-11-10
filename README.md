# Full-stack Assignment: Rate Limiting Environment

A small full-stack system where a user can call an API and that API is rate limited per-user

## Getting Started

### Running the Application

To run the entire application using Docker Compose:

```bash
docker-compose up
```

This will start all services:
- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **PostgreSQL Database**: Running on port 5432

The application will automatically:
- Build the Docker images for frontend and backend
- Set up the PostgreSQL database
- Run database migrations
- Start all services

## Tech Stack

### Backend
- **Framework**: [Hono](https://hono.dev/) - Fast web framework for Node.js
- **Runtime**: Node.js
- **Language**: TypeScript
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- **Database**: PostgreSQL 16

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) 16 - React framework
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + Shadcn
- **Icons**: Lucide React
- **Compiler**: React Compiler (Babel plugin)

### Infrastructure & Tools
- **Package Manager**: pnpm
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL 16

## Rate Limiting Implementation

This system implements a **Token Bucket** rate limiting algorithm using IP addresses as the identifier.

### How It Works

#### Token Bucket Algorithm
The token bucket algorithm works by maintaining a "bucket" of tokens for each unique identifier (IP address in this case):

1. **Initial State**: Each IP address starts with a bucket containing a fixed number of tokens (default: 10 tokens)
2. **Token Consumption**: Each API request consumes 1 token from the bucket
3. **Rate Limiting**: When the bucket is empty (0 tokens), subsequent requests are rejected with HTTP 429 (Too Many Requests)
4. **Token Refill**: After a reset window (default: 1 minute), the bucket is automatically refilled to its maximum capacity

#### IP Address as Identifier
- The system extracts the client's IP address from the incoming request using Hono's `getConnInfo()` function
- Each unique IP address has its own independent token bucket stored in the database
- This ensures that rate limiting is applied per-client, preventing any single IP from overwhelming the API

#### Implementation Flow

1. **Request Arrives**: When a request hits `/api/ping`, the system extracts the IP address from the connection info
2. **Record Lookup**: The system queries the database for an existing rate limit record for that IP address
3. **Record Creation/Reset**: 
   - If no record exists, a new one is created with the default token count (10) minus 1 (for the current request)
   - If a record exists but the reset window has expired, tokens are refilled to the maximum
4. **Token Check**: 
   - If tokens are available (> 0), the request is allowed and tokens are decremented
   - If tokens are exhausted (≤ 0), the request is rejected with HTTP 429
5. **Response**: The API returns the remaining token count and whether the request was allowed

#### Configuration
- **Default Token Count**: 10 tokens per IP address
- **Reset Window**: 1 minute (tokens refill after this period)
- **Token Consumption**: 1 token per request

This approach provides a fair and predictable rate limiting mechanism that automatically resets, allowing clients to make requests again after the reset window expires.
