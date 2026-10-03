@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js 24 LTS, then run this file again.
  pause
  exit /b 1
)
call npm.cmd ci
if errorlevel 1 (
  echo Package installation failed. Copy the error from this window.
  pause
  exit /b 1
)
if not exist ".env.local" copy ".env.example" ".env.local" >nul
call npm.cmd run dev
pause
