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

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  try {
    const { folderId } = safeParams.parse(params);

    const folders = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId));

    const files = await db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId));

    return <DriveContents files={files} folders={folders} />;
  } catch (err) {
    console.error(err);
    return <div>Invalid folder ID</div>;
  }
}
