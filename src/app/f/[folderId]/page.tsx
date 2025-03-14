import DriveContents from "../../drive-contents";
import { z } from "zod";
import { getAllParents, getFiles, getFolders } from "~/server/db/queries";

const safeParams = z.object({
  folderId: z.coerce.number(),
});

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  try {
    const { folderId } = safeParams.parse(params);

    const [folders, files, parents] = await Promise.all([
      getFolders(folderId),
      getFiles(folderId),
      getAllParents(folderId),
    ]);

    return <DriveContents files={files} folders={folders} parents={parents} />;
  } catch (err) {
    console.error(err);
    return <div>Invalid folder ID</div>;
  }
}
