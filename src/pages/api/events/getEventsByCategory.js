import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { method } = req;
  const { page = 1, limit = 6, category } = req.query;
  await dbConnect();

  if (method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Metodo ${method} non accettato!`);
  }

  try {
    const events = await Event.find({ category: category })
      .sort({ date: "asc" })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Event.find({ category: category }).countDocuments();

    return res.json({
      status: "OK",
      data: events,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      error: "Errore durante il recupero degli eventi!",
    });
  }
}
