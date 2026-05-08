const http = require('http');

const testLogin = async (cred) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(cred);
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log(`Login successful for ${cred.role}!`);
                    const json = JSON.parse(body);
                    console.log(`Token received: ${json.token.substring(0, 20)}...`);
                    resolve();
                } else {
                    console.error(`Login failed for ${cred.role}: Status ${res.statusCode}`, body);
                    reject(new Error(`Status ${res.statusCode}`));
                }
            });
        });

        req.on('error', (e) => {
            console.error(`Problem with request for ${cred.role}: ${e.message}`);
            reject(e);
        });

        req.write(data);
        req.end();
    });
};

const runTests = async () => {
    const credentials = [
        { role: 'admin', userId: 'admin@muse.com', password: 'admin@123' },
        { role: 'teacher', userId: 'teacher@muse.com', password: 'teacher@123' },
        { role: 'student', userId: 'student@muse.com', password: 'student@123' }
    ];

    for (const cred of credentials) {
        try {
            console.log(`Testing login for ${cred.role}...`);
            await testLogin(cred);
        } catch (err) {
            // Error already logged
        }
    }
};

runTests();
