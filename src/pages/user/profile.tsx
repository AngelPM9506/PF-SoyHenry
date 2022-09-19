import { useUser } from "@auth0/nextjs-auth0";
import { UserProfile } from "src/components/UserProfile";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import Nav from "src/components/layout/Nav";
import Layout from "src/components/layout/Layout";

export default function Profile() {
  const { user, error } = useUser();
  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    userDb &&
    !isLoading && (
      <Layout>
        <UserProfile user={userDb} />
      </Layout>
    )
  );
}
