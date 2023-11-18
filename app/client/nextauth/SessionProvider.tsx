"use client";
import { SessionProvider } from "next-auth/react";
export default SessionProvider;

// SessionProvider just needs the addtion of use client so we can wrap the root layout in it per NextJS App Directory