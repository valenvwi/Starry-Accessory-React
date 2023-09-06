import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";

export const useFetchUserEmail = () => {
  const { authState } = useOktaAuth();
  const [userEmail, setUserEmail] = useState<string>();

  useEffect(() => {
    const fetchUserEmail = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `http://localhost:8080/orderHistory/getEmail`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const responseText = await response.text();
        console.log(`useremail: ${responseText}`);
        setUserEmail(responseText);
      }
    };

    fetchUserEmail();
  }, [authState, authState?.isAuthenticated]);

  return userEmail;
};
