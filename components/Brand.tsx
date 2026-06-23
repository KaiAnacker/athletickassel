import { SITE } from "@/lib/site";

export default function Brand({ size = 30, light = false }: { size?: number; light?: boolean }) {
  return (
    <a className={"brand" + (light ? " brand--light" : "")} href="#top" aria-label="City Athletic Kassel, zur Startseite">
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
          <rect x="4" y="4" width="40" height="40" stroke="currentColor" strokeWidth="2" />
          <line x1="24" y1="11" x2="24" y2="37" stroke="currentColor" strokeWidth="2" />
          <line x1="11" y1="24" x2="37" y2="24" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="24" r="4" fill="var(--orange)" />
        </svg>
      </span>
      <span className="brand__type">
        <span className="brand__name">{light ? "CITY ATHLETIC KASSEL" : SITE.brandTop}</span>
        <span className="brand__sub">{light ? "CHRISTIAN TRIPP · PERSONAL & HYROX" : SITE.brandSub}</span>
      </span>
    </a>
  );
}
