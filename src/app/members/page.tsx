import Link from "next/link";


const MembersPage = () => {
  return (
    <div>
        <h2 className="text-2xl">This will be a members page</h2>
        <Link href="/">
            Go back home
        </Link>
    </div>
  )
}

export default MembersPage;