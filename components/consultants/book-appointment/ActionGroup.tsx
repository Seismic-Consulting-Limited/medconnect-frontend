import React from "react"
import { Button } from "@/components/ui/button"

type ActionGroupProps = {
  primary: {
    label: string
    onClick?: () => void
    icon?: React.ReactNode
    variant?: "default" | "outline"
  }
  secondary?: {
    label: string
    onClick?: () => void
    icon?: React.ReactNode
    variant?: "default" | "outline"
  }
}

const ActionGroup = ({ primary, secondary }: ActionGroupProps) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Button
        variant={primary.variant ?? "default"}
        className="h-[56px] rounded-[12px] text-[16px] font-light flex items-center gap-2 justify-center"
        onClick={primary.onClick}
      >
        {primary.icon}
        {primary.label}
      </Button>

      {secondary && (
        <Button
          variant={secondary.variant ?? "outline"}
          className="h-[56px] rounded-[12px] text-[16px] font-light flex items-center gap-2 justify-center"
          onClick={secondary.onClick}
        >
          {secondary.icon}
          {secondary.label}
        </Button>
      )}
    </div>
  )
}

export default ActionGroup
