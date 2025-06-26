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

  async login(email: string, password: string) {
    const user = await this.userService.findByUsername(email);

    if (!user) throw new UnauthorizedException('Usuario no encontrado');


    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Contraseña incorrecta');

    const storages = user.managedStorages ?? [];

    // Si es storage_admin y no administra ninguna bodega, lanzar error
    if (user.Rol.nameRol === 'storage_admin' && storages.length === 0) {
      throw new BadRequestException('Este usuario no administra ninguna bodega');
    }


    const isStorageAdmin = user.Rol.nameRol === 'storage_admin';

    if (!isStorageAdmin || storages.length === 1) {
      const storage = storages[0] ?? null;

      const payload = {
        sub: user.id,
        username: user.username,
        role: user.Rol.nameRol,
        email: user.email,
        business: user.Business,
        storageId: storage?.id ?? null,
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.Rol.nameRol,
          business: user.Business,
          storage: storage
            ? { id: storage.id, name: storage.nameStorage }
            : null,
        },
        message: 'Login exitoso',
      };
    }


    return {
      message: 'Selecciona una bodega para continuar',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.Rol.nameRol,
        business: user.Business,
        storages: storages.map((s) => ({
          id: s.id,
          name: s.nameStorage,
        })),
      },
    };
  }


  async loginWithStorage(email: string, storageId: number) {
    const user = await this.userService.findByUsername(email);
    const hasAccess = user?.managedStorages.some(s => s.id === storageId);

    if (!hasAccess) {
      throw new UnauthorizedException('No tienes acceso a esta bodega');
    }

    const payload = {
      id: user?.id,
      business: user?.Business,
      username: user?.username,
      email: user?.email,
      role: user?.Rol.nameRol,
      storageId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user?.id,
        business: user?.Business,
        username: user?.username,
        email: user?.email,
        role: user?.Rol.nameRol,
        storageId,
      },
      message: 'Login exitoso',
    };
  }
}
