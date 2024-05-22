import { IssueStatusBadge } from "@/app/components";
import { Issue, Prisma } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Avatar, HoverCard, Table } from "@radix-ui/themes";
import { default as Link, default as NextLin } from "next/link";
import IssueDetailPage from "../[id]/page";
import IssueDetails from "../[id]/IssueDetails";
import prisma from "@/prisma/client";
import HoverCardIssues from "./HoverCardIssues";

export interface IssueQuery {
  status: string;
  orderBy: keyof Issue;
  order: "asc" | "desc" | null;
  page: string;
}

type IssueWhitUser = Prisma.IssueGetPayload<{
  include: { assignedToUser: true };
}>;

interface Props {
  searchParams: IssueQuery;
  issues: IssueWhitUser[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const order = searchParams.order === "asc" ? "desc" : "asc";
  const statuses = await prisma.status.findMany();

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLin
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    order:
                      searchParams.order === "asc" &&
                      searchParams.orderBy === column.value
                        ? "desc"
                        : "asc",
                  },
                }}
              >
                {column.label}
              </NextLin>
              {column.value === searchParams.orderBy &&
                searchParams.order === "asc" && (
                  <ArrowUpIcon className="inline" />
                )}
              {column.value === searchParams.orderBy &&
                searchParams.order === "desc" && (
                  <ArrowDownIcon className="inline" />
                )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <HoverCardIssues issue={issue} statuses={statuses} />
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.statusId} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.statusId} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.assignedToUser?.name}
              {issue.assignedToUser && (
                <Avatar
                  ml="3"
                  src={issue.assignedToUser.image!}
                  fallback="?"
                  size="2"
                  radius="full"
                  referrerPolicy="no-referrer"
                />
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "statusId", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  {
    label: "Assigned to",
    value: "assignedToUserId",
    className: "hidden md:table-cell",
  },
];
export const columnNames = columns.map((column) => column.value);
export default IssueTable;
