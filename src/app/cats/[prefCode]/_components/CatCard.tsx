import { Cat } from '@prisma/client'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface CatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cat: Cat
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}
export const CatCard = ({ cat }: CatCardProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <div className="relative h-40">
            <Image src={cat.image} alt={cat.name} fill className="object-cover" />
          </div>
          <CardContent className="p-2">
            <p>{cat.name}</p>
            <p>{cat.catBreedId}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <Image src={cat.image} alt={cat.name} width={300} height={300} className="object-cover" />
      </DialogContent>
    </Dialog>
  )
}
