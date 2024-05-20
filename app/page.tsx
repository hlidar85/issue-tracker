import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./issues/IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const open = await prisma.issue.count({ where: { statusId: "OPEN" } });
  const inprogress = await prisma.issue.count({
    where: { statusId: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { statusId: "CLOSED" } });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inprogress} closed={closed} />
        <IssueChart open={open} inProgress={inprogress} closed={closed} />;
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
