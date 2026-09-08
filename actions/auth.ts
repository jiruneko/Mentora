"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";

import prisma from "@/lib/db/prisma";

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "名前を入力してください")
    .max(50, "名前は50文字以内で入力してください"),

  email: z
    .string()
    .trim()
    .email("正しいメールアドレスを入力してください"),

  password: z
    .string()
    .min(8, "パスワードは8文字以上にしてください"),
});

export type SignupState = {
  success: boolean;
  message: string;
};

export async function signup(
  _previousState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.issues[0]?.message ??
        "入力内容を確認してください",
    };
  }

  const { name, email, password } = parsed.data;

  const normalizedEmail = email.toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "このメールアドレスはすでに登録されています",
    };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email: normalizedEmail,
      passwordHash,

      mentoraProfile: {
        create: {},
      },
    },
  });

  return {
    success: true,
    message: "アカウントを作成しました",
  };
}