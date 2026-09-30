@echo off
chcp 65001 >nul
cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
  echo O Git nao esta instalado. Instale em https://git-scm.com e tente de novo.
  goto fim
)
if not exist ".git" (
  echo Esta pasta ainda nao esta ligada ao GitHub. Rode primeiro o arquivo subir-github.bat
  goto fim
)

echo [1/3] Preparando as alteracoes...
git add .
echo [2/3] Registrando...
git -c user.name="Caio Martins" -c user.email="cacaio.martins@gmail.com" commit -m "Atualizacao do site %DATE% %TIME:~0,5%"
echo [3/3] Enviando para o GitHub...
git push origin HEAD:main
if errorlevel 1 (
  echo.
  echo O envio falhou. Copie a mensagem acima e me mande.
) else (
  echo.
  echo Pronto! Em 1 a 2 minutos a Vercel publica a nova versao.
)

:fim
echo.
pause
