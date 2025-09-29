import { useEffect } from "react";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    // Immediately redirect to welcome screen
    router.replace('/welcome');
  }, []);

  // Return null since we're redirecting immediately
  return null;
}
