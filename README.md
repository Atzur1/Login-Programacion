# Login - La Batcueva

Pantalla de inicio de sesión hecha con **Angular 22** que se conecta a la API [ApiGestionProgramacion](https://github.com/Atzur1/Programacion) y usa **JWT** para autenticar.

## Qué hace

- Formulario reactivo (`FormGroup`) con validación de correo y clave.
- Envía las credenciales a `POST /api/User/login`.
- Si son incorrectas, muestra el mensaje de error que devuelve la API.
- Si son correctas, guarda el token en `localStorage` y muestra los datos del usuario y el token.
- Un interceptor agrega `Authorization: Bearer <token>` a cada petición.
- Al recargar la página, si hay un token guardado, consulta `GET /api/User/me` para validarlo y restaurar la sesión. Si venció o es inválido, lo borra.

## Estructura

```
src/app/
├── models/login.model.ts            # LoginModel y UserResponse (coinciden con los DTOs de C#)
├── services/user.service.ts         # Comunicación con la API (login, getProfile, token)
├── interceptors/auth.interceptor.ts # Agrega el Bearer token a las peticiones
├── login/                           # Componente de login (ts, html, css)
└── app.config.ts                    # provideHttpClient + interceptor
```

## Recorrido de los datos

1. El usuario completa el formulario y el `LoginComponent` ejecuta `login()`.
2. `UserService` hace el POST con `HttpClient`.
3. En la API, `LoginDTO` recibe los datos y `UserController` busca al usuario con `UserDAO` (Entity Framework + MySQL).
4. BCrypt verifica la contraseña contra el hash guardado.
5. Si coincide, la API genera el JWT y lo devuelve en un `UserResponseDTO`.
6. Angular guarda el token y lo envía en las siguientes peticiones.

## Requisitos

- Node.js y npm
- Angular CLI (`npm install -g @angular/cli`)
- La API corriendo en `http://localhost:5010` (ver su README)

## Cómo ejecutarlo

```bash
npm install
ng serve
```

Abrí `http://localhost:4200`. Si la API está en otra dirección, cambiá `API_URL` en `src/app/services/user.service.ts`.

## Probar el login

Registrá un usuario desde Swagger (`http://localhost:5010/swagger`, `POST /api/User/register`) y usá ese correo y clave en la pantalla.

## Comandos útiles

```bash
ng build   # compila para producción en dist/
```
