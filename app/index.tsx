import { useRouter } from "expo-router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("in inex Redirecting to Login Screen");
      
      router.push("/login");
    }, 500);

    // Clear timeout on unmount
    return () => clearTimeout(timer);
  }, [router]);

  
};

export default Index;


