const answers = [
  {
    intent: "privacy",
    keys: ["prezime", "prezivas", "preziva", "puno ime", "kako se zoves", "tko si", "identitet", "osobni podaci", "linkedin", "github", "profil", "drustveni profil"],
    reply: "Ne dijelim osobne podatke, prezime ni privatne profile. Za projektne upite možete koristiti kontakt formu ili email adresu na stranici."
  },
  {
    intent: "price",
    keys: ["cijena", "kosta", "koliko kosta", "kolko kosta", "price", "ponuda", "naplacujes", "koliko bi platio", "koliko novaca", "budzet", "budget", "paket", "paketi"],
    reply: "Cijena web stranice ovisi o projektu, broju stranica i funkcionalnostima. Najbolje je poslati poruku s kratkim opisom projekta kako biste dobili konkretniju ponudu."
  },
  {
    intent: "time",
    keys: ["koliko traje", "kolko traje", "rok", "gotovo", "izrada", "brzo", "kad moze biti gotovo", "koliko vremena"],
    reply: "Demo se često može napraviti kroz 1–2 dana, a cijela web stranica najčešće unutar tjedan dana, ovisno o kompleksnosti projekta."
  },
  {
    intent: "process",
    keys: ["proces", "suradnja", "kako ide", "kako funkcionira", "kako radite", "kako pocinjemo"],
    reply: "Proces je jednostavan: prvo se dogovore potrebe i cilj stranice, zatim se napravi demo, klijent pregleda dizajn, naprave se izmjene ako treba i nakon toga se stranica postavlja online."
  },
  {
    intent: "payment",
    keys: ["placanje", "platiti", "unaprijed", "akontacija", "kartica", "cash", "gotovina"],
    reply: "Plaćanje se dogovara ovisno o projektu. Moguće je plaćanje gotovinom ili karticom, a detalji se dogovore direktno prije početka izrade."
  },
  {
    intent: "restaurant",
    keys: ["restoran", "cafe", "kafic", "bar", "jelovnik", "meni", "rezervacija stola", "hrana", "pice", "dostava"],
    reply: "Da, izrađuju se moderne web stranice za restorane, kafiće i barove — s menijem, lokacijom, kontaktom, slikama i jasnim pozivom za rezervaciju ili upit."
  },
  {
    intent: "apartment",
    keys: ["apartman", "villa", "vila", "smjestaj", "booking", "airbnb", "kalendar dostupnosti", "turizam", "sobe"],
    reply: "Da, izrađuju se web stranice za apartmane, vile i turistički smještaj. Web može sadržavati galeriju, lokaciju, sadržaje, kontakt i poveznice za Booking ili Airbnb."
  },
  {
    intent: "salon",
    keys: ["salon", "frizerski", "barber", "brijacnica", "frizer", "nokti", "kozmeticki", "termin", "rezervacija termina"],
    reply: "Da, izrađuju se web stranice za frizerske salone, barbershopove i slične lokalne usluge — s uslugama, cjenikom, galerijom radova i kontaktom."
  },
  {
    intent: "contact",
    keys: ["kontakt", "javiti", "poruka", "email", "mail", "telefon", "broj", "kako se javiti", "posalji", "upit"],
    reply: "Možete se javiti putem kontakt forme ili email adrese webdesignjakov@gmail.com. Odgovor obično stiže isti dan."
  },
  {
    intent: "domain_hosting",
    keys: ["domena", "hosting", "postaviti online", "objaviti stranicu", "vercel", "netlify"],
    reply: "Moguća je pomoć oko domene, hostinga i postavljanja stranice online. Prva godina domene može biti uključena, a kasnije je održavanje domene obično oko 20 € godišnje."
  },
  {
    intent: "seo",
    keys: ["seo", "google", "pretraga", "vidljivost", "rangiranje", "google pretraga", "meta", "search"],
    reply: "Da, osnovni SEO je uključen kako bi se stranica bolje prikazivala na Googleu i bila jasnija posjetiteljima."
  },
  {
    intent: "redesign",
    keys: ["redesign", "redizajn", "stara stranica", "postojeca stranica", "modernizacija", "popraviti stranicu"],
    reply: "Da, moguć je redesign postojeće stranice. Najbolje je poslati link postojeće stranice i ukratko napisati što želite poboljšati."
  },
  {
    intent: "landing",
    keys: ["landing", "landing page", "one page", "jedna stranica", "prodajna stranica", "kampanja"],
    reply: "Da, moguće je napraviti landing page za uslugu, proizvod, oglasnu kampanju ili brzu online prezentaciju."
  },
  {
    intent: "content",
    keys: ["tekst", "copy", "copywriting", "sadrzaj", "pisanje teksta", "nemam tekst", "slike", "fotografije"],
    reply: "Ako nemate spreman tekst ili slike, može se pomoći oko strukture sadržaja, prijedloga teksta i odabira vizuala koji odgovaraju projektu."
  },
  {
    intent: "security",
    keys: ["sigurnost", "ssl", "https", "backup", "zastita", "brzina", "performance", "optimizacija"],
    reply: "Kod izrade se pazi na brzinu, responzivnost, osnovnu sigurnost i tehnički urednu strukturu stranice. SSL i hosting ovise o odabranom načinu objave."
  },
  {
    intent: "demo",
    keys: ["demo", "primjer", "probna", "vidjeti prije", "testna verzija"],
    reply: "Da, demo verzija se može napraviti prije finalne izrade kako bi klijent vidio smjer dizajna i funkcionalnosti."
  },
  {
    intent: "responsive",
    keys: ["mobitel", "mobilno", "responsive", "tablet", "desktop", "racunalo", "laptop"],
    reply: "Da, stranice su prilagođene za mobitel, tablet i računalo kako bi izgledale profesionalno na svim uređajima."
  },
  {
    intent: "languages",
    keys: ["vise jezika", "engleski", "njemacki", "hrvatski", "language", "strani jezik", "multilingual"],
    reply: "Da, stranica može imati više jezika, primjerice hrvatski, engleski ili njemački, ovisno o potrebama klijenta."
  },
  {
    intent: "gallery",
    keys: ["galerija", "slike", "fotografije", "photo", "photos", "slika"],
    reply: "Da, web stranica može imati galeriju slika, prikaz prostora, proizvoda, hrane, apartmana ili prethodnih radova."
  },
  {
    intent: "form",
    keys: ["kontakt forma", "forma", "upit", "posalji upit", "obrazac"],
    reply: "Da, moguće je dodati kontakt formu kako bi posjetitelji mogli direktno poslati upit sa stranice."
  },
  {
    intent: "maps",
    keys: ["google maps", "maps", "lokacija", "mapa", "adresa", "gdje se nalazi"],
    reply: "Da, moguće je dodati Google Maps lokaciju kako bi vas klijenti lakše pronašli."
  },
  {
    intent: "maintenance",
    keys: ["odrzavanje", "promjene", "izmjene", "update", "nadogradnje", "kasnije promjene"],
    reply: "Održavanje nije obavezno, ali se može dogovoriti za buduće izmjene, nadogradnje, promjenu slika, teksta ili tehničku podršku."
  },
  {
    intent: "editing",
    keys: ["sam urediti", "sam mijenjati", "uredivati", "editirati", "mijenjati tekst", "mijenjati slike"],
    reply: "U nekim slučajevima moguće je omogućiti da klijent kasnije sam uređuje određene dijelove stranice. To ovisi o načinu izrade i dogovoru."
  },
  {
    intent: "portfolio",
    keys: ["portfolio", "projekti", "radovi", "primjeri radova", "sto si radio", "imas radove"],
    reply: "Primjeri radova dostupni su na portfolio stranici. Fokus je na web stranicama za apartmane, salone, restorane i lokalne biznise."
  },
  {
    intent: "international",
    keys: ["hrvatska", "inozemstvo", "strani klijenti", "international", "engleski klijenti"],
    reply: "Mogući su projekti za klijente iz Hrvatske i inozemstva. Komunikacija može biti na hrvatskom, engleskom ili njemačkom jeziku."
  },
  {
    intent: "ai",
    keys: ["ai", "ai asistent", "chatbot", "asistent", "umjetna inteligencija"],
    reply: "Da, moguće je dodati jednostavnog AI/chat asistenta koji odgovara na česta pitanja posjetitelja i pomaže im pronaći informacije."
  },
  {
    intent: "app",
    keys: ["aplikacija", "app", "web aplikacija", "platforma", "sustav"],
    reply: "Aplikacije su moguće, ali ovise o kompleksnosti projekta. Za takve projekte najbolje je poslati poruku i ukratko objasniti ideju."
  },
  {
    intent: "similar",
    keys: ["slicno", "slicna stranica", "inspiracija", "vidio sam stranicu", "moze kao", "kao ova stranica"],
    reply: "Da, možete poslati primjer stranice koja vam se sviđa, a dizajn se može prilagoditi vašem brendu i poslovanju."
  },
  {
    intent: "logo",
    keys: ["logo", "logotip"],
    reply: "Izrada logotipa trenutno nije u ponudi, ali postojeći logo se može uklopiti u moderan web dizajn."
  },
  {
    intent: "instagram",
    keys: ["instagram", "instagramu", "insta", "drustvene mreze"],
    reply: "Instagram je koristan, ali web stranica daje profesionalniji dojam, lakše se pronalazi na Googleu i daje klijentima jedno jasno mjesto za sve informacije."
  },
  {
    intent: "hello",
    keys: ["bok", "pozdrav", "hej", "hello", "hi", "dobar dan", "cao"],
    reply: "Pozdrav! Ja sam Portfolio AI. Možete me pitati o web uslugama, cijenama, rokovima izrade, domeni, hostingu, SEO-u ili kontaktu."
  }
];

const blockedTerms = [
  /linkedin\.com/gi,
  /github\.com/gi
];

const privacyReply = "Ne dijelim osobne podatke, prezime ni privatne profile. Za projektne upite možete koristiti kontakt formu ili email adresu na stranici.";

function sanitizeReply(reply) {
  let clean = String(reply || "");

  for (const term of blockedTerms) {
    clean = clean.replace(term, "[privatno]");
  }

  return clean;
}

function isPrivacyQuestion(message) {
  const msg = normalize(message);

  return [
    "preziv",
    "puno ime",
    "osobni podaci",
    "identitet",
    "linkedin",
    "github",
    "privatni profil",
    "profil"
  ].some((term) => msg.includes(term));
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[čć]/g, "c")
    .replace(/[š]/g, "s")
    .replace(/[ž]/g, "z")
    .replace(/[đ]/g, "d")
    .replace(/[.,!?;:()"'`/\\[\]{}]/g, " ")
    .replace(/\bwebstranica\b/g, "web stranica")
    .replace(/kostaweb/g, "kosta web")
    .replace(/ewb/g, "web")
    .replace(/wbe/g, "web")
    .replace(/bokking/g, "booking")
    .replace(/bookng/g, "booking")
    .replace(/airbn\b/g, "airbnb")
    .replace(/apartmnae/g, "apartmane")
    .replace(/aprtman/g, "apartman")
    .replace(/restroan/g, "restoran")
    .replace(/kolikko/g, "koliko")
    .replace(/kolko/g, "koliko")
    .replace(/\bjel\b/g, "je li")
    .replace(/\bjeli\b/g, "je li")
    .replace(/\s+/g, " ")
    .trim();
}

function words(text) {
  return normalize(text).split(" ").filter(Boolean);
}

function levenshtein(a, b) {
  a = normalize(a);
  b = normalize(b);

  if (!a || !b) return Math.max(a.length, b.length);
  if (a === b) return 0;

  const matrix = Array.from({ length: a.length + 1 }, () => []);

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] =
        a[i - 1] === b[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
    }
  }

  return matrix[a.length][b.length];
}

function wordSimilarity(a, b) {
  a = normalize(a);
  b = normalize(b);

  if (!a || !b) return 0;
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.92;

  const distance = levenshtein(a, b);
  return 1 - distance / Math.max(a.length, b.length);
}

function scoreKey(message, key) {
  const msg = normalize(message);
  const k = normalize(key);

  if (!msg || !k) return 0;

  if (msg.includes(k)) return 1;

  const msgWords = words(msg);
  const keyWords = words(k);

  let total = 0;

  for (const keyWord of keyWords) {
    let bestWordScore = 0;

    for (const msgWord of msgWords) {
      const score = wordSimilarity(msgWord, keyWord);
      if (score > bestWordScore) bestWordScore = score;
    }

    total += bestWordScore;
  }

  return total / keyWords.length;
}

function findBestAnswer(message) {
  let bestAnswer = null;
  let bestScore = 0;

  for (const item of answers) {
    for (const key of item.keys) {
      const score = scoreKey(message, key);

      if (score > bestScore) {
        bestScore = score;
        bestAnswer = item;
      }
    }
  }

  return bestScore >= 0.62 ? bestAnswer : null;
}

function humanize(reply) {
  const starts = [
    "Da, naravno. ",
    "Može. ",
    "Naravno. ",
    ""
  ];

  const start = starts[Math.floor(Math.random() * starts.length)];

  if (reply.startsWith("Da,") || reply.startsWith("Pozdrav") || reply.startsWith("Cijena")) {
    return reply;
  }

  return start + reply;
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

  if (text.length > 500) {
    return res.status(200).json({ reply: "Poruka je preduga. Molim skratite pitanje na najvažnije detalje." });
  }

  if (isPrivacyQuestion(text)) {
    return res.status(200).json({ reply: privacyReply });
  }

  const found = findBestAnswer(msg);

  if (found) {
    return res.status(200).json({
      reply: sanitizeReply(humanize(found.reply))
    });
  }

  return res.status(200).json({
    reply: sanitizeReply("Mislim da je to najbolje dogovoriti kroz kontakt formu na dnu stranice. Mogu vam pomoći s pitanjima o cijeni, rokovima, domeni, hostingu, SEO-u, restoranima, apartmanima, salonima, landing pageu, redesignu, AI asistentu i izradi web stranica.")
  });
};
