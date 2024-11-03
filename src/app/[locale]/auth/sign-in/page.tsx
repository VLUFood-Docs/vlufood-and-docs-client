import { auth, signIn } from '@/auth'
import Label from '@/components/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await auth()

  if (session?.user?.email) {
    redirect('/')
  }
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[500px] flex items-center p-4 flex-col">
        <CardHeader>
          <Label size="subheading" className="text-blue-400">
            Đăng nhập
          </Label>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 justify-center items-center">
          <Label size="body">Nhập số điện thoại bạn đã đăng ký</Label>
          <div className="flex flex-col gap-2">
            <Label size="caption">Số diện thoại</Label>
            <Input placeholder="(+84) 1 2 3 4 5 6 7 8 9" type="tel" />
          </div>
          <div className="flex flex-col gap-2">
            <Label size="caption">Mật khẩu</Label>
            <Input placeholder="****************" type="password" />
          </div>
          <Button className="w-full">Đăng nhập</Button>
          <Separator className="bg-black w-[90%]" />
          <form
            action={async () => {
              'use server'
              await signIn('google', { redirectTo: '/' })
            }}
          >
            <Button variant="outline" type="submit" className="w-full">
              Đăng nhập bằng Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
