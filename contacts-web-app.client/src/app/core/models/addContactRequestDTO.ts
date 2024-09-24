export class AddContactRequestDTO {
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public phone: string
  ) {}
}
