const { ObjectId } = require("@fastify/mongodb");

async function routes(fastify, options) {
  const userBodySchema = {
    type: "object",
    required: ["users"],
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string" },
      phoneNumber: { type: "string" }
    },
  };

  const userRegistrationSchema = {
    body: userBodySchema,
  };

  // Connect to collection to manipulate data
  const users = fastify.mongo.db.collection("users");

  /**
   * [GET] Get one user with _id.
   * @param {String} userId
   */
  fastify.get("/:user", async (req, res) => {
    const { user: id } = req.params;
    // @ts-ignore
    const result = await users.findOne({ _id: ObjectId(id) });

    if (!result) throw new Error("User is not found or registered here.");

    return result;
  });

  /** [DELETE] */
  fastify.delete('/:user', async (req, res) => {
    const { user: id } = req.params;

    // @ts-ignore
    const user = await users.findOne({ _id: ObjectId(id) });

    if (!user) throw new Error('No user with this ID.');

    // @ts-ignore
    const result = await users.deleteOne({ _id: ObjectId(id) });

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
  fastify.post("/users", { userRegistrationSchema }, async (req, res) => {
    const { firstName, lastName, email, phoneNumber } = req.body;

    if (await users.findOne({ email: email })) throw new Error('User with this email already registered.');

    const result = await users.insertOne({
      firstName,
      lastName,
      email,
      phoneNumber
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
