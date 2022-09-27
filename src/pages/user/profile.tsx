import { useUser } from "@auth0/nextjs-auth0";
import { UserProfile } from "src/components/UserProfile";
import { useQuery } from "react-query";
import { getOrCreateUser } from "src/utils/User";
import Layout from "src/components/layout/Layout";
import Loading from "src/components/Loading";
import { BannedAlert } from "src/components/Banned";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { user, isLoading: userLoading } = useUser();
  const { data: userDb, isLoading } = useQuery(
    ["userDb", user, userLoading],
    () => !userLoading && user && getOrCreateUser(user)
  );
  if (!userLoading && !user) {
    router.push("/api/auth/login");
    return <div></div>;
  }
  if (!isLoading && userDb && !userDb.data.active) {
    return <BannedAlert />;
  }
  if (isLoading) return <Loading />;

  return (
    userDb &&
    !isLoading && (
      <Layout>
        <UserProfile user={userDb} />
      </Layout>
    )
  );
}
