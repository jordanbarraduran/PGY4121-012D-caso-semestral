// Clase | Usuario //
export class User {
  // Atributos //
  username: string;
  password: string;

  // Constructor //
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  // Método | Cambiar contraseña ||
  changePassword(newPassword: string) {
    this.password = newPassword;
  }
}

// // Clase | Lista de Usuarios //
export class UserList {
  // Lista de usuarios //
  userList: User[] = [];

  // Agregar Usuario //
  addUser(...users: User[]): UserList {
    users.forEach((user) => {
      this.userList.push(user);
    });
    return this;
  }

  // Buscar Usuario //
  searchUser(username: string): boolean {
    let userExists: boolean = false;

    while (userExists === false) {
      // Por cada usuario en lista de usuarios
      this.userList.forEach((user) => {
        // Revisar si existe el usuario ingresado
        if (user.username === username) {
          userExists = true;
        }
      });
    }
    return userExists;
  }

  // Validar contraseña //
  validatePassword(username: string, password: string) {
    let validPassword: boolean = false;

    this.userList.forEach((user) => {
      if (user.username === username && user.password === password) {
        validPassword = true;
      }
    });
    return validPassword;
  }

  // Obtener Lista de Usuarios //
  getUserList() {
    return this.userList;
  }
}
