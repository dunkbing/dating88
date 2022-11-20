import { Head } from '$fresh/runtime.ts';
import { Layout } from '@/islands/Nav.tsx';
import Gap from '@/components/Gap.tsx';
import PrimaryTab from '@/islands/PrimaryTab.tsx';
import SecondaryTab from '@/islands/SecondaryTab.tsx';

export default function Home() {
  return (
    <Layout>
      <div>
        <Head>
          <title>Hẹn Hò</title>
        </Head>
        <div class="p-4 mx-auto max-w-screen-xl flex">
          <div class="w-2/3">
            <PrimaryTab title="Tim ban gai" />
          </div>
          <div class="w-1/3">
            <SecondaryTab title="Mới đăng ký" />
            <Gap />
            <SecondaryTab title="Xem nhiều nhất" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
