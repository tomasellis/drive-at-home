"use client";

import { FolderIcon, FileIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { deleteFile } from "~/server/actions";
import type { files_table, folders_table } from "~/server/db/schema";

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
  const { file } = props;

  return (
    <li
      key={file.id}
      className="border-b border-zinc-800 px-6 py-4 transition-colors hover:bg-zinc-800/50"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <a
            href={file.url ?? "#"}
            target="_blank"
            className="flex items-center text-white transition-colors hover:text-zinc-300"
            rel="noreferrer"
          >
            <FileIcon className="mr-3 text-zinc-400" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-2 text-zinc-400">{"file"}</div>
        <div className="col-span-3 text-zinc-400">{file.size}</div>
        <div className="col-span-1">
          <Button
            aria-label="Delete File"
            variant="ghost"
            className="text-zinc-400 hover:bg-zinc-800 hover:text-white"
            onClick={() => deleteFile(file.id)}
          >
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
    </li>
  );
}

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
}) {
  const { folder } = props;

  return (
    <li
      key={folder.id}
      className="border-b border-zinc-800 px-6 py-4 transition-colors hover:bg-zinc-800/50"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <Link
            href={`/f/${folder.id}`}
            className="flex items-center text-white transition-colors hover:text-zinc-300"
          >
            <FolderIcon className="mr-3 text-zinc-400" size={20} />
            {folder.name}
          </Link>
        </div>
        <div className="col-span-3 text-zinc-400">folder</div>
        <div className="col-span-3 text-zinc-400"></div>
      </div>
    </li>
  );
}
