import type { MotionProps } from 'motion-v'

export const motionPresets = {
  slideTop: {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  },
  slideBottom: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  },
  slideLeft: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  slideRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },
  slideVisibleTop: {
    initial: { opacity: 0, y: -100 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  },
  slideVisibleBottom: {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  },
  slideVisibleLeft: {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  slideVisibleRight: {
    initial: { opacity: 0, x: 100 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },
  slideVisibileOnceTop: {
    initial: { opacity: 0, y: -100 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
    inViewOptions: { once: true },
  },
  slideVisibileOnceBottom: {
    initial: { opacity: 0, y: 100 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
    inViewOptions: { once: true },
  },
  slideVisibileOnceLeft: {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    inViewOptions: { once: true },
  },
  slideVisibileOnceRight: {
    initial: { opacity: 0, x: 100 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    inViewOptions: { once: true },
  },
} satisfies Record<string, Pick<MotionProps, 'initial' | 'animate' | 'exit' | 'whileInView' | 'inViewOptions'>>
