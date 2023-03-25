import { useRouter } from "next/router";
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const saveUser = useCallback((token) => {
    sessionStorage.setItem("pxl-token", token);
    setUser({ token });
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem("pxl-token");
    sessionStorage.removeItem("wallet");
    sessionStorage.removeItem("item");
    sessionStorage.removeItem("collection");
    setUser(null);
    router.push("/");
  }, []);

  useEffect(() => {
    const fetchUser = () => {
      const token = sessionStorage.getItem("pxl-token");
      if (token && typeof token === "string") {
        setUser({ token });
      }
    };

    fetchUser();
  }, []);

  // memoize the full context value
  const contextValue = useMemo(
    () => ({
      user,
      signOut,
      saveUser,
    }),
    [user, signOut, saveUser]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
