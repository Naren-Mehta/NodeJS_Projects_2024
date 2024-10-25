const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://naren17mehta:HovG73IPN8DNKvup@namestenode.pvvy8.mongodb.net/";

const client = new MongoClient(url);

const dbName = "HeloWorld";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection("User");

//   const insertResult = await collection.insertMany([
//     {
//       firstName: "Test1",
//       lastName: "Test12",
//       city: "Test123",
//       phoneNumber: "1234567890",
//     },
//   ]);
//   console.log("Inserted documents =>", insertResult);

  // Find All Documents
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  // Update a Documents
  const updateUser = {
    firstName: "Test11_2",
    lastName: "Test112_2",
    city: "Test1123_2",
    phoneNumber: "11234567890_2",
  };

  const updateResult = await collection.updateOne(findResult[2], {
    $set: updateUser,
  });

  console.log("Updated documents =>", updateResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
