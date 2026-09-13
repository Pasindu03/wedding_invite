import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LanguageSelector() {
  const router = useRouter();

  useEffect(() => {
    router.push("/en");
  }, [router]);

  return null;
}