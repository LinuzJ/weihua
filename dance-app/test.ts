import PocketBase from "pocketbase";

const pb = new PocketBase("https://junctionb.nyman.dev");

const authData = await pb
  .collection("users")
  .authWithPassword("testuser", "Test1234");

const result = await pb.collection("scores").getList();

console.log(authData);
console.log(result);

// Loginpage -> landing

// landing -> tier1,tier2, tier3, leaderboard

// tierX -> Preview of challenge

// Preview of challenge -> record

// record -> submit?

// submit? -> record, landing, leaderboard

// leaderboard -> landing

// record ? <R> : <L>

// L = {
//   landing ? <La> : <prev>
// }

// Prev = {

// }
