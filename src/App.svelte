<script>
    import {
        Landing,
        Login,
        Navbar,
        Posts,
        Posting,
        Profile,
        Recipe,
        Signup
    } from "./lib/Index.js"
    import RegistrationForm from "./lib/components/RegistrationForm.svelte";
    import SignIn from "./lib/components/signIn.svelte";

    import { route } from "./lib/stores.mjs";

    window.addEventListener("popstate", () => {
        $route = window.location.hash;
    })

</script>

<main>
    <Navbar />
    <div>
        {#if $route === '#login'}
            <SignIn />
        {:else if $route === '#profile'}
            <Profile />
        {:else if $route === '#posting'}
            <Posting />
        {:else if $route === '#recipe'}
            <Recipe />
        {:else if $route === '#signup'}
            <RegistrationForm />
        {:else if $route === '#posts'}
            <Posts />
        {:else}
            <Landing />
        {/if}
    </div>
</main>

<style>

</style>
