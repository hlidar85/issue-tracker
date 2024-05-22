"use client";
import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { data } from "autoprefixer";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export const ChangeIssueStatus = async ({
  status,
  statuses,
  issueId,
}: {
  status: string;
  statuses: Status[];
  issueId: number;
}) => {
  const router = useRouter();
  const selectOnValueChangeHandler = async (value: string) => {
    await axios
      .patch("/api/issues/" + issueId, { statusId: value })
      .catch((error) => toast.error("Changes could not be saved"));
    router.refresh();
  };
  return (
    <>
      <Select.Root
        defaultValue={status}
        onValueChange={selectOnValueChangeHandler}
      >
        <Select.Trigger variant="ghost" />
        <Select.Content>
          <Select.Group>
            {statuses.map((status) => (
              <Select.Item key={status.id} value={status.id}>
                <IssueStatusBadge status={status.id} />
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};
