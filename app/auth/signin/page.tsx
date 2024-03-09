import SignInForm from './_components/sign-in-form';

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden px-8">
      <div className="mx-auto w-full sm:max-w-md">
        <SignInForm />
      </div>
    </div>
  );
}
