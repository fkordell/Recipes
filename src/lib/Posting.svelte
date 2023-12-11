<h2>Create your post here</h2>

<form on:submit|preventDefault={handleSubmit}>
  <label for="label">Label:</label>
  <input type="text" id="label" bind:value={formData.label} required />

  <label for="thumbImg">Thumbnial Image:</label>
  <input type="text" id="thumbImg" bind:value={formData.thumbnailImage} />

  <label for="prepImg">Prepared Image:</label>
  <input type="text" id="prepImg" bind:value={formData.preparedImage} />

  <label for="yield">Yield:</label>
  <input type="number" id="yield" bind:value={formData.yield} />

  <!-- Need a way to submit data in json format or change column data type to something else -->
  <!-- <label for="ingredients">Ingredients:</label>
  <input type="hidden" id="ingredients" bind:value={formData.ingredientLines} /> -->

  <label for="calories">Calories:</label>
  <input type="number" id="calories" bind:value={formData.calories} />

  <label for="time">Total Prep Time:</label>
  <input type="number" id="time" bind:value={formData.totalTime} />

  <!-- <label for="instructions">Instructions:</label>
  <input type="hidden" id="instructions" bind:value={formData.instructions} /> -->

  <label for="description">Description:</label>
  <textarea id="description" bind:value={formData.description}></textarea>

  <button type="submit">Submit</button>
</form>


<script>
  import { onMount } from "svelte";
  import { supabase } from "./supabaseClient.mjs";

  let formData = {
    label: "",
    thumbnailImage: "",
    preparedImage: "",
    yield: "",
    ingredientLines: {},
    calories: 0,
    totalTime: 0,
    instructions: {},
    description: "",
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from("recipe")
        .upsert([
          {
            label: formData.label,
            thumbnailImage: formData.thumbnailImage,
            preparedImage: formData.preparedImage,
            yield: formData.yield,
            ingredientLines: formData.ingredientLines,
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
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  onMount(() => {});
</script>


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
