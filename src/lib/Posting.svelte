<h2>Create your post here</h2>

<form on:submit|preventDefault={handleSubmit}>
  <label for="label">Label:</label>
  <input type="text" id="label" bind:value={formData.label} required />

  <label for="description">Description:</label>
  <textarea id="description" bind:value={formData.description} required></textarea>

  <button type="submit">Submit</button>
</form>


<script>
  import { onMount } from "svelte";
  import { supabase } from "./supabaseClient.mjs";

  let formData = {
    label: "",
    description: "",
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from("recipe")
        .upsert([
          {
            label: formData.label,
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
