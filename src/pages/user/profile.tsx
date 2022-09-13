import { useUser } from "@auth0/nextjs-auth0";
import { UserProfile } from "src/components/UserProfile";
export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <UserProfile user={user} />
      </div>
    )
  );
}
