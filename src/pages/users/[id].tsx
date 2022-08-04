import type { NextPage, GetServerSidePropsContext } from "next";
import { Layout } from "@/components/layout";
import { fetchUser } from "@/services/user";
import { User } from "@/types/user";

interface Props {
  user: User;
}

const UserDetail: NextPage<Props> = ({ user }) => {
  return (
    <Layout title="User">
      {user.id}:{user.email}
    </Layout>
  );
};

export default UserDetail;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await fetchUser(Number(context.params?.id));

  return { props: { user } };
}
