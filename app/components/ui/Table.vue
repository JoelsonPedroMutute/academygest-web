<template>
  <div class="overflow-x-auto">
    <table class="w-full border">
      <thead>
        <slot name="header" />
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>