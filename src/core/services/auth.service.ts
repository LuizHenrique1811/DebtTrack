import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/core/validators/register.schema";
import { LoginSchema } from "@/core/validators/login.schema";
import { UserAlreadyExistsError, InvalidCredentialsError } from "@/core/errors/auth.errors";

export async function createUser(data: RegisterSchema) {

  // Verificar se o email já está em uso
  const existingUser = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (existingUser) {
    throw new UserAlreadyExistsError();
  }
  
  // Gerar hash da senha
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });
}

export async function login(data: LoginSchema) {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    throw new InvalidCredentialsError();
  }
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new InvalidCredentialsError();
  }
}