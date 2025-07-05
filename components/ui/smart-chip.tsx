import Image from "next/image"
import { cn } from "@/lib/utils"

export type ChipType = "docs" | "sheets" | "slides" | "forms" | "drawings" | "vids"

interface SmartChipProps {
  type: ChipType
  label: string
  className?: string
}

export const chipConfig: Record<ChipType, { icon: string; name: string }> = {
  docs: {
    icon: "/icons/docs.svg",
    name: "Docs",
  },
  sheets: {
    icon: "/icons/sheets.svg",
    name: "Sheets",
  },
  slides: {
    icon: "/icons/slides.svg",
    name: "Slides",
  },
  forms: {
    icon: "/icons/forms.svg",
    name: "Forms",
  },
  drawings: {
    icon: "/icons/drawings.svg",
    name: "Drawings",
  },
  vids: {
    icon: "/icons/vids.svg",
    name: "Videos",
  },
}

export function SmartChip({ type, label, className }: SmartChipProps) {
  const { icon } = chipConfig[type]

  return (
    <span
      style={{ fontFamily: "var(--font-inter)" }}
      className={cn(
        "inline-flex h-6 cursor-default items-center gap-1.5 whitespace-nowrap rounded-full bg-[#E9EAED] px-2 py-0.5 text-sm font-medium text-gray-800",
        className,
      )}
    >
      <Image src={icon || "/placeholder.svg"} alt={`${label} icon`} width={16} height={16} className="h-4 w-4" />
      {label}
    </span>
  )
}
