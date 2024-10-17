import type { Shop } from '@prisma/client'
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
  shop: Shop
}
export const ShopCard = ({ shop }: ShopCardProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Card className="flex items-center ">
          {shop.image && (
            <Image
              src={shop.image}
              width={200}
              height={200}
              alt={shop.name}
              className="object-cover"
            />
          )}
          <CardContent className="p-4 text-left">
            <p className="text-xl">{shop.name}</p>
            <p>{shop.address}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <CafeDialogContent shop={shop} />
    </Dialog>
  )
}

const CafeDialogContent = ({ shop }: { shop: Shop }) => {
  return (
    <DialogContent className="w-11/12" showClose={false}>
      {shop.image && (
        <Image
          src={shop.image}
          alt={shop.name}
          width={300}
          height={300}
          className="object-cover mx-auto"
        />
      )}
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="text-xs w-16">名前</div>
          <div className="col-span-3">{shop.name}</div>
        </div>
        <div className="flex items-center">
          <div className="text-xs w-16">住所</div>
          <div className="col-span-3">{shop.address}</div>
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
