import { ClientLoginProp } from "@/types/client.type";
import { RequestResponse } from "@/types/response.type";
import { ResetPasswordConfirmation } from "@/types/user.type";
import { post } from "@/utils/request";
import { getRefreshToken } from "@/utils/token";

export async function loginService(data: ClientLoginProp) {
    return await post<RequestResponse>('/auth/signin/', {email: data?.email, password: data?.password});
}

export async function loginViaOtpService(email: string) {
    return await post<RequestResponse>('/auth/signin/otp/', {email});
}


export async function resendOtpService(email: string): Promise<any | null> {
    return await post<RequestResponse>('/auth/signup/otp/resend/', {email});
}

export async function verifySignupOtpService(email: string, otp: string): Promise<any | null> {
    return await post<RequestResponse>('/auth/signup/otp/verify/', {email, otp});
}

export async function verifySigninOtpService(email: string, otp: string): Promise<any | null> {
    return await post<RequestResponse>('/auth/signin/otp/verify/', {email, otp});
}

export async function resetPasswordService(email: string): Promise<any | null> {
        return await post<RequestResponse>('/auth/password-reset/', {email});
}

export async function resetPasswordConfirmationService(data: ResetPasswordConfirmation): Promise<any | null> {
    return await post<RequestResponse>('/auth/password-reset/confirm/', data);
}

export async function logoutService(): Promise<any | null> {
    const refresh_token = getRefreshToken()
    return await post<RequestResponse>('/auth/signout/', {
        refresh_token
    });
}
