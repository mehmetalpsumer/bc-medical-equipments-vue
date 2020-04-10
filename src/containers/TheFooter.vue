<template>
  <CFooter :fixed="false">
    <div>
      <span class="ml-1">Blockchain - Medical Equipments</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">&copy; {{new Date().getFullYear()}} IBM</span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
