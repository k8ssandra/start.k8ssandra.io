<template>
<div>
    <h1>Result</h1>
        <div>{{ amountCounted }}</div>
        <div>{{ config.name }}</div>
        <div>{{ config.id }}</div>
        <div>{{ text }}</div>

</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState({
        amountCounted: 'count',
        config: 'k8_config',
        text: 'text'
    })
};
</script>