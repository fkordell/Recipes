<script>
  import { onMount } from "svelte";
  import { signup } from "../supabaseClient.mjs";
  let fname = "";
  let lname = "";
  let email = "";
  let password = "";
  let message;

  async function handleSubmit(event) {
    event.preventDefault();

    message = await signup(fname, lname, email, password);

  }
</script>
{#if message}
<h2>{message}</h2>
{/if}

<form name="registration" on:submit|preventDefault={handleSubmit}>
  <fieldset>
    <legend>Register with us</legend>
    <div class="user-info">
      <label for="fname">First Name:</label>
      <input type="text" name="fname" id="fname" required bind:value={fname}/>

      <label for="lname">Last Name:</label>
      <input type="text" name="lname" id="lname" required bind:value={lname}/>

      <label for="email">email:</label>
      <input type="email" name="email" id="email" required bind:value={email}/>

      <label for="password">password:</label>
      <input type="password" name="password"  id="password" required bind:value={password}/>
    </div>
  </fieldset>
  <button type="submit" id="register-button">Register</button>
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
