import * as fs from 'fs';
import * as path from 'path';

const envPath = path.join(process.cwd(), '.env');
let content = fs.readFileSync(envPath, 'utf8');

const updates = {
    JWT_SECRET: '"supersecretkey-pastibot"',
    GOOGLE_CLIENT_ID: '"YOUR_GOOGLE_CLIENT_ID"',
    GOOGLE_CLIENT_SECRET: '"YOUR_GOOGLE_CLIENT_SECRET"',
    GOOGLE_CALLBACK_URL: '"http://localhost:3000/auth/google/redirect"',
    FRONTEND_URL: '"https://pastibot.vercel.app"',
    FACEBOOK_APP_ID: '"..."',
    FACEBOOK_APP_SECRET: '"..."',
    FACEBOOK_CALLBACK_URL: '"http://localhost:3000/auth/facebook/redirect"',
    X_CONSUMER_KEY: '"..."',
    X_CONSUMER_SECRET: '"..."',
    X_CALLBACK_URL: '"http://localhost:3000/auth/x/redirect"'
};

for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*`, 'm');
    if (content.match(regex)) {
        content = content.replace(regex, `${key}=${value}`);
    } else {
        content += `\n${key}=${value}`;
    }
}

fs.writeFileSync(envPath, content);
console.log('.env updated successfully');
