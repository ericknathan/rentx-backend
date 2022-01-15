interface IMailProvider {
  sendMail(to: string, subject: string, variables: object, template: ({}) => string): Promise<void>;
}

export { IMailProvider };