/* =========================================================================
   City Athletic Kassel — zentrale Konfiguration für externe Dienste.

   Hier trägst du Konten/Links ein. Leerer Wert ("") = die Seite zeigt einen
   sauberen Platzhalter/Fallback statt der Live-Funktion. Sobald ein Wert
   eingetragen ist, wird die Funktion aktiv. Nach dem Ändern: speichern.
   ========================================================================= */

export const CONFIG = {
  /* --- Eversports · Gruppenkurse (City Athletic) ---------------------- */
  eversports: {
    // Öffentliche Eversports-Shop-Adresse (für Buttons & Fallback-Link):
    shopUrl: "https://www.eversports.de/s/city-athletic-kassel",
    // Stundenplan-Widget-Code aus dem Eversports Manager
    //   (Einstellungen → Widgets (Neu) → "Stundenplan" → Code aus der URL nach /widget/w/).
    // Leer ("") → Platzhalter mit Link statt Live-Plan.
    scheduleWidgetCode: "",
    // Optional: Preis-/Tarif-Widget (Mitgliedschaften):
    pricingWidgetCode: "",
  },

  /* --- Personal Training · oneathlete --------------------------------- */
  pt: {
    // oneathlete-Plattform (wird als beworbene Mess-/Tracking-Plattform verlinkt):
    oneathleteUrl: "https://www.oneathlete.de",
  },

  /* --- rent-a-bell · Kettlebells mieten + Online-Live-Training -------- */
  rentABell: {
    // Cal.com-Benutzername, z. B. "christian-tripp" aus cal.com/christian-tripp:
    calcomUser: "",
    calcomEvent: "rent-a-bell-kettlebelltraining",
    // Stripe Payment Link für die 10er-Karte (29,90 €):
    tenCardPaymentLink: "",
  },

  /* --- Kontakt / allgemein ------------------------------------------- */
  contact: {
    whatsapp: "4917662906589", // ohne "+" und ohne Leerzeichen
    phone: "+4917662906589",
    email: "christian@personal-trainer.pt",
    instagram: "https://www.instagram.com/cityathletickassel/",
    // Web3Forms Access Key (kostenlos, kein Server) für das Kontaktformular:
    //   web3forms.com → Access Key holen → hier einsetzen.
    web3formsKey: "",
  },
};
