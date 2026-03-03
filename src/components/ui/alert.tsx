import * as React from "react"
import { cn } from "@/lib/utils"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "success" | "warning"
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
        variant === "default" && "bg-background text-foreground",
        variant === "destructive" && "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        variant === "success" && "border-green-500/50 text-green-600 dark:border-green-500 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        variant === "warning" && "border-yellow-500/50 text-yellow-600 dark:border-yellow-500 dark:text-yellow-400 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        className
      )}
      {...props}
    />
  )
)
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed flex-1", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

export { Alert, AlertDescription, AlertTitle }
