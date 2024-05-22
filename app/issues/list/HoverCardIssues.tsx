"use client";

import { HoverCard } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueDetails from "../[id]/IssueDetails";
import { Issue, Status } from "@prisma/client";

const HoverCardIssues = ({
  issue,
  statuses,
}: {
  issue: Issue;
  statuses: Status[];
}) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <IssueDetails issue={issue} statuses={statuses} />
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default HoverCardIssues;
