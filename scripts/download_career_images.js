const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE_PATH = path.join(__dirname, '..', 'src', 'data', 'careersData.js');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'images', 'bibliografias');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        const encodedUrl = url.trim().replace(/\s/g, '%20');

        https.get(encodedUrl, (res) => {
            if (res.statusCode === 200) {
                const filePath = path.join(OUTPUT_DIR, filename);
                const fileStream = fs.createWriteStream(filePath);
                res.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    console.log(`Descargado: ${filename}`);
                    resolve();
                });
            } else {
                console.error(`Error descargando ${url}: Status ${res.statusCode}`);
                // Create an empty file or placeholder to avoid errors later? 
                // Better to just skip for now and log it.
                resolve();
            }
        }).on('error', (err) => {
            console.error(`Error en request ${url}: ${err.message}`);
            resolve();
        });
    });
}

async function run() {
    console.log('Leyendo careersData.js...');
    try {
        const content = fs.readFileSync(DATA_FILE_PATH, 'utf8');

        // Regex to extract objects with id and imageUrl
        // Expecting format: { id: 1, ..., imageUrl: '...' },
        // This regex is a simple approximation.
        const regex = /id:\s*(\d+).*?imageUrl:\s*'([^']+)'/gs;

        let match;
        const downloads = [];

        while ((match = regex.exec(content)) !== null) {
            const id = match[1];
            const url = match[2];

            // Determine extension (most are jpg, but let's be safe-ish, user wanted jpg preference)
            let ext = '.jpg'; // Default to jpg as requested

            const filename = `career-${id}${ext}`;
            downloads.push(downloadImage(url, filename));
        }

        console.log(`Encontradas ${downloads.length} imágenes para descargar.`);

        // Process in chunks to avoid overwhelming the server or network
        const CHUNK_SIZE = 5;
        for (let i = 0; i < downloads.length; i += CHUNK_SIZE) {
            const chunk = downloads.slice(i, i + CHUNK_SIZE);
            await Promise.all(chunk);
        }

        console.log('Descarga completada.');

    } catch (err) {
        console.error('Error:', err);
    }
}

run();
