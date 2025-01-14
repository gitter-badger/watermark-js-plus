import { CreateWatermarkModeEnum, DecodeBlindWatermarkOptions, DecodeBlindWatermarkModeEnum, WatermarkOptions } from '../types'
import { convertImage, isFunction } from '../utils'
import Watermark from './watermark'

/**
 * BlindWatermark class
 */
export default class BlindWatermark extends Watermark {
  /**
   * BlindWatermark constructor
   * @param props - blind watermark options
   */
  constructor (props: Partial<WatermarkOptions> = {}) {
    props.globalAlpha = 0.005
    props.mode = CreateWatermarkModeEnum.blind
    super(props)
  }

  /**
   * Decode blind watermark.
   * @param props - decode options
   */
  static decode (props: Partial<DecodeBlindWatermarkOptions>) {
    const options = Object.assign({
      url: '',
      fillColor: '#000',
      compositeOperation: 'color-burn',
      mode: DecodeBlindWatermarkModeEnum.canvas
    }, props)
    if (!options.url) {
      return
    }
    if (options.mode === DecodeBlindWatermarkModeEnum.canvas) {
      const img = new Image()
      img.src = options.url
      img.onload = () => {
        const { width, height } = img
        const canvas = Watermark.createCanvas(width, height)
        const ctx = canvas.getContext('2d')
        if (ctx === null) {
          throw new Error('get context error')
        }
        ctx.drawImage(img, 0, 0, width, height)
        ctx.globalCompositeOperation = options.compositeOperation as any
        ctx.fillStyle = options.fillColor
        ctx.fillRect(0, 0, width, height)
        const resultImage = convertImage(canvas)
        if (options.onSuccess && isFunction(options.onSuccess)) {
          options.onSuccess?.(resultImage)
        }
      }
    }
  }
}
