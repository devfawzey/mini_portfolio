import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)
export const useGsap = () => {
 const currentTabIndex = useState('tab-id', () => -3)
 const isAnimate = useState('is-animate', () => false)
 const tl = gsap.timeline();
 const targets = {
  loader: "main#loader",
  landingImg: ".bg-dots"
 }

 const __pageTransitionEnter__ = () => {
  /**
   * sets
   * loader -100
   * img scale(1)
   */


  // sets
  // tl.set(targets.landingImg, {
  //  scale: 1.5,
  //  rotate: 0.001,
  // })
  // loader
  tl.to(targets.loader, { yPercent: -100, ease: "expo.inOut", duration: 1.75, delay: 0.5, })
  // img
  tl.to(targets.landingImg, {
   scale: 1,
   duration: 1.75,
   ease: "expo.inOut"
  }, "<")
  _animateLandingContent_()
 }
 const __pageTransitionLeave__ = () => { }
 const ____zoomImgOnScroll____ = () => { }
 const _animateLandingContent_ = () => {
  const target = "[once-in]"
  // set first
  // tl.set(target, {
  //  y: '50vh'
  // })
  tl.to(target, {
   y: "0vh",
   // opacity: 1,
   duration: 1.75,
   stagger: .05,
   ease: "expo.inOut", onComplete() {
    __showElementOnScroll__()
    // animateHeaderInicator()
   }
  }, "<")
 }
 const __showElementOnScroll__ = () => {
  const targets: NodeListOf<HTMLElement> = document.querySelectorAll('[fade-scroll]')

  const observer = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear')
   })
  }, { root: null, threshold: .1, rootMargin: "0px" })

  targets.forEach((target) => observer.observe(target))

 }
 const ________scrollTo_______ = ({ uTarget = 0 }: { uTarget: number | string }) => {
  tl.to(window, { scrollTo: uTarget, duration: 1, ease: "power4.inOut" })

 }
 const animateHeaderInicator = (activeTab: string = 'home-page', isResize: boolean = false) => {
  // if (true) return;
  if (isAnimate.value) return;
  isAnimate.value = true
  const indicatorWidth = document.querySelector('#indicator')?.offsetWidth ?? 64
  const iconWidth = document.querySelector('[data-section]')?.offsetWidth ?? 80
  const indicatorDiff = (iconWidth - indicatorWidth) / 2
  const baseDuration = 1
  const baseEase = "expo.inOut"//"power4.inOut" //
  const target = document.querySelector(`.head-link[data-section='${activeTab}']`) as HTMLElement
  const offsetLeft = target?.offsetLeft ?? 0 + indicatorDiff * 2 //-8px + 48px* 4
  const offsetRight = -(4 - Number(target.dataset.index)) * iconWidth
  const nextTabIndex = Number(target.dataset.index)
  const isRightDirection = Number(nextTabIndex) - Number(currentTabIndex.value) >= 0
  const isInitIndicator = Number(nextTabIndex) - Number(currentTabIndex.value) === 0
  // const offsetObtion = { x: offsetLeft }

  // if (nextTabIndex == currentTabIndex.value) return;
  // transform: translate(0%, -50%) translate(calc(48px* 3 - 8px), 0px);
  // width: calc(64px* 3 - 8px* 3);
  if (isResize) {
   tl.set("#indicator", {
    left: 0, right: 'auto'
   })
   tl.to("#indicator", {
    x: nextTabIndex * iconWidth + indicatorDiff,
    duration: baseDuration,
    ease: baseEase
   })
   isAnimate.value = false
   return ''
  }
  if (isRightDirection) {
   const curretnOffsetLeft = currentTabIndex.value * iconWidth + indicatorDiff
   // if right direction
   tl.set("#indicator", {
    x: curretnOffsetLeft,
    left: 0, right: 'auto'
   })
   tl.to("#indicator", {
    width: indicatorWidth + (nextTabIndex - currentTabIndex.value) * indicatorWidth + indicatorDiff * 2 * (nextTabIndex - currentTabIndex.value),
    duration: baseDuration - 0.5,
    ease: baseEase, onComplete() {
     currentTabIndex.value = nextTabIndex
    }
   })
   tl.to("#indicator", {
    x: nextTabIndex * iconWidth + indicatorDiff,
    duration: baseDuration,
    ease: baseEase
   })
   tl.to("#indicator", {
    width: indicatorWidth,
    duration: baseDuration,
    ease: baseEase
   }, "<")
  } else {
   // if left direction
   const currentOffsetRight = -(4 - currentTabIndex.value) * iconWidth - indicatorDiff
   tl.set("#indicator", {
    right: 0, left: 'auto',
    x: currentOffsetRight
   })
   tl.to("#indicator", {
    width: indicatorWidth + (currentTabIndex.value - nextTabIndex) * indicatorWidth + indicatorDiff * 2 * (currentTabIndex.value - nextTabIndex),
    duration: baseDuration - 0.5,
    ease: baseEase, onComplete() {
     currentTabIndex.value = nextTabIndex
    }
   })
   tl.to("#indicator", {
    x: nextTabIndex * iconWidth - indicatorDiff - iconWidth * 4,
    duration: baseDuration,
    ease: baseEase
   })
   tl.to("#indicator", {
    width: indicatorWidth,
    duration: baseDuration,
    ease: baseEase
   }, "<")
  }
  tl.to(`[data-section] .head-text`, {
   opacity: 0,
   yPercent: 100,
   duration: baseDuration,
   ease: baseEase
  }, "<")
  tl.to(`[data-section] .head-icon`, {
   y: 0,
   color:'white',
   duration: baseDuration,
   ease: baseEase
  }, "<")
  tl.to(`[data-section='${activeTab}'] .head-icon`, {
   y: -52,
   color:'black',
   duration: baseDuration,
   ease: baseEase
  }, "<")
  tl.to(`[data-section='${activeTab}'] .head-text`, {
   opacity: 1,
   yPercent: -50,
   duration: baseDuration,
   ease: baseEase
  }, "<")
  const scrollTarget = "#" + target.dataset.section
  tl.to(window, {
   scrollTo: scrollTarget, duration: baseDuration,
   ease: baseEase
  }, "<")

  tl.call(() => {
   isAnimate.value = false
  })

 }

 const changeIndicatorActiveTabOnScroll = (fn: (title: string) => void) => {
  const targets: NodeListOf<HTMLElement> = document.querySelectorAll('section')
  const observer = new IntersectionObserver(useDebounceFn((entries) => {
   entries.forEach((entry: any) => {
    if (!entry.isIntersecting) return;
    fn(entry.target.id)
   })
  }, 250), { root: null, rootMargin: "0px", threshold: 0 })

  targets.forEach((target) => observer.observe(target))
 }

 return { __pageTransitionEnter__, changeIndicatorActiveTabOnScroll, __showElementOnScroll__, _animateLandingContent_, ________scrollTo_______, animateHeaderInicator }

}