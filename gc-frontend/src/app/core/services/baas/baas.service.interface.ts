export interface IBaasService {
  authWithPassword(email: string, password: string): Promise<any>;
  isAuthValid(): boolean;
  getAuthUser(): { id: string; email: string };
  logoutUser(): void;
}
