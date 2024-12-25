import AWS from 'aws-sdk';

import { AwsManager } from '@/domain/interfaces';
import env from '@/main/config/environments/aws';

export class Aws implements AwsManager {
  private readonly S3: AWS.S3;

  constructor() {
    this.S3 = new AWS.S3({
      accessKeyId: env.accessKeyId,
      secretAccessKey: env.secretAccessKey,
      region: 'us-east-2',
    });
  }

  async uploadS3(props: AwsManager.UploadS3Props): Promise<string> {
    const { bucket, key, body, contentType } = props;

    const upload = await this.S3.upload({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      // ACL: acl,
    }).promise();

    return upload.Location;
  }
}
