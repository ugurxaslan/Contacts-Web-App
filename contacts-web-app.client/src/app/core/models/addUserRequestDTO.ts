export class AddUserRequestDTO {
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public encrypted_Password: string | null
  ) {}
}
