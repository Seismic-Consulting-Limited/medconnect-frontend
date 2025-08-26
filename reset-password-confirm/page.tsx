// Redirect /reset-password-confirm?uid=...&token=... -> /user/auth/reset/new?uid=...&token=...
import { redirect } from "next/navigation"

export default function ResetPasswordConfirmRedirect({
  searchParams,
}: {
  searchParams?: { uid?: string; token?: string }
}) {
  const uid = searchParams?.uid ?? ""
  const token = searchParams?.token ?? ""

  const target =
    uid && token
      ? `/user/auth/reset/new?uid=${encodeURIComponent(uid)}&token=${encodeURIComponent(token)}`
      : `/user/auth/reset`

  redirect(target)
}
