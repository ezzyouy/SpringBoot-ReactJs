class MessageModel {
  id: number;
  userEmail: string;
  title: string;
  question: string;
  adminEmail: string;
  response: string;
  closed: string;

  constructor(title: string, question: string) {
    this.title = title;
    this.question = question;
  }
}

export default MessageModel;
