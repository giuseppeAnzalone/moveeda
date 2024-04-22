import dbConnect from "../../../../libs/dbConnect";
import User from "../../../../models/User";
import bycrpt from "bcryptjs";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      return await getAllUsers(req, res);
    case "POST":
      return await newUser(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Metodo ${method} non accettato!`);
  }
}

async function getAllUsers(req, res) {
  const { page = 1, limit = 100 } = req.query;

  try {
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments();

    return res.json({
      data: users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      error: "Errore durante il recupero degli utenti!",
    });
  }
}

async function newUser(req, res) {
  try {
    const {
      name,
      surname,
      type,
      businessName,
      imageProfile,
      city,
      address,
      phoneNumber,
      username,
      email,
      password,
    } = req.body;

    if (
      !name ||
      !surname ||
      !type ||
      !imageProfile ||
      !city ||
      !address ||
      !phoneNumber ||
      !username ||
      !email ||
      !password
    ) {
      return res.status(405).json({
        status: "ERROR",
        error: "Dati mancanti durante l'inserimento dell'utente!",
      });
    }

    const hashedPassword = await bycrpt.hash(password, 10);

    const user = new User({
      name,
      surname,
      type,
      imageProfile,
      city,
      address,
      phoneNumber,
      username,
      email,
      password: hashedPassword,
    });

    if (type === "business") {
      user.businessName = businessName;
    }

    const newUser = await user.save();
    if (!newUser) throw Error;

    return res.status(200).json({ status: "OK", message: "Utente inserito!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "ERROR", error: "Errore durante la registrazione" });
  }
}
