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
  return "You have successfully signed up! Please login.";
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
  return "You have successfully logged in!";
}
