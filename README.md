# ##############################################################################################################
# Mi Proyecto NodeJs
# ##############################################################################################################
Proyecto NodeJs, con MongoDB y CRUD de usuarios.
Uso de tokens de sesion grabados en MongoDb.
Encriptación de password de usuarios con acceso de sesion.

22/04/2024: CRUD de Clientes
El CRUD registra que usuario autentificado por token realiza la accion.
Se añade delete logico y delete fisico en la base de datos.

# ##############################################################################################################
# Author del Proyecto
# ##############################################################################################################
Author: Stefania Panchana
Correo: stefaniapanchanaj@hotmail.com


# ##############################################################################################################
# Run Project
# ##############################################################################################################
npm run dev
npm run start

# ##############################################################################################################
# Redis
# ##############################################################################################################
Usado para los get de Usuarios y Clientes, a fin de minizar el impacto de tiempo cuando se consultan estos datos.

# ##############################################################################################################
# Bull Test
# ##############################################################################################################
En la ruta [/bull](http://localhost:3000/bull) se lanzara una prueba de 5 iteraciones para un mensaje en pantalla, 
esta prueba esta cacheada en memoria con la configuración de 10 minutos.