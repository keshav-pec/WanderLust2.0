# 🚀 Vercel Deployment Checklist

## Pre-Deployment

- [ ] All environment variables documented
- [ ] MongoDB Atlas network access configured (0.0.0.0/0)
- [ ] Cloudinary account active
- [ ] Strong JWT secret prepared

## Backend Deployment

### 1. Install Vercel CLI (if needed)
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy Backend
```bash
cd backend
vercel
```

### 4. Set Environment Variables

Go to: Vercel Dashboard → Project → Settings → Environment Variables

Add these variables:

```
NODE_ENV = production
ATLASDB_URL = mongodb+srv://keshav32:JEE%407865@cluster0.bi4qfut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET = mysupersecretcode
CLOUD_NAME = dtgkas37i
CLOUD_API_KEY = 343946215552455
CLOUD_API_SECRET = T03AUqSUO1RMCb9xHiO2U7vJ7l4
FRONTEND_URL = https://your-frontend.vercel.app
```

**⚠️ Important:** Update `FRONTEND_URL` with your actual frontend domain after deploying frontend!

### 5. Production Deploy
```bash
vercel --prod
```

### 6. Test Backend
```bash
curl https://wanderlust-b.vercel.app/api/health
```

Expected: `{"status":"ok","message":"Server is running"}`

## Frontend Deployment

### 1. Update Frontend Environment
Edit `frontend/.env`:
```
VITE_API_URL=https://wanderlust-b.vercel.app/api
```

### 2. Deploy Frontend
```bash
cd frontend
vercel --prod
```

### 3. Get Frontend URL
Note your frontend URL (e.g., `https://wanderlust-f.vercel.app`)

### 4. Update Backend CORS
Go back to Backend → Vercel Dashboard → Environment Variables

Update `FRONTEND_URL`:
```
FRONTEND_URL = https://wanderlust-f.vercel.app
```

### 5. Redeploy Backend
```bash
cd backend
vercel --prod
```

## Post-Deployment Testing

### Test Backend Endpoints

```bash
# Health check
curl https://wanderlust-b.vercel.app/api/health

# Get listings
curl https://wanderlust-b.vercel.app/api/listings

# Test login
curl -X POST https://wanderlust-b.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"keshav","password":"keshav"}'
```

### Test Frontend

1. Visit your frontend URL
2. Browse listings
3. Login with: username `keshav`, password `keshav`
4. Try creating a listing
5. Try adding a review

## Troubleshooting

### Issue: Backend returns 500 error
**Check:**
- [ ] All environment variables set in Vercel
- [ ] MongoDB Atlas network access allows all IPs
- [ ] Check Vercel function logs

### Issue: CORS error in frontend
**Check:**
- [ ] `FRONTEND_URL` set correctly in backend
- [ ] Frontend `.env` has correct `VITE_API_URL`
- [ ] Redeploy backend after changing CORS

### Issue: Database connection fails
**Check:**
- [ ] MongoDB Atlas cluster is running
- [ ] Connection string is correct and URL-encoded
- [ ] Network access allows `0.0.0.0/0`

### Issue: Image upload fails
**Check:**
- [ ] Cloudinary credentials are correct
- [ ] All three Cloudinary env vars are set
- [ ] File size is under 4.5MB (Vercel limit)

## Custom Domain (Optional)

### For Backend: wanderlust-b.vercel.app

1. Go to: Vercel Dashboard → Backend Project → Settings → Domains
2. Add domain: `wanderlust-b.vercel.app`
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

### For Frontend: wanderlust-f.vercel.app

1. Go to: Vercel Dashboard → Frontend Project → Settings → Domains
2. Add domain: `wanderlust-f.vercel.app`
3. Follow DNS configuration instructions
4. Update backend `FRONTEND_URL` to new domain
5. Redeploy backend

## Security Checklist

Before making project public:

- [ ] Change `JWT_SECRET` to strong random string
- [ ] Restrict MongoDB network access to specific IPs
- [ ] Rotate API keys
- [ ] Remove any console.log with sensitive data
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Enable rate limiting
- [ ] Set up SSL/HTTPS (Vercel does this automatically)

## Monitoring

### Vercel Dashboard
- Monitor function invocations
- Check error rates
- View real-time logs

### MongoDB Atlas
- Monitor database connections
- Check query performance
- Set up alerts

### Cloudinary
- Monitor upload usage
- Check storage limits
- Track bandwidth

## Success Criteria

✅ Backend health check returns 200  
✅ Frontend loads without errors  
✅ Can login successfully  
✅ Can view all listings  
✅ Can create new listing (with image)  
✅ Can add reviews  
✅ No CORS errors in browser console  
✅ Images load from Cloudinary  

## URLs

**Backend API:** https://wanderlust-b.vercel.app/api  
**Frontend:** https://wanderlust-f.vercel.app  
**MongoDB:** Atlas Dashboard  
**Cloudinary:** Cloudinary Dashboard  

---

**Deployment Status:** Ready ✅  
**Last Updated:** 2025-10-31  
**Deployed By:** Keshav Goyal
