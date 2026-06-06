const answers = [
  {
    keys: ["cijena", "kosta", "koliko kosta", "kolko kosta", "kostaweb", "cijena web", "price", "ponuda", "naplacujes"],
    reply: "Cijena web stranice ovisi o projektu, broju stranica i funkcionalnostima. Jakov je fleksibilan i pokušava pronaći rješenje koje odgovara budžetu klijenta. Najbolje je poslati poruku s kratkim opisom projekta."
  },
  {
    keys: ["koliko traje", "kolko traje", "rok", "gotovo", "izrada", "brzo", "kad moze biti gotovo"],
    reply: "Demo se često može napraviti kroz 1–2 dana, a cijela web stranica najčešće unutar tjedan dana, ovisno o kompleksnosti projekta."
  },
  {
    keys: ["proces", "suradnja", "kako ide", "kako funkcionira"],
    reply: "Proces je jednostavan: prvo se dogovore potrebe i cilj stranice, zatim Jakov napravi demo, klijent pregleda dizajn, naprave se izmjene ako treba i nakon toga se stranica postavlja online."
  },
  {
    keys: ["placanje", "platiti", "unaprijed", "akontacija", "kartica", "cash", "gotovina"],
    reply: "Plaćanje se dogovara ovisno o projektu. Moguće je plaćanje gotovinom ili karticom, a detalji se dogovore direktno s Jakovom prije početka izrade."
  },
  {
    keys: ["restoran", "cafe", "kafic", "bar", "jelovnik", "meni", "rezervacija stola"],
    reply: "Da, Jakov izrađuje moderne web stranice za restorane, kafiće i barove — s menijem, lokacijom, kontaktom, slikama i jasnim pozivom za rezervaciju ili upit."
  },
  {
    keys: ["apartman", "villa", "vila", "smjestaj", "booking", "airbnb", "kalendar dostupnosti"],
    reply: "Da, Jakov radi web stranice za apartmane, vile i turistički smještaj. Web može sadržavati galeriju, lokaciju, sadržaje, kontakt i poveznice za Booking ili Airbnb."
  },
  {
    keys: ["salon", "frizerski", "barber", "brijacnica"],
    reply: "Da, Jakov izrađuje web stranice za frizerske salone i barbershopove — s uslugama, cjenikom, galerijom radova i kontaktom."
  },
  {
    keys: ["kontakt", "javiti", "poruka", "email", "mail", "telefon"],
    reply: "Jakova možete kontaktirati putem kontakt forme ili kontakt informacija na dnu stranice. Obično odgovara isti dan."
  },
  {
    keys: ["domena", "hosting", "postaviti online", "objaviti stranicu"],
    reply: "Jakov može pomoći oko domene, hostinga i postavljanja stranice online. Prva godina domene može biti uključena, a kasnije je održavanje domene obično oko 20 € godišnje."
  },
  {
    keys: ["seo", "google", "pretraga", "vidljivost"],
    reply: "Da, osnovni SEO je uključen kako bi se stranica bolje prikazivala na Googleu i bila jasnija posjetiteljima."
  },
  {
    keys: ["demo", "primjer", "probna", "vidjeti prije"],
    reply: "Da, demo verzija se može napraviti prije finalne izrade kako bi klijent vidio smjer dizajna i funkcionalnosti."
  },
  {
    keys: ["mobitel", "mobilno", "responsive", "tablet", "desktop"],
    reply: "Da, stranice su prilagođene za mobitel, tablet i računalo kako bi izgledale profesionalno na svim uređajima."
  },
  {
    keys: ["vise jezika", "engleski", "njemacki", "hrvatski", "language"],
    reply: "Da, stranica može imati više jezika, primjerice hrvatski, engleski ili njemački, ovisno o potrebama klijenta."
  },
  {
    keys: ["galerija", "slike", "fotografije"],
    reply: "Da, web stranica može imati galeriju slika, prikaz prostora, proizvoda, hrane, apartmana ili prethodnih radova."
  },
  {
    keys: ["kontakt forma", "forma", "upit"],
    reply: "Da, moguće je dodati kontakt formu kako bi posjetitelji mogli direktno poslati upit sa stranice."
  },
  {
    keys: ["google maps", "maps", "lokacija", "mapa"],
    reply: "Da, moguće je dodati Google Maps lokaciju kako bi vas klijenti lakše pronašli."
  },
  {
    keys: ["odrzavanje", "promjene", "izmjene", "update", "nadogradnje"],
    reply: "Održavanje nije obavezno, ali se može dogovoriti za buduće izmjene, nadogradnje, promjenu slika, teksta ili tehničku podršku."
  },
  {
    keys: ["sam urediti", "sam mijenjati", "uredivati", "editirati"],
    reply: "U nekim slučajevima moguće je omogućiti da klijent kasnije sam uređuje određene dijelove stranice. To ovisi o načinu izrade i dogovoru."
  },
  {
    keys: ["portfolio", "projekti", "radovi", "primjeri radova"],
    reply: "Primjeri radova dostupni su na portfolio stranici. Jakov ima iskustva s web stranicama za apartmane, salone, restorane i lokalne biznise."
  },
  {
    keys: ["hrvatska", "inozemstvo", "strani klijenti", "international"],
    reply: "Jakov može raditi projekte za klijente iz Hrvatske i inozemstva. Komunikacija može biti na hrvatskom, engleskom ili njemačkom jeziku."
  },
  {
    keys: ["ai", "ai asistent", "chatbot", "asistent"],
    reply: "Da, moguće je dodati jednostavnog AI/chat asistenta koji odgovara na česta pitanja posjetitelja i pomaže im pronaći informacije."
  },
  {
    keys: ["aplikacija", "app", "web aplikacija"],
    reply: "Aplikacije su moguće, ali ovise o kompleksnosti projekta. Za takve projekte najbolje je direktno kontaktirati Jakova i objasniti ideju."
  },
  {
    keys: ["slicno", "slicna stranica", "inspiracija", "vidio sam stranicu"],
    reply: "Da, možete poslati primjer stranice koja vam se sviđa, a Jakov može napraviti sličan stil prilagođen vašem brendu i poslovanju."
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
    keys: ["bok", "pozdrav", "hej", "hello", "hi", "dobar dan"],
    reply: "Pozdrav! Ja sam Ask Jakov AI. Možete me pitati o web uslugama, cijenama, rokovima izrade, domeni, hostingu, SEO-u ili kontaktu."
  }
];

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[čć]/g, "c")
    .replace(/[š]/g, "s")
    .replace(/[ž]/g, "z")
    .replace(/[đ]/g, "d")
    .replace(/[.,!?;:()"'`]/g, " ")
    .replace(/webstranica/g, "web stranica")
    .replace(/kostaweb/g, "kosta web")
    .replace(/ewb/g, "web")
    .replace(/wbe/g, "web")
    .replace(/kolikko/g, "koliko")
    .replace(/kolko/g, "koliko")
    .replace(/jel/g, "je li")
    .replace(/\s+/g, " ")
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
    reply: "Za to pitanje najbolje je kontaktirati Jakova direktno putem kontakt forme na dnu stranice. Mogu pomoći s informacijama o cijeni, rokovima, domeni, hostingu, SEO-u, restoranima, apartmanima, salonima, AI asistentu i izradi web stranica."
  });
};
