// Backend Integration Example for Jaigurugiri Yogashaala
// This file shows how to integrate the form with various backend services

// ============================================
// OPTION 1: Simple Email Service (Formspree)
// ============================================
// Replace the form submission in page.html with:
/*
guruForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(guruForm);
    
    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            guruForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
        }
    } catch (error) {
        alert('Submission failed. Please try again.');
    }
});
*/

// ============================================
// OPTION 2: Custom Node.js/Express Backend
// ============================================
/*
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'namaste@jaigurugiri.com',
        pass: 'your-app-password'
    }
});

app.post('/api/submit', async (req, res) => {
    const { name, email, phone, location, goal, message } = req.body;
    
    const mailOptions = {
        from: 'namaste@jaigurugiri.com',
        to: 'namaste@jaigurugiri.com',
        subject: `New Inquiry from ${name}`,
        html: `
            <h2>New Wellness Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Goal:</strong> ${goal}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
*/

// Frontend fetch call:
/*
const response = await fetch('http://your-domain.com/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
*/

// ============================================
// OPTION 3: Firebase Integration
// ============================================
/*
// Add to page.html <head>:
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"></script>

// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form submission
guruForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(guruForm);
    const data = Object.fromEntries(formData.entries());
    
    try {
        await db.collection('inquiries').add({
            ...data,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        guruForm.classList.add('hidden');
        successMessage.classList.remove('hidden');
    } catch (error) {
        alert('Submission failed. Please try again.');
    }
});
*/

// ============================================
// OPTION 4: Google Sheets Integration
// ============================================
/*
// Using Google Apps Script as backend
// 1. Create Google Sheet
// 2. Tools > Script Editor
// 3. Add this code:

function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
        new Date(),
        data.name,
        data.email,
        data.phone,
        data.location,
        data.goal,
        data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
        .setMimeType(ContentService.MimeType.JSON);
}

// Deploy as web app and use the URL in your fetch call
*/

// ============================================
// OPTION 5: Netlify Forms (Simplest)
// ============================================
/*
// Just add these attributes to your form in page.html:
<form id="guruForm" name="contact" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact">
    <!-- rest of form fields -->
</form>

// Netlify automatically handles form submissions when deployed
// Access submissions in Netlify dashboard
*/

// ============================================
// RECOMMENDED: Email Notification Template
// ============================================
const emailTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Georgia, serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF9933 0%, #E65100 100%); 
                  color: white; padding: 30px; text-align: center; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #E65100; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🕉️ New Wellness Inquiry</h1>
            <p>Jaigurugiri Yogashaala</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div>${data.name}</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="field">
                <div class="label">Phone:</div>
                <div><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            <div class="field">
                <div class="label">Location:</div>
                <div>${data.location}</div>
            </div>
            <div class="field">
                <div class="label">Primary Goal:</div>
                <div>${data.goal}</div>
            </div>
            <div class="field">
                <div class="label">Message:</div>
                <div>${data.message || 'No message provided'}</div>
            </div>
        </div>
        <div class="footer">
            <p>Received: ${new Date().toLocaleString()}</p>
            <p>Respond within 24 hours for best engagement</p>
        </div>
    </div>
</body>
</html>
`;

// ============================================
// Analytics Event Tracking Examples
// ============================================
/*
// Track button clicks
document.querySelectorAll('.btn-saffron').forEach(btn => {
    btn.addEventListener('click', () => {
        gtag('event', 'cta_click', {
            'event_category': 'engagement',
            'event_label': btn.textContent
        });
    });
});

// Track scroll depth
let scrollDepth = 0;
window.addEventListener('scroll', () => {
    const depth = Math.round((window.scrollY / document.body.scrollHeight) * 100);
    if (depth > scrollDepth && depth % 25 === 0) {
        scrollDepth = depth;
        gtag('event', 'scroll_depth', {
            'event_category': 'engagement',
            'value': depth
        });
    }
});

// Track resource downloads
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', () => {
        gtag('event', 'download', {
            'event_category': 'resources',
            'event_label': link.getAttribute('href')
        });
    });
});
*/

module.exports = { emailTemplate };
