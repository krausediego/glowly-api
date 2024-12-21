export interface NodemailerManager {
  sendMail(props: NodemailerManager.SendMailProps): Promise<void>;
}

export namespace NodemailerManager {
  export interface SendMailProps {
    email: string;
    code: string;
  }
}
