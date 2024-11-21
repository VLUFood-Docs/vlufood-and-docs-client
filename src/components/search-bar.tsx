'use client'

import { Input } from '@/components/ui/input'
import { useI18n } from '@/locales/client'
import { MapPin } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'
import { Button } from './ui/button'
import { AppContext } from '@/app/[locale]/app-provider'
import { toast } from 'react-toastify'

const building = [
  { name: 'A', floors: ['01', '02', '03', '04', '05', '06'], rooms: ['01', '02', '03'] },
  {
    name: 'F',
    floors: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    rooms: ['01', '02', '03', '04', '05', '06'],
  },
  { name: 'G', floors: ['08', '09', '10', '11', '12'], rooms: ['01', '02', '03'] },
]

export default function SearchBar() {
  const t = useI18n()
  const context = React.useContext(AppContext)
  const address = context?.address
  const setAddress = context?.setAddress
  const [selectedBuilding, setSelectedBuilding] = React.useState(building[0])
  const [selectedFloor, setSelectedFloor] = React.useState(selectedBuilding.floors[0])
  const [selectedRoom, setSelectedRoom] = React.useState(selectedBuilding.rooms[0])

  const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const buildingName = e.target.value
    const buildingData = building.find(b => b.name === buildingName)
    if (buildingData) {
      setSelectedBuilding(buildingData)
      setSelectedFloor(buildingData.floors[0]) // Reset to first floor
      setSelectedRoom(buildingData.rooms[0]) // Reset to first room
    }
  }

  const handleFloorChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedFloor(e.target.value)
    setSelectedRoom(selectedBuilding.rooms[0]) // Reset to first room when floor changes
  }
  return (
    <div className="flex gap-1 items-center">
      <MapPin className="text-destructive" />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Input className="w-[300px]" type="text" placeholder={address ? address : t('searchPlaceholder')} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div>
            <div>
              Chọn tòa nhà:
              <select onChange={handleBuildingChange}>
                {building.map(b => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              Chọn tầng:
              <select onChange={handleFloorChange}>
                {selectedBuilding.floors.map(floor => (
                  <option key={floor} value={floor}>
                    {floor}
                  </option>
                ))}
              </select>
            </div>
            <div>
              Chọn phòng:
              <select onChange={e => setSelectedRoom(e.target.value)}>
                {selectedBuilding.rooms.map(room => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                toast.success('Đã chọn địa chỉ!')
                if (setAddress) {
                  setAddress(`${selectedBuilding.name}-${selectedFloor}-${selectedRoom}`)
                  // Lưu vào localStorage để giữ địa chỉ khi reload trang
                  localStorage.setItem('address', `${selectedBuilding.name}-${selectedFloor}-${selectedRoom}`)
                }
              }}
            >
              Xác nhận
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
