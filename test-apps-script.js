// Test script to verify Google Apps Script is working
// Run this in browser console to test your deployment

const testGoogleAppsScript = async () => {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxUMTus3e08rz6z9_r2JwG5DhpY-11LzIpCx93oEOrDECKor-DnpJbPlaWjpJdkzVe8/exec';

  console.log('Testing Google Apps Script deployment...');

  try {
    const formData = new FormData();
    formData.append('name', 'Test User');
    formData.append('whatsapp', '+91 9876543210');
    formData.append('attendance', 'yes');
    formData.append('guests', '2');
    formData.append('message', 'This is a test submission');
    formData.append('timestamp', new Date().toISOString());

    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formData,
    });

    const result = await response.text();
    console.log('Response status:', response.status);
    console.log('Response:', result);

    if (response.ok && result.includes('success')) {
      console.log('✅ Apps Script is working correctly!');
    } else {
      console.log('❌ Apps Script returned an error');
    }

  } catch (error) {
    console.error('❌ Fetch error:', error);
  }
};

// Run the test
testGoogleAppsScript();
