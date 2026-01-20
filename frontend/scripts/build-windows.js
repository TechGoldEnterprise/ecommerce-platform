// frontend/scripts/build-windows.js
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Windows Build Script Starting...');
console.log('📁 Current directory:', __dirname);

// First, ensure all required directories exist
const scriptsDir = path.join(__dirname);
if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
    console.log('✅ Created scripts directory');
}

// Run scripts in sequence
async function runScripts() {
    try {
        // 1. Generate environment file
        console.log('\n📄 Step 1: Generating environment configuration...');
        await runCommand('node', ['scripts/generate-env.js']);
        
        // 2. Generate sitemap
        console.log('\n🗺️ Step 2: Generating sitemap...');
        await runCommand('node', ['scripts/generate-sitemap.js']);
        
        // 3. Build React app
        console.log('\n⚛️ Step 3: Building React application...');
        process.env.NODE_OPTIONS = '--openssl-legacy-provider';
        process.env.CI = 'false';
        await runCommand('npx', ['react-scripts', 'build']);
        
        console.log('\n🎉 BUILD SUCCESSFUL!');
        console.log('📦 Build output: ./build/');
        
        // Show build info
        const buildDir = path.join(__dirname, '../build');
        if (fs.existsSync(buildDir)) {
            const files = fs.readdirSync(buildDir);
            console.log(`📊 Build contains ${files.length} files/folders`);
        }
        
    } catch (error) {
        console.error('\n❌ BUILD FAILED:', error.message);
        process.exit(1);
    }
}

function runCommand(command, args) {
    return new Promise((resolve, reject) => {
        console.log(`Running: ${command} ${args.join(' ')}`);
        
        const child = spawn(command, args, {
            stdio: 'inherit',
            shell: true,
            env: { ...process.env }
        });
        
        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with code ${code}`));
            }
        });
        
        child.on('error', (error) => {
            reject(error);
        });
    });
}

// Start the build process
runScripts();