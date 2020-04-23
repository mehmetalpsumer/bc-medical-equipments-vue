<template>
  <div>
    <PaymentsWithoutLetter></PaymentsWithoutLetter>
    <PaymentLetterList></PaymentLetterList>
  </div>
</template>
<script>
  import PaymentsWithoutLetter from "./PaymentsWithoutLetter";
  import PaymentLetterList from "./PaymentLetterList";
  export default {
    components: {PaymentLetterList, PaymentsWithoutLetter}
  }
</script>
