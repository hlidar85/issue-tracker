import prisma from "@/prisma/client";

import Pagination from "@/app/components/Pagination";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.order }
    : undefined;
  const where = { statusId: searchParams.status };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where: where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
