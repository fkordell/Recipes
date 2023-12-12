<script>
  import { onMount } from "svelte";
  import {
    supabase,
    userEmail,
    getRecipeId,
    getUserId,
    recipeId,
    userId,
    updatePostTable,
  } from "./supabaseClient.mjs";

  let showSuccessMessage = false;
  let formData = {
    label: "",
    thumbnailImage: "",
    preparedImage: "",
    yield: "",
    ingredients: "",
    calories: 0,
    totalTime: 0,
    instructions: "",
    description: "",
  };

  const handleSubmit = async () => {
    if (userEmail) {
      await getUserId(userEmail);
      try {
        const { data, error } = await supabase.from("recipe").upsert([
          {
            label: formData.label,
            thumbnailImage: formData.thumbnailImage,
            preparedImage: formData.preparedImage,
            yield: formData.yield,
            ingredients: formData.ingredients,
            calories: formData.calories,
            totalTime: formData.totalTime,
            instructions: formData.instructions,
            description: formData.description,
          },
        ]);

        if (error) {
          console.error("Error submitting data to Supabase:", error.message);
        } else {
          console.log("Data submitted successfully!", data);
          await getRecipeId(formData.label);
          await updatePostTable(userId, recipeId);
          showSuccessMessage = true;
          formData = {
            label: "",
            thumbnailImage: "",
            preparedImage: "",
            yield: "",
            ingredients: "",
            calories: 0,
            totalTime: 0,
            instructions: "",
            description: "",
          };

        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  const adjustTextArea = (textareaId) => {
    const textarea = document.getElementById(textareaId);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  onMount(() => {});
</script>

{#if showSuccessMessage}
<h2>Your post has been added!</h2>
<h3>Checkout the 'Posts' page to see it</h3>
{/if}
{#if !showSuccessMessage}
<h2>Create your post here</h2>
<h2>Please log in before attempting to post</h2>
{/if}

<form on:submit|preventDefault={handleSubmit}>
  <label for="label">Label:</label>
  <input type="text" id="label" bind:value={formData.label} required />

  <label for="thumbImg">Thumbnail Image:</label>
  <input type="text" id="thumbImg" bind:value={formData.thumbnailImage} />

  <label for="prepImg">Prepared Image:</label>
  <input type="text" id="prepImg" bind:value={formData.preparedImage} />

  <label for="yield">Yield:</label>
  <input type="number" id="yield" bind:value={formData.yield} required />

  <label for="ingredients">Ingredients:</label>
  <textarea id="ingredients" bind:value={formData.ingredients} on:input={() => adjustTextArea('ingredients')} required
  ></textarea>

  <label for="calories">Calories:</label>
  <input type="number" id="calories" bind:value={formData.calories} required />

  <label for="time">Total Prep Time:</label>
  <input type="number" id="time" bind:value={formData.totalTime} required />

  <label for="instructions">Instructions:</label>
  <textarea id="instructions" bind:value={formData.instructions} on:input={() => adjustTextArea('instructions')} required
  ></textarea>

  <label for="description">Description:</label>
  <textarea id="description" bind:value={formData.description} on:input={() => adjustTextArea('description')} required
  ></textarea>

  <button type="submit">Submit</button>
</form>

<style>
  form {
    margin: 0 auto;
    max-width: 400px;
  }

  label {
    display: block;
    text-align: left;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    box-sizing: border-box;
  }
  textarea {
    resize: none;
    overflow-y: hidden;
    min-height: 80px;
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #316d33;
    font-weight: 800;
  }
</style>
