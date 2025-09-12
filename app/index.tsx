import { useRouter } from "expo-router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 500);

    // Clear timeout on unmount
    return () => clearTimeout(timer);
  }, [router]);

  
};

export default Index;


