import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import wellcomeLogo from "@/assets/org-wellcome.png"
import bloombergLogo from "@/assets/org-bloomberg.png"
import ministryLogo from "@/assets/org-ministry.png"

const logos = {
  wellcome: wellcomeLogo,
  bloomberg: bloombergLogo,
  ministry: ministryLogo,
}

type OrgAvatarProps = {
  org: string
  logoKey?: keyof typeof logos
  color?: string
  className?: string
}

export function OrgAvatar({ org, logoKey, color = "#8e8e93", className }: OrgAvatarProps) {
  if (logoKey) {
    return (
      <img
        src={logos[logoKey]}
        alt=""
        className={cn("size-8 shrink-0 rounded-lg object-cover", className)}
      />
    )
  }

  return (
    <Avatar className={cn("size-8 shrink-0 rounded-lg", className)}>
      <AvatarFallback
        className="rounded-lg text-xs font-semibold text-white"
        style={{ backgroundColor: color }}
      >
        {org.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
