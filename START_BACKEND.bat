@echo off
echo ========================================
echo   GrowwYou Backend Setup and Start
echo ========================================
echo.

echo Step 1: Seeding Database...
echo.
node resetAndSeed.js

echo.
echo ========================================
echo Step 2: Starting Server...
echo ========================================
echo.
echo Backend is running on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

node server.js
