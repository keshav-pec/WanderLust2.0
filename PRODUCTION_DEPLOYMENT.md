# 🚀 Production Deployment Guide - Backend

## Vercel Deployment

### Prerequisites
- Vercel account
- MongoDB Atlas database
- Cloudinary account

### Step 1: Prepare Backend for Deployment

✅ **Already Done:**
- Created `vercel.json` configuration
- Updated CORS to handle production URLs
- Environment variable support

### Step 2: Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy from backend directory**:
```bash
cd backend
vercel
```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - Project name: `wanderlust-backend` (or your choice)
   - Directory: `.` (current directory)
   - Override settings? `N`

### Step 3: Configure Environment Variables on Vercel

Go to your Vercel dashboard → Project Settings → Environment Variables

Add the following variables:

```
NODE_ENV=production
ATLASDB_URL=mongodb+srv://keshav32:JEE%407865@cluster0.bi4qfut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=mysupersecretcode
CLOUD_NAME=dtgkas37i
CLOUD_API_KEY=343946215552455
CLOUD_API_SECRET=T03AUqSUO1RMCb9xHiO2U7vJ7l4
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Important:** Replace `FRONTEND_URL` with your actual frontend Vercel URL!

### Step 4: Redeploy with Environment Variables

After adding environment variables:
```bash
vercel --prod
```

### Step 5: Get Your Backend URL

Your backend will be deployed at:
```
https://wanderlust-backend-<random>.vercel.app
```

Or your custom domain:
```
https://wanderlust-b.vercel.app
```

### Step 6: Update Frontend Configuration

Update `frontend/.env`:
```env
VITE_API_URL=https://wanderlust-b.vercel.app/api
```

## Common Production Issues & Fixes

### ❌ Issue 1: CORS Errors
**Symptom:** Frontend can't connect to backend

**Solution:** 
- Ensure `FRONTEND_URL` is set correctly in Vercel environment variables
- Include your frontend domain in the CORS configuration
- Our updated CORS config now handles this automatically!

### ❌ Issue 2: Environment Variables Not Loaded
**Symptom:** Database connection fails, JWT errors

**Solution:**
- Verify all environment variables are added in Vercel dashboard
- Redeploy after adding variables
- Check Vercel function logs for errors

### ❌ Issue 3: 404 on API Routes
**Symptom:** All routes return 404

**Solution:**
- Ensure `vercel.json` is in the backend root directory
- Routes should be prefixed with `/api`
- Verify the `server.js` is the entry point

### ❌ Issue 4: File Upload Fails
**Symptom:** Image uploads don't work

**Solution:**
- Vercel serverless functions have size limits (4.5MB for free tier)
- Cloudinary is already configured (no changes needed)
- Ensure `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` are set

### ❌ Issue 5: Database Connection Timeout
**Symptom:** MongoDB connection fails

**Solution:**
- Whitelist Vercel IP addresses in MongoDB Atlas (or use `0.0.0.0/0` for all IPs)
- Check connection string is URL-encoded properly
- Verify MongoDB cluster is running

## Vercel-Specific Configuration

### vercel.json Explained
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",      // Entry point
      "use": "@vercel/node"     // Use Node.js runtime
    }
  ],
  "routes": [
    {
      "src": "/(.*)",           // All routes
      "dest": "server.js"       // Point to server.js
    }
  ],
  "env": {
    "NODE_ENV": "production"    // Set production mode
  }
}
```

## Testing Production Backend

1. **Health Check**:
```bash
curl https://wanderlust-b.vercel.app/api/health
```

Expected response:
```json
{"status":"ok","message":"Server is running"}
```

2. **Test Login**:
```bash
curl -X POST https://wanderlust-b.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"keshav","password":"keshav"}'
```

3. **Test Listings**:
```bash
curl https://wanderlust-b.vercel.app/api/listings
```

## Monitoring & Logs

- **Vercel Dashboard**: Monitor function invocations, errors
- **Logs**: Check real-time logs in Vercel dashboard
- **MongoDB Atlas**: Monitor database connections and queries

## Custom Domain (Optional)

To use `wanderlust-b.vercel.app`:

1. Go to Vercel Dashboard → Project Settings → Domains
2. Add custom domain: `wanderlust-b.vercel.app`
3. Update DNS records (Vercel provides instructions)
4. Update `FRONTEND_URL` in environment variables if needed

## Security Checklist for Production

✅ Use strong `JWT_SECRET` (not "mysupersecretcode")  
✅ Whitelist specific frontend domains in CORS  
✅ Set `NODE_ENV=production`  
✅ Never commit `.env` file  
✅ Use MongoDB network access control  
✅ Enable MongoDB authentication  
✅ Rotate API keys periodically  

## Support

If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB Atlas logs
5. Review CORS configuration

---

**Backend URL**: https://wanderlust-b.vercel.app  
**API Base**: https://wanderlust-b.vercel.app/api  
**Health Check**: https://wanderlust-b.vercel.app/api/health
