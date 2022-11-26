import { useEffect, useRef, useState } from "preact/hooks";
import { tw } from "twind";
import { asset } from "$fresh/runtime.ts";
import { JSX } from "preact/jsx-runtime";
import { Footer } from "@/components/Footer.tsx";
import { Gender, Profile, Supabase, titleGenderMap } from "@/utils/types.ts";
import { ProfileMenu } from "../components/ProfileMenu.tsx";

interface Props {
  user?: Supabase.User;
}

const AuthMenu = () => {
  const buttonStyle =
    tw`inline-block text-sm px-4 py-2 mx-1 leading-none border rounded text-white border-white hover:border-transparent hover:bg-pink-400 mt-4 md:mt-0`;
  return (
    <div>
      <a href="/login" class={buttonStyle}>
        Login
      </a>
      <a href="/signup" class={buttonStyle}>
        Signup
      </a>
    </div>
  );
};

const Nav = (props: Props) => {
  useEffect(() => {
    const fetchData = () => {
      fetch("/api/joke")
        .then((res) => res.text())
        .then(console.log)
        .catch(console.error);
    };
    fetchData();
  }, []);

  const ref = useRef(window);
  const [navOpen, setNavOpen] = useState(false);
  const linkStyle =
    tw`block mt-4 md:inline-block md:mt-0 hover:text-purple-500 text-white font-semibold`;
  const navStyle = tw`w-full block flex-grow md:flex md:items-center md:w-auto`;
  const navLinksStyle = tw`text-sm md:flex-grow`;

  useEffect(() => {
    let lastKnownWidth = 0;
    let ticking = false;
    const doSomething = (width: number) => {
      if (width > 768) {
        setNavOpen(true);
      } else {
        setNavOpen(false);
      }
    };

    const onResize = (_: UIEvent) => {
      lastKnownWidth = ref.current.innerWidth;
      if (!ticking) {
        ref.current.requestAnimationFrame(() => {
          doSomething(lastKnownWidth);
          ticking = false;
        });
        ticking = true;
      }
    };

    doSomething(ref.current.innerWidth);
    ref.current.addEventListener("resize", onResize);

    return () => {
      ref.current.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div class="bg-pink-500">
      <nav class="flex items-center justify-between flex-wrap p-4 max-w-screen-md mx-auto">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <a href="/">
            <img
              src={asset("/logo.png")}
              class="w-14 mr-2"
              alt="the fresh logo: a sliced lemon dripping with juice"
            />
          </a>
          <a href="/">
            <span class="font-semibold text-xl tracking-tight">Hẹn Hò</span>
          </a>
        </div>
        <div class="block md:hidden">
          <button
            class="flex items-center px-3 py-2 border rounded text-white hover:border-pink-400 hover:bg-pink-400 focus:outline-none"
            onClick={() => {
              setNavOpen(!navOpen);
            }}
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        {navOpen
          ? (
            <div class={navStyle}>
              <div class={navLinksStyle}>
                <a href="/find-partner/female" class={tw`${linkStyle} mr-4`}>
                  {titleGenderMap[Gender.FEMALE]}
                </a>
                <a href="/find-partner/male" class={tw`${linkStyle} mr-4`}>
                  {titleGenderMap[Gender.MALE]}
                </a>
                <a href="/find-partner/les" class={tw`${linkStyle} mr-4`}>
                  {titleGenderMap[Gender.LES]}
                </a>
                <a href="/find-partner/gay" class={tw`${linkStyle}`}>
                  {titleGenderMap[Gender.GAY]}
                </a>
              </div>
              {props.user ? <ProfileMenu /> : <AuthMenu />}
            </div>
          )
          : (
            ""
          )}
      </nav>
    </div>
  );
};

export default Nav;

interface LayoutProps {
  children: JSX.Element;
  user?: Supabase.User;
  // deno-lint-ignore no-explicit-any
  data?: any;
}

export const Layout = ({ children, user, data }: LayoutProps) => {
  return (
    <>
      <Nav user={user} />
      {children}
      <Footer />
      {
        /* {DENO_ENV === 'development' ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        ''
      )} */
      }
    </>
  );
};
