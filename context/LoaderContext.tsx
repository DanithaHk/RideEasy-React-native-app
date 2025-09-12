import { createContext, useState } from "react";

interface LoaderContextType {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextType >({
    isLoading: true,
    setLoading: () => {},
});
export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);   
  return (
    <LoaderContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}
