import PocketBase from "pocketbase";

const pb = new PocketBase("https://junctionb.nyman.dev");

const authData = await pb
  .collection("users")
  .authWithPassword("testuser", "Test1234");

const result = await pb.collection("scores").getList();

console.log(authData);
console.log(result);
