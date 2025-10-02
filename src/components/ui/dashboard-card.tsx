import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: "default" | "warning" | "danger" | "success";
}

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  variant = "default"
}: DashboardCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "warning":
        return "border-jd-yellow/20 bg-gradient-to-br from-jd-yellow-light/5 to-transparent";
      case "danger":
        return "border-destructive/20 bg-gradient-to-br from-destructive/5 to-transparent";
      case "success":
        return "border-jd-green/20 bg-gradient-to-br from-jd-green/5 to-transparent";
      default:
        return "border-border bg-gradient-card";
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case "warning":
        return "text-jd-yellow bg-jd-yellow-light/10";
      case "danger":
        return "text-destructive bg-destructive/10";
      case "success":
        return "text-jd-green bg-jd-green/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-card cursor-pointer",
      getVariantStyles(),
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center",
          getIconStyles()
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {(description || trend) && (
          <div className="flex items-center justify-between mt-2">
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
            {trend && (
              <div className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-jd-green" : "text-destructive"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}