#!/bin/bash

# Credential Rotation Helper Script

echo ""
echo "🔒 WanderLust - Credential Rotation Helper"
echo "=========================================="
echo ""
echo "⚠️  Your credentials were exposed on GitHub!"
echo "This script will help you rotate them safely."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f "backend/.env" ]; then
  echo -e "${RED}❌ backend/.env not found!${NC}"
  echo "Creating from template..."
  cp backend/.env.example backend/.env
fi

echo -e "${BLUE}Step 1: Generate New JWT Secret${NC}"
echo "----------------------------------------"
echo "Generating secure JWT secret..."
NEW_JWT_SECRET=$(openssl rand -base64 32)
echo -e "New JWT Secret: ${GREEN}${NEW_JWT_SECRET}${NC}"
echo ""
read -p "Press Enter to continue..."

echo ""
echo -e "${BLUE}Step 2: MongoDB Credentials${NC}"
echo "----------------------------------------"
echo "1. Go to: https://cloud.mongodb.com/"
echo "2. Navigate to: Database Access"
echo "3. Edit user 'keshav32' and change password"
echo "4. Go to: Clusters → Connect → Connect your application"
echo "5. Copy the new connection string"
echo ""
read -p "Enter new MongoDB connection string: " NEW_MONGO_URI
echo ""

echo -e "${BLUE}Step 3: Cloudinary Credentials${NC}"
echo "----------------------------------------"
echo "1. Go to: https://cloudinary.com/console"
echo "2. Navigate to: Settings → Access Keys"
echo "3. Click: Regenerate API Secret"
echo "4. Copy the new credentials"
echo ""
read -p "Enter Cloudinary Cloud Name: " NEW_CLOUD_NAME
read -p "Enter Cloudinary API Key: " NEW_CLOUD_API_KEY
read -p "Enter Cloudinary API Secret: " NEW_CLOUD_API_SECRET
echo ""

echo -e "${BLUE}Step 4: Updating Local .env File${NC}"
echo "----------------------------------------"

# Backup existing .env
cp backend/.env backend/.env.backup
echo "Backed up to: backend/.env.backup"

# Update .env file
cat > backend/.env << EOF
# Server Configuration
NODE_ENV=development
PORT=8080

# Database - Rotated on $(date)
ATLASDB_URL="${NEW_MONGO_URI}"

# JWT Secret - Rotated on $(date)
JWT_SECRET=${NEW_JWT_SECRET}

# Cloudinary Configuration - Rotated on $(date)
CLOUD_NAME=${NEW_CLOUD_NAME}
CLOUD_API_KEY=${NEW_CLOUD_API_KEY}
CLOUD_API_SECRET=${NEW_CLOUD_API_SECRET}

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
EOF

echo -e "${GREEN}✓ Local .env updated!${NC}"
echo ""

echo -e "${BLUE}Step 5: Update Vercel Environment Variables${NC}"
echo "----------------------------------------"
echo "Run these commands in Vercel CLI OR update in dashboard:"
echo ""
echo -e "${YELLOW}vercel env add ATLASDB_URL${NC}"
echo "Paste: ${NEW_MONGO_URI}"
echo ""
echo -e "${YELLOW}vercel env add JWT_SECRET${NC}"
echo "Paste: ${NEW_JWT_SECRET}"
echo ""
echo -e "${YELLOW}vercel env add CLOUD_NAME${NC}"
echo "Paste: ${NEW_CLOUD_NAME}"
echo ""
echo -e "${YELLOW}vercel env add CLOUD_API_KEY${NC}"
echo "Paste: ${NEW_CLOUD_API_KEY}"
echo ""
echo -e "${YELLOW}vercel env add CLOUD_API_SECRET${NC}"
echo "Paste: ${NEW_CLOUD_API_SECRET}"
echo ""

echo -e "${BLUE}Step 6: Redeploy Backend${NC}"
echo "----------------------------------------"
echo "After updating Vercel environment variables:"
echo ""
echo "  cd backend"
echo "  vercel --prod"
echo ""

echo -e "${BLUE}Summary${NC}"
echo "----------------------------------------"
echo -e "${GREEN}✓${NC} Generated new JWT secret"
echo -e "${GREEN}✓${NC} Updated local .env file"
echo -e "${YELLOW}⏳${NC} Update Vercel environment variables"
echo -e "${YELLOW}⏳${NC} Redeploy backend"
echo -e "${YELLOW}⏳${NC} Test deployment"
echo ""

echo "Next steps saved to: SECURITY_INCIDENT.md"
echo ""
