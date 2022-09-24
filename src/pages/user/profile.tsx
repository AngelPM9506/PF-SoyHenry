import { useUser } from "@auth0/nextjs-auth0";
import { UserProfile } from "src/components/UserProfile";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import Layout from "src/components/layout/Layout";
import Loading from "src/components/Loading";
import { BannedAlert } from "src/components/Banned";

export default function Profile() {
  const { user, error } = useUser();
  const { data: userDb, isLoading } = useQuery(
    ["userDb", user],
    () => user && getOrCreateUser(user)
  );
  if (!isLoading && userDb && !userDb.data.active) {
    return <BannedAlert />;
  }
  if (isLoading) return <Loading />;
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
