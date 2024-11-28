'use client'

import { useSession } from 'next-auth/react'
import { useContext, useState } from 'react'
import { AppContext } from '../app-provider'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { EditIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'

export default function AccountPage() {
  const [open, setOpen] = useState(false)
  const [accountPhone, setAccountPhone] = useState<string | null>(null)
  const data = useSession()
  const appContext = useContext(AppContext)
  const phone = appContext?.phone
  const setPhone = appContext?.setPhone

  return (
    <div>
      <p className="text-xl text-destructive">Cài đặt tài khoản</p>
      <div className="px-4">
        <div className="flex items-center gap-2">
          <p>Tên tài khoản:</p>
          <p>{data.data?.user?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <p>Gmail:</p>
          <p>{data.data?.user?.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <p>Số điện thoại:</p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center gap-2">
              <EditIcon />
              <p>{phone || 'Chưa thiết lập'}</p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cài đặt số điện thoại</DialogTitle>
              </DialogHeader>
              <p>Nhập số diện thoại:</p>
              <Input type="text" onChange={e => setAccountPhone(e.target.value)} />
              <DialogFooter>
                <Button onClick={() => setOpen(false)}>Hủy</Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (setPhone) {
                      setPhone(accountPhone)
                      toast.success('Đã lưu', { autoClose: 1000 })
                      localStorage.setItem('phone', accountPhone || '')
                    } else {
                      toast.error('Có lỗi xảy ra', { autoClose: 1000 })
                    }
                    setOpen(false)
                  }}
                >
                  Lưu
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
