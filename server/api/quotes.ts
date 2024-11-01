import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

interface Quote {
  author: string;
  quote: string;
}

export default defineEventHandler(async (event) => {
  const filePath = path.join(process.cwd(), "public/quotes.csv"); // Passe den Pfad zur CSV-Datei an

  const quotes: Quote[] = await new Promise((resolve, reject) => {
    const quotes: Quote[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        quotes.push({ author: data.Author, quote: data.Quote });
      })
      .on("end", () => resolve(quotes))
      .on("error", (error) => reject(error));
  });

  // Gibt ein zufälliges Zitat mit Autor zurück oder null, wenn keine Zitate vorhanden sind
  return quotes.length > 0
    ? quotes[Math.floor(Math.random() * quotes.length)]
    : null;
});
