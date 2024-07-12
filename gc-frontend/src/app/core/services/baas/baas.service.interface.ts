export interface IBaasService {
    authWithPassword(email: string, password: string): Promise<boolean>;
    isAuthValid(): boolean;
    getAuthUser(): { id: string; email: string };
    logoutUser(): void;
}
