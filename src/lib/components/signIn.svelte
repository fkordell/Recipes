<script>
  import { login } from "../supabaseClient.mjs";
  let password = "";
  let email = "";
  let message;

  async function handleSubmit(event) {
    event.preventDefault();

    message = await login(email, password);
  }
</script>
{#if message}
<h2>{message}</h2>
{/if}

<form name="registration" on:submit|preventDefault={handleSubmit}>
  <fieldset>
    <legend>Sign In</legend>
    <div class="user-info">
      <label for="email">email:</label>
      <input type="email" name="email" id="email" required bind:value={email}/>

      <label for="password">password:</label>
      <input type="password" name="password" id="password" required bind:value={password}/>
    </div>
  </fieldset>
  <button type="submit" id="register-button">Sign In</button>
</form>

<style>
  form {
    margin-left: 10px;
  }
  fieldset {
    margin: 20px 0;
    width: 550px;
  }
  input {
    display: flex;
    flex-wrap: wrap;
    width: 95%;
    padding: 10px;
  }
  label {
    font-size: large;
    font-weight: 700;
  }
  input[required] {
    border: 1px solid #ccc;
  }
  input:valid {
    border: 3px solid green;
  }
  input:invalid {
    border: 3px solid red;
  }
  legend {
    font-size: 30px;
  }
  #register-button {
    width: 150px;
  }
  #register-button:hover {
    background-color: darkgrey;
  }
</style>
