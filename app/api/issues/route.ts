import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { data } from "autoprefixer";
import { title } from "process";
import { describe } from "node:test";
import { createIssueSchema } from "../../validationSchemas";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  console.log(body);
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
