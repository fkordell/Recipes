<script>
  let search = '';
  const searchUrl = import.meta.env.VITE_SEARCH_URL;

    async function handleSearch(event) {
        event.preventDefault();

        const response = await fetch(`${searchUrl}${search}`);
        const json = await response.json();

        console.log(json);
    }
</script>

<main>
    <form on:submit={handleSearch}>
        <label for="search">Search for a recipe</label>
        <input id="search" name="search" type="text" placeholder="Search..." bind:value={search}>
        <button type="submit">Search</button>
    </form>
</main>

<style>
  
</style>
