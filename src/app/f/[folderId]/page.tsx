import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import DriveContents from "../../drive-contents";
import { z } from "zod";
import { eq } from "drizzle-orm";

const safeParams = z.object({
  folderId: z.coerce.number(),
});

async function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;

  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId));

    if (!folder[0]) {
      throw new Error("Parent fodler not found");
    }

    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }

  return parents;
}

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  try {
    const { folderId } = safeParams.parse(params);

    const foldersPromise = db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId));

    const filesPromise = db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId));

    const parentsPromise = getAllParents(folderId);

    const [folders, files, parents] = await Promise.all([
      foldersPromise,
      filesPromise,
      parentsPromise,
    ]);

    return <DriveContents files={files} folders={folders} parents={parents} />;
  } catch (err) {
    console.error(err);
    return <div>Invalid folder ID</div>;
  }
}
