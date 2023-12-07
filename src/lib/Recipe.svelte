<script>
    let search = '';
    const searchUrl = import.meta.env.VITE_SEARCH_URL;

    async function handleSearch(event) {
        event.preventDefault();

        const response = await fetch(`${searchUrl}${search}`);
        const json = await response.json();

        console.log(json);

        displayResults(json);
    }

function displayResults(response) {
    const resultsContainer = document.getElementById('results-container');

    resultsContainer.innerHTML = '';

    console.log('API Response:', response);

    if (response.hits && Array.isArray(response.hits)) {
      response.hits.forEach(result => {
        console.log('Result:', result);

        const resultElement = document.createElement('div');
        resultElement.classList.add('recipe-card');
        const titleElement = document.createElement('h2');
        titleElement.textContent = result.recipe.label;
        resultElement.appendChild(titleElement);

        if (result.recipe.images.THUMBNAIL && result.recipe.images.THUMBNAIL.url) {
          const thumbnailUrl = result.recipe.images.THUMBNAIL.url;
          console.log('Thumbnail URL:', thumbnailUrl);

          const imageElement = document.createElement('img');
          imageElement.src = thumbnailUrl;
          imageElement.alt = result.recipe.label;
          resultElement.appendChild(imageElement);
        } else {
          const placeholderImage = document.createElement('div');
          placeholderImage.textContent = 'No Image Available';
          resultElement.appendChild(placeholderImage);
        }


        resultElement.addEventListener('click', () => {
          // Handle click on a recipe card
          showRecipeDetails(result.recipe);
        });

        resultsContainer.appendChild(resultElement);
      });
    } else {
      console.error('API response does not contain an array of results:', response);
    }
  }

    function showRecipeDetails(recipe) {
        console.log('Clicked on recipe:', recipe);
    }
    function goToRecipes() {
        window.location.href = '../#recipe';
    }

    document.addEventListener('DOMContentLoaded', function () {
        const searchForm = document.querySelector('form');
        if (searchForm) {
            searchForm.addEventListener('submit', handleSearch);
        }
    });
</script>

<style>
    main {
        max-width: 800px;
        margin: auto;
        padding: 20px;
    }

    form {
        margin-bottom: 20px;
    }

    .recipe-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        margin: 10px;
        padding: 10px;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .recipe-card:hover {
        transform: scale(1.05);
    }

    .recipe-card img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 10px;
    }

    .recipe-card h2 {
        font-size: 18px;
        margin: 0;
    }
    #results-container {
    text-align: left;
    }
</style>

<main>
    <form>
        <label for="search">Search for a recipe</label>
        <input id="search" name="search" type="text" placeholder="Search..." bind:value={search}>
        <button type="submit" class="search">Search</button>
    </form>

    <div id="results-container">
        <div class="recipe-card">
        </div>
    </div>
</main>

