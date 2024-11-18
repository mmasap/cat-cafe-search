import type { Shop } from '@prisma/client'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface ShopCardProps extends React.HTMLAttributes<HTMLDivElement> {
  shop: Shop
}
export const ShopCard = ({ shop }: ShopCardProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Card className="flex items-center">
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
            <div className="text-xl">{shop.name}</div>
            <div>{shop.address}</div>
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
      <VisuallyHidden>
        <DialogTitle>詳細</DialogTitle>
        <DialogDescription>詳細</DialogDescription>
      </VisuallyHidden>
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
          <div className="text-xs basis-20">名前</div>
          <div>{shop.name}</div>
        </div>
        <div className="flex items-center">
          <div className="text-xs basis-20 flex-shrink-0">住所</div>
          <div>{shop.address}</div>
        </div>
        <div className="flex items-center">
          <div className="text-xs basis-20 flex-shrink-0">営業時間</div>
          <div>
            {shop.open} - {shop.close}
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-xs basis-20 flex-shrink-0">電話番号</div>
          <div>{shop.tel}</div>
        </div>
        <div className="flex items-center">
          <div className="text-xs basis-20 flex-shrink-0">定休日</div>
          <div>{shop.regularHolidays.length > 0 ? shop.regularHolidays.join(' ') : 'なし'}</div>
        </div>
        <div className="flex items-center">
          <div className="text-xs basis-20 flex-shrink-0">ホームページ</div>
          <a
            className="text-[#1976d2] flex items-center"
            target="_blank"
            rel="noopener noreferrer"
            href={shop.url}
          >
            公式サイト
            <ExternalLink className="size-5" />
          </a>
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
