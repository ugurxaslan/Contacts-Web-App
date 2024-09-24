import { AddUserRequestDTO } from './addUserRequestDTO';

export class User {
  constructor(
    public id: string,
    public name: string,
    public surname: string,
    public email: string
  ) {}

  static to_addRequestDTO(user: User) {
    return new AddUserRequestDTO(user.name, user.surname, user.email, null);
  }
}
