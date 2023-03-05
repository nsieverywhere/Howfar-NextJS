export async function allPosts() {
  // Call an external API endpoint to get posts
  const res = await fetch("");
  const data = await res.json();

  return data;
}
