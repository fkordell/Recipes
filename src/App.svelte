<script>
    import {
        Landing,
        Login,
        Navbar,
        Posting,
        Profile,
        Recipe,
        Signup
    } from "./lib/Index.js"

    import { route } from "./lib/stores.mjs";

    window.addEventListener("popstate", () => {
        $route = window.location.hash;
    })
    
</script>

<main>
    <Navbar />
    <div>
        {#if $route === '#login'}
            <Login />
        {:else if $route === '#recipe'}
            <Recipe />
        {:else if $route === '#signup'}
            <Signup />
        {:else}
            <Landing />
        {/if}
    </div>
</main>

<style>

</style>
