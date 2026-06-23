/* =========================================================================
   City Athletic Kassel — config.js
   ⚙️  ZENTRALE KONFIGURATION

   Hier trägst du deine Konten und Links ein. Du musst KEINEN anderen Code
   anfassen — nur die Werte zwischen den Anführungszeichen ändern, speichern
   und die Seite neu laden.

   Leerer Wert ("") = die Seite zeigt einen sauberen Platzhalter statt der
   Live-Funktion. Sobald du einen Wert einträgst, wird die Funktion aktiv.
   ========================================================================= */
window.CITY_ATHLETIC_CONFIG = {

  /* --- Eversports · Gruppenkurse (City Athletic) ------------------------
     Eversports bleibt das Buchungssystem für die Studio-Kurse. Damit die
     Buchung auf DEINER Seite passiert (und nicht über den Eversports-
     Marktplatz, der bei Neukunden bis zu 25 % Provision kostet), betten wir
     das Stundenplan-Widget direkt ein.                                      */
  eversports: {
    // Öffentliche Eversports-Shop-Adresse (für Buttons & Fallback-Link):
    shopUrl: "https://www.eversports.de/s/city-athletic-kassel",

    // Stundenplan-Widget-Code aus dem Eversports Manager:
    //   Einstellungen → Widgets (Neu) → Kategorie "Stundenplan" → Code kopieren.
    // Trag hier den Code-Teil ein (in der Widget-URL der Teil nach "/widget/w/").
    // Solange leer (""), erscheint ein Platzhalter mit Link zu Eversports.
    scheduleWidgetCode: "",

    // Optional: Preis-/Tarif-Widget (Mitgliedschaften, 10er-Karte ...):
    pricingWidgetCode: "",
  },

  /* --- rent-a-bell · Kettlebells mieten + Online-Live-Training ----------
     Ersetzt den bisherigen Wix-Shop. Buchung des Live-Trainings läuft über
     Cal.com (kostenlos, kein eigener Server). Bezahl-Pakete über Stripe.    */
  rentABell: {
    // Cal.com-Benutzername, z. B. "christian-tripp" aus cal.com/christian-tripp:
    calcomUser: "",
    // Event-Slug des 45-Min-Trainings bei Cal.com:
    calcomEvent: "rent-a-bell-kettlebelltraining",

    // Stripe Payment Link für die 10er-Karte (29,90 €).
    //   stripe.com → Payment Links → erstellen → Link hier einsetzen.
    tenCardPaymentLink: "",
  },

  /* --- Kontakt / allgemein --------------------------------------------- */
  contact: {
    whatsapp: "4917662906589",                 // ohne "+" und ohne Leerzeichen
    phone: "+4917662906589",
    email: "christian@personal-trainer.pt",
    // Web3Forms Access Key (kostenlos, kein Server) für das Kontaktformular:
    //   web3forms.com → Access Key holen → hier einsetzen.
    web3formsKey: "",
  },
};
