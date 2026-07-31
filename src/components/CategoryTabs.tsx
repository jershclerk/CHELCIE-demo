import { cn } from "@/lib/utils"

type CategoryTabsProps<T extends string> = {
  categories: readonly T[]
  active: T
  onChange: (category: T) => void
}

export function CategoryTabs<T extends string>({ categories, active, onChange }: CategoryTabsProps<T>) {
  return (
    <div className="inline-flex w-fit items-center gap-1 rounded-full bg-chelcie-gray6 p-1">
      {categories.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap tracking-[-0.08px] transition-all",
              isActive
                ? "bg-white text-black shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                : "text-black/60 hover:text-black"
            )}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
