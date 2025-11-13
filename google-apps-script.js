// Google Apps Script for handling RSVP form submissions
// Instructions:
// 1. Create a new Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Replace the default code with this script
// 4. Update the SHEET_ID with your Google Sheet ID (currently: 1rwKGdqypVCDQD7wAooLrWpAALI8ugH_EdTayKACZqHM)
// 5. Deploy as Web App (Execute as: Me, Who has access: Anyone)
// 6. Copy the deployment URL and replace in your React app

function doGet(e) {
  return ContentService
    .createTextOutput('Google Apps Script is running! Use POST requests to submit RSVP data. Visit your website to test the form.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    console.log('Google Apps Script Debug: doPost function called');
    console.log('Google Apps Script Debug: Event object:', e);
    console.log('Google Apps Script Debug: postData exists:', !!e.postData);
    console.log('Google Apps Script Debug: postData contents:', e.postData ? e.postData.contents : 'No postData');

    // Open the Google Sheet (replace with your actual sheet ID)
    const SHEET_ID = '1rwKGdqypVCDQD7wAooLrWpAALI8ugH_EdTayKACZqHM';
    console.log('Google Apps Script Debug: Opening sheet with ID:', SHEET_ID);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    console.log('Google Apps Script Debug: Sheet opened successfully');

    // Get the data from the POST request (FormData)
    let data;
    if (e.postData && e.postData.contents) {
      console.log('Google Apps Script Debug: postData contents found, attempting to parse');
      // If it's JSON (fallback)
      try {
        data = JSON.parse(e.postData.contents);
        console.log('Google Apps Script Debug: Parsed as JSON:', data);
      } catch (jsonError) {
        console.log('Google Apps Script Debug: JSON parse failed, trying FormData parsing');
        // Parse FormData
        const formData = e.postData.contents;
        console.log('Google Apps Script Debug: Raw formData:', formData);
        const params = formData.split('&');
        data = {};

        params.forEach(param => {
          const [key, value] = param.split('=');
          data[decodeURIComponent(key)] = decodeURIComponent(value || '').replace(/\+/g, ' ');
        });
        console.log('Google Apps Script Debug: Parsed FormData:', data);
      }
    } else {
      console.log('Google Apps Script Debug: No postData contents, checking parameters');
      // Alternative parsing for FormData
      data = {};
      if (e.parameter) {
        data = e.parameter;
        console.log('Google Apps Script Debug: Using e.parameter:', data);
      }
    }

    // Prepare the row data
    const rowData = [
      new Date(), // Timestamp
      data.name || '',
      data.whatsapp || '',
      data.attendance || '',
      data.guests || '1',
      data.message || '',
      data.timestamp || ''
    ];

    console.log('Google Apps Script Debug: Prepared rowData:', rowData);

    // Append the data to the sheet
    console.log('Google Apps Script Debug: Appending row to sheet');
    sheet.appendRow(rowData);
    console.log('Google Apps Script Debug: Row appended successfully');

    // Set headers if this is the first row
    if (sheet.getLastRow() === 1) {
      console.log('Google Apps Script Debug: First row, setting headers');
      const headers = [
        'Submission Time',
        'Full Name',
        'WhatsApp Number',
        'Attendance',
        'Number of Guests',
        'Special Message',
        'Client Timestamp'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');

      // Auto-resize columns
      sheet.autoResizeColumns(1, headers.length);
      console.log('Google Apps Script Debug: Headers set and columns resized');
    }

    console.log('Google Apps Script Debug: Preparing success response');

    // Return success response
    const response = ContentService
      .createTextOutput(JSON.stringify({
        'result': 'success',
        'message': 'RSVP submitted successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);

    console.log('Google Apps Script Debug: Success response created:', response.getContent());
    return response;

  } catch (error) {
    console.error('Google Apps Script Debug: Error processing RSVP:', error);
    console.error('Google Apps Script Debug: Error stack:', error.stack);

    return ContentService
      .createTextOutput(JSON.stringify({
        'result': 'error',
        'message': 'Failed to process RSVP. Please try again.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testScript() {
  // Simulate FormData as URL-encoded string
  const testData = 'name=Anubhav+Chaudhary&whatsapp=%2B91+9736211316&attendance=yes&guests=2&message=Looking+forward+to+celebrating%21&timestamp=' + encodeURIComponent(new Date().toISOString());

  // Simulate a POST request with FormData
  const e = {
    postData: {
      contents: testData
    }
  };

  const result = doPost(e);
  console.log('Test result:', result.getContent());
}
