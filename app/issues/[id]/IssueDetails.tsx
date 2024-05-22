"use client";
import { Issue, Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { ChangeIssueStatus } from "./ChangeIssueStatus";
import prisma from "@/prisma/client";

const IssueDetails = ({
  issue,
  statuses,
}: {
  issue: Issue;
  statuses: Status[];
}) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <ChangeIssueStatus
          status={issue.statusId}
          statuses={statuses}
          issueId={issue.id}
        />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
