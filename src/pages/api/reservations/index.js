import dbConnect from "../../../../libs/dbConnect";
import Reservation from "../../../../models/Reservation";

export default async function handler(req, res) {
  const { method, query } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      return await getAllReservation(req, res);
    case "POST":
      return await newReservation(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Metodo ${method} non accettato!`);
  }
}

async function getAllReservation(req, res) {
  const { page = 1, limit = 60 } = req.query;

  try {
    const reservation = await Reservation.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Reservation.countDocuments();

    return res.json({
      data: reservation,
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

async function newReservation(req, res) {
  try {
    const { userId, eventId, ticketsBooked } = req.body;

    if (!ticketsBooked) {
      return res.status(400).json({
        status: "ERROR",
        error: "Inserisci il numero di prenotazioni",
      });
    }

    const newReservation = new Reservation({ userId, eventId, ticketsBooked });

    await newReservation.save();

    return res.status(201).json({ newReservation });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      error: "Errore durante la creazione della nuova prenotazione!",
    });
  }
}
