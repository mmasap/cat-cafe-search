import { Cat, type Shop, type ShopDetail } from '@prisma/client'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ShopCardProps extends React.HTMLAttributes<HTMLDivElement> {
  shopDetail: ShopDetail & {
    Shop: Shop
  }
}
export const ShopCard = ({ shopDetail }: ShopCardProps) => {
  const shopName = `${shopDetail.Shop.name} ${shopDetail.name}`
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Card className="flex items-center ">
          {shopDetail.image && (
            <Image
              src={shopDetail.image}
              width={200}
              height={200}
              alt={shopName}
              className="object-cover"
            />
          )}
          <CardContent className="p-4 text-left">
            <p className="text-xl">{shopName}</p>
            <p>{shopDetail.address}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <CafeDialogContent shopDetail={shopDetail} />
    </Dialog>
  )
}

const CafeDialogContent = ({
  shopDetail,
}: {
  shopDetail: ShopDetail & {
    Shop: Shop
  }
}) => {
  const shopName = `${shopDetail.Shop.name} ${shopDetail.name}`
  return (
    <DialogContent className="w-11/12" showClose={false}>
      {shopDetail.image && (
        <Image
          src={shopDetail.image}
          alt={shopDetail.name}
          width={300}
          height={300}
          className="object-cover mx-auto"
        />
      )}
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="text-xs w-16">名前</div>
          <div className="col-span-3">{shopName}</div>
        </div>
        <div className="flex items-center">
          <div className="text-xs w-16">住所</div>
          <div className="col-span-3">{shopDetail.address}</div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" className="w-full">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
