import Form from "./Form";
// import GoogleButton from "./Google";
import Text from "./GradientScroll";
export function action(){
/* 
async function login() {
    cookies().set('$SESH', '1234');
}
 */
}

export default function Login() {
    const items = [
        { word: 'files', color: 'from-[#e66465] to-[#9198e5]' },
        { word: 'pictures', color: 'from-[#f7eb07] to-[#ff9900]' },
        { word: 'documents', color: 'from-[#76b9ed] to-[#24adf3]' },
        { word: 'secrets', color: 'from-[#a43333] to-[#ef5350]' }
    ];
    return (
        <div className="grid grid-cols-[60%_40%] grid-rows-1 w-full h-full bg-gradient-to-br from-blue-100 via-red-100 to-green-100 bg-[length:400%_400%] animate-[bgdrift_10s_ease_infinite] text-black text-opacity-60">
            <div className="flex flex-col justify-center text-7xl ml-10">
                <div className="flex items-center whitespace-pre-wrap overflow-hidden">Share your <Text items={items} /></div>
                <div className="">effortlessly</div>
            </div>
            <div className="flex flex-col p-2 bg-white text-black w-11/12 h-1/2 items-center m-auto rounded-xl justify-center font-light gap-2">
                <div className="bg-gradient-to-r from-blue-400 via-red-500 to-green-400 bg-[length:400%_400%] text-transparent bg-clip-text text-lg animate-[bgdrift_10s_ease_infinite]">Or5anisation FS</div>
                <div className="flex flex-col items-center justify-center">
                    <div className="text-xl font-medium">Sign in</div>
                    {/* <GoogleButton action={async (jwt)=>{'use server';await verify(jwt) ? cookies().set('G_AUTH',jwt) : alert('Failed logging in')}} /> */}
                    <span className="text-sm text-black/50">or</span>
                    <div className="text-lg">Use your Or5FS account</div>
                </div>
                <Form action={()=>{login()}}/>
                <div className="w-11/12 text-sm text-black/50">Part of the <a href={'/'} className="hover:underline underline-offset-2 hover:text-blue-400">OR5 Tool suite</a></div>
            </div>
            {/* <script src="https://accounts.google.com/gsi/client" async defer></script> */}
        </div>
    )
}
/* async function verify(jwt: string) {
    'use server';
    try {
        const ticket = await client.verifyIdToken({
            idToken: jwt,
            audience: CLIENT_ID
        });
        const payload = ticket.getPayload();
        const userid = payload!['sub'];
        console.log(payload);
        return true;
    } catch (err) {
        console.error(err);
        return false
    }
}
 */