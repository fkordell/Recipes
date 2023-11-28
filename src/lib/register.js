import { renderHeaderFooter } from './utils.mjs';
import RegistrationForm from './components/RegistrationForm.svelte';
import signInModal from './components/signInModal.svelte';

new RegistrationForm({
    target: document.querySelector('.registration-form')
})
renderHeaderFooter();
signInModal();
