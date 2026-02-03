import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/core/validators/register.schema";
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

export class AuthService {
    static async validateCredentials(email: string, password: string) {
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) return null;
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return null;
  
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }
  }