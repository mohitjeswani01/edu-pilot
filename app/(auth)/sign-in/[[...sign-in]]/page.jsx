import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <SignIn signUpUrl="/sign-up" />
        </div>
    );
}
