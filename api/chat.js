const answers = [
  {
    keys: ["cijena", "košta", "kosta", "price", "naplaćuješ", "naplacujes"],
    reply: "Cijena web stranice ovisi o projektu, broju stranica i funkcionalnostima. Jakov je fleksibilan i pokušava pronaći rješenje koje odgovara budžetu klijenta. Najbolje je poslati poruku s kratkim opisom projekta."
  },
  {
    keys: ["koliko traje", "rok", "gotovo", "izrada", "brzo"],
    reply: "Demo se često može napraviti kroz 1–2 dana, a cijela web stranica najčešće unutar tjedan dana, ovisno o kompleksnosti projekta."
  },
  {
    keys: ["restoran", "cafe", "kafić", "kafic", "bar"],
    reply: "Da, Jakov izrađuje moderne web stranice za restorane, kafiće i barove — s menijem, lokacijom, kontaktom, slikama i jasnim pozivom za rezervaciju ili upit."
  },
  {
    keys: ["apartman", "villa", "vila", "smještaj", "smjestaj", "booking"],
    reply: "Da, Jakov radi web stranice za apartmane, vile i turistički smještaj. Web može sadržavati galeriju, lokaciju, sadržaje, kontakt i poveznice za rezervaciju."
  },
  {
    keys: ["kontakt", "javiti", "poruka", "email", "mail", "telefon"],
    reply: "Jakova možete kontaktirati putem kontakt forme ili kontakt informacija na dnu stranice. Obično odgovara isti dan."
  },
  {
    keys: ["domena", "hosting"],
    reply: "Jakov može pomoći oko domene, hostinga i postavljanja stranice online. Prva godina domene može biti uključena, a kasnije je održavanje domene obično oko 20 € godišnje."
  },
  {
    keys: ["seo", "google", "pretraga"],
    reply: "Da, osnovni SEO je uključen kako bi se stranica bolje prikazivala na Googleu i bila jasnija posjetiteljima."
  },
  {
    keys: ["demo", "primjer", "probna"],
    reply: "Da, demo verzija se može napraviti prije finalne izrade kako bi klijent vidio smjer dizajna i funkcionalnosti."
  },
  {
    keys: ["logo", "logotip"],
    reply: "Jakov trenutno ne nudi izradu logotipa, ali može uklopiti postojeći logo u moderan web dizajn."
  },
  {
    keys: ["instagram", "instagramu"],
    reply: "Instagram je koristan, ali web stranica daje profesionalniji dojam, lakše se pronalazi na Googleu i daje klijentima jedno jasno mjesto za sve informacije."
  },
  {
    keys: ["bok", "pozdrav", "hej", "hello", "hi"],
    reply: "Pozdrav! Ja sam Ask Jakov AI. Možete me pitati o web uslugama, cijenama, rokovima izrade, domeni, hostingu ili kontaktu."
  }
];

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[čć]/g, "c")
    .replace(/[š]/g, "s")
    .replace(/[ž]/g, "z")
    .replace(/[đ]/g, "d")
    .trim();
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Metoda nije dopuštena." });
  }

  const messages = req.body?.messages || [];
  const last = messages[messages.length - 1];
  const text = last?.parts?.[0]?.text || "";
  const msg = normalize(text);

  if (!msg) {
    return res.status(200).json({ reply: "Poruka ne može biti prazna." });
  }

  const found = answers.find(item =>
    item.keys.some(key => msg.includes(normalize(key)))
  );

  if (found) {
    return res.status(200).json({ reply: found.reply });
  }

  return res.status(200).json({
    reply: "Za to pitanje najbolje je kontaktirati Jakova direktno putem kontakt forme na dnu stranice. Mogu pomoći s informacijama o cijeni, rokovima, domeni, hostingu, SEO-u i vrstama web stranica koje Jakov izrađuje."
  });
};
