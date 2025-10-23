Instruções rápidas para rodar o app React (Windows PowerShell):

1. Mova a pasta `img/` do projeto original para `react-app/public/img/` (ou copie os arquivos relevantes).

2. No PowerShell dentro de `TCC\react-app` rode:
   npm install
   npm run dev

3. O app estará disponível em http://localhost:5173 por padrão.

Observações:
- O Cart usa sessionStorage com fallback para localStorage.
- Componente Relogios foi criado a partir de `relogios.html` com dados inlined (PRODUCTS array).
- Próximo passo: refatorar estilos, criar carousel com drag, migrar outras páginas.
