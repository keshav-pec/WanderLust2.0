#!/bin/bash

# Environment Switcher Script
# Easily switch between local and production configurations

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}🔄 WanderLust Environment Switcher${NC}"
echo "=================================="
echo ""
echo "Select environment:"
echo "1) 🏠 Local Development"
echo "2) 🌐 Production (Vercel)"
echo "3) ℹ️  Show Current Configuration"
echo ""

read -p "Enter choice (1-3): " choice

case $choice in
  1)
    echo ""
    echo -e "${YELLOW}Switching to LOCAL development...${NC}"
    
    # Frontend
    cat > frontend/.env << EOF
# API URL for backend
# For local development: http://localhost:8080/api
# For production: https://wanderlust-b.vercel.app/api
VITE_API_URL=http://localhost:8080/api
EOF
    
    # Backend
    sed -i.bak 's|^FRONTEND_URL=.*|FRONTEND_URL=http://localhost:5173|' backend/.env
    rm -f backend/.env.bak
    
    echo -e "${GREEN}✓${NC} Frontend .env → http://localhost:8080/api"
    echo -e "${GREEN}✓${NC} Backend .env → FRONTEND_URL=http://localhost:5173"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "  1. Terminal 1: cd backend && npm run dev"
    echo "  2. Terminal 2: cd frontend && npm run dev"
    echo "  3. Visit: http://localhost:5173"
    ;;
    
  2)
    echo ""
    echo -e "${YELLOW}Switching to PRODUCTION...${NC}"
    
    # Frontend
    cat > frontend/.env << EOF
# API URL for backend
# For local development: http://localhost:8080/api
# For production: https://wanderlust-b.vercel.app/api
VITE_API_URL=https://wanderlust-b.vercel.app/api
EOF
    
    # Backend
    sed -i.bak 's|^FRONTEND_URL=.*|FRONTEND_URL=https://wander-lust2-0.vercel.app|' backend/.env
    rm -f backend/.env.bak
    
    echo -e "${GREEN}✓${NC} Frontend .env → https://wanderlust-b.vercel.app/api"
    echo -e "${GREEN}✓${NC} Backend .env → FRONTEND_URL=https://wander-lust2-0.vercel.app"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "  1. cd backend && vercel --prod"
    echo "  2. cd frontend && vercel --prod"
    echo "  3. Visit: https://wander-lust2-0.vercel.app"
    ;;
    
  3)
    echo ""
    echo -e "${BLUE}Current Configuration:${NC}"
    echo ""
    echo "📁 Frontend (.env):"
    if grep -q "localhost:8080" frontend/.env 2>/dev/null; then
      echo -e "  ${GREEN}🏠 LOCAL${NC} - http://localhost:8080/api"
    elif grep -q "wanderlust-b.vercel.app" frontend/.env 2>/dev/null; then
      echo -e "  ${BLUE}🌐 PRODUCTION${NC} - https://wanderlust-b.vercel.app/api"
    else
      echo -e "  ${RED}❌ Not configured${NC}"
    fi
    
    echo ""
    echo "🔧 Backend (.env):"
    if grep -q "localhost:5173" backend/.env 2>/dev/null; then
      echo -e "  ${GREEN}🏠 LOCAL${NC} - FRONTEND_URL=http://localhost:5173"
    elif grep -q "wander-lust2-0.vercel.app" backend/.env 2>/dev/null; then
      echo -e "  ${BLUE}🌐 PRODUCTION${NC} - FRONTEND_URL=https://wander-lust2-0.vercel.app"
    else
      echo -e "  ${RED}❌ Not configured${NC}"
    fi
    echo ""
    ;;
    
  *)
    echo -e "${RED}Invalid choice. Exiting.${NC}"
    exit 1
    ;;
esac

echo ""
