import { getCurrentUser } from "@/lib/auth";
import { Surface } from "@heroui/react";
import Link from "next/link";
import { Suspense } from "react";

// export const dynamic = "force-dynamic";

const CurrentUser = async () => {
  const user = await getCurrentUser();
  return user ? (
    <Surface className="p-4 rounded-2xl">
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Surface>
  ) : (
    <div> Not signed in</div>
  );
};


const MembersPage = async () => {

  return (
    <div>
      <h2 className="text-2xl">This will be a members page</h2>
      <Link href="/">
        Go back home
      </Link>
      <Suspense
        fallback={<div>Loading...</div>}>
        <CurrentUser />
      </Suspense>
    </div>
  )
}

export default MembersPage;