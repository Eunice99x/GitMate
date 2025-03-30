// "use client";

// import {useState, useEffect} from "react";
// import {Button} from "@/components/ui/button";
// import {Input} from "@/components/ui/input";
// import {Label} from "@/components/ui/label";
// import {useToast} from "@/components/ui/use-toast";
// import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
// import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
// import {InfoIcon} from "lucide-react";

// export function GitHubSetup() {
//   // const {isLoaded, isSignedIn} = useAuth();
//   const [openaiKey, setOpenaiKey] = useState("");
//   const [googleKey, setGoogleKey] = useState("");
//   const [isConfigured, setIsConfigured] = useState(false);
//   const {toast} = useToast();

//   useEffect(() => {
//     // Check if API keys are already configured
//     const storedOpenaiKey = localStorage.getItem("openai_key");
//     const storedGoogleKey = localStorage.getItem("google_key");
//     if (storedOpenaiKey && storedGoogleKey) {
//       setIsConfigured(true);
//     }
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Store API keys in localStorage
//     localStorage.setItem("openai_key", openaiKey);
//     localStorage.setItem("google_key", googleKey);
//     setIsConfigured(true);

//     toast({
//       title: "API keys saved",
//       description: "Your API keys have been saved successfully."
//     });
//   };

//   // if (!isLoaded) {
//   return (
//     <div className='w-full max-w-md mx-auto p-6'>
//       <div className='text-center'>
//         <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
//       </div>
//     </div>
//   );
//   // }

//   // if (!isSignedIn) {
//   //   return (
//   //     <div className='w-full max-w-md mx-auto p-6'>
//   //       <Card>
//   //         <CardHeader>
//   //           <CardTitle>Sign in Required</CardTitle>
//   //           <CardDescription>Please sign in to configure your settings.</CardDescription>
//   //         </CardHeader>
//   //         <CardContent>
//   //           <SignIn
//   //             appearance={{
//   //               elements: {
//   //                 rootBox: "mx-auto",
//   //                 card: "bg-transparent shadow-none"
//   //               }
//   //             }}
//   //             afterSignInUrl='/settings'
//   //           />
//   //         </CardContent>
//   //       </Card>
//   //     </div>
//   //   );
//   // }

//   if (isConfigured) {
//     return (
//       <div className='w-full max-w-md mx-auto p-6'>
//         <Card>
//           <CardHeader>
//             <CardTitle>Settings</CardTitle>
//             <CardDescription>Your API keys are configured and ready to use.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button className='w-full' onClick={() => (window.location.href = "/dashboard")}>
//               Go to Dashboard
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className='w-full max-w-md mx-auto p-6'>
//       <Card>
//         <CardHeader>
//           <CardTitle>Configure API Keys</CardTitle>
//           <CardDescription>Enter your API keys to enable AI-powered code reviews.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Alert className='mb-6'>
//             <InfoIcon className='h-4 w-4' />
//             <AlertTitle>API Keys Required</AlertTitle>
//             <AlertDescription>
//               To use GitMate's AI features, you need to provide your API keys:
//               <ul className='list-disc list-inside mt-2 space-y-1'>
//                 <li>OpenAI API key for GPT-powered reviews</li>
//                 <li>Google API key for Gemini-powered reviews</li>
//               </ul>
//             </AlertDescription>
//           </Alert>
//           <form onSubmit={handleSubmit} className='space-y-4'>
//             <div className='space-y-2'>
//               <Label htmlFor='openaiKey'>OpenAI API Key</Label>
//               <Input id='openaiKey' type='password' value={openaiKey} onChange={e => setOpenaiKey(e.target.value)} placeholder='Enter your OpenAI API key' required />
//             </div>
//             <div className='space-y-2'>
//               <Label htmlFor='googleKey'>Google API Key</Label>
//               <Input id='googleKey' type='password' value={googleKey} onChange={e => setGoogleKey(e.target.value)} placeholder='Enter your Google API key' required />
//             </div>
//             <Button type='submit' className='w-full'>
//               Save API Keys
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
