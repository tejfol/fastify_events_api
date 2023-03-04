const { ObjectId } = require("@fastify/mongodb");

async function routes(fastify, options) {
  // Connect to collection to manipulate data
  const users = fastify.mongo.db.collection("users");

  /**
   * [GET] Get one user with _id.
   * @param {String} userId
   */
  fastify.get("/:user", async (req, res) => {
    const { user: id } = req.params;

    const result = await users.findOne({ _id: new ObjectId(id) });

    if (!result) throw new Error("User is not found or registered here.");

    return result;
  });

  // [POST] Create an event for the user.
  fastify.post('/:user', async (req, res) => {
    const { user: id } = req.params;
    const { title, description, startDate, endDate } = req.body;

    const result = await users.updateOne({ _id: new ObjectId(id) }, { $push: { events: { "title": title, "description": description, "startDate": startDate, "endDate": endDate, 'createdAt': new Date() } } });

    if (!result) throw new Error("User is not found or registered here.");

    return result;
  })

  /** [DELETE] Deletes a user with spec id */
  fastify.delete('/:user', async (req, res) => {
    const { user: id } = req.params;

    const user = await users.findOne({ _id: new ObjectId(id) });

    if (!user) throw new Error('No user with this ID.');

    const result = await users.deleteOne({ _id: new ObjectId(id) });

    return result;
  })

  /**
   * [POST] Register a new user
   * 
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} email
   * @param {String} phoneNumber 
   */
  fastify.post("/users", async (req, res) => {
    const { firstName, lastName, email, phoneNumber } = req.body;

    if (await users.findOne({ email: email })) throw new Error('User with this email already registered.');

    const result = await users.insertOne({
      firstName,
      lastName,
      email,
      phoneNumber,
      events: []
    });

    return result;
  });



  /**
   * [GET] Home page list with 10 registered users.
   */
  fastify.get("/", async (req, res) => {
    const result = await users.find({}).sort({ $natural: -1 }).limit(10).toArray();

    if (!result) throw new Error('Users collection is empty.')

    return result;
  });


}
module.exports = routes;
