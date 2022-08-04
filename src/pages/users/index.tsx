import type { NextPage, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import { fetchUsers } from "@/services/user";
import { User } from "@/types/user";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { selectToken, clearToken } from "@/features/auth/authSlice";

interface Props {
  users: User[];
}

const Users: NextPage<Props> = ({ users }) => {
  const router = useRouter();
  if (router.isFallback) return <>Loading</>;

  const dispatch = useAppDispatch();
  const currentToken = useAppSelector(selectToken);

  return (
    <Layout title="Users">
      <Link href={`/users/latest`}>
        <a>latest</a>
      </Link>
      {currentToken ? (
        <a onClick={(e) => dispatch(clearToken())}>Logout</a>
      ) : (
        <Link href="/login">
          <a>Login</a>
        </Link>
      )}
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              <a>
                {user.id}:{user.email}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Users;

export async function getStaticProps(context: GetStaticPropsContext) {
  const users = await fetchUsers();

  return {
    props: { users },
    //revalidate: 10,
  };
}
