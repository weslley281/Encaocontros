import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { IUserRepository } from '../../repositories/IUserRepository';
import dotenv from 'dotenv';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    user_id: number;
    name: string;
    email: string;
  };
  token: string;
}

class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {
    dotenv.config();
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email ou senha incorretos 1!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email ou senha incorretos 2!');
    }

    const token = sign({}, process.env.JWT_SECRET || '', {
      subject: user.user_id.toString(),
      expiresIn: process.env.TOKEN_EXPIRATION || '1d',
    });

    return {
      user: { 
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
