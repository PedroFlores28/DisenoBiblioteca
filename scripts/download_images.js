const fs = require('fs');
const path = require('path');
const https = require('https');

const CSV_PATH = path.join(__dirname, '..', 'bibliotecas.csv');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'images', 'bibliotecas');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        // Handle potential spaces in URL
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
                resolve(); // Continue with next
            }
        }).on('error', (err) => {
            console.error(`Error en request ${url}: ${err.message}`);
            resolve();
        });
    });
}

async function run() {
    console.log('Iniciando descarga de imágenes...');
    const content = fs.readFileSync(CSV_PATH, 'utf8');
    const lines = content.split('\n');

    // Skip header
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simpler split because your CSV uses ;
        const columns = line.split(';');
        const id = columns[0];
        const imageUrl = columns[6]; // Columna URL Foto

        if (id && imageUrl && imageUrl.startsWith('http')) {
            const ext = path.extname(imageUrl.split('?')[0]) || '.jpg';
            const filename = `biblio-${id}${ext.toLowerCase()}`;
            await downloadImage(imageUrl, filename);
        }
    }
    console.log('Proceso finalizado.');
}

run();
