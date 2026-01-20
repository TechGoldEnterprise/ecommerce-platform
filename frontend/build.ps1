# NexusShop - PowerShell Build Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "NexusShop - Windows Build Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set environment variables
$env:NODE_OPTIONS = "--openssl-legacy-provider"
$env:CI = $null

# Check for production flag
if ($args -contains "--production" -or $args -contains "-p") {
    Write-Host "Building for PRODUCTION" -ForegroundColor Green
    $env:REACT_APP_ENV = "production"
} else {
    Write-Host "Building for DEVELOPMENT" -ForegroundColor Yellow
    $env:REACT_APP_ENV = "development"
}

Write-Host "Environment: $env:REACT_APP_ENV"
Write-Host ""

# Run generate-env
Write-Host "Generating environment configuration..." -ForegroundColor Cyan
node scripts/generate-env.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to generate environment file" -ForegroundColor Red
    exit 1
}

# Run generate-sitemap
Write-Host "Generating sitemap..." -ForegroundColor Cyan
node scripts/generate-sitemap.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to generate sitemap" -ForegroundColor Red
    exit 1
}

# Run React build
Write-Host "Building React application..." -ForegroundColor Cyan
npx react-scripts build
if ($LASTEXITCODE -ne 0) {
    Write-Host "React build failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "BUILD SUCCESSFUL!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Show build info
$buildDir = "build"
if (Test-Path $buildDir) {
    $size = (Get-ChildItem $buildDir -Recurse | Measure-Object -Property Length -Sum).Sum
    $sizeMB = [math]::Round($size / 1MB, 2)
    Write-Host "Build output: ./build/"
    Write-Host "Build size: ${sizeMB} MB"
}

Write-Host ""
Read-Host "Press Enter to continue"