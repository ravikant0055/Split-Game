const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

ipcMain.handle('print-photo', async (event, printData) => {
  const { imageBase64, quantity, paperSize } = printData;

  try {
    const hotFolderPath = `C:\\DNP\\HotFolderPrint\\Prints\\${paperSize}\\RX1HS`;

    // Validate and clean the Base64 string
    let base64Data = imageBase64;
    if (imageBase64.startsWith('data:image/jpeg;base64,')) {
      base64Data = imageBase64.replace(/^data:image\/jpeg;base64,/, '');
    } else {
      console.error('Invalid Base64 string format. Expected JPEG format.');
      throw new Error('Invalid Base64 string. Ensure it starts with "data:image/jpeg;base64,"');
    }

    // Decode Base64 into a buffer
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Save image files based on the quantity
    const timestamp = Date.now();
    for (let i = 1; i <= quantity; i++) {
      const imageFilePath = path.join(hotFolderPath, `photo_${timestamp}_${i}.jpg`);
      fs.writeFileSync(imageFilePath, imageBuffer);
    }

    // Metadata file for hot folder
    const metadataFilePath = path.join(hotFolderPath, `photo_${timestamp}.txt`);
    const metadataContent = `SIZE=${paperSize}\nQUANTITY=${quantity}`;
    fs.writeFileSync(metadataFilePath, metadataContent);

    console.log('Image and metadata saved successfully.');
    return { status: 'success' };
  } catch (error) {
    console.error('Error saving to hot folder:', error);
    return { status: 'error', message: error.message };
  }
});



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
