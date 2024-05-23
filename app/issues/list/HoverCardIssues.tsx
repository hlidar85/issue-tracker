import { Issue, Status } from "@prisma/client";
import { HoverCard } from "@radix-ui/themes";
import Link from "next/link";
import IssueDetailPage from "../[id]/page";

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
      <HoverCard.Content maxWidth="800px">
        <IssueDetailPage params={{ id: issue.id.toString() }} />
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default HoverCardIssues;
