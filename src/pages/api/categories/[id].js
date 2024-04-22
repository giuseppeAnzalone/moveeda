import dbConnect from "../../../../libs/dbConnect";
import Category from "../../../../models/Category";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      return await getCategory(id, res);
    case "PUT":
      return await updateCategory(id, body, res);
    case "DELETE":
      return await deleteCategory(id, body, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Metodo ${method} non accettato!`);
  }
}

async function getCategory(id, res) {
  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        status: "ERROR",
        error: `La categoria con id ${id} non è stato trovato!`,
      });
    }

    return res.status(200).json({ status: "OK", data: category });
  } catch (error) {
    return res.status(400).json({
      success: "ERROR",
      error: "Errore durante il recupero della categoria!",
    });
  }
}

async function updateCategory(id, body, res) {
  try {
    const category = await Category.findByIdAndUpdate(id, body, { new: true });

    if (!category) {
      return res.status(404).json({
        status: "ERROR",
        error: `L'elemento con id ${id} non è stato trovato!`,
      });
    }

    res.status(200).json({ status: "OK", data: category });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      error: "Errore durante la modifica della categoria!",
    });
  }
}

async function deleteCategory(id, res) {
  try {
    const deletedCategory = await Category.deleteOne({ _id: id });

    if (!deletedCategory) {
      return res.status(404).json({
        status: "OK",
        error: `L'elemento con id ${id} non è stato trovato!`,
      });
    }
    res.status(204).json({ status: "OK", data: deletedCategory });
  } catch (error) {
    res
      .status(400)
      .json({ status: "ERROR", error: "Errore durante l'eliminazione!" });
  }
}
