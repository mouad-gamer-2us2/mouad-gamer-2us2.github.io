import { useT } from "../i18n/Language";
import { asset } from "./UI";
export default function FacetPortrait({ src, className, label, side }) {
  const t = useT();

  return (
    <div
      className={`${className} facet-effect-${side}`}
      style={{ "--portrait-mask": `url("${asset(src)}")` }}
    >
      <img
        src={asset(src)}
        alt={t(label)}
        width="1122"
        height="1402"
        loading="lazy"
      />
      <span className="facet-scan" aria-hidden="true" />
    </div>
  );
}
