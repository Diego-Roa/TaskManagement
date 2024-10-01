# TaskManagement
## Tabla de contenidos
- Descripción
- Caracteristicas
- Tecnologias utilizadas
- Arquitectura del sistema
- Decisiones de diseño
- Instalación
  - Requisitos previos
  - Clonar el repositorio
  - Configuración del Backend (.Net)
  - Configuración del Frontend (Angular)
- Consideraciones especiales

## Descripción
El Sistema de Gestión de Tareas es una aplicación web diseñada para facilitar la administración y seguimiento de tareas. Implementa autenticación basada en JWT y asignación de roles para asegurar y gestionar el acceso de los usuarios. La aplicación está construida con una arquitectura orientada a microservicios, utilizando .NET para el backend y Angular para el frontend.

## Características

- Autenticación JWT: Seguridad robusta mediante tokens JWT.
- Asignación de Roles: Gestión de permisos y accesos diferenciados.
- Microservicios: Arquitectura escalable y modular.
- Interfaz Intuitiva: Frontend desarrollado en Angular para una experiencia de usuario fluida.
- Gestión de Tareas: Crear, asignar, actualizar y eliminar tareas fácilmente.

## Tecnologias utilizadas

### Backend
- .NET 8: Framework principal.
- ASP.NET Core: Para la creación de APIs REST.
- Entity Framework Core: ORM para la gestión de la base de datos.

### Frontend
- Angular 18: Framework de desarrollo web
- Angular Material: Componentes de interfaz de usuario

### Base de datos
- SQL Server

## Arquitectura del sistema
El sistema esta diseñado bajo una **arquitectura orientada a microservicios**, lo que permite una mayor escabilidad, flexibilidad y facilidad de mantenimiento. A continuación se detalla la estructura principal:

1. Capa de controladores
  - Como su nombre lo indica en esta capa se encuentran los controladores del aplicativo y principsles configuraciones como     **IdentityDataInitializaer**
2. Capa de Servicios
  - En esta capa se concentra la logica de negocio conformadoa por los servicios, interfaces, DTO's y repositorios.
3. Capa de acceso a datos
  - Aqui se encuentra la conexion a la base de datos, **ApplicationDbContext**, entidades y las migraciones.

## Decisiones Técnicas
- Se eligió una arquitectura de microservicios para permitir escalabilidad independiente y facilitar el mantenimiento a largo plazo.
- JWT para Autenticación: Para la autenticacion con token se utilizo **IdentityServer**.
  > [!NOTE]
  > IdentityServer tambien se implemento para la gestión de usuarios y roles.

- Uso de Seeders de EF para poblar datos por defecto que lo requieran, por ejemplo la tabla de roles de usuarios y los permisos

- Implementacion de una metodología o arquitectura de unidad de trabajo *(UnitOfWork)* para las transacciones hacia la base de datos, esto garantiza agilidad en desarrollo, puesto que las acciones simples para cada entidad quedan automatizadas y genericas.

- Uso de formularios reactivos para la creación y actualización de usuarios y/o tareas

## Instalación
### Requisitos previos
- .NET 8 SDK
- Node.js y npm
- Angular CLI
- SQL Server
- Git

### Clonar el repositorio
   ```
   git clone 
   ```
### Configuración del backend
1. Abrir el archivo *TareasJWT.sln*
2. Configurar la cadena de conexión hacia la base de datos en el *appsettings.json* y *appsettings.Development.json*
```
  {
    "ConnectionStrings": {
      "DefaultConnection": "Server=localhost;Database=task_management;User Id=sa;Password=123456;Trusted_Connection=False;MultipleActiveResultSets=true;TrustServerCertificate=True"
    },
    "Jwt": {
      "Key": "TaskManagementSebastian10!27092024",
      "Issuer": "TaskManagement",
      "Audience": "TaskManagementClients",
      "ExpiresInMinutes": 90
    },
    "IdentityServer": {
      // Configuraciones específicas de IdentityServer
    },
    // Otras configuraciones
    "Logging": {
      "LogLevel": {
        "Default": "Information",
        "Microsoft.AspNetCore": "Warning"
      }
    },
    "AllowedHosts": "*"
  }
```
3. Por consola dirigirse al paquete principal y ejecutar el comando para cargar la base de datos indicando la raiz del proyecto

```
dotnet ef database update --project ../TaskManagement.DataAccess
```

4. Una vez realizada la migración ejecute el siguiente comando para iniciar el aplicativo
```
dotnet run
```

### Configuración del Frontend
1. Navega al directorio de TaskManagementFront y instala las dependencias:
```
npm i
```
2. Configura las variables de entorno en settings.ts segun el puerto en que se despliegue el backend:
```
export const appsettings = {
    apiUrl: "http://localhost:5224"
}
```
3. Inicia el servidor
```
ng serve
```
4. Abre tu navegador en http://localhost:4200.

## Consideraciones especiales

- Las contraseñas que se le asignen a los usuarios deben cumplir con al menos letras minusculas, mayusculas, números y caracteres especiales.

- El usuario inicial es:

    | Usuario          | Contraseña    |
    | -------------    | ------------- |
    | sebas@gmail.com  | 123456*Abc    |
