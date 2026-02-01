import { useAppSelector } from '@/hooks'
import { selectBackgroundGridImagesWithCount } from '@/lib/selectors'
import BackgroundCard from './BackgroundCard'

type Props = {
  count?: number
}

export function BackgroundGrid({ count = 10 }: Props) {
  const images = useAppSelector((s) => selectBackgroundGridImagesWithCount(s, count))

  return (
    <div>
      <div className="w-full">
        <div className="grid grid-cols-3 gap-3 auto-rows-[198px] pt-2">
          {images.map((src: string, idx: number) => (
            <BackgroundCard key={src} src={src} index={idx} />
          ))}
        </div>
      </div>
    </div>
  )
}
