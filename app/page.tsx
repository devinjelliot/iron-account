import { getServerSession } from 'next-auth';
export default async function Home() {
    const session = await getServerSession()

    return (
        <>
            getServerSession Result
            {session?.user?.name ? (
                <div>{session?.user?.name}</div>
            ) : (
                <div>No session</div>
            )}
        </>
    );
}





// <div className="grid grid-cols-2 w-screen h-screen bg-gray-50">
//     <div className="grid grid-cols-1 bg-gray-500">
//         <KeyGenComponent />
//     </div>
//     <div className="grid grid-cols-1 bg-blue-500">
//         <Link
//             href={'/farcaster'}
//             className='bg-pink-500 p-2 justify-self-center self-center rounded-md'>
//             Farcaster
//         </Link>
//     </div>
//     <div className="grid grid-cols-1 bg-blue-500">
//         <Link
//             href={'/client/IronAccount'}
//             className='bg-pink-500 p-2 justify-self-center self-center rounded-md'>
//             Iron Account
//         </Link>
//     </div>
//     <div className="grid grid-cols-1 bg-gray-500">
//         <>
//             getServerSession Result
//             {session?.user?.name ? (
//                 <div>{session?.user?.name}</div>
//             ) : (
//                 <div>No session</div>
//             )}
//         </>
//     </div>

// </div>
