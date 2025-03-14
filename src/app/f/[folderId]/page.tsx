import DriveContents from "../../drive-contents";
import { z } from "zod";
import { QUERIES } from "~/server/db/queries";

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
      QUERIES.getFolders(folderId),
      QUERIES.getFiles(folderId),
      QUERIES.getAllParents(folderId),
    ]);

    return <DriveContents files={files} folders={folders} parents={parents} />;
  } catch (err) {
    console.error(err);
    return <div>Invalid folder ID</div>;
  }
}
