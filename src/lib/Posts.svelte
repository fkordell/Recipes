<h1>Latest Posts</h1>
<div class="postsContainer">
    <article class="post">
        <h2 id="title">{title}</h2>
        <p>{content}</p>
        <p id="user">User: {username}</p>
    </article>
</div>


<script>
    let username = "caydenpark";
    let title = "Macaroni & Cheese";
    let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
</script>


<style>
    .postsContainer {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .post {
        border: 1px dashed black;
        padding: 10px;
        max-width: 400px;
    }

    .post h2 {
        border-bottom: 1px solid black;
    }

    #user {
        text-align: left;
    }
</style>