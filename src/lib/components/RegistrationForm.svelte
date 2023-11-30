<script>
    let fname= '';
    let lname= '';
    let email = '';
    let password = '';
    
    function handleSubmit(event) {
        event.preventDefault();
    
        const userData = { fname, lname, email, password };
    
        fetch('/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then((response) => {
            if (response.ok) {
              window.location.href = '#profile';
            } else {
              console.error('Registration failed.');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    
    </script>
    
    <form name="registration" on:submit|preventDefault={handleSubmit}>
        <fieldset>
            <legend>Register with us</legend>
            <div class="user-info">
                <label for="fname">First Name:</label>
                <input type="text" name="fname" required>
    
                <label for="lname">Last Name:</label>
                <input type="text" name="lname" required>
    
                <label for="email">email:</label>
                <input type="text" name="email" required>

                <label for="password">password:</label>
                <input type="text" name="password" required>
            </div>
        </fieldset>
      </form>
      <button type="submit" id="register-button">Register</button>

    <style>
      form{
        margin-left: 10px;
      }
      fieldset{
        margin: 20px 0;
        width: 550px;
      }
      input{
        display: flex;
        flex-wrap: wrap;
        width: 95%;
        padding: 10px;
      }
      label{
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
      legend{
        font-size: 30px;
      }
      #register-button{
        width: 150px;
      }
      #register-button:hover{
        background-color: darkgrey;
      }

    </style>