import { useState, useMemo } from "react";

const PIN = "2026";

const defaultValues = {
  surfaceHa: 1,
  rendementKgHa: 8000,
  prixTerrainHa: 500,
  coutPlantationHa: 1200,
  coutMainOeuvreAn: 800,
  coutIntrantsAn: 600,
  coutIrrigationAn: 300,
  coutCertificationAn: 400,
  pertesPostRecolte: 15,
  coutConditionnementKg: 0.30,
  coutFrigoKg: 0.15,
  coutTransportDakarPortKg: 0.10,
  coutFretMaritimeKg: 0.80,
  coutAssuranceKg: 0.05,
  coutDouaneEUPct: 8,
  coutLogistiqueEUKg: 0.40,
  coutDistributionKg: 0.50,
  margeCourtiereKg: 0.30,
  prixVenteKg: 6.50,
};

const sections = [
  {
    id: "prod",
    title: "🌱 Production",
    color: "#c8f57a",
    fields: [
      { key: "surfaceHa", label: "Surface cultivée", unit: "ha", step: 0.5, min: 0.5 },
      { key: "rendementKgHa", label: "Rendement", unit: "kg/ha", step: 100 },
      { key: "prixTerrainHa", label: "Valeur terrain", unit: "€/ha", step: 50 },
      { key: "coutPlantationHa", label: "Coût plantation", unit: "€/ha", step: 50 },
      { key: "coutMainOeuvreAn", label: "Main d'œuvre", unit: "€/ha/an", step: 50 },
      { key: "coutIntrantsAn", label: "Intrants", unit: "€/ha/an", step: 50 },
      { key: "coutIrrigationAn", label: "Irrigation", unit: "€/ha/an", step: 50 },
      { key: "coutCertificationAn", label: "Certification", unit: "€/ha/an", step: 50 },
    ],
  },
  {
    id: "post",
    title: "📦 Post-récolte",
    color: "#f5c87a",
    fields: [
      { key: "pertesPostRecolte", label: "Pertes", unit: "%", step: 1 },
      { key: "coutConditionnementKg", label: "Conditionnement", unit: "€/kg" },
      { key: "coutFrigoKg", label: "Stockage frigo", unit: "€/kg" },
    ],
  },
  {
    id: "export",
    title: "🚢 Export",
    color: "#7ab8f5",
    fields: [
      { key: "coutTransportDakarPortKg", label: "Transport Dakar → Port", unit: "€/kg" },
      { key: "coutFretMaritimeKg", label: "Fret maritime", unit: "€/kg" },
      { key: "coutAssuranceKg", label: "Assurance", unit: "€/kg" },
      { key: "coutDouaneEUPct", label: "Droits douane UE", unit: "% FOB", step: 0.5 },
    ],
  },
  {
    id: "eu",
    title: "🇪🇺 Distribution Europe",
    color: "#f57ab8",
    fields: [
      { key: "coutLogistiqueEUKg", label: "Logistique UE", unit: "€/kg" },
      { key: "coutDistributionKg", label: "Grossiste / distrib.", unit: "€/kg" },
      { key: "margeCourtiereKg", label: "Marge courtière", unit: "€/kg" },
      { key: "prixVenteKg", label: "Prix de vente final", unit: "€/kg", step: 0.1 },
    ],
  },
];

function LoginScreen({ onSuccess }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleKey = (k) => {
    if (k === "del") {
      setPin(p => p.slice(0, -1));
      setError(false);
      return;
    }
    if (pin.length >= PIN.length) return;
    const next = pin + k;
    setPin(next);
    if (next.length === PIN.length) {
      if (next === PIN) {
        onSuccess();
      } else {
        setShake(true);
        setError(true);
        setTimeout(() => { setPin(""); setShake(false); }, 700);
      }
    }
  };

  const keys = ["1","2","3","4","5","6","7","8","9","","0","del"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0e0f0d 0%, #0f140a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      padding: 24,
    }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "#c8f57a" }}>Simulateur Rentabilité</div>
        <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>Fruit de la passion · Sénégal → Europe</div>
      </div>

      {/* Points PIN */}
      <div style={{
        display: "flex",
        gap: 16,
        marginBottom: 12,
        animation: shake ? "shake 0.5s ease" : "none",
      }}>
        {Array.from({ length: PIN.length }).map((_, i) => (
          <div key={i} style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: i < pin.length ? (error ? "#ff6b6b" : "#c8f57a") : "rgba(255,255,255,0.15)",
            transition: "background 0.2s",
          }} />
        ))}
      </div>

      <div style={{ fontSize: 12, color: error ? "#ff6b6b" : "transparent", marginBottom: 32, transition: "color 0.2s" }}>
        Code incorrect
      </div>

      {/* Clavier */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 72px)", gap: 14 }}>
        {keys.map((k, i) => (
          k === "" ? <div key={i} /> :
          <button
            key={i}
            onClick={() => handleKey(k)}
            style={{
              height: 72,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.1)",
              background: k === "del" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.07)",
              color: k === "del" ? "#888" : "#f0ede8",
              fontSize: k === "del" ? 18 : 24,
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.15s, transform 0.1s",
              WebkitTapHighlightColor: "transparent",
            }}
            onPointerDown={e => e.currentTarget.style.transform = "scale(0.93)"}
            onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            {k === "del" ? "⌫" : k}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

function Simulator() {
  const [v, setV] = useState(defaultValues);
  const [openSection, setOpenSection] = useState("prod");
  const set = (key) => (val) => setV(prev => ({ ...prev, [key]: val }));

  const calc = useMemo(() => {
    const productionBrute = v.surfaceHa * v.rendementKgHa;
    const pertesKg = productionBrute * (v.pertesPostRecolte / 100);
    const productionNette = productionBrute - pertesKg;
    const amortissementAn = (v.surfaceHa * v.prixTerrainHa + v.surfaceHa * v.coutPlantationHa) / 10;
    const coutsProdAn = amortissementAn + (v.coutMainOeuvreAn + v.coutIntrantsAn + v.coutIrrigationAn + v.coutCertificationAn) * v.surfaceHa;
    const coutProdKg = coutsProdAn / productionNette;
    const coutPostRecolteKg = v.coutConditionnementKg + v.coutFrigoKg;
    const coutDouaneEUKg = (v.prixVenteKg * 0.45) * (v.coutDouaneEUPct / 100);
    const coutExportKg = v.coutTransportDakarPortKg + v.coutFretMaritimeKg + v.coutAssuranceKg + coutDouaneEUKg;
    const coutEUKg = v.coutLogistiqueEUKg + v.coutDistributionKg + v.margeCourtiereKg;
    const coutTotalKg = coutProdKg + coutPostRecolteKg + coutExportKg + coutEUKg;
    const beneficeKg = v.prixVenteKg - coutTotalKg;
    const beneficeTotal = beneficeKg * productionNette;
    const margeNette = (beneficeKg / v.prixVenteKg) * 100;
    const caTotal = v.prixVenteKg * productionNette;
    return { productionBrute, productionNette, coutProdKg, coutPostRecolteKg, coutExportKg, coutEUKg, coutTotalKg, beneficeKg, beneficeTotal, margeNette, caTotal };
  }, [v]);

  const positif = calc.beneficeKg >= 0;

  return (
    <div style={{ background: "#0e0f0d", minHeight: "100vh", color: "#f0ede8", fontFamily: "'DM Sans', sans-serif", paddingBottom: 40 }}>
      <div style={{ background: "rgba(200,245,122,0.06)", borderBottom: "1px solid rgba(200,245,122,0.15)", padding: "20px 16px 16px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#c8f57a" }}>Simulateur Rentabilité</div>
        <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>Fruit de la passion · Sénégal → Europe</div>
      </div>

      <div style={{
        margin: "16px",
        background: positif ? "rgba(200,245,122,0.1)" : "rgba(255,107,107,0.1)",
        border: `1px solid ${positif ? "rgba(200,245,122,0.3)" : "rgba(255,107,107,0.3)"}`,
        borderRadius: 16,
        padding: "20px 16px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 6 }}>BÉNÉFICE NET / KG</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 56, color: positif ? "#c8f57a" : "#ff6b6b", lineHeight: 1, letterSpacing: -2 }}>
          {positif ? "+" : ""}{calc.beneficeKg.toFixed(2)}<span style={{ fontSize: 22, fontWeight: 600 }}>€</span>
        </div>
        <div style={{ fontSize: 12, color: "#777", marginTop: 6 }}>marge {calc.margeNette.toFixed(1)}%</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
          {[
            { label: "Volume vendu", val: `${calc.productionNette.toFixed(0)} kg` },
            { label: "CA total", val: `${calc.caTotal.toFixed(0)} €` },
            { label: "Coût total/kg", val: `${calc.coutTotalKg.toFixed(2)} €` },
            { label: "Bénéfice total", val: `${calc.beneficeTotal.toFixed(0)} €`, highlight: true },
          ].map(({ label, val, highlight }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, color: "#777", marginBottom: 3 }}>{label}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: highlight ? (positif ? "#c8f57a" : "#ff6b6b") : "#f0ede8" }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: "0 16px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px" }}>
        <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 12 }}>RÉPARTITION DES COÛTS</div>
        {[
          { label: "Production", val: calc.coutProdKg, color: "#c8f57a" },
          { label: "Post-récolte", val: calc.coutPostRecolteKg, color: "#f5c87a" },
          { label: "Export", val: calc.coutExportKg, color: "#7ab8f5" },
          { label: "Distribution EU", val: calc.coutEUKg, color: "#f57ab8" },
        ].map(({ label, val, color }) => {
          const pct = (val / v.prixVenteKg) * 100;
          return (
            <div key={label} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: "#ccc" }}>{label}</span>
                <span style={{ color, fontWeight: 600 }}>{val.toFixed(2)} € · {pct.toFixed(1)}%</span>
              </div>
              <div style={{ height: 7, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${Math.min(100, pct)}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.4s" }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ margin: "0 16px" }}>
        <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, marginBottom: 12, paddingLeft: 4 }}>PARAMÈTRES</div>
        {sections.map(sec => (
          <div key={sec.id} style={{ marginBottom: 10, background: "rgba(255,255,255,0.03)", border: `1px solid ${openSection === sec.id ? sec.color + "44" : "rgba(255,255,255,0.08)"}`, borderRadius: 14, overflow: "hidden" }}>
            <button
              onClick={() => setOpenSection(openSection === sec.id ? null : sec.id)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "transparent", border: "none", cursor: "pointer", color: "#f0ede8" }}
            >
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15 }}>{sec.title}</span>
              <span style={{ color: sec.color, fontSize: 20, lineHeight: 1 }}>{openSection === sec.id ? "−" : "+"}</span>
            </button>
            {openSection === sec.id && (
              <div style={{ padding: "0 16px 16px" }}>
                {sec.fields.map(f => (
                  <div key={f.key} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 12, color: "#aaa", marginBottom: 6 }}>{f.label}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={v[f.key]}
                        step={f.step || 0.01}
                        min={f.min || 0}
                        onChange={e => set(f.key)(parseFloat(e.target.value) || 0)}
                        style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, color: "#f0ede8", fontSize: 18, fontWeight: 600, padding: "12px 14px", outline: "none" }}
                      />
                      <span style={{ color: "#666", fontSize: 12, minWidth: 50 }}>{f.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#444", margin: "16px", lineHeight: 1.7 }}>
        * Terrain & plantation amortis sur 10 ans.<br />
        * Sénégal EPA : douane UE potentiellement 0%.
      </div>
    </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  return unlocked ? <Simulator /> : <LoginScreen onSuccess={() => setUnlocked(true)} />;
}
