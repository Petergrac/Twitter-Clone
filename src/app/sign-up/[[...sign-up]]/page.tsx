"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="h-screen flex items-center justify-between p-8">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <svg
          fill="#fff"
          width="200px"
          height="200px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>twitter</title>
          <path d="M30.917 6.728c-1.026 0.465-2.217 0.805-3.464 0.961l-0.061 0.006c1.268-0.771 2.222-1.952 2.687-3.354l0.013-0.044c-1.124 0.667-2.431 1.179-3.82 1.464l-0.082 0.014c-1.123-1.199-2.717-1.946-4.485-1.946-3.391 0-6.14 2.749-6.14 6.14 0 0.496 0.059 0.979 0.17 1.441l-0.008-0.042c-5.113-0.254-9.613-2.68-12.629-6.366l-0.025-0.031c-0.522 0.873-0.831 1.926-0.831 3.052 0 0.013 0 0.026 0 0.039v-0.002c0 0.001 0 0.003 0 0.005 0 2.12 1.075 3.989 2.709 5.093l0.022 0.014c-1.026-0.034-1.979-0.315-2.811-0.785l0.031 0.016v0.075c0 0.001 0 0.002 0 0.002 0 2.961 2.095 5.434 4.884 6.014l0.040 0.007c-0.484 0.135-1.040 0.212-1.614 0.212-0.406 0-0.802-0.039-1.186-0.113l0.039 0.006c0.813 2.459 3.068 4.212 5.739 4.264l0.006 0c-2.072 1.638-4.721 2.627-7.602 2.627-0.005 0-0.009 0-0.014 0h0.001c-0.515-0.001-1.022-0.031-1.521-0.089l0.061 0.006c2.663 1.729 5.92 2.757 9.418 2.757 0.005 0 0.009 0 0.014 0h-0.001c0.037 0 0.082 0 0.126 0 9.578 0 17.343-7.765 17.343-17.343 0-0.039-0-0.077-0-0.116l0 0.006c0-0.262 0-0.524-0.019-0.786 1.21-0.878 2.229-1.931 3.042-3.136l0.028-0.044z"></path>
        </svg>
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold md:text-6xl sm:text-4xl">
          Happening Now
        </h1>
        <h1 className="text-2xl">Join Today</h1>
        {/* SIGN IN FORM FROM CLERK */}
        <SignUp.Root>
          <h1>Create a new account</h1>
          {/* STEP ONE => YOUR EMAIL */}
          <SignUp.Step name="start">
            <Clerk.Connection
              name="google"
              className="py-2 items-center font-bold ring flex bg-white text-black justify-center gap-4 w-1/2 rounded-full"
            >
              <svg
                width="20px"
                height="20px"
                viewBox="-0.5 0 48 48"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Google-color</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      ></path>
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              Sign up with Google
            </Clerk.Connection>
            <Clerk.Connection
              name="apple"
              className="py-2 mt-5 items-center font-bold ring flex bg-white text-black justify-center gap-4 w-1/2 rounded-full"
            >
              <svg
                viewBox="-3.5 0 48 48"
                width={20}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>Apple-color</title> <desc>Created with Sketch.</desc>{" "}
                  <defs> </defs>{" "}
                  <g
                    id="Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    {" "}
                    <g
                      id="Color-"
                      transform="translate(-204.000000, -560.000000)"
                      fill="#0B0B0A"
                    >
                      {" "}
                      <path
                        d="M231.174735,567.792499 C232.740177,565.771699 233.926883,562.915484 233.497649,560 C230.939077,560.177808 227.948466,561.814769 226.203475,563.948463 C224.612784,565.88177 223.305444,568.757742 223.816036,571.549042 C226.613071,571.636535 229.499881,569.960061 231.174735,567.792499 L231.174735,567.792499 Z M245,595.217241 C243.880625,597.712195 243.341978,598.827022 241.899976,601.03692 C239.888467,604.121745 237.052156,607.962958 233.53412,607.991182 C230.411652,608.02505 229.606488,605.94498 225.367451,605.970382 C221.128414,605.99296 220.244696,608.030695 217.116618,607.999649 C213.601387,607.968603 210.913765,604.502761 208.902256,601.417937 C203.27452,592.79849 202.68257,582.680377 206.152914,577.298162 C208.621711,573.476705 212.515678,571.241407 216.173986,571.241407 C219.89682,571.241407 222.239372,573.296075 225.322563,573.296075 C228.313175,573.296075 230.133913,571.235762 234.440281,571.235762 C237.700215,571.235762 241.153726,573.022307 243.611302,576.10431 C235.554045,580.546683 236.85858,592.121127 245,595.217241 L245,595.217241 Z"
                        id="Apple"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
              Sign up with Apple
            </Clerk.Connection>
            <div className="flex flex-col mt-4">
              Sign up with credentials.
              <Clerk.Field name="username" className="flex flex-col gap-2 my-4">
                <Clerk.Input
                  placeholder="Your name"
                  className="bg-textGrayLight ring-2 focus:ring-iconBlue outline-none w-72 rounded-full text-black py-1 px-3"
                />
                <Clerk.FieldError className="text-sm text-red-500" />
              </Clerk.Field>
              <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
                <Clerk.Input
                  placeholder="johndoe@email.com"
                  className="bg-textGrayLight w-72 ring-2 focus:ring-iconBlue outline-none rounded-full text-black py-1 px-3"
                />
                <Clerk.FieldError className="text-sm text-red-500" />
              </Clerk.Field>
              <Clerk.Field name="password" className="flex flex-col gap-2 mt-4">
                <Clerk.Input
                  placeholder="Your Password"
                  className="outline-none w-72 bg-textGrayLight text-black ring-2 focus:ring-iconBlue rounded-full py-1 px-3"
                />
                <Clerk.FieldError className="text-sm text-red-500" />
              </Clerk.Field>
              <SignUp.Captcha className="mt-4" />
              <SignUp.Action
                className="w-72 mt-2 text-center bg-iconBlue text-white py-2  rounded-full  font-bold text-sm"
                submit
              >
                Submit
              </SignUp.Action>
            </div>
          </SignUp.Step>
          <SignUp.Step name="continue">
            <Clerk.Field name="username">
              <Clerk.Input
                placeholder="Username"
                className="outline-none w-72 bg-textGrayLight text-black ring-2 focus:ring-iconBlue rounded-full py-1 px-3"
              />
              <Clerk.FieldError className="text-sm text-red-500" />
            </Clerk.Field>

            <SignUp.Action
              className="text-center text-sm text-iconBlue w-72 underline mt-2"
              submit
            >
              Continue
            </SignUp.Action>
          </SignUp.Step>
          <SignUp.Step name="verifications">
            <SignUp.Strategy name="email_code">
              <h1 className="text-sm mb-2">Check you e-mail</h1>
              <Clerk.Field name="code" className="flex flex-col gap-4">
                <Clerk.Input
                  placeholder="Verification Code"
                  className="outline-none w-72 bg-textGrayLight text-black ring-2 focus:ring-iconBlue rounded-full py-1 px-3"
                />
              </Clerk.Field>
              <Clerk.FieldError className="text-sm text-red-500" />
              <SignUp.Action
                submit
                className="text-sm cursor-pointer mt-2 underline text-iconBlue"
              >
                Verify
              </SignUp.Action>
            </SignUp.Strategy>
          </SignUp.Step>
          {/* OR SIGN UP */}
          <div className="w-72 flex items-center gap-4">
            <div className="h-px bg-borderGray flex-grow"></div>
            <span className="text-textGray">or</span>
            <div className="bg-borderGray flex flex-grow h-px"></div>
          </div>
          <Link
            href="/sign-in"
            className="text-center text-sm rounded-full bg-iconBlue w-72 py-1 font-bold"
          >
            Sign In
          </Link>
          <p className="w-72 text-textGray text-xs">
            By Signing up, you agree to the
            <span className="text-iconBlue hover:underline cursor-pointer">
              Terms of Service
            </span>
            and{" "}
            <span className="text-iconBlue hover:underline cursor-pointer">
              Privacy Policy
            </span>
            , including
            <span className="text-iconBlue hover:underline cursor-pointer">
              Cookie Use
            </span>
            .
          </p>
        </SignUp.Root>
      </div>
    </div>
  );
}
