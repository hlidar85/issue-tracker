"use client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push(`/issues/edit/${issueId}`)}>
      <Pencil2Icon />
      Edit
    </Button>
  );
};

export default EditIssueButton;
