import { renderHeaderFooter, showSignInModal } from './lib/utils.mjs';
import './app.css'
import App from './App.svelte'

renderHeaderFooter();
showSignInModal();

const app = new App({
  target: document.getElementById('app'),
})

export default app
