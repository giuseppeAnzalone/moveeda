import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      return await getAllEvents(req, res);
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Metodo ${method} non accettato!`);
  }

  async function getAllEvents(req, res) {
    const { page = 1, limit = 6, ...remainingParams } = req.query;

    try {
      const events = await Event.find({ $and: [remainingParams] })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await Event.find({
        $and: [remainingParams],
      }).countDocuments();

      return res.json({
        data: events,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        error: "Errore durante il recupero degli eventi!",
      });
    }
  }
}
