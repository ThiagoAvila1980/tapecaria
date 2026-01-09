import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("Tapeçaria Paulista: Iniciando aplicação...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Erro crítico: Elemento #root não encontrado no HTML!");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Tapeçaria Paulista: Renderização concluída.");
  } catch (error) {
    console.error("Erro durante a renderização do React:", error);
  }
}
