"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { CollaborativeApp } from "./CommentsOverlay";



export const Comments = () => (
  <ClientSideSuspense fallback={null}>
    {() => <CollaborativeApp/>}
  </ClientSideSuspense>
);
