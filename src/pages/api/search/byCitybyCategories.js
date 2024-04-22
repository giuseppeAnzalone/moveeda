import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { query, method } = req.query;

  await dbConnect();

  try {
    if (method && method.toUpperCase() !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Metodo ${method} non accettato!`);
    }

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ status: "KO", message: "Nessun termine di ricerca fornito" });
    }

    const searchQuery = {};

    if (query) {
      searchQuery.city = { $regex: query, $options: "i" };
    }

    if (req.query.category) { 
      const selectedCategory = req.query.category;
      searchQuery.category = selectedCategory;
    }

    const events = await Event.find(searchQuery);

    return res.status(200).json({ status: "OK", data: events });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "KO", message: "Errore durante la richiesta" });
  }
}
