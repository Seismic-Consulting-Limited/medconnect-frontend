// Server component that redirects /user/auth/reset/confirm → /user/auth/reset/new
import { redirect } from "next/navigation"

type SP = { [key: string]: string | string[] | undefined }

export default function Page({ searchParams }: { searchParams?: SP }) {
  const params = new URLSearchParams()
  if (searchParams) {
    Object.entries(searchParams).forEach(([k, v]) => {
      if (Array.isArray(v)) v.forEach((val) => params.append(k, String(val)))
      else if (v != null) params.set(k, String(v))
    })
  }
  const qs = params.toString()
  redirect(`/user/auth/reset/new${qs ? `?${qs}` : ""}`)
}
