import SigninForm from "./components/SigninForm/SigninForm";
import SignupForm from "./components/SignupForm/SignupForm";

export default function Home() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-extrabold">Welcome, user!</h1>
            <div className="flex flex-col lg:flex-row w-[90%] mx-auto mt-6 gap-4 lg:justify-evenly">
                <SignupForm />
                <SigninForm />
            </div>
        </div>
    );
}
