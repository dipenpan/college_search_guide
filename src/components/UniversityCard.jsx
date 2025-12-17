import React from "react";
import { Link } from "react-router-dom";

function summarize(uni) {
  const bits = [];
  if (uni.region) bits.push(uni.region);
  if (uni.ownership) bits.push(uni.ownership);
  if (uni.admissionRate != null) bits.push(`${Math.round(uni.admissionRate * 100)}% admit`);
  if (uni.avgCost != null) bits.push(`~$${uni.avgCost.toLocaleString()} avg cost`);
  return bits.join(" • ");
}

function FavButton({ id, isActive, onToggle }) {
  return (
    <button
      aria-label={isActive ? "Remove favorite" : "Save to favorites"}
      className={`fav ${isActive ? "active" : ""}`}
      onClick={() => onToggle(id)}
      title={isActive ? "Remove from favorites" : "Save to favorites"}
    >
      {isActive ? "★" : "☆"}
    </button>
  );
}

export default function UniversityCard({ uni, isFavorite, onToggleFavorite }) {
  return (
    <article className="card">
      <div className="card-pad" style={{ display: "grid", gap: 8 }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>
            <Link to={`/u/${uni.id}`} className="nav-link" style={{ padding: 0 }}>{uni.name}</Link>
          </h3>
          <FavButton id={uni.id} isActive={isFavorite} onToggle={onToggleFavorite} />
        </header>
        <div className="meta">{uni.city}, {uni.state} · {uni.ownership}</div>
        <div className="meta">{summarize(uni)}</div>
        <div className="grid cols-3">
          <div className="kpi"><strong>{uni.admissionRate != null ? `${Math.round(uni.admissionRate*100)}%` : "—"}</strong><span>Acceptance</span></div>
          <div className="kpi"><strong>{uni.avgCost != null ? `$${uni.avgCost.toLocaleString()}` : "—"}</strong><span>Avg. Net Cost</span></div>
          <div className="kpi"><strong>{uni.satAvg ?? "—"}</strong><span>SAT Avg</span></div>
        </div>
        <div className="tags" style={{ marginTop:6 }}>
          {uni.medianEarnings && <span className="tag">Earnings: ${uni.medianEarnings.toLocaleString()}</span>}
          {uni.studentSize && <span className="tag">Students: {uni.studentSize.toLocaleString()}</span>}
          {uni.popularMajors && uni.popularMajors.length > 0 && (
            <span className="tag">Majors: {uni.popularMajors.slice(0,2).join(", ")}{uni.popularMajors.length > 2 ? " +" : ""}</span>
          )}
          {uni.url && <a className="tag" href={uni.url} target="_blank" rel="noreferrer">Website ↗</a>}
          <Link className="tag" to={`/u/${uni.id}`}>Details →</Link>
        </div>
      </div>
    </article>
  );
}
