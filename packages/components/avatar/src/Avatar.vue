<template>
  <span
    :class="[
      'fly-avatar',
      `fly-avatar--${shape}`,
      `fly-avatar--${size}`,
      { 'fly-avatar--image': hasImage },
    ]"
    :style="avatarStyle"
  >
    <img v-if="src" :src="src" :alt="alt" @error="handleError" />
    <span v-else-if="$slots.default" class="fly-avatar__text">
      <slot />
    </span>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
export interface AvatarProps {
  size?: 'small' | 'default' | 'large' | number
  shape?: 'circle' | 'square'
  src?: string
  alt?: string
  text?: string
}

export default defineComponent({
  name: 'SparkAvatar',

  props: {
    size: {
      type: [String, Number],
      default: 'default',
      validator: (val: unknown) => {
        if (typeof val === 'number') return true
        return ['small', 'default', 'large'].includes(val as string)
      },
    },
    shape: {
      type: String,
      default: 'circle',
      validator: (val: string) => ['circle', 'square'].includes(val),
    },
    src: String,
    alt: {
      type: String,
      default: 'avatar',
    },
    text: String,
  },

  setup(props) {
    const hasImage = ref(!!props.src)

    const handleError = () => {
      hasImage.value = false
    }

    const sizeMap = {
      small: 32,
      default: 40,
      large: 48,
    }

    const avatarStyle = computed(() => {
      const size =
        typeof props.size === 'number'
          ? `${props.size}px`
          : `${sizeMap[props.size as keyof typeof sizeMap]}px`

      return {
        width: size,
        height: size,
        lineHeight: size,
      }
    })

    const computedText = computed(() => {
      if (!props.text) return ''
      return props.text.charAt(0).toUpperCase()
    })

    return {
      hasImage,
      handleError,
      avatarStyle,
      computedText,
    }
  },
})
</script>
