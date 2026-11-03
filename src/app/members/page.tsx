import { getCurrentUser } from "@/lib/auth";
import { Surface } from "@heroui/react";
import Link from "next/link";

// export const dynamic = "force-dynamic";

const MembersPage = async () => {

  // const user = await getCurrentUser();
  return (
    <div>
        <h2 className="text-2xl">This will be a members page</h2>
        <Link href="/">
            Go back home
        </Link>
        {user ? (
          <Surface className="p-4 rounded-2xl">
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </Surface>
          ) : (
            <div> Not signed in</div>
          )}
    </div>
  )
}

export default MembersPage;