import type * as React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Moon, Sun as SunIcon, Map as MapIcon, Orbit } from "lucide-react"
import { layout, type Opportunity } from "@/lib/opportunities"
import { cn } from "@/lib/utils"
import { Starfield } from "./Starfield"
import { OrbitRings } from "./OrbitRings"
import { Sun } from "./Sun"
import { Planet } from "./Planet"
import { ScoreLegend } from "./ScoreLegend"
import { FilterBar, type FitTier } from "./FilterBar"
import { ZoomControls } from "./ZoomControls"
import { ListPanel } from "./ListPanel"

type Camera = { x: number; y: number; zoom: number }

const DEFAULT_ZOOM = 0.62
const MIN_ZOOM = 0.12
const MAX_ZOOM = 2.4
const CLICK_THRESHOLD = 6 // px of pointer movement before a gesture counts as a pan, not a click

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function ConstellationExplorer() {
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: DEFAULT_ZOOM })
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [breakdownOpen, setBreakdownOpen] = useState(false)
  const [hoveredFactor, setHoveredFactor] = useState<string | null>(null)
  const [view, setView] = useState<"split" | "list">("split")
  // A second, experimental layout (Airbnb-style: rich V3 cards on the left,
  // the constellation map on the right) — lives behind its own toggle so the
  // default "split" layout above is completely unaffected.
  const [altLayout, setAltLayout] = useState(false)
  const [search, setSearch] = useState("")
  const [fitTier, setFitTier] = useState<FitTier>("all")
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const stored = localStorage.getItem("chelcie-atlas-theme")
      return stored === "light" ? "light" : "dark"
    } catch {
      return "dark"
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem("chelcie-atlas-theme", theme)
    } catch {
      // ignore — theme still applies for this session, just won't persist
    }
  }, [theme])

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, startPanX: 0, startPanY: 0, moved: 0, captured: false })

  const matchesFilters = useCallback(
    (o: Opportunity) => {
      if (fitTier === "strong" && o.fit < 80) return false
      if (fitTier === "good" && (o.fit < 60 || o.fit >= 80)) return false
      if (fitTier === "explore" && o.fit >= 60) return false
      if (search.trim()) {
        const q = search.trim().toLowerCase()
        if (!o.funder.toLowerCase().includes(q) && !o.program.toLowerCase().includes(q)) return false
      }
      return true
    },
    [fitTier, search]
  )

  const filteredIds = useMemo(() => new Set(layout.filter(matchesFilters).map((n) => n.id)), [matchesFilters])
  const listItems = useMemo(
    () => layout.filter((n) => filteredIds.has(n.id)).sort((a, b) => b.fit - a.fit),
    [filteredIds]
  )

  const selectOpportunity = useCallback((id: string) => {
    setBreakdownOpen(false)
    setSelectedId((prev) => (prev === id ? null : id))
  }, [])

  const handlePlanetSelect = useCallback(
    (id: string) => {
      if (dragRef.current.moved > CLICK_THRESHOLD) return
      selectOpportunity(id)
    },
    [selectOpportunity]
  )

  const handleSunToggle = useCallback(() => {
    if (dragRef.current.moved > CLICK_THRESHOLD) return
    setSelectedId(null)
    setBreakdownOpen((prev) => !prev)
  }, [])

  const closeCard = useCallback(() => setSelectedId(null), [])

  // Wheel-to-zoom, anchored at the cursor so the point under the pointer stays put.
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const rect = el!.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      const deltaY = clamp(e.deltaY, -100, 100)
      const factor = Math.exp(-deltaY * 0.0018)

      setCamera((prev) => {
        const nextZoom = clamp(prev.zoom * factor, MIN_ZOOM, MAX_ZOOM)
        const ratio = nextZoom / prev.zoom
        return {
          x: relX - (relX - prev.x) * ratio,
          y: relY - (relY - prev.y) * ratio,
          zoom: nextZoom,
        }
      })
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedId(null)
        setBreakdownOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  function handlePointerDown(e: React.PointerEvent) {
    // Deliberately do NOT capture the pointer here. Capturing on every press
    // (even a plain click with zero movement) redirects the eventual `click`
    // event's target to this container instead of whatever was actually under
    // the cursor — which silently broke clicking the sun and the planet cards.
    // Capture only kicks in once real movement confirms this is a drag.
    dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, startPanX: camera.x, startPanY: camera.y, moved: 0, captured: false }
  }

  function handlePointerMove(e: React.PointerEvent) {
    const d = dragRef.current
    if (!d.dragging) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    d.moved = Math.max(d.moved, Math.hypot(dx, dy))
    if (!d.captured && d.moved > CLICK_THRESHOLD) {
      d.captured = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    setCamera((prev) => ({ ...prev, x: d.startPanX + dx, y: d.startPanY + dy }))
  }

  function handlePointerUp(e: React.PointerEvent) {
    dragRef.current.dragging = false
    if (dragRef.current.captured && e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    dragRef.current.captured = false
  }

  function handleBackgroundClick(e: React.MouseEvent) {
    if (dragRef.current.moved > CLICK_THRESHOLD) return
    if (e.target === e.currentTarget) {
      setSelectedId(null)
      setBreakdownOpen(false)
    }
  }

  function zoomBy(factor: number) {
    setCamera((prev) => {
      const nextZoom = clamp(prev.zoom * factor, MIN_ZOOM, MAX_ZOOM)
      const ratio = nextZoom / prev.zoom
      return { x: prev.x * ratio, y: prev.y * ratio, zoom: nextZoom }
    })
  }

  const labelOpacity = clamp(0.55 + (camera.zoom - DEFAULT_ZOOM) * 1.1, 0.55, 1)

  return (
    <div data-theme={theme} className="bg-scene relative flex h-screen w-full overflow-hidden text-ink transition-colors duration-300">
      <header className="pointer-events-none absolute top-0 left-0 z-40 flex h-14 w-full items-center justify-between px-5">
        <div className="pointer-events-auto flex items-center gap-2.5">
          <span className="font-suisse text-xl font-medium text-ink">CHELCIE</span>
          <span className="bg-neon/20 text-neon border-neon/40 font-devtool rounded-full border px-2.5 py-[3px] text-[11px] font-normal">
            Live
          </span>
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-full border border-ink/10 bg-ink/10 p-1 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setView("split")}
              className={cn(
                "font-devtool rounded-full px-3.5 py-1.5 text-[12.5px] font-normal transition-colors",
                view === "split" ? "bg-neon/25 text-ink" : "text-ink/60 hover:text-ink"
              )}
            >
              Explore
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className={cn(
                "font-devtool rounded-full px-3.5 py-1.5 text-[12.5px] font-normal transition-colors",
                view === "list" ? "bg-neon/25 text-ink" : "text-ink/60 hover:text-ink"
              )}
            >
              List
            </button>
          </div>

          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className="border-ink/10 bg-ink/10 text-ink/80 hover:text-ink flex size-9 shrink-0 items-center justify-center rounded-full border backdrop-blur-xl transition-colors"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <SunIcon className="size-4" strokeWidth={2} /> : <Moon className="size-4" strokeWidth={2} />}
          </button>

          <button
            type="button"
            onClick={() => setAltLayout((prev) => !prev)}
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full border backdrop-blur-xl transition-colors",
              altLayout ? "border-neon/60 bg-neon/25 text-ink" : "border-ink/10 bg-ink/10 text-ink/80 hover:text-ink"
            )}
            aria-label={altLayout ? "Back to orbit layout" : "Try map layout"}
            title={altLayout ? "Back to orbit layout" : "Try map layout"}
          >
            {altLayout ? <Orbit className="size-4" strokeWidth={2} /> : <MapIcon className="size-4" strokeWidth={2} />}
          </button>
        </div>
      </header>

      <div className={cn("relative h-full", altLayout ? "order-2 flex-1" : view === "list" ? "hidden" : "flex-1")}>
        <div
          ref={viewportRef}
          className="constellation relative h-full w-full cursor-grab touch-none overflow-hidden select-none active:cursor-grabbing"
          data-sun-paused={breakdownOpen ? "true" : undefined}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onClick={handleBackgroundClick}
        >
          <Starfield />

          <div
            className="absolute top-1/2 left-1/2"
            style={
              {
                transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`,
                "--label-opacity": labelOpacity,
              } as React.CSSProperties
            }
          >
            <OrbitRings />

            {layout.map((node) => (
              <Planet
                key={node.id}
                node={node}
                zoom={camera.zoom}
                isSelected={selectedId === node.id}
                isDimmed={!filteredIds.has(node.id)}
                isHovered={hoveredId === node.id}
                onHover={setHoveredId}
                onSelect={handlePlanetSelect}
                onCloseCard={closeCard}
              />
            ))}

            {/* Rendered last (on top of every planet in DOM order, plus its own
                z-30) so it always wins the hit-test regardless of orbit position. */}
            <Sun open={breakdownOpen} onToggle={handleSunToggle} hoveredFactor={hoveredFactor} onHoverFactor={setHoveredFactor} />
          </div>

          <FilterBar fitTier={fitTier} onSetFitTier={setFitTier} />
          <ZoomControls onZoomIn={() => zoomBy(1.25)} onZoomOut={() => zoomBy(0.8)} onReset={() => setCamera({ x: 0, y: 0, zoom: DEFAULT_ZOOM })} />
          <ScoreLegend open={breakdownOpen} hoveredFactor={hoveredFactor} onHoverFactor={setHoveredFactor} />
        </div>
      </div>

      <div
        className={cn(
          "h-full shrink-0",
          altLayout ? "order-1 w-[42%] min-w-[380px] max-w-[560px]" : view === "list" ? "w-full" : "w-[30%] min-w-[320px] max-w-[420px]"
        )}
      >
        <ListPanel
          opportunities={listItems}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={selectOpportunity}
          onHover={setHoveredId}
          wide={!altLayout && view === "list"}
          search={search}
          onSearchChange={setSearch}
          rich={altLayout}
        />
      </div>
    </div>
  )
}
