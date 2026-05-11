import { useState } from "react";

const days = [
  {
    day: "Senin",
    label: "MON",
    theme: "Cardio + Lower Body",
    color: "#E8F4FD",
    accent: "#2980B9",
    icon: "🚴",
    duration: "45 min",
    intensity: "main",
    equipment: ["Static Bike", "Mat"],
    warmup: "5 min static bike, low resistance",
    exercises: [
      { name: "Static Bike", sets: "20 min", reps: "Moderate pace, RPE 6/10", note: "Keep back upright" },
      { name: "Glute Bridge", sets: "3×15", reps: "Hold 2 sec at top", note: "Strengthens lower back safely" },
      { name: "Side-Lying Leg Raise", sets: "3×15/side", reps: "Controlled motion", note: "Hip abductor — scoliosis-friendly" },
      { name: "Wall Sit", sets: "3×30 sec", reps: "Thighs parallel to floor", note: "No spinal load" },
      { name: "Calf Raise (bodyweight)", sets: "3×20", reps: "Slow & controlled", note: "Hold wall for balance if needed" },
    ],
    cooldown: "5 min light stretching — hip flexors & hamstrings",
    calories: "~250–300 kcal",
  },
  {
    day: "Selasa",
    label: "TUE",
    theme: "Office Day — Flexible",
    color: "#FEF9E7",
    accent: "#D4AC0D",
    icon: "💼",
    duration: "15–30 min",
    intensity: "flexible",
    equipment: ["Mat", "Dumbbells"],
    warmup: "3 min — neck rolls, shoulder circles, cat-cow",
    exercises: [
      { name: "Bird Dog", sets: "3×10/side", reps: "Extend arm + opposite leg", note: "Core stability — scoliosis-friendly", shortVersion: true },
      { name: "Glute Bridge", sets: "3×15", reps: "Hold 2 sec at top", note: "Can do on bedroom floor before shower", shortVersion: true },
      { name: "Dead Bug", sets: "3×8/side", reps: "Lower back pressed to mat", note: "Anti-rotation core", shortVersion: true },
      { name: "Dumbbell Row (single arm)", sets: "3×12/side", reps: "Light-moderate weight", note: "Full version only", shortVersion: false },
      { name: "Lateral Raise", sets: "3×12", reps: "Light weight", note: "Full version only", shortVersion: false },
    ],
    cooldown: "3–5 min — chest opener, thoracic rotation",
    calories: "~80–160 kcal",
    isFlexible: true,
  },
  {
    day: "Rabu",
    label: "WED",
    theme: "Office Day — Flexible",
    color: "#EAFAF1",
    accent: "#27AE60",
    icon: "💼",
    duration: "15–30 min",
    intensity: "flexible",
    equipment: ["Mat"],
    warmup: "3 min — spinal mobility, hip circles",
    exercises: [
      { name: "Cat-Cow Stretch", sets: "2×10", reps: "Breathe deeply", note: "Do this even on busiest days", shortVersion: true },
      { name: "Child's Pose", sets: "3×30 sec", reps: "Arms extended", note: "Decompresses the spine", shortVersion: true },
      { name: "Thread the Needle", sets: "3×8/side", reps: "Slow rotation", note: "Thoracic mobility — great for scoliosis", shortVersion: true },
      { name: "Hip Flexor Stretch", sets: "2×30 sec/side", reps: "Kneeling lunge", note: "Full version only", shortVersion: false },
      { name: "Superman Hold", sets: "3×10", reps: "Hold 3 sec at top", note: "Full version only", shortVersion: false },
    ],
    cooldown: "Deep breathing — 3 min",
    calories: "~50–100 kcal",
    isFlexible: true,
  },
  {
    day: "Kamis",
    label: "THU",
    theme: "Cardio Intervals + Full Body",
    color: "#FDEDEC",
    accent: "#E74C3C",
    icon: "🏃",
    duration: "50 min",
    intensity: "main",
    equipment: ["Treadmill", "Dumbbells", "Mat"],
    warmup: "5 min treadmill walk, 3.5 km/h flat",
    exercises: [
      { name: "Treadmill Walk Intervals", sets: "20 min", reps: "2 min fast (5.5 km/h) + 3 min moderate (4 km/h)", note: "Incline max 2° — protect spine" },
      { name: "Goblet Squat (light dumbbell)", sets: "3×12", reps: "Hold DB at chest", note: "Minimal spinal load" },
      { name: "Dumbbell Reverse Lunge", sets: "3×10/side", reps: "Step back, not forward", note: "Less impact on knees & spine" },
      { name: "Plank (forearms)", sets: "3×20–30 sec", reps: "Neutral spine", note: "Build up duration gradually" },
      { name: "Superman Hold", sets: "3×10", reps: "Hold 3 sec at top", note: "Back extension — strengthens erectors" },
    ],
    cooldown: "5 min treadmill walk + quad stretch",
    calories: "~320–380 kcal",
  },
  {
    day: "Jumat",
    label: "FRI",
    theme: "Upper Body + Posture Focus",
    color: "#F4ECF7",
    accent: "#8E44AD",
    icon: "💪",
    duration: "40 min",
    intensity: "main",
    equipment: ["Dumbbells", "Mat"],
    warmup: "5 min — shoulder mobility, chest opener",
    exercises: [
      { name: "Dumbbell Bicep Curl", sets: "3×12", reps: "Alternate arms", note: "Control the eccentric (lowering)" },
      { name: "Overhead Tricep Extension", sets: "3×12", reps: "Light weight", note: "Seated if back fatigues" },
      { name: "Bent-Over Row (both arms)", sets: "3×12", reps: "Hinge at hip, flat back", note: "Major posture corrector" },
      { name: "Prone Y-T-W", sets: "2×8 each", reps: "No weight or very light", note: "Scapular stability — great for scoliosis" },
      { name: "Dead Bug", sets: "3×8/side", reps: "Lower back pressed to mat", note: "Core finish" },
    ],
    cooldown: "5 min — pec stretch, doorframe chest opener",
    calories: "~160–200 kcal",
  },
  {
    day: "Sabtu / Minggu",
    label: "SAT/SUN",
    theme: "Tennis Day 🎾",
    color: "#E8F8F0",
    accent: "#1E8449",
    icon: "🎾",
    duration: "60–90 min",
    intensity: "tennis",
    equipment: ["Tennis Court"],
    warmup: "5 min light rally + dynamic stretching",
    exercises: [
      { name: "Tennis Match / Rally", sets: "60–90 min", reps: "Full game or practice", note: "Great cardio + full body coordination" },
    ],
    cooldown: "10 min — calf stretch, shoulder cross-body stretch, hip flexor",
    calories: "~400–550 kcal",
    isTennis: true,
  },
  {
    day: "Minggu / Sabtu",
    label: "SUN/SAT",
    theme: "Rest Day",
    color: "#EAF2FF",
    accent: "#5B86C4",
    icon: "😴",
    duration: "—",
    intensity: "rest",
    equipment: [],
    warmup: "",
    exercises: [],
    cooldown: "",
    calories: "Recovery",
    isRest: true,
  },
];

const tips = [
  { icon: "⚖️", title: "Caloric Deficit", body: "Aim for 300–400 kcal/day deficit. With your goal, ~1,600–1,700 kcal/day is a safe target." },
  { icon: "🥗", title: "Protein Priority", body: "0.8–1g protein per kg bodyweight (~55–68g/day). Prioritize tempe, tahu, telur, ikan, ayam." },
  { icon: "💧", title: "Hydration", body: "Min. 2 liters/day. Add 500ml per workout session. Tennis days: add 750ml–1L extra." },
  { icon: "🦴", title: "Scoliosis Rules", body: "No heavy overhead pressing. Keep treadmill incline ≤ 2–3°. Stop if you feel asymmetric back pain." },
  { icon: "🎾", title: "Tennis & Scoliosis", body: "Tennis involves rotation which can be fine for scoliosis, but warm up your thoracic spine well. Tell your doctor/physio about the 54° curve." },
  { icon: "💼", title: "Office Days", body: "Even 15 min of the short version is better than zero. Bird Dog + Glute Bridge + Dead Bug can be done on a yoga mat before you leave home." },
  { icon: "📈", title: "Progression", body: "Increase dumbbell weight by 0.5–1 kg every 2–3 weeks when reps feel easy." },
  { icon: "😴", title: "Sleep", body: "7–8 hours is non-negotiable for fat loss and recovery. Poor sleep spikes hunger hormones." },
];

const intensityBadge = {
  main: { label: "Main Workout", bg: "#1C2B3A", color: "white" },
  flexible: { label: "Flexible", bg: "#F39C12", color: "white" },
  tennis: { label: "Tennis Day", bg: "#1E8449", color: "white" },
  rest: { label: "Rest", bg: "#5B86C4", color: "white" },
};

export default function WorkoutMenu() {
  const [activeDay, setActiveDay] = useState(0);
  const [tab, setTab] = useState("workout");
  const [showShort, setShowShort] = useState(true);

  const selected = days[activeDay];

  const visibleExercises = selected.isFlexible
    ? showShort
      ? selected.exercises.filter(e => e.shortVersion)
      : selected.exercises
    : selected.exercises;

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#FAFAF8",
      minHeight: "100vh",
      color: "#1A1A1A",
    }}>
      {/* Header */}
      <div style={{
        background: "#1C2B3A",
        color: "white",
        padding: "28px 24px 20px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 12, letterSpacing: "1px", color: "#7EB8D4", marginBottom: 6, fontFamily: "monospace" }}>REV'S WORKOUT PROGRAM</div>
        <h1 style={{ margin: 0, fontSize: 26, color: "#e7f1f6",fontWeight: "normal", letterSpacing: "1px" }}>Weekly Workout Plan</h1>
        <p style={{ margin: "8px 0 0", fontSize: 13, color: "#A0B8C8" }}>
          154 cm · 68 kg · Scoliosis 54° · Fat Loss Focus
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          {["🏠 Home Equipment", "🎾 Tennis Weekend", "💼 Office-Flexible"].map(tag => (
            <span key={tag} style={{
              background: "rgba(126,184,212,0.15)", border: "1px solid rgba(126,184,212,0.3)",
              padding: "4px 12px", borderRadius: 20, fontSize: 11, color: "#7EB8D4",
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Day Selector */}
      <div style={{
        display: "flex", overflowX: "auto", padding: "16px 16px 0",
        gap: 8, background: "#fff", borderBottom: "1px solid #E8E8E8",
        justifyContent: "center",
      }}>
        {days.map((d, i) => (
          <button key={i} onClick={() => { setActiveDay(i); setTab("workout"); setShowShort(true); }} style={{
            flex: "0 0 auto",
            padding: "10px 12px",
            border: activeDay === i ? `2px solid ${d.accent}` : "2px solid transparent",
            borderRadius: 10,
            background: activeDay === i ? d.color : "transparent",
            cursor: "pointer",
            textAlign: "center",
            minWidth: 58,
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: 9, color: activeDay === i ? d.accent : "#888", fontFamily: "monospace", letterSpacing: "1px", fontWeight: "bold" }}>{d.label}</div>
            <div style={{ fontSize: 18, margin: "4px 0" }}>{d.icon}</div>
            <div style={{ fontSize: 9, color: activeDay === i ? d.accent : "#aaa" }}>
              {d.intensity === "rest" ? "REST" : d.intensity === "flexible" ? "FLEX" : d.intensity === "tennis" ? "TENNIS" : d.duration}
            </div>
          </button>
        ))}
      </div>

      {/* Tab Switcher */}
      {!selected.isRest && !selected.isTennis && (
        <div style={{ display: "flex", padding: "12px 16px 0", gap: 8, background: "#fff", justifyContent: "center" }}>
          {["workout", "tips"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "6px 18px", borderRadius: 20, border: "none",
              background: tab === t ? selected.accent : "#F0F0F0",
              color: tab === t ? "white" : "#666",
              fontSize: 12, cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.2s",
            }}>
              {t === "workout" ? "Latihan" : "💡 Tips"}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: "16px 16px 40px" }}>

        {/* REST DAY */}
        {selected.isRest && (
          <div style={{
            background: "#fff", borderRadius: 16, padding: 32,
            textAlign: "center", border: "1px solid #E8E8E8",
          }}>
            <div style={{ fontSize: 64, marginBottom: 32 }}>🌿</div>
            <h2 style={{ fontWeight: "normal", color: "#2C5F8A", margin: "0 0 12px" }}>Hari Istirahat</h2>
            <p style={{ color: "#666", lineHeight: 1.7, maxWidth: 300, margin: "0 auto", fontSize: 14 }}>
              Tubuh bertumbuh dan lemak terbakar saat istirahat. Prioritaskan tidur 7–8 jam dan protein yang cukup.
            </p>
            <div style={{ marginTop: 16, background: "#EAF2FF", borderRadius: 12, padding: "14px 18px", display: "inline-block", textAlign: "left" }}>
              <div style={{ fontSize: 12, color: "#5B86C4", fontWeight: "bold", marginBottom: 8 }}>Boleh dilakukan:</div>
              {["Jalan santai 15–20 menit", "Stretching ringan", "Persiapkan meal plan minggu depan"].map(a => (
                <div key={a} style={{ fontSize: 13, color: "#444", padding: "3px 0" }}>✓ {a}</div>
              ))}
            </div>
          </div>
        )}

        {/* TENNIS DAY */}
        {selected.isTennis && (
          <div>
            <div style={{
              background: selected.color, borderRadius: 14, padding: 20,
              marginBottom: 16, border: `1px solid ${selected.accent}22`,
            }}>
              <div style={{ fontSize: 10, color: selected.accent, letterSpacing: "3px", fontFamily: "monospace", marginBottom: 4 }}>SAT / SUN</div>
              <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: "normal" }}>🎾 Tennis Day</h2>
              <p style={{ margin: 0, fontSize: 13, color: "#555" }}>Tennis menggantikan workout hari ini sepenuhnya.</p>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 10, border: "1px solid #E8E8E8" }}>
              <div style={{ fontSize: 10, color: "#F39C12", letterSpacing: "2px", fontFamily: "monospace", marginBottom: 4 }}>WARM-UP</div>
              <div style={{ fontSize: 13, color: "#444" }}>{selected.warmup}</div>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 10, border: `1px solid #1E844922`, borderLeft: "3px solid #1E8449" }}>
              <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4, textAlign: "left" }}>Tennis Match / Practice Rally</div>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 8, textAlign: "left" }}>60–90 menit permainan penuh atau rally latihan</div>
              <div style={{ background: "#FAFAFA", borderRadius: 8, padding: "6px 10px", fontSize: 11, color: "#888", textAlign: "left", borderLeft: "2px solid #DDD" }}>
                ⚠️ Pemanasan thoracic spine penting sebelum bermain — scoliosis dapat memengaruhi rotasi tubuh
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 10, border: "1px solid #E8E8E8" }}>
              <div style={{ fontSize: 10, color: "#27AE60", letterSpacing: "2px", fontFamily: "monospace", marginBottom: 4 }}>COOL-DOWN</div>
              <div style={{ fontSize: 13, color: "#444" }}>{selected.cooldown}</div>
            </div>

            <div style={{ background: "#1C2B3A", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#7EB8D4", fontSize: 12 }}>🔥 Estimasi Kalori</span>
              <span style={{ color: "white", fontFamily: "monospace", fontSize: 15 }}>{selected.calories}</span>
            </div>

            <div style={{ background: "#FFF8E1", borderRadius: 12, padding: 16, marginTop: 10, border: "1px solid #F6D860" }}>
              <div style={{ fontSize: 12, color: "#777", lineHeight: 1.7 }}>
                📅 <strong>Jadwal fleksibel:</strong> Tennis bisa Sabtu atau Minggu — hari yang tidak tennis otomatis jadi Rest Day. Tidak perlu tambah latihan lagi.
              </div>
            </div>
          </div>
        )}

        {/* FLEXIBLE OFFICE DAY */}
        {selected.isFlexible && tab === "workout" && (
          <div>
            <div style={{
              background: selected.color, borderRadius: 14, padding: 20,
              marginBottom: 16, border: `1px solid ${selected.accent}22`,
            }}>
              <div style={{ fontSize: 10, color: selected.accent, letterSpacing: "3px", fontFamily: "monospace", marginBottom: 4 }}>
                {selected.label} — OFFICE DAY
              </div>
              <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: "normal" }}>{selected.theme}</h2>
              <p style={{ margin: 0, fontSize: 12, color: "#777" }}>Pilih versi sesuai energi & waktu kamu hari ini</p>
            </div>

            {/* Toggle short/full */}
            <div style={{
              display: "flex", background: "#F0F0F0", borderRadius: 12,
              padding: 4, marginBottom: 16, gap: 4,
            }}>
              <button onClick={() => setShowShort(true)} style={{
                flex: 1, padding: "10px", borderRadius: 10, border: "none",
                background: showShort ? "white" : "transparent",
                color: showShort ? selected.accent : "#888",
                fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                fontWeight: showShort ? "bold" : "normal",
                boxShadow: showShort ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.2s",
              }}>
                ⚡ Short (15 min)
              </button>
              <button onClick={() => setShowShort(false)} style={{
                flex: 1, padding: "10px", borderRadius: 10, border: "none",
                background: !showShort ? "white" : "transparent",
                color: !showShort ? selected.accent : "#888",
                fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                fontWeight: !showShort ? "bold" : "normal",
                boxShadow: !showShort ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.2s",
              }}>
                🏋️ Full (30 min)
              </button>
            </div>

            <div style={{
              background: showShort ? "#FFFBEA" : "#F0FFF4",
              border: `1px solid ${showShort ? "#F6D860" : "#A9DFBF"}`,
              borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#555",
            }}>
              {showShort
                ? "⚡ Versi singkat: bisa dilakukan di kamar sebelum berangkat. No equipment needed."
                : "🏋️ Versi penuh: butuh mat + dumbbell, cocok kalau pulang masih ada tenaga."}
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 12, border: "1px solid #E8E8E8" }}>
              <div style={{ fontSize: 10, color: "#F39C12", letterSpacing: "2px", fontFamily: "monospace", marginBottom: 4 }}>WARM-UP</div>
              <div style={{ fontSize: 13, color: "#444" }}>{selected.warmup}</div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: "#888", letterSpacing: "2px", fontFamily: "monospace", marginBottom: 10 }}>EXERCISES</div>
              {visibleExercises.map((ex, i) => (
                <div key={i} style={{
                  background: "#fff", borderRadius: 12, padding: "14px 16px",
                  marginBottom: 8, border: "1px solid #EBEBEB",
                  borderLeft: `3px solid ${selected.accent}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 3, textAlign: "left" }}>{ex.name}</div>
                      <div style={{ fontSize: 12, color: "#666", textAlign: "left" }}>{ex.reps}</div>
                    </div>
                    <div style={{
                      background: selected.color, color: selected.accent,
                      borderRadius: 8, padding: "4px 10px", fontSize: 11, fontFamily: "monospace",
                      whiteSpace: "nowrap", marginLeft: 12,
                    }}>{ex.sets}</div>
                  </div>
                  {ex.note && (
                    <div style={{
                      marginTop: 8, background: "#FAFAFA", borderRadius: 8,
                      padding: "6px 10px", fontSize: 11, color: "#888", textAlign: "left", borderLeft: "2px solid #DDD",
                    }}>
                      ⚠️ {ex.note}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 12, border: "1px solid #E8E8E8" }}>
              <div style={{ fontSize: 10, color: "#27AE60", letterSpacing: "2px", fontFamily: "monospace", marginBottom: 4 }}>COOL-DOWN</div>
              <div style={{ fontSize: 13, color: "#444" }}>{selected.cooldown}</div>
            </div>

            <div style={{ background: "#1C2B3A", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#7EB8D4", fontSize: 12 }}>🔥 Estimasi Kalori</span>
              <span style={{ color: "white", fontFamily: "monospace", fontSize: 15 }}>{selected.calories}</span>
            </div>
          </div>
        )}

        {/* NORMAL WORKOUT DAY */}
        {!selected.isRest && !selected.isTennis && !selected.isFlexible && tab === "workout" && (
          <div>
            <div style={{
              background: selected.color, borderRadius: 14, padding: 20,
              marginBottom: 16, border: `1px solid ${selected.accent}22`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 10, color: selected.accent, letterSpacing: "3px", fontFamily: "monospace", marginBottom: 4, textAlign: "left" }}>{selected.label}</div>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: "normal" }}>{selected.theme}</h2>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22 }}>{selected.icon}</div>
                  <div style={{ fontSize: 11, color: selected.accent, marginTop: 4 }}>{selected.duration}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                {selected.equipment.map(e => (
                  <span key={e} style={{
                    background: "white", border: `1px solid ${selected.accent}44`,
                    borderRadius: 20, padding: "3px 10px", fontSize: 11, color: selected.accent,
                  }}>{e}</span>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 12, border: "1px solid #E8E8E8" }}>
              <div style={{ fontSize: 10, color: "#F39C12", letterSpacing: "2px", fontFamily: "monospace", marginBottom: 4 }}>WARM-UP</div>
              <div style={{ fontSize: 13, color: "#444" }}>{selected.warmup}</div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: "#888", letterSpacing: "2px", fontFamily: "monospace", marginBottom: 10 }}>MAIN WORKOUT</div>
              {selected.exercises.map((ex, i) => (
                <div key={i} style={{
                  background: "#fff", borderRadius: 12, padding: "14px 16px",
                  marginBottom: 8, border: "1px solid #EBEBEB",
                  borderLeft: `3px solid ${selected.accent}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 3, textAlign: "left" }}>{ex.name}</div>
                      <div style={{ fontSize: 12, color: "#666", textAlign: "left" }}>{ex.reps}</div>
                    </div>
                    <div style={{
                      background: selected.color, color: selected.accent,
                      borderRadius: 8, padding: "4px 10px", fontSize: 11, fontFamily: "monospace",
                      whiteSpace: "nowrap", marginLeft: 12,
                    }}>{ex.sets}</div>
                  </div>
                  {ex.note && (
                    <div style={{
                      marginTop: 8, background: "#FAFAFA", borderRadius: 8,
                      padding: "6px 10px", fontSize: 11, color: "#888", textAlign: "left", borderLeft: "2px solid #DDD",
                    }}>
                      ⚠️ {ex.note}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 12, border: "1px solid #E8E8E8" }}>
              <div style={{ fontSize: 10, color: "#27AE60", letterSpacing: "2px", fontFamily: "monospace", marginBottom: 4 }}>COOL-DOWN</div>
              <div style={{ fontSize: 13, color: "#444" }}>{selected.cooldown}</div>
            </div>

            <div style={{ background: "#1C2B3A", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#7EB8D4", fontSize: 12 }}>🔥 Estimasi Kalori</span>
              <span style={{ color: "white", fontFamily: "monospace", fontSize: 15 }}>{selected.calories}</span>
            </div>
          </div>
        )}

        {/* TIPS TAB */}
        {tab === "tips" && !selected.isRest && !selected.isTennis && (
          <div>
            <div style={{ fontSize: 10, color: "#888", letterSpacing: "2px", fontFamily: "monospace", marginBottom: 12 }}>PANDUAN & TIPS</div>
            {tips.map((tip, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 12, padding: 16,
                marginBottom: 10, border: "1px solid #EBEBEB",
              }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ fontSize: 22, flexShrink: 0 }}>{tip.icon}</div>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 4 }}>{tip.title}</div>
                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{tip.body}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ background: "#FFF3CD", borderRadius: 12, padding: 16, border: "1px solid #F6D860", marginTop: 8 }}>
              <div style={{ fontWeight: "bold", fontSize: 13, marginBottom: 6 }}>⚕️ Scoliosis Reminder</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>
                Dengan scoliosis 54°, sangat dianjurkan konsultasi ke fisioterapis sebelum mulai. Program ini dirancang untuk meminimalkan risiko, tapi setiap kondisi tulang berbeda. Hentikan latihan jika ada rasa sakit asimetris.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}