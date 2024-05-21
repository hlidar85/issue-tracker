import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Select, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <ChangeIssueStatus status={issue.statusId} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

const ChangeIssueStatus = async ({ status }: { status: string }) => {
  const statuses = await prisma.status.findMany();
  return (
    <Select.Root value={status}>
      <Select.Trigger variant="ghost" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.id} value={status.id}>
            {" "}
            <IssueStatusBadge status={status.id} />
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueDetails;
