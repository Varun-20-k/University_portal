const http = require('http');

const testDashboard = async (role, token) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: `/api/dashboard/${role}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log(`${role} Dashboard fetch successful!`);
                    // console.log(JSON.parse(body));
                    resolve();
                } else {
                    console.error(`${role} Dashboard fetch failed: Status ${res.statusCode}`, body);
                    resolve(); // Don't crash the test
                }
            });
        });

        req.on('error', (e) => {
            console.error(`Problem with ${role} dashboard request: ${e.message}`);
            resolve();
        });

        req.end();
    });
};

const getToken = async (cred) => {
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
                    resolve(JSON.parse(body).token);
                } else {
                    reject(new Error(`Login failed for ${cred.role}`));
                }
            });
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
            const token = await getToken(cred);
            await testDashboard(cred.role, token);
        } catch (err) {
            console.error(err.message);
        }
    }
};

runTests();
