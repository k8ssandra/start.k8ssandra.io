<template>
<div>
    <h1>Wizard</h1>
        {{ amountCounted }}
</div>
</template>

<script>
export default {
    computed: {
        amountCounted() {
            return this.$store.state.count
        }
    }
};
</script>