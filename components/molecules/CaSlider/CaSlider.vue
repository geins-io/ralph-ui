<script>
import CaSliderArrows from '../../../components/atoms/CaSliderArrows/CaSliderArrows.vue';
import CaSliderDots from '../../../components/atoms/CaSliderDots/CaSliderDots.vue';
const DATA_KEYS = [
  'class',
  'staticClass',
  'style',
  'attrs',
  'props',
  'domProps',
  'on',
  'nativeOn',
  'directives',
  'scopesSlots',
  'slot',
  'ref',
  'key'
];

const mutateKey = (key, prefix = 'cloned', postfix = '') => {
  return prefix + '-' + key + '-' + postfix;
};

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

const extractData = (vnode, isComp, position) => {
  const data = pick(vnode.data, DATA_KEYS);
  if (isComp) {
    const cOpts = vnode.componentOptions;
    Object.assign(data, {
      props: cOpts.propsData,
      on: cOpts.listeners
    });
  }

  if (data.key || data.key === 0) {
    data.key = mutateKey(data.key, 'cloned', position);
  }

  return data;
};

const cloneVNode = (vnode, position, newData = {}) => {
  // use the context that the original vnode was created in.
  const h = vnode.context && vnode.context.$createElement;
  const isComp = !!vnode.componentOptions;
  const isText = !vnode.tag; // this will also match comments but those will be dropped, essentially
  const children = isComp ? vnode.componentOptions.children : vnode.children;

  if (isText) return vnode.text;

  const data = extractData(vnode, isComp, position);

  const tag = isComp ? vnode.componentOptions.Ctor : vnode.tag;

  const childNodes = children ? children.map(c => cloneVNode(c)) : undefined;
  return h(tag, data, childNodes);
};
// @group Molecules
// @vuese
// A slider used for product sliding or image gallery<br><br>
// **SASS-path:** _./styles/components/molecules/ca-slider.scss_
export default {
  name: 'CaSlider',
  components: {
    CaSliderArrows,
    CaSliderDots
  },
  mixins: [],
  props: {
    // Should the slider be centered?
    centered: {
      type: Boolean,
      default: false
    },
    // Should the slider have infinite sliding?
    infinite: {
      type: Boolean,
      default: true
    },
    // Number of slides
    nrOfSlides: {
      type: Number,
      required: true
    },
    // Should dots be displayed
    dots: {
      type: Boolean,
      default: false
    },
    // Should arrows be displayed
    arrows: {
      type: Boolean,
      default: false
    },
    // First part of icon name for the arrows. Will add '-left', '-right', '-up' or '-down' as fitting
    arrowIconName: {
      type: String,
      default: 'chevron'
    },
    // Number of slides to scroll
    slidesToScroll: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    slidingTransition: false,
    currentSlide: 0,
    numberOfCopies: 0,
    start: {
      x: 0,
      t: 0
    },
    end: {
      x: 0
    },
    targetWidth: 0,
    flickThresholdTime: 300,
    flickThresholdDistance: 10,
    tracking: false,
    resetting: false
  }),
  computed: {
    slides() {
      return (
        this.$scopedSlots.slides({
          slideMeta: this.slideMeta
        }) || []
      );
    },
    copiesBefore() {
      let copiesBefore = [];
      if (this.infinite) {
        copiesBefore = this.slides.map(obj => cloneVNode(obj, 'before'));
      }
      return copiesBefore;
    },
    copiesAfter() {
      let copiesAfter = [];
      if (this.infinite) {
        copiesAfter = this.slides.map(obj => cloneVNode(obj, 'after'));
      }
      return copiesAfter;
    },
    allSlides() {
      return this.infinite === true
        ? [...this.copiesBefore, ...this.slides, ...this.copiesAfter].map(
            (obj, index) => {
              obj.componentOptions.propsData.slideIndex =
                index - this.numberOfCopiesBefore;
              return obj;
            }
          )
        : this.slides;
    },
    numberOfCopiesBefore() {
      return this.nrOfSlides;
    },
    slideMeta() {
      return {
        currentSlide: this.infinite
          ? this.currentSlide - this.numberOfCopiesBefore
          : this.currentSlide
      };
    },
    modifiers() {
      return {
        'ca-slider__lane--sliding': this.slidingTransition,
        'ca-slider__lane--centered': this.centered,
        'ca-slider__lane--resetting': this.resetting
      };
    },
    cssVariables() {
      return {
        '--current-slide': this.currentSlide,
        '--slider-offset': this.sliderOffset
      };
    },
    sliderOffset() {
      return this.tracking ? this.end.x - this.start.x : 0;
    },
    slidingActive() {
      return this.nrOfSlides > 1;
    },
    maxReached() {
      return (
        !this.infinite &&
        this.currentSlide + this.slidesToScroll >= this.nrOfSlides
      );
    },
    minReached() {
      return !this.infinite && this.currentSlide === 0;
    }
  },
  watch: {
    nrOfSlides(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.currentSlide =
          this.slidingActive && this.infinite ? this.numberOfCopiesBefore : 0;
      }
    }
  },
  mounted() {
    if (this.slidingActive && this.infinite) {
      this.currentSlide = this.numberOfCopiesBefore;
    }
  },
  methods: {
    // @vuese
    // Used to shift slide. Use a negative or positive number for back or forth
    // @arg slide change (Number), sliding transition (Boolean)
    shiftSlide(slideChange, slidingTransition = false) {
      this.slidingTransition = slidingTransition;
      const slide = this.currentSlide + slideChange;
      this.setCurrentSlide(slide);
      this.$nextTick(() => {
        this.resetting = false;
      });
    },
    // @vuese
    // Go to specific slide
    // @arg slide index (Number), sliding transition (Boolean)
    goToSlide(slideIndex, slidingTransition = false) {
      this.slidingTransition = slidingTransition;
      const slide =
        this.slidingActive && this.infinite
          ? slideIndex + this.numberOfCopiesBefore
          : slideIndex;
      this.setCurrentSlide(slide);
    },
    // @vuese
    // Used by shiftSlide and goToSlide to set a new value to currentSlide. Adjusts value to not show empty space when not infinite
    // @arg slide (Number)
    setCurrentSlide(slide) {
      if (!this.infinite) {
        if (slide < 0) {
          this.currentSlide = 0;
        } else if (slide + this.slidesToScroll > this.nrOfSlides) {
          this.currentSlide = this.nrOfSlides - this.slidesToScroll;
        } else {
          this.currentSlide = slide;
        }
      } else {
        this.currentSlide = slide;
      }
    },
    // @vuese
    // Used to reset the index when infinite sliding is used, when going from last to first again
    resetIndex() {
      if (this.slidingActive && this.infinite) {
        this.slidingTransition = false;
        if (this.currentSlide < this.numberOfCopiesBefore) {
          this.resetting = true;
          this.shiftSlide(this.nrOfSlides);
        } else if (
          this.currentSlide >=
          this.nrOfSlides + this.numberOfCopiesBefore
        ) {
          this.resetting = true;
          this.shiftSlide(-this.nrOfSlides);
        }
      }
    },
    // @vuese
    // Navigate to next slide
    nextSlide() {
      this.shiftSlide(this.slidesToScroll, true);
    },
    // @vuese
    // Navigate to previous slide
    prevSlide() {
      this.shiftSlide(-this.slidesToScroll, true);
    },
    // @vuese
    // Handles the start of a touch or point and drag event
    gestureStart(e) {
      if (this.slidingActive && e.button === 0 && e.buttons === 1) {
        this.tracking = true;
        this.targetWidth = e.target.offsetWidth;
        this.start.t = e.timeStamp;
        this.start.x = e.clientX;
        this.end.x = e.clientX;

        e.target.setPointerCapture(e.pointerId);
      }
    },
    // @vuese
    // Handles moving of a touch or point and drag event
    gestureMove(e) {
      if (this.tracking) {
        this.end.x = e.clientX;
      }
    },
    // @vuese
    // Handles the end of a touch or point and drag event. Calls shiftSlide with corresponding value of the gesture
    gestureEnd(e) {
      if (this.tracking) {
        const now = e.timeStamp;
        const deltaTime = now - this.start.t;
        const deltaX = this.end.x - this.start.x;
        const flick = deltaTime < this.flickThresholdTime;
        let slideShift = 0;
        // Work out what the movement was
        if (flick && Math.abs(deltaX) > this.flickThresholdDistance) {
          slideShift = Math.sign(-deltaX) * this.slidesToScroll;
        } else if (Math.abs(deltaX) > this.targetWidth / 2) {
          slideShift = Math.round(-deltaX / this.targetWidth);
        }
        if (
          (slideShift > 0 && !this.maxReached) ||
          (slideShift < 0 && !this.minReached)
        ) {
          this.shiftSlide(slideShift, true);
        }
        this.tracking = false;
      }
    }
  },
  render(h) {
    return h(
      'div',
      {
        class: 'ca-slider',
        on: {
          '&pointerdown': this.gestureStart,
          '&pointermove': this.gestureMove,
          '&pointerup': this.gestureEnd,
          '&pointercancel': this.gestureEnd
        }
      },
      [
        h(
          'div',
          {
            class: 'ca-slider__lane-wrap'
          },
          [
            h(
              'div',
              {
                class: ['ca-slider__lane', this.modifiers],
                style: this.cssVariables,
                on: {
                  transitionend: this.resetIndex
                }
              },
              [this.allSlides]
            )
          ]
        ),
        h('CaSliderDots', {
          class: 'ca-slider__dots',
          props: {
            slides: this.slides,
            dots: this.nrOfSlides,
            visible: this.dots,
            currentSlide: this.currentSlide,
            slidesToScroll: this.slidesToScroll
          },
          on: {
            navigation: index => {
              this.goToSlide(index, true);
            }
          }
        }),
        h('CaSliderArrows', {
          class: 'ca-slider__arrows',
          props: {
            iconName: this.arrowIconName,
            visible: this.arrows,
            minReached: this.minReached,
            maxReached: this.maxReached
          },
          on: {
            prevSlide: this.prevSlide,
            nextSlide: this.nextSlide
          }
        })
      ]
    );
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-slider';
</style>
