import dbConnect from "../../../../libs/dbConnect";
import Reservation from "../../../../models/Reservation";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { method } = req;
  const { page = 1, limit = 6 } = req.query;

  await dbConnect();

  if (method != "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Metodo ${method} non accettato!`);
  }

  const reservations = await Reservation.find({
    userId: req.query.userId,
  })
    .sort({ date: "asc" })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Reservation.find({
    userId: req.query.userId,
  }).countDocuments();

  const events = await Promise.all(
    reservations.map(async (reservation) => {
      const temp = await Event.findById(reservation.eventId);
      const obj = { ...temp?._doc, ticketId: reservation._id };
      return obj;
    })
  );

  if (!reservations) {
    return res.status(401).json({
      status: "ERROR",
      error: `Nessuna prenotazione trovata con userID ${userId}`,
    });
  }

  return res.status(200).json({
    status: "OK",
    data: events,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
}
