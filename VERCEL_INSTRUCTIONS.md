# Deploy na Vercel

Este projeto está configurado para ser implantado na Vercel usando Vite.

## Passos para Deploy

1. **Commit das alterações**:
   Certifique-se de commitar todas as alterações recentes, incluindo a movimentação da pasta `partials` para `public/partials` e o arquivo `vercel.json`.

   ```bash
   git add .
   git commit -m "Preparando projeto para deploy na Vercel"
   ```

2. **Push para o Repositório**:
   Envie o código para o seu repositório no GitHub, GitLab ou Bitbucket.

3. **Importar na Vercel**:
   - Acesse [vercel.com](https://vercel.com) e faça login.
   - Clique em "Add New..." -> "Project".
   - Importe o repositório do projeto.

4. **Configurações de Build**:
   A Vercel deve detectar automaticamente que é um projeto **Vite**.
   Verifique se as configurações são:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Deploy**:
   Clique em "Deploy".

## Notas Importantes

- **Imagens**: As imagens do projeto parecem estar hospedadas externamente (Google Cloud Storage), então não há necessidade de configurar armazenamento de mídia.
- **Partials**: Os arquivos HTML parciais foram movidos para a pasta `public/partials` para garantir que sejam incluídos no build final.
- **SPA / Rotas**: Um arquivo `vercel.json` foi adicionado para redirecionar todas as rotas para `index.html`, prevenindo erros 404 caso você decida transformar o site em uma Single Page Application (SPA) no futuro.
