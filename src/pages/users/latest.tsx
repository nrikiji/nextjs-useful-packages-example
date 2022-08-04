import type { NextPage } from "next";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { fetchUsers } from "@/services/user";

const LatestUsers: NextPage = () => {
  const { isLoading, isError, data: users } = useQuery(["fetchUsers"], fetchUsers);

  if (isError) return <>Error</>;
  if (isLoading) return <>Loading</>;

  return (
    <Layout title="Latest User">
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

export default LatestUsers;
