import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  string,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open ", color: "red" },
  IN_PROGRESS: { label: "In Progress ", color: "violet" },
  CLOSED: { label: "Closed ", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
