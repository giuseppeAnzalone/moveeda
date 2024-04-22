import dbConnect from "../../../../libs/dbConnect";
import User from "../../../../models/User";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      return await getUser(id, res);
    case "PUT":
      return await updateUser(id, req, res);
    case "DELETE":
      return await deleteUser(id, req, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Metodo ${method} non accettato!`);
  }
}

async function getUser(id, res) {
  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "ERROR", error: `Utente con id ${id} non trovato!` });
    }

    return res.status(200).json({ status: "OK", data: user });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      error: "Errore durante il recupero dell'utente!",
    });
  }
}

async function updateUser(id, req, res) {
  const { body } = req;

  try {
    const user = await User.findByIdAndUpdate(id, body, { new: true });

    if (!user) {
      return res
        .status(404)
        .json({ status: "ERROR", error: `Utente con id ${id} non trovato!` });
    }

    return res.status(200).json({ status: "OK", data: user });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      error: "Errore durante il recupero dell'utente!",
    });
  }
}

async function deleteUser(id, req, res) {
  try {
    const deleteUser = await User.deleteOne({ _id: id });

    if (!deleteUser) {
      return res
        .status(404)
        .json({ status: "ERROR", error: `Utente con id ${id} non trovato!` });
    }

    res.status(204).json({ status: "OK", data: deleteUser });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      error: "Errore dutante l'eliminazione dell'account!",
    });
  }
}
