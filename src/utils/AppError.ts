type Variant = "error" | "warning" | "success";

export class AppError {
  public readonly message: string;
  public readonly variant: Variant;

  constructor(message: string, variant: Variant) {
    this.message = message;
    this.variant = variant;
  }
}
