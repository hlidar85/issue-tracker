import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./issues/IssueSummary";
import prisma from "@/prisma/client";

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
  return <IssueSummary open={open} inProgress={inprogress} closed={closed} />;
}
