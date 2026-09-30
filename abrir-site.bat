@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Site - previa local

where node >nul 2>nul
if errorlevel 1 (
  echo O Node.js nao esta instalado. Instale em https://nodejs.org e rode este arquivo de novo.
  goto fim
)

if not exist "node_modules" (
  echo Primeira vez nesta pasta: instalando o que o site precisa. Pode demorar alguns minutos...
  call npm.cmd install
  if errorlevel 1 (
    echo.
    echo A instalacao falhou. Copie a mensagem acima e me mande.
    goto fim
  )
)

echo.
echo Iniciando o site. Deixe esta janela aberta e me diga a porta que aparecer ^(ex.: 8080^).
echo Para parar, feche esta janela ou aperte Ctrl+C.
echo.
call npm.cmd run dev

:fim
echo.
pause
