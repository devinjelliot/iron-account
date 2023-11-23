import 'next-auth';

// /**
//  * The Credentials interface represents the data structure required for a user's
//  * credentials when signing in with Ethereum in our application.
//  *
//  * @property {string} message - The message provided by the user.
//  * @property {string} signature - The user's signed message.
//  * @property {string} nonce - The nonce value.
//  */
// export interface Credentials {
//     message: string;
//     signature: string;
//     nonce: string;
// }

/**
 * Extends the next-auth module with custom properties.
 * We use this to augment the default types provided by next-auth.
 */
declare module 'next-auth' {

    // /**
    //  * The Session interface represents the data structure for a user's session.
    //  *
    // // * @property {AuthenticatedUser} user - The authenticated user.
    //  */
    interface Session {
        user: {
            id: string;
        }
    }
}

// /**
//  * The User interface represents the basic structure for a user.
//  *
//  * @property {number} id - The user's ID.
//  * @property {string} walletAddress - The user's Ethereum address.
//  * @property {KycStatus} status - The user's KYC status.
//  * @property {string} role - The user's role.
//  * @property {boolean} isNewUser - Indicates if the user is new or not.
//  * @property {Iron | null} iron - User's with an entry level of utility have an Iron account.
//  * @property {Diamond | null} diamond - User's with an entry level of utility have a Diamond account.
//  * @property {Graphene | null} graphene - User's with an entry level of utility have a Graphene account.
//  */

// interface User {
//     id: number
//     walletAddress: string
//     status?: KycStatus
//     role?: string | null
//     isNewUser?: boolean
//     iron?: Iron | null
//     diamond?: Diamond | null
//     graphene?: Graphene | null
//     ironToken?: string
//     diamondToken?: string
//     grapheneToken?: string
// }

//     /**
//      * The AuthenticatedUser interface represents the structure for a authenticated user.
//      * It extends the User interface and includes the JWT token.
//      *
//      * @property {JWT} token - The user's JSON Web Token.
//      */
//     interface AuthenticatedUser extends User {
//         token: JWT
//     }

//     /**
//      * The Iron interface represents the basic structure for an Iron account.
//      *
//      * @property {string} id - The merchant's ID.
//      */
//     interface Iron {
//         id: string
//         name: string
//         displayName?: string
//         contractAddress: string
//     }

//     /**
//      * The Diamond interface represents the basic structure for an Diamond account.
//      *
//      * @property {string} id - The merchant's ID.
//      */
//     interface Diamond {
//         id: string
//         name: string
//         displayName?: string
//         contractAddress: string
//     }

//     /**
//      * The Graphene interface represents the basic structure for an Graphene account.
//      *
//      * @property {string} id - The merchant's ID.
//      */
//     interface Graphene {
//         id: string
//         name: string
//         displayName?: string
//         contractAddress: string
//     }
// }

// // Declare MyJWT interface in 'next-auth/jwt' module
// declare module 'next-auth/jwt' {
//     /**
//      * The MyJWT interface represents the data structure for the user's token.
//      *
//      * @property {AuthenticatedUser} user - The authenticated user.
//      * @property {string} address - The user's Ethereum address.
//      * @property {boolean} isNewUser - Indicates if the user is new or not.
//      */
//     interface MyJWT extends JWT {
//         user: AuthenticatedUser;
//         address: string;
//         isNewUser: boolean;
//     }
// }
