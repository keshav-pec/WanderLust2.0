# 🌐 Production URLs Configuration

## Production Endpoints

- **Frontend**: https://wander-lust2-0.vercel.app
- **Backend**: https://wanderlust-b.vercel.app
- **API Base**: https://wanderlust-b.vercel.app/api

## Configuration Applied

### ✅ Frontend Configuration

**File**: `frontend/.env`
```env
VITE_API_URL=https://wanderlust-b.vercel.app/api
```

**File**: `frontend/vercel.json` (NEW)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures React Router works correctly in production.

### ✅ Backend Configuration

**File**: `backend/.env`
```env
FRONTEND_URL=https://wander-lust2-0.vercel.app
```

**CORS Configuration** (already in `backend/server.js`):
- Automatically allows `FRONTEND_URL` from environment
- Also allows localhost ports for development

## Deployment Steps

### 1. Backend Deployment

```bash
cd backend
vercel --prod
```

**Important**: Set these environment variables in Vercel Dashboard:

```
NODE_ENV=production
ATLASDB_URL=mongodb+srv://keshav32:JEE%407865@cluster0.bi4qfut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=mysupersecretcode
CLOUD_NAME=dtgkas37i
CLOUD_API_KEY=343946215552455
CLOUD_API_SECRET=T03AUqSUO1RMCb9xHiO2U7vJ7l4
FRONTEND_URL=https://wander-lust2-0.vercel.app
```

### 2. Frontend Deployment

```bash
cd frontend
vercel --prod
```

No additional environment variables needed in Vercel (reads from `.env`).

## Testing Production

### Backend Health Check
```bash
curl https://wanderlust-b.vercel.app/api/health
```

Expected:
```json
{"status":"ok","message":"Server is running"}
```

✅ **Status**: Working!

### Get Listings
```bash
curl https://wanderlust-b.vercel.app/api/listings
```

✅ **Status**: Working! (31 listings returned)

### Login Test
```bash
curl -X POST https://wanderlust-b.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"keshav","password":"keshav"}'
```

### Frontend Access
Visit: https://wander-lust2-0.vercel.app

Expected:
- Homepage loads with listings
- Can browse all properties
- Can login/register
- Can create listings
- Can add reviews

## Local Development

To switch back to local development:

### Frontend `.env`
```env
VITE_API_URL=http://localhost:8080/api
```

### Backend `.env`
```env
FRONTEND_URL=http://localhost:5173
```

Then restart both servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Environment Variables Reference

### Frontend Environment Variables

| Variable | Local | Production |
|----------|-------|------------|
| `VITE_API_URL` | `http://localhost:8080/api` | `https://wanderlust-b.vercel.app/api` |

### Backend Environment Variables (Vercel Dashboard)

| Variable | Value | Purpose |
|----------|-------|---------|
| `NODE_ENV` | `production` | Set environment mode |
| `ATLASDB_URL` | MongoDB connection string | Database connection |
| `JWT_SECRET` | Secret key | JWT token signing |
| `CLOUD_NAME` | Cloudinary cloud name | Image storage |
| `CLOUD_API_KEY` | Cloudinary API key | Image upload auth |
| `CLOUD_API_SECRET` | Cloudinary API secret | Image upload auth |
| `FRONTEND_URL` | `https://wander-lust2-0.vercel.app` | CORS configuration |

## Common Issues & Solutions

### Issue: CORS Error in Browser Console

**Error**: "Access to fetch at 'https://wanderlust-b.vercel.app/api/...' from origin 'https://wander-lust2-0.vercel.app' has been blocked by CORS policy"

**Solution**:
1. Check `FRONTEND_URL` is set correctly in backend Vercel environment variables
2. Ensure it matches your frontend URL exactly (with https://)
3. Redeploy backend: `cd backend && vercel --prod`

### Issue: 404 on Page Refresh

**Error**: Page not found when refreshing on a route like `/listings/123`

**Solution**:
✅ Already fixed with `frontend/vercel.json` rewrites configuration

### Issue: API Calls Return ECONNREFUSED

**Error**: Network error when making API calls

**Solution**:
1. Verify `VITE_API_URL` in `frontend/.env`
2. Check backend is deployed and running
3. Test backend directly: `curl https://wanderlust-b.vercel.app/api/health`

### Issue: Environment Variables Not Working

**Symptom**: Frontend still calling localhost

**Solution**:
1. Delete `frontend/.env.local` if it exists (takes precedence)
2. Rebuild frontend: `npm run build`
3. Redeploy: `vercel --prod`

### Issue: Images Not Loading

**Symptom**: Broken image icons

**Solution**:
1. Check Cloudinary environment variables are set in backend
2. Verify existing images have correct URLs
3. Test creating a new listing with image upload

## Security Recommendations

Before making the app public:

1. **Change JWT_SECRET**
   - Generate strong random string: `openssl rand -base64 32`
   - Update in Vercel backend environment variables
   - Redeploy backend

2. **Restrict CORS**
   - Currently allows all origins (for testing)
   - In production, only allow specific frontend domain

3. **MongoDB Access**
   - Currently allows all IPs (`0.0.0.0/0`)
   - For production, whitelist specific IPs or use MongoDB's network peering

4. **Environment Variables**
   - Never commit `.env` files to git
   - Use different credentials for production
   - Rotate API keys regularly

5. **Rate Limiting**
   - Add rate limiting middleware to prevent abuse
   - Use packages like `express-rate-limit`

## Monitoring

### Vercel Dashboard
- **Backend**: Monitor API calls, errors, function invocations
- **Frontend**: Monitor page views, build status, bandwidth

### MongoDB Atlas
- Monitor database connections
- Check query performance
- Set up alerts for high usage

### Cloudinary
- Monitor storage usage
- Track bandwidth consumption
- Check upload quotas

## URLs Quick Reference

| Service | URL |
|---------|-----|
| Frontend | https://wander-lust2-0.vercel.app |
| Backend | https://wanderlust-b.vercel.app |
| API Health | https://wanderlust-b.vercel.app/api/health |
| API Listings | https://wanderlust-b.vercel.app/api/listings |
| API Auth | https://wanderlust-b.vercel.app/api/auth |

## Test Credentials

**Username**: `keshav`  
**Password**: `keshav`

**Database**: 31 unique hotel listings with different images

---

**Configuration Status**: ✅ Complete  
**Backend Status**: ✅ Live (tested)  
**Frontend Status**: 🔄 Ready to deploy  
**Last Updated**: 2025-10-31
