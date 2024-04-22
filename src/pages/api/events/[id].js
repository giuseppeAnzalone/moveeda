import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      return await getEvent(id, res);
    case "PUT":
      return await updateEvent(id, req, res);
    case "DELETE":
      return await deleteEvent(id, req, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Metodo ${method} non accettato!`);
  }
}

async function getEvent(id, res) {
  try {
    const event = await Event.findById(id);

    if (!event) {
      return res
        .status(404)
        .json({ status: "ERROR", error: `Evento con id ${id} non trovato!` });
    }

    return res.status(200).json({ status: "OK", data: event });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      error: "Errore durante il recupero dell'evento!",
    });
  }
}

async function updateEvent(id, req, res) {
  const { body } = req;
  try {
    const event = await Event.findByIdAndUpdate(id, body, { new: true });

    if (!event) {
      return res
        .status(404)
        .json({ status: "ERROR", error: `Evento con id ${id} non trovato!` });
    }

    return res.status(200).json({ status: "OK", data: event });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      error: "Errore durante l'aggiornamento dell'evento!",
    });
  }
}

async function deleteEvent(id, req, res) {
  try {
    const deletedEvent = await Event.deleteOne({ _id: id });

    if (!deletedEvent) {
      return res
        .status(404)
        .json({ status: "ERROR", error: `Evento cone id ${id} non trovato!` });
    }

    return res.status(204).json({ status: "OK", data: deletedEvent });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      error: "Errore durante l'eliminazione dell'evento!",
    });
  }
}
