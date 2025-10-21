export interface RequestResponse {
  status: "success" | "failure";
  message: string;
  data: any | null;
  errors?: FieldError[];
}

export interface FieldError {
  field: string;
  message: string;
}
