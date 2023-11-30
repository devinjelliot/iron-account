"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PasskeyButton from "../passwordless/PasskeyRegister";
import { PasskeySignIn } from "../passwordless/PasskeySignIn";
import KeyGenButton from "../silence/KeyGen";


const ACTIVE_ROUTE = "py-1 px-2 rounded-md bg-gray-200 text-gray-900";
const INACTIVE_ROUTE = "py-1 px-2 text-gray-500 hover:bg-gray-200";

function AuthButton() {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                {session?.user?.id} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}

export default function NavMenu() {
    const pathname = usePathname();
    return (
        <div>
            <AuthButton />
            <hr className="my-4" />
            <ul>
                <Link href="/">
                    <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                        Home
                    </li>
                </Link>
                <Link href="/protected">
                    <li className={pathname === "/protected" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                        Protected Route
                    </li>
                </Link>
                <Link href="/serverAction">
                    <li className={pathname === "/serverAction" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                        Server Action
                    </li>
                </Link>
                <Link href="/apiFromClient">
                    <li className={pathname === "/apiFromClient" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                        API from Client
                    </li>
                </Link>
                <Link href="/apiFromServer">
                    <li className={pathname === "/apiFromServer" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                        API from Server
                    </li>
                </Link>
                <div>
                    <PasskeyButton />
                </div>
                <div>
                    <PasskeySignIn />
                </div>
                <div>
                    <KeyGenButton />
                </div>
                {/* <Link href="/keyGenAccount">
                    <li className={pathname === "/keyGenAccount" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                        Silence KeyGen
                    </li>
                </Link> */}

            </ul>

        </div>
    );
}