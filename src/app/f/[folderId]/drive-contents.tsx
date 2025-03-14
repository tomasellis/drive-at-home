"use client";

import { ChevronRight, FolderOpen } from "lucide-react";
import { FileRow, FolderRow } from "./file-row";
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];
  currentFolderId: number;
}) {
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 p-4 text-white md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold text-white"
          >
            <FolderOpen className="h-6 w-6" />
            <span>Drive at Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton>
                <Button
                  variant="ghost"
                  className="text-zinc-400 hover:text-white"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-white text-black hover:bg-zinc-200">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        <div className="mb-6 flex items-center">
          {props.parents.map((folder) => (
            <div key={folder.id} className="flex items-center">
              <ChevronRight className="mx-2 text-zinc-600" size={16} />
              <Link
                href={`/f/${folder.id}`}
                className="font-medium text-zinc-400 hover:text-white"
              >
                {folder.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-xl">
          <div className="border-b border-zinc-800 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-zinc-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <UploadButton
            input={{
              folderId: props.currentFolderId,
            }}
            endpoint="driveUploader"
            onClientUploadComplete={() => {
              navigate.refresh();
            }}
            onUploadError={(error: Error) => {
              console.error(error);
              alert(`ERROR! ${error.message}`);
            }}
            className="ut-button:bg-white ut-button:text-black ut-button:hover:bg-zinc-200 ut-button:font-medium ut-button:rounded-md ut-allowed-content:text-zinc-400"
          />
        </div>
      </div>
    </div>
  );
}
