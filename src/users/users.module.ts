import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { IsUnique } from './validator/Validator-user';

/**
 * Módulo de Usuarios
 * Este módulo se encarga de agrupar todos los componentes relacionados con
 * la gestión de usuarios, incluyendo controladores, servicios, validadores y entidades.
 */
@Module({
  /**
   * Se importan aquí los módulos necesarios. `TypeOrmModule.forFeature` permite
   * que el repositorio de la entidad `Users` esté disponible para inyección
   * dentro de este módulo.
   */
  imports: [
    TypeOrmModule.forFeature([Users]),
  ],

  /**
   * Controladores que pertenecen a este módulo.
   * `UserController` maneja las rutas y peticiones HTTP relacionadas con los usuarios.
   */
  controllers: [UserController],

  /**
   * Proveedores registrados en este módulo.
   * Aquí se incluyen los servicios (`UserService`) y validadores personalizados (`IsUnique`),
   * los cuales estarán disponibles para inyección solo dentro de este módulo.
   */
  providers: [
    UserService,
    IsUnique,
  ],

  /**
   * Elementos que se exportan para ser utilizados en otros módulos.
   * Al exportar el `UserService` y el `TypeOrmModule`, estos podrán ser
   * importados en módulos externos que necesiten acceder a ellos.
   */
  exports: [
    TypeOrmModule,
    UserService,
  ]
})
export class UserModule {}
