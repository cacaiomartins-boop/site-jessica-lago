@echo off
chcp 65001 >nul
cd /d "%~dp0"
set REPO=https://github.com/cacaiomartins-boop/site-jessica-lago.git

where git >nul 2>nul
if errorlevel 1 (
  echo O Git nao esta instalado. Instale em https://git-scm.com e rode este arquivo de novo.
  goto fim
)
if exist ".git" (
  echo Esta pasta ja esta ligada ao Git. Nada a fazer aqui.
  goto fim
)

echo [1/4] Ligando a pasta ao GitHub...
git init -b main
git remote add origin %REPO%
git fetch origin main
if errorlevel 1 (
  echo.
  echo Nao consegui acessar o repositorio: %REPO%
  goto fim
)
git reset origin/main >nul

echo [2/4] Preparando os arquivos...
git add .
echo [3/4] Registrando as alteracoes...
git -c user.name="Caio Martins" -c user.email="cacaio.martins@gmail.com" commit -m "Ajustes do site Jessica Lago"
echo [4/4] Enviando para o GitHub (pode abrir uma janela de login)...
git push origin HEAD:main
if errorlevel 1 (
  echo.
  echo O envio falhou. Copie a mensagem acima e me mande.
) else (
  echo.
  echo Pronto! O site foi enviado para o GitHub. Agora e so importar na Vercel.
)

:fim
echo.
pause
