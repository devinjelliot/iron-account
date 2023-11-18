import { headers } from "next/headers";

export default async function ApiFromServer() {
    const res = await fetch("http://localhost:3000/api/whoAmI", {
        method: "GET",
        headers: headers(),
    }).then((res) => res.json());

    return (
        <div>
            <div>
                API Route from <span className="font-bold underline">Server</span>
            </div>
            <div>
                Name: {res.name}
            </div>
        </div>
    )
}
