import Link from "next/link";
import Brand from "@/components/Brand";
import { CONFIG } from "@/lib/config";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <Brand size={28} light />
          <nav className="footer__nav" aria-label="Footer">
            <div>
              <a href="#hyrox">Hyrox</a>
              <a href="#kurse">Kurse</a>
              <a href="#pt">Personal Training</a>
              <a href="#rentabell">Rent a Bell</a>
            </div>
            <div>
              <a href={CONFIG.eversports.shopUrl} target="_blank" rel="noopener">Eversports</a>
              <a href={CONFIG.contact.instagram} target="_blank" rel="noopener">Instagram</a>
              <a href={`tel:${CONFIG.contact.phone}`}>{CONFIG.contact.phone}</a>
            </div>
          </nav>
        </div>
        <div className="footer__base">
          <span>
            © {new Date().getFullYear()} {SITE.name} · {SITE.address.street} · {SITE.address.postalCode} {SITE.address.city}
          </span>
          <span>
            <Link href="/impressum">Impressum</Link> · <Link href="/datenschutz">Datenschutz</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
