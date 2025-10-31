#!/usr/bin/env node

/**
 * Production Backend Health Check Script
 * Tests the deployed backend API endpoints
 */

const axios = require('axios');

const BACKEND_URL = process.env.BACKEND_URL || 'https://wanderlust-b.vercel.app';
const API_URL = `${BACKEND_URL}/api`;

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(color, symbol, message) {
  console.log(`${color}${symbol}${colors.reset} ${message}`);
}

async function testEndpoint(name, method, url, data = null, headers = {}) {
  try {
    const config = { method, url, headers };
    if (data) config.data = data;
    
    const response = await axios(config);
    log(colors.green, '✓', `${name}: ${response.status} - ${response.statusText}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      log(colors.red, '✗', `${name}: ${error.response.status} - ${error.response.statusText}`);
      console.log(`   Error: ${error.response.data?.message || 'Unknown error'}`);
    } else if (error.request) {
      log(colors.red, '✗', `${name}: No response received`);
      console.log(`   Error: ${error.message}`);
    } else {
      log(colors.red, '✗', `${name}: Request failed`);
      console.log(`   Error: ${error.message}`);
    }
    return { success: false, error };
  }
}

async function runTests() {
  console.log('='.repeat(60));
  console.log(`${colors.blue}🔍 Testing Backend: ${BACKEND_URL}${colors.reset}`);
  console.log('='.repeat(60));
  console.log('');

  // Test 1: Health Check
  log(colors.yellow, '►', 'Testing Health Check...');
  await testEndpoint('Health Check', 'GET', `${API_URL}/health`);
  console.log('');

  // Test 2: Get All Listings
  log(colors.yellow, '►', 'Testing Get All Listings...');
  const listingsResult = await testEndpoint('Get Listings', 'GET', `${API_URL}/listings`);
  if (listingsResult.success) {
    console.log(`   Found ${listingsResult.data?.data?.listings?.length || 0} listings`);
  }
  console.log('');

  // Test 3: Login
  log(colors.yellow, '►', 'Testing Login...');
  const loginResult = await testEndpoint(
    'Login',
    'POST',
    `${API_URL}/auth/login`,
    { username: 'keshav', password: 'keshav' },
    { 'Content-Type': 'application/json' }
  );
  
  let token = null;
  if (loginResult.success) {
    token = loginResult.data?.data?.token;
    console.log(`   Token received: ${token ? '✓' : '✗'}`);
  }
  console.log('');

  // Test 4: Get Current User (Protected Route)
  if (token) {
    log(colors.yellow, '►', 'Testing Protected Route (Get Current User)...');
    await testEndpoint(
      'Get Current User',
      'GET',
      `${API_URL}/auth/me`,
      null,
      { Authorization: `Bearer ${token}` }
    );
    console.log('');
  }

  // Test 5: CORS Check
  log(colors.yellow, '►', 'Testing CORS Configuration...');
  try {
    const response = await axios.options(`${API_URL}/listings`);
    const corsHeaders = response.headers['access-control-allow-origin'];
    if (corsHeaders) {
      log(colors.green, '✓', `CORS: Allows origin - ${corsHeaders}`);
    } else {
      log(colors.yellow, '!', 'CORS: No CORS headers found');
    }
  } catch (error) {
    log(colors.red, '✗', `CORS: Unable to check - ${error.message}`);
  }
  console.log('');

  // Summary
  console.log('='.repeat(60));
  log(colors.blue, '📊', 'Test Summary Complete');
  console.log('='.repeat(60));
  console.log('');
  console.log(`${colors.blue}Backend URL:${colors.reset} ${BACKEND_URL}`);
  console.log(`${colors.blue}API Base:${colors.reset} ${API_URL}`);
  console.log('');
  console.log('Next Steps:');
  console.log('1. If all tests pass ✓, your backend is working correctly');
  console.log('2. If login fails, check MongoDB connection and user credentials');
  console.log('3. If CORS fails, update FRONTEND_URL in Vercel environment variables');
  console.log('4. Check Vercel function logs for detailed error messages');
  console.log('');
}

// Run tests
runTests().catch(error => {
  console.error('Test suite failed:', error.message);
  process.exit(1);
});
