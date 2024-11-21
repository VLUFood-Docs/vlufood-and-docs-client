import Footer from '@/components/footer'
import Header from '@/components/header'
import Label from '@/components/label'
import Image from 'next/image'

import FindDelivery from '@/public/images/tracking/find-delivery.gif'
// import Cooking from '@/public/images/tracking/cooking.gif'
// import Complete from '@/public/images/tracking/complete.gif'
// import Canceled from '@/public/images/tracking/canceled.gif'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
  // const { id } = await params
  return (
    <main className="flex flex-col justify-between w-screen h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center">
        <Label size="subheading">Đang tìm người giao hàng cho bạn...</Label>
        <div className="flex gap-2 items-center pb-2">
          <Image src={FindDelivery} alt="Tìm giao hàng" className="w-[358px] h-[242px]" width={358} height={242} />
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="131" viewBox="0 0 28 131" fill="none">
              <line x1="-2.01597e-09" y1="1.5" x2="27" y2="1.5" stroke="black" stroke-width="3" />
              <line x1="-2.01597e-09" y1="43.5" x2="27" y2="43.5" stroke="black" stroke-width="3" />
              <line x1="1" y1="86.5" x2="28" y2="86.5" stroke="black" stroke-width="3" />
              <line x1="1" y1="129.5" x2="28" y2="129.5" stroke="black" stroke-width="3" />
              <line x1="1.5" y1="2" x2="1.5" y2="131" stroke="black" stroke-width="3" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Tìm giao hàng...</p>
            <p className="text-gray-400">Chuẩn bị đơn hàng</p>
            <p className="text-gray-400">Đang giao hàng</p>
            <p className="text-gray-400">Giao thành công</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
