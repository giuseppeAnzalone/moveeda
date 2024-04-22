import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      return await getAllEvents(req, res);
    case "POST":
      return await newEvent(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Metodo ${method} non accettato!`);
  }
}

async function getAllEvents(req, res) {
  const { page = 1, limit = 100 } = req.query;

  try {
    const events = await Event.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Event.countDocuments();

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

async function newEvent(req, res) {
  try {
    const {
      organizerId,
      title,
      description,
      date,
      time,
      poster,
      city,
      place,
      address,
      category,
      capacity,
    } = req.body;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !poster ||
      !city ||
      !place ||
      !address ||
      !category ||
      !capacity ||
      !organizerId
    ) {
      return res.status(400).json({
        status: "ERROR",
        error: "Tutti i campi obbligatori devono essere forniti!",
      });
    }

    const newEvent = new Event({
      organizerId,
      title,
      description,
      date,
      time,
      poster,
      city,
      place,
      address,
      category,
      capacity,
    });

    await newEvent.save();

    return res.status(201).json({ status: "OK", data: newEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "ERROR",
      error: "Errore durante la creazione del nuovo evento!",
    });
  }
}
