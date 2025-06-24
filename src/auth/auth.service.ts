// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Contraseña incorrecta');

    const storages = user.managedStorages;

    if (storages.length === 0) {
      throw new BadRequestException('Este usuario no administra ninguna bodega');
    }

    if (storages.length === 1) {
      const storage = storages[0];
      const payload = {
        sub: user.id,
        username: user.username,
        role: user.Rol.nameRol,
        storageId: storage.id,
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          username: user.username,
          role: user.Rol.nameRol,
          storage: { id: storage.id, name: storage.nameStorage },
        },
        message: 'Login exitoso',
      };
    }

 
    return {
      message: 'Selecciona una bodega para continuar',
      user: {
        id: user.id,
        username: user.username,
        role: user.Rol.nameRol,
        storages: storages.map((s) => ({
          id: s.id,
          name: s.nameStorage,
        })),
      },
    };
  }

  async loginWithStorage(username: string, storageId: number) {
    const user = await this.userService.findByUsername(username);
    const hasAccess = user?.managedStorages.some(s => s.id === storageId);

    if (!hasAccess) {
      throw new UnauthorizedException('No tienes acceso a esta bodega');
    }

    const payload = {
      sub: user?.id,
      username: user?.Rol,
      role: user?.Rol.nameRol,
      storageId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user?.id,
        username: user?.username,
        role: user?.Rol.nameRol,
        storageId,
      },
      message: 'Login exitoso',
    };
  }
}
