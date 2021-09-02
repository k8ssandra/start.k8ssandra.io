<template>
<div>
    <h1>Result</h1>
        <div>Name: {{ config.name }}</div>
        <div>Description: {{ config.description }}</div>
        <div>Version: {{ config.version }}</div>
        <div>Version: {{ config.authentication }}</div>

</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState({
        config: 'k8_config',
    })
};
</script>