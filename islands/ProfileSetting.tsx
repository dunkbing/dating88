import Gap from "@/components/Gap.tsx";
import { Gender, genderMap } from "@/utils/types.ts";
import { Selection } from "@/components/Selection.tsx";

interface Props {}

export default function ({}: Props) {
  return (
    <div className="flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-pink-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-pink-700 text-xl font-bold">My account</h6>
          <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
          >
            Settings
          </button>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form>
          <h6 className="text-pink-400 text-sm mt-3 mb-6 font-bold uppercase">
            User Information
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-pink-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="border-0 px-3 py-3 placeholder-pink-300 text-pink-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue="jesse@example.com"
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-pink-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  First Name
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-pink-300 text-pink-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue="Lucky"
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-pink-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-pink-300 text-pink-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue="Jesse"
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-pink-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Date of birth
                </label>
                <input
                  type="date"
                  className="border-0 px-3 py-3 placeholder-pink-300 text-pink-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <Selection
                label="gender"
                items={[
                  { display: genderMap[Gender.MALE], value: Gender.MALE },
                  { display: genderMap[Gender.FEMALE], value: Gender.FEMALE },
                ]}
              />
            </div>
          </div>
          <hr className="mt-6 border-b-1 border-pink-300" />
          <h6 className="text-pink-400 text-sm mt-3 mb-6 font-bold uppercase">
            Contact Information
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-pink-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Address
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-pink-300 text-pink-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-pink-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  City
                </label>
                <input
                  type="email"
                  className="border-0 px-3 py-3 placeholder-pink-300 text-pink-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue="New York"
                />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-pink-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Country
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-pink-300 text-pink-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue="United States"
                />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-pink-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-pink-300 text-pink-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue="Postal Code"
                />
              </div>
            </div>
          </div>
          <hr className="mt-6 border-b-1 border-pink-300" />
          <h6 className="text-pink-400 text-sm mt-3 mb-6 font-bold uppercase">
            About Me
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-pink-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  About me
                </label>
                <textarea
                  type="text"
                  className="border-0 px-3 py-3 placeholder-pink-300 text-pink-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                  rows={4}
                >
                </textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
