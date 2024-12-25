export interface AwsManager {
  uploadS3(props: AwsManager.UploadS3Props): Promise<string>;
}

export namespace AwsManager {
  export interface UploadS3Props {
    bucket: string;
    key: string;
    body: Buffer;
    contentType: string;
  }
}
