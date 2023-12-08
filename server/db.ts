import { MongoClient } from "mongodb";

export async function db() {
  const uri =
    "mongodb+srv://nicoandreoli:nicoandreoli@cluster0.o6miqgn.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);
  try {
    const database = client.db("pay-me-now");
    const payments = database.collection("payments");
    // Query for a movie that has the title 'Back to the Future'
    return await payments.find({}).toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
