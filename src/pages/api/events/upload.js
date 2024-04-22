import path from "path";
import fs from "fs/promises";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req, saveLocally) => {
  let options = {};

  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/events");
    options.filename = (name, ext, path, form) => {
      return path.originalFilename;
    };
  }
  const form = formidable(options);

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      const uploadedFile = files.file[0];

      if (uploadedFile) {
        resolve({ fields, files, filename: uploadedFile.originalFilename });
      } else {
        resolve({ fields, files, filename: null });
      }
    });
  });
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/events"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/events"));
  }

  const { filename } = await readFile(req, true);
  res.json({ status: "OK", filename });
}
