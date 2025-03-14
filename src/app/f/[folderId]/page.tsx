import { auth } from "@clerk/nextjs/server";
import DriveContents from "./drive-contents";
import { z } from "zod";
import { QUERIES } from "~/server/db/queries";
import { redirect } from "next/navigation";

const safeParams = z.object({
  folderId: z.coerce.number(),
});

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const { folderId } = safeParams.parse(params);

  const session = await auth();
  if (!session.userId) {
    console.log("not logged in");
    return redirect("/sign-in");
  }

  const folder = await QUERIES.getFolderIfOwnedByUser(folderId, session.userId);
  if (!folder) {
    console.log("not owqner of folder");
    return redirect("/drive");
  }

  try {
    const [folders, files, parents] = await Promise.all([
      QUERIES.getFolders(folderId),
      QUERIES.getFiles(folderId),
      QUERIES.getAllParents(folderId),
    ]);

    return (
      <DriveContents
        files={files}
        folders={folders}
        parents={parents}
        currentFolderId={folderId}
      />
    );
  } catch (err) {
    console.error(err);
    return <div>Invalid folder ID</div>;
  }
}
