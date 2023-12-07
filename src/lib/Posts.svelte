<h1>Latest Posts</h1>
{#if posts.length > 0}
  <div class="postsContainer">
    {#each posts as { recipe, account }}
      <article class="post">
        <h2 id="title">{recipe.label}</h2>
        <img src={recipe.thumbnailImage} alt="Food">
        <p>{recipe.description}</p>
        <p id="user">User: {account.email}</p>
      </article>
    {/each}
  </div>
{:else}
  <p>Loading...</p>
{/if}



<script>
    import { onMount } from 'svelte';
    import { fetchData, processData } from './supabaseClient.mjs'

    fetchData();
    let posts = [];
    onMount(async () => {
        posts = await processData();
    });
        
</script>


<style>
    .postsContainer {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .post {
        display: block;
        border: 1px dashed black;
        padding: 10px;
        max-width: 400px;
        width: 80%;
        margin: 0 auto;
    }

    .post h2 {
        border-bottom: 1px solid black;
    }

    .post p {
        text-align: left;
    }
    .post img {
        width: 80%;
        margin: 10px 0;
    }
    #user {
        text-align: left;
    }
</style>