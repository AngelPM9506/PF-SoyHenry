import { UserData } from "src/components/UserProfile";
import { useQuery } from "react-query";
import { getUserDetail } from "src/utils/userDetail";
import Layout from "src/components/layout/Layout";
// import UserDetail from "src/components/userDetail";
import UserDetail from "src/components/UserDetail";

export interface Props {
  userPath: UserData;
  id: string;
}

export const ProfileDetail = (props: Props) => {
  const { data: userDetail, isLoading } = useQuery(
    ["userDetail", props.id],
    () => props.id && getUserDetail(props.id)
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <UserDetail userDetail={userDetail} />
    </Layout>
  );
};

export default ProfileDetail;

export const getStaticPaths = async (context: any) => {
  const data = await fetch("http://localhost:3000/api/users");
  const users = await data.json();
  const paths = users.map((u: UserData) => {
    const id = u.id;
    return { params: { id } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { id } = params;
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  const user = await res.json();
  return {
    props: {
      userPath: user,
      id: id,
    },
  };
};
