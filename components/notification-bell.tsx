"use client";

import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NotificationBellProps {
  count?: number;
}

export default function NotificationBell({ count = 0 }: NotificationBellProps) {
  return (
    <div className="relative">
      <Bell className="w-5 h-5" />
      {count > 0 && (
        <Badge
          variant="destructive"
          className="absolute flex items-center justify-center w-5 h-5 p-0 text-xs -top-2 -right-2"
        >
          {count > 99 ? "99+" : count}
        </Badge>
      )}
    </div>
  );
}
