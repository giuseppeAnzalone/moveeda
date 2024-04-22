import dbConnect from "../../../../libs/dbConnect";
import Event from "../../../../models/Event";

export default async function handler(req, res) {
    const query = req.query.query; 
    const method = req.query.method; 

    console.log("Parametri di query:", query, method);
     await dbConnect();
     

  try {
    if (method && method.toUpperCase()  !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Metodo ${method} non accettato!`);}


    if (query.length === 0) {
                return res.status(400).json({ status: "KO", message: "Nessun termine di ricerca fornito" });
              }
              
    const regQuery = new RegExp(query.split(" ").join("|"), "i");

    const events = await 
    Event.find({
        $or: [
            { title: { $in: regQuery } },
            { description: { $in: regQuery } },
            { city: { $in: regQuery } },
            { place: { $in: regQuery } },
            { address: { $in: regQuery } },
            { category: { $in: regQuery } },
             ],
        });
        return res.status(200).json({ status: "OK", data: events });    
    } catch (error) {
    return res.status(500).json({ status: "KO", message: "Errore durane la richiesta" });
     }
  }
