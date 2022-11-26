import { useEffect, useState } from "preact/hooks";
import { Spinner } from "@/components/Spinner.tsx";
import { lang } from "@/utils/i18n.ts";

const Verify = () => {
  // deno-lint-ignore no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    const url = new URL(window.location?.href.replace("#", "?"));
    const accessToken = url.searchParams.get("access_token");
    const type = url.searchParams.get("type");
    setLoading(true);
    void fetch(`/api/get-user?access_token=${accessToken}&type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="w-full">
      {loading && <Spinner />}
      {user?.data?.user && <p>Xac thuc thanh cong</p>}
      {user?.error && <p>Co loi xay ra</p>}
    </div>
  );
};

export default Verify;
