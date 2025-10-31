const axios = require('axios');
const { data: sampleListings } = require('./listingsData');

const API_BASE_URL = 'http://localhost:8080/api';

async function registerUser() {
  try {
    console.log('📝 Registering user: keshav...');
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      username: 'keshav',
      email: 'keshav@example.com',
      password: 'keshav'
    });
    
    console.log('✅ User registered successfully!');
    return response.data.data.token;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message?.includes('already')) {
      console.log('ℹ️  User already exists, logging in...');
      return await loginUser();
    }
    throw error;
  }
}

async function loginUser() {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'keshav',
      password: 'keshav'
    });
    
    console.log('✅ User logged in successfully!');
    return response.data.data.token;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data?.message || error.message);
    throw error;
  }
}

async function createListing(token, listingData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/listings`, listingData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Failed to create listing: ${listingData.title}`);
    console.error('   Error:', error.response?.data?.message || error.message);
    if (error.response?.data?.error) {
      console.error('   Details:', JSON.stringify(error.response.data.error, null, 2));
    }
    return null;
  }
}

async function seedData() {
  try {
    console.log('🌱 Starting data seeding process...\n');
    
    // Step 1: Register/Login user
    const token = await registerUser();
    console.log('');
    
    // Step 2: Create all listings
    console.log(`📦 Creating ${sampleListings.length} listings...\n`);
    
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < sampleListings.length; i++) {
      const listing = sampleListings[i];
      process.stdout.write(`[${i + 1}/${sampleListings.length}] Creating: ${listing.title}...`);
      
      const result = await createListing(token, listing);
      
      if (result) {
        console.log(' ✅');
        successCount++;
      } else {
        console.log(' ❌');
        failCount++;
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 Data seeding completed!');
    console.log('='.repeat(50));
    console.log(`✅ Successfully created: ${successCount} listings`);
    if (failCount > 0) {
      console.log(`❌ Failed: ${failCount} listings`);
    }
    console.log('='.repeat(50));
    console.log(`\n✨ Visit http://localhost:5176 to see your listings!`);
    
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

// Run the seeding
seedData();
