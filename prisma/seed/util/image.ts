import { put } from '@vercel/blob'
import crypto from 'node:crypto'
import fs from 'node:fs'

const storeImagePath = '/static/images'
const storePublicImagePath = `./public/${storeImagePath}`

export async function downloadImage(imageUrl?: string) {
  try {
    const imageExtension = imageUrl?.split('?')[0]?.match(/(jpg|jpeg|png)$/i)?.[0]
    if (!imageExtension) return imageUrl

    if (!fs.existsSync(storePublicImagePath)) {
      fs.mkdirSync(storePublicImagePath, { recursive: true })
    }
    const hash = crypto.createHash('md5').update(imageUrl).digest('hex')
    const fileName = `${hash}.${imageExtension}`
    if (fs.existsSync(`${storePublicImagePath}/${fileName}`)) {
      return `${storeImagePath}/${fileName}`
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
    const res = await fetch(imageUrl)
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { url } = await put(`images/${fileName}`, buffer, { access: 'public' })
      return url
    }
    fs.writeFileSync(`${storePublicImagePath}/${fileName}`, buffer)
    return `${storeImagePath}/${fileName}`
  } catch (error) {
    return imageUrl
  }
}
