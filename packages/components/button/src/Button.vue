<template>
  <button
    :class="[
      'fly-button',
      `fly-button--${type}`,
      { 'fly-button--disabled': disabled },
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'text'
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>
