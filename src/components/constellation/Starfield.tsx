export function Starfield() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 20%, var(--scene-tint-1), transparent 60%), radial-gradient(ellipse 70% 55% at 75% 75%, var(--scene-tint-2), transparent 60%), var(--scene)",
        }}
      />
    </div>
  )
}
