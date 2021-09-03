<template>
<div>
    <h1>Result</h1>
        <h3>Info</h3>
            <div>Name: {{ config.name }}</div>
            <div>Description: {{ config.description }}</div>
            <div>Version: {{ config.version }}</div>
            <div>Version: {{ config.authentication }}</div>
        <h3>Topology</h3>
        <div>Clustersize: {{ config.cluster_size }}</div>
        <h5>Datacenters</h5>
        <ul>
            <li v-for="(center, key) in config.datacenters" :key="key">
                {{center.name}}
            </li>
        </ul>

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