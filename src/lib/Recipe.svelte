<script>
    let search = '';
    const searchUrl = import.meta.env.VITE_SEARCH_URL;

    async function handleSearch(event) {
    event.preventDefault();

    const response = await fetch(`${searchUrl}${search}`);
    const json = await response.json();

    console.log(json);

    displayResults(json); 

    goToRecipes();
}
function displayResults(response) {
        const resultsContainer = document.getElementById('results-container');

        resultsContainer.innerHTML = '';

        console.log('API Response:', response);  

        if (response.hits && Array.isArray(response.hits)) {
            response.hits.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.textContent = result.recipe.label;
                resultsContainer.appendChild(resultElement);
            });
        } else {
            console.error('API response does not contain an array of results:', response);
        }
    }


    function goToRecipes(){
        window.location.href = '../#recipe'
    }

    document.addEventListener('DOMContentLoaded', function () {
    const search = document.querySelector('.search');
    if (search) {
      search.addEventListener('click', goToRecipes);
    }
  });

</script>

<main>
    <form on:submit={handleSearch}>
        <label for="search">Search for a recipe</label>
        <input id="search" name="search" type="text" placeholder="Search..." bind:value={search}>
        <button type="submit" class="search">Search</button>
    </form>

    <div id="results-container"></div>
</main>