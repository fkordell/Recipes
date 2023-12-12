import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
const tableName = "post";

export async function fetchData() {
  const { data, error } = await supabase.from(tableName).select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  return data;
}

export async function processData() {
  try {
    const recipes = await fetchData();

    const posts = await Promise.all(
      recipes.map(async (recipe) => {
        const { data, error } = await supabase
          .from("post")
          .select("account(email), recipe(*)")
          .eq("post_id", recipe.post_id);

        if (error) {
          console.error("Error fetching data:", error);
          return null;
        }

        return data[0];
      })
    );
    return posts.filter((post) => post !== null);
  } catch (error) {
    console.error("Error processing data:", error);
    return [];
  }
}

export async function signup(fname, lname, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fname: fname,
        lname: lname,
      },
    },
  });
  if (error) {
    console.error("Error signing up:", error);
    return error.message;
  }
  console.log("Sign up successful", data);
  await insertUserAccount(email, fname, lname)
  userEmail = email;
  userFname = fname;
  userLname = lname;
  return "You have successfully signed up! Please login.";
}
export let userEmail = "";
let userFname = "";
let userLname = "";
export let userId = 0;
export let recipeId = 0;

export async function insertUserAccount(email, fname, lname) {
  try {
    const { data, error } = await supabase
      .from("account")
      .upsert([
        {
          fname: fname,
          lname: lname,
          email: email
        }
      ])
      if (error) {
        console.error("Error submitting data to Supabase:", error.message);
      } else {
        console.log("Data submitted successfully!", data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }

  }

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error("Error logging in:", error);
    return error.message;
  }
  console.log("Login successful", data);
  userEmail = data.user.email
  userFname = data.user.user_metadata.fname
  userLname = data.user.user_metadata.lname
  await getUserId(userEmail);
  return "You have successfully logged in!";
}

export async function getUserId(email) {
  const { data, error } = await supabase
    .from("account")
    .select("account_id")
    .eq("email", email);
  if (error) {
    console.log("Failed to retrieve ID: ", error)
  }
  console.log("Account ID:", data[0].account_id)
  userId = data[0].account_id
}

export async function getRecipeId(recipeName) {
  const { data, error } = await supabase
  .from("recipe")
  .select("recipe_id")
  .eq("label", recipeName)
  if (error) {
    console.log("Failed to retrieve recipe: ", error)
  }
  console.log("Recipe ID:", data[0].recipe_id)
  recipeId = data[0].recipe_id
  
}

export async function updatePostTable(userId, recipeId) {
  try {
    const { data, error } = await supabase
      .from("post")
      .upsert([
        {
          account_id: userId,
          recipe_id: recipeId
        }
      ])
      if (error) {
        console.error("Error submitting data to Supabase:", error.message);
      } else {
        console.log("Data submitted successfully!", data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
}