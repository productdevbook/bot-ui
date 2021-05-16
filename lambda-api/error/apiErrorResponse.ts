export interface APIErrorResponse {
  error: string;
  message: string;
  details?: Record<string, any>;
}
