import { defaultLocale } from "@/i18n-config"
import { usePathname } from "next/navigation"

export const useGetLanguage = () => {
    const pathName = usePathname()

    if (!pathName) return {lang: defaultLocale}
    return {lang: pathName.split("/")[1] ?? defaultLocale}
}