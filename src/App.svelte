<script>
    import Login from "./lib/Login.svelte";
    import Navbar from "./lib/Navbar.svelte";
    import Recipe from "./lib/Recipe.svelte";
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
        {:else}
            <h2>Hello</h2>
        {/if}
    </div>
</main>

<style>
  
</style>
