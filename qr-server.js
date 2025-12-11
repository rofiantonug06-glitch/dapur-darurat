const express = require('express');
const qrcode = require('qrcode-terminal');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from build folder (if built)
app.use(express.static(path.join(__dirname, 'dist')));

// For development, redirect to Vite dev server
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DapurDarurat Mobile</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: Arial, sans-serif; 
          text-align: center; 
          padding: 20px;
          background: linear-gradient(135deg, #f97316, #dc2626);
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .container {
          background: white;
          color: #333;
          padding: 30px;
          border-radius: 20px;
          margin: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        a {
          display: inline-block;
          margin: 10px;
          padding: 15px 30px;
          background: #f97316;
          color: white;
          text-decoration: none;
          border-radius: 10px;
          font-weight: bold;
          font-size: 18px;
        }
        .qr-container {
          margin: 20px 0;
          padding: 20px;
          background: #f1f5f9;
          border-radius: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🍳 DapurDarurat Mobile</h1>
        <p>Akses aplikasi di HP Anda:</p>
        
        <div class="qr-container">
          <h3>Scan QR Code ini:</h3>
          <div id="qrcode"></div>
        </div>
        
        <div>
          <h3>Atau klik link:</h3>
          <a href="http://<YOUR_IP>:5173" id="mobile-link">
            Buka di HP
          </a>
          <p style="font-size: 12px; color: #666;">
            Pastikan HP dan laptop dalam satu jaringan WiFi yang sama
          </p>
        </div>
      </div>
      
      <script>
        // Generate IP address dynamically
        async function getLocalIP() {
          try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
          } catch (error) {
            // Fallback to localhost
            return 'localhost';
          }
        }
        
        async function setupQRCode() {
          const ip = await getLocalIP();
          const url = \`http://\${ip}:5173\`;
          
          // Update link
          document.getElementById('mobile-link').href = url;
          document.getElementById('mobile-link').textContent = \`Buka: \${url}\`;
          
          // Generate QR code (using qrcode.js library)
          const qrContainer = document.getElementById('qrcode');
          qrContainer.innerHTML = '';
          
          // Simple QR code using Google Charts API
          const qrImg = document.createElement('img');
          qrImg.src = \`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=\${encodeURIComponent(url)}\`;
          qrImg.alt = 'QR Code';
          qrContainer.appendChild(qrImg);
        }
        
        setupQRCode();
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`\n🚀 Mobile server running on http://localhost:${PORT}`);
  console.log('📱 Scan QR code below or open the link on your phone:\n');
  
  // Generate QR code in terminal
  const localIP = require('ip').address();
  const url = `http://${localIP}:5173`;
  
  qrcode.generate(url, { small: true }, function (qrcode) {
    console.log(qrcode);
    console.log(`\n📲 Open in mobile: ${url}`);
    console.log('\n⚠️  Make sure:');
    console.log('1. Phone and laptop are on the SAME WiFi network');
    console.log('2. Firewall allows port 5173');
    console.log('3. Run Vite dev server first: npm run dev\n');
  });
});
