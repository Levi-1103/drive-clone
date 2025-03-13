import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";

import db from "@/db";
import { folders_table } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  if (!session?.user)
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col">
            <h1>Drive Clone</h1>
            <SignIn />
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

        </footer>
      </div>
    );


  const rootFolder = await db.select().from(folders_table).where(
    and(eq(folders_table.owner_id, session?.user?.id!), isNull(folders_table.parent_id))
  );

  console.log(rootFolder)

  if (!rootFolder[0]) {
    const createRootFolder = await db.insert(folders_table).values(
      {
        name: "root",
        owner_id: session?.user?.id!,
        parent_id: null,
      }
    ).returning({ insertedId: folders_table.id });
    return redirect(`/drive/f/${createRootFolder[0].insertedId}`)
  }

  const rootFolderId = rootFolder[0].id
  return redirect(`/drive/f/${rootFolderId}`)
}
