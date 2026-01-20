@echo off
echo ========================================
echo NexusShop - Windows Build Script
echo ========================================
echo.

REM Set environment variables for Windows
set NODE_OPTIONS=--openssl-legacy-provider
set CI=

REM Check for production flag
if "%1%"=="--production" (
    echo Building for PRODUCTION
    set REACT_APP_ENV=production
) else (
    echo Building for DEVELOPMENT
    set REACT_APP_ENV=development
)

echo Environment: %REACT_APP_ENV%
echo.

REM Run generate-env
echo Generating environment configuration...
node scripts/generate-env.js
if %errorlevel% neq 0 (
    echo Failed to generate environment file
    pause
    exit /b 1
)

REM Run generate-sitemap
echo Generating sitemap...
node scripts/generate-sitemap.js
if %errorlevel% neq 0 (
    echo Failed to generate sitemap
    pause
    exit /b 1
)

REM Run React build
echo Building React application...
npx react-scripts build
if %errorlevel% neq 0 (
    echo React build failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo BUILD SUCCESSFUL!
echo ========================================
echo Build output: ./build/
echo.
pause