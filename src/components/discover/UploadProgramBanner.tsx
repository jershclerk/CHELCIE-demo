import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UploadProgramBanner() {
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-xl bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="relative flex size-10 shrink-0 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-chelcie-teal/15" />
          <Upload className="relative size-4 text-chelcie-teal-text" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[15px] font-semibold tracking-[-0.23px] text-black">
            Have a new program? Upload it here so CHELCIE can match it with funders.
          </p>
          <p className="text-[13px] tracking-[-0.08px] text-black/50">
            CHELCIE keeps matching your existing programs too — this just adds another one to the mix.
          </p>
        </div>
      </div>

      <Button
        variant="outline"
        className="shrink-0 gap-1.5 rounded-full border-chelcie-primary-button bg-transparent text-chelcie-primary-button hover:bg-chelcie-primary-button/5 active:scale-95"
      >
        <Upload className="size-3.5" />
        Upload program
      </Button>
    </div>
  )
}
