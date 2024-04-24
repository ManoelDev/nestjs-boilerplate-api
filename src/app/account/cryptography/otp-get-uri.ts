export abstract class OTPUri {
  abstract getUri(recipient: string, appName: string, secret: string): string;
}
