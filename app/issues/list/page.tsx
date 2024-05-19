import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import NextLin from "next/link";
import IssueActions from "./IssueActions";
import { Issue } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: string; orderBy: keyof Issue };
}) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "statusId", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const issues = await prisma.issue.findMany({
    where: { statusId: searchParams.status },
    orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLin
                  href={{ query: { ...searchParams, orderBy: column.value } }}
                >
                  {column.label}
                </NextLin>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

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
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
