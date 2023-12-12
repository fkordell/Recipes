 <script>
    let search = '';
    let nextLink = '';
    let modalContent = null;
    let showModal = false;
    let selectedRecipe = null;
    let selectedRecipeImageUrl = null;
    let resultsContainer = [];
    let hasSearched = false;
  
    const searchUrl = import.meta.env.VITE_SEARCH_URL;
  
    async function handleSearch(event) {
      event.preventDefault();
      nextLink = '';
  
      const response = await fetch(`${searchUrl}${search}`);
      const json = await response.json();
  
      console.log(json);
  
      displayResults(json);

      nextLink = json._links?.next?.href || '';
      hasSearched = true;
    }

    async function loadNextPage() {
    if (nextLink) {
      const response = await fetch(nextLink);
      const json = await response.json();

      console.log(json);

      displayResults(json);

      nextLink = json._links?.next?.href || '';
    }
  }
  
    function displayResults(response) {
      resultsContainer = [];
  
      console.log('API Response:', response);
  
      if (response.hits && Array.isArray(response.hits)) {
        response.hits.forEach(result => {
          console.log('Result:', result);
          const title = result.recipe.label;
          const thumbnailUrl = result.recipe.images.SMALL?.url || null;
          const cuisineType = Array.isArray(result.recipe.cuisineType) ? result.recipe.cuisineType.join(', ') : null;
          const totalTime = result.recipe.totalTime === 0 ? 'N/A' : result.recipe.totalTime + ' minutes';
          const servings = result.recipe.yield.toString();
          const calories = result.recipe.calories.toString();
  
          resultsContainer.push({
            title,
            thumbnailUrl,
            cuisineType,
            totalTime,
            servings,
            calories,
            recipe: result.recipe
          });
        });
      } else {
        console.error('API response does not contain an array of results:', response);
      }
    }
  
    function displayRecipeDetails(recipe) {
    selectedRecipe = recipe;
    showModal = true;

    const imageUrl = recipe.images && recipe.images.LARGE && recipe.images.LARGE.url
      ? recipe.images.LARGE.url
      : (recipe.images && recipe.images.SMALL && recipe.images.SMALL.url ? recipe.images.SMALL.url : null);

    selectedRecipeImageUrl = imageUrl;
    }
  
    function closeModal() {
      showModal = false;
    }
  </script>
  
  <main>
    <form on:submit={handleSearch}>
      <label for="search">Search for a recipe</label>
      <input bind:value={search} type="text" placeholder="Search...">
      <button type="submit" class="search">Search</button>
      {#if hasSearched}
      <button type="button" on:click={loadNextPage}>Load More</button>
      {/if}
    </form>
  
    <div id="results-container">
        {#each resultsContainer as { title, thumbnailUrl, cuisineType, totalTime, servings, calories, recipe }}
          <button
            class="recipe-card"
            on:click={() => displayRecipeDetails(recipe)}
            on:keydown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                displayRecipeDetails(recipe);
              }
            }}
          >
            <h2>{title}</h2>
            {#if thumbnailUrl}
              <img src={thumbnailUrl} alt={title}>
            {:else}
              <div>No Image Available</div>
            {/if}
            {#if cuisineType}
              <p>Cuisine Type: {cuisineType}</p>
            {/if}
            <p> 
              Total Time: {totalTime}
            </p>
            <p>Servings: {servings}</p>
            {#if recipe.calories !== undefined}
              <p>Calories: {Number(recipe.calories).toFixed(1)}</p>
            {/if}
          </button>
        {/each}
      </div>
  
    {#if showModal}
    <div id="recipeModal" class="modal">
        <div class="modal-content">
          <span class="close" on:click={closeModal}>&times;</span>
          {#if selectedRecipe}
          <h2>{selectedRecipe.label}</h2>
          {#if selectedRecipe.images && selectedRecipe.images.LARGE && selectedRecipe.images.LARGE.url}
            <img src={selectedRecipe.images.LARGE.url} alt={selectedRecipe.label}>
          {:else if selectedRecipe.images && selectedRecipe.images.SMALL && selectedRecipe.images.SMALL.url}
            <img src={selectedRecipe.images.SMALL.url} alt={selectedRecipe.label}>
          {/if}
          {#if selectedRecipe.cuisineType}
            <p>Cuisine Type: {selectedRecipe.cuisineType.join(', ')}</p>
          {/if}
          <p>Total Time: {selectedRecipe.totalTime === 0 ? 'N/A' : selectedRecipe.totalTime + ' minutes'}</p>
          <p>Servings: {selectedRecipe.yield}</p>
          {#if selectedRecipe.calories !== undefined}
            <p>Calories: {Number(selectedRecipe.calories).toFixed(1)}</p>
          {/if}
          {#if selectedRecipe.ingredientLines && selectedRecipe.ingredientLines.length > 0}
            <h3>Ingredients:</h3>
            <ul class="ingredient-list">
              {#each selectedRecipe.ingredientLines as ingredient (ingredient)}
                <li>{ingredient}</li>
              {/each}
            </ul>
          {/if}
          {#if selectedRecipe.instructionLines && selectedRecipe.instructionLines.length > 0}
            <h3>Instructions:</h3>
            <ol class="instruction-list">
          {#each selectedRecipe.instructionLines as instruction (instruction)}
            <li>{instruction}</li>
          {/each}
            </ol>
        {/if}
        {/if}
        
        </div>
      </div>
      
    {/if}
</main>
  
<style>
main {
    margin: auto;
    padding: 20px;
}
    
form {
    margin-bottom: 20px;
}
#results-container {
    padding-left: 5px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;
    cursor: pointer;
    transition: transform 0.4s;
}
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 1;
}

.modal-content {
    width: 40%; 
    background-color: white;
    color: black;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    position: relative;
    height: 80vh; 
    overflow-y: auto; 
    text-align: left;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}
.recipe-card {
    border: 3px solid black;
    transition: transform 0.3s ease-in-out;
}

.recipe-card:hover {
    transform: scale(1.05);
    border: 3px solid red;
}

.ingredient-list{
    list-style-type: none;
    padding: 0;
}
</style>
  


  
  
  