export const getDomain = () => {
  return new URL(
    process.env.NODE_ENV === "production"
      ? "https://coffee-stores-discover.vercel.app"
      : "http://localhost:3000"
  );
};
