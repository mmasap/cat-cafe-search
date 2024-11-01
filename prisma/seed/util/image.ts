import { nanoid } from 'nanoid'
import fs from 'node:fs'

const storeImagePath = '/static/images'
const storePublicImagePath = `./public/${storeImagePath}`

export async function downloadImage(imageUrl?: string) {
  try {
    const imageExtension = imageUrl?.match(/(jpg|jpeg|png)$/)?.[0]
    if (!imageExtension) return imageUrl

    if (!fs.existsSync(storePublicImagePath)) {
      fs.mkdirSync(storePublicImagePath, { recursive: true })
    }
    const fileName = `${nanoid()}.${imageExtension}`
    await new Promise((resolve) => setTimeout(resolve, 500))
    const res = await fetch(imageUrl)
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    fs.writeFileSync(`${storePublicImagePath}/${fileName}`, buffer)
    return `${storeImagePath}/${fileName}`
  } catch (error) {
    return imageUrl
  }
}

export function deleteImageFiles() {
  if (fs.existsSync(storePublicImagePath)) {
    fs.rmSync(storePublicImagePath, { recursive: true })
  }
}
