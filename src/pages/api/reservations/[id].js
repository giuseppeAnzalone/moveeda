import dbConnect from "../../../../libs/dbConnect";
import Reservation from "../../../../models/Reservation";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      return await getReservation(id, res);
    case "PUT":
      return await updateReservation(id, req, res);
    case "DELETE":
      return await deleteReservation(id, req, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Metodo ${method} non accettato!`);
  }
}

async function getReservation(id, res) {
  try {
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({
        status: "ERROR",
        error: `Prenotazione con id ${id} non trovata!`,
      });
    }

    return res.status(200).json({ status: "OK", data: reservation });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      error: "Errore durante il recupero della prenotazione!",
    });
  }
}

async function updateReservation(id, req, res) {
  const { body } = req;

  try {
    const reservation = await Reservation.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!removeEventListenereservation) {
      return res.status(404).json({
        status: "ERROR",
        error: `Prenotazione con id ${id} non trovata!`,
      });
    }

    res.status(200).json({ status: "OK", data: reservation });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      error: "Errore durante l'aggiornamento della prenotazione!",
    });
  }
}

async function deleteReservation(id, req, res) {
  try {
    const deleteReservation = await Reservation.deleteOne({ _id: id });

    if (!deleteReservation) {
      return res.status(404).json({
        status: "ERROR",
        error: `Prenotazione con did ${id} non trovata!`,
      });
    }

    return res.status(204).json({ status: "OK", data: deleteReservation });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      error: "Errore durante l'eliminazione della prenotazione!",
    });
  }
}
