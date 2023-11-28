import MainFooter from './components/MainFooter.svelte';
import MainHeader from './components/MainHeader.svelte';
import signInModal from './components/signInModal.svelte';


export function renderHeaderFooter() {
    new MainHeader({
      target: document.querySelector('#main-header'),
    });
    new MainFooter({
      target: document.querySelector('#main-footer'),
    })
  }
  export function showSignInModal() {
    new signInModal({
      target: document.querySelector('#sign-in-modal'),
    })
  }