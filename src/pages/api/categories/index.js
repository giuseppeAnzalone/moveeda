import dbConnect from "../../../../libs/dbConnect";
import Category from "../../../../models/Category";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      return await getAllCategories(req, res);
    case "POST":
      return await newCategory(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Metodo ${method} non accettato!`);
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    return res.status(200).json({ status: "OK", data: categories });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      error: "Errore durante il recupero delle categorie!",
    });
  }
}

async function newCategory(req, res) {
  try {
    const { name, background, color } = req.body;

    if (!name)
      return res
        .status(400)
        .json("I campi name e background sono obbligatorio!");

    const newCategory = new Category({
      name,
      background,
      color,
    });

    await newCategory.save();
    res.status(201).json({ status: "OK", data: newCategory });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      error: "Errore durante l'inserimento della categoria!",
    });
  }
}
