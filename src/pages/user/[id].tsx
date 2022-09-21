import { UserData } from "src/components/UserProfile";
import { useQuery } from "react-query";
import { getUserDetail } from "src/utils/userDetail";
import Layout from "src/components/layout/Layout";
// import UserDetail from "src/components/userDetail";
import UserDetail from "src/components/UserDetail";
import axios from "axios";
import usersControllers from "src/controllers/users";
import { GetServerSideProps } from "next/types";

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
  console.log(userDetail);
  return (
    <Layout>
      <UserDetail userDetail={userDetail} />
    </Layout>
  );
};

export default ProfileDetail;

// export const getStaticPaths = async (context: any) => {
//   const data = await usersControllers.getUsers();
//   const users = await data;
//   const paths = users.map((u: any) => {
//     const id = u.id;
//     return { params: { id } };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async ({ params }: any) => {
//   const { id } = params;
//   const res = await usersControllers.getUser({ id: id.toString() });
//   const user = await res;
//   return {
//     props: {
//       userPath: user,
//       id: id,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await axios.get(`/users/${id}`);
  const user = response.data;
  return {
    props: {
      user: user,
      id: id,
    },
  };
};
