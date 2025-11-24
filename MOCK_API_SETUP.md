# Mock API Setup Guide

## Overview
This app has been configured to use **mock data by default** instead of calling the real backend. This makes it perfect for gh-pages hosting without exposing your actual backend.

## How It Works

### Mock API Layer
The app automatically detects if `VITE_API_BASE_URL` is set in `.env`:
- **No env variable** → Uses mock API (default for gh-pages)
- **Env variable set** → Uses real backend API

### Services
- `src/services/mockData.ts` - Contains sample student submissions with realistic scheduling data
- `src/services/mockApi.ts` - Mock API functions that return data and simulate network delay
- `src/services/api.ts` - Smart routing layer that uses mock or real API

### Manager Login
- **Mock password:** `demo-password`
- Real password authentication is disabled when using mock API

### Sample Data
The mock data includes 4 students with realistic availability patterns:
- Different class schedules
- Preferred shift times
- Availability constraints
- Personal notes

## Running the App

### Development (Mock API)
```bash
npm run dev
```
The app will automatically use mock data. Check browser console for `[MOCK API]` logs.

### Switching to Real Backend
If you need to use the real backend locally:

1. Update `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000
# or for production
VITE_API_BASE_URL=https://your-backend-url.com
```

2. Restart dev server

### Building for gh-pages
```bash
npm run build
npm run deploy
```

The build will use mock API since `VITE_API_BASE_URL` won't be set.

## Customizing Mock Data

Edit `src/services/mockData.ts` to:
- Add/remove student submissions
- Change availability patterns
- Update the manager password

## Notes
- Mock API includes ~500ms network delay simulation for realistic UX
- All submission attempts are logged to console
- localStorage still works for auth state persistence
