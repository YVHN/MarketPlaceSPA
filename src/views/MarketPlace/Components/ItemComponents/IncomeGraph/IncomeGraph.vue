<template>
    <div class="income">
        <div class="income-title">Прибыль за неделю</div>
        <Graph :graph-data="graphData" />
    </div>
</template>

<script>
import Graph from '@/views/MarketPlace/Components/OpenedItem/Components/Graph/Graph.vue'
export default {
    props: {
        graphData: {
            type: Array,
            required: true,
        }
    },
    components: {
        Graph,
    },
    data() {
        return {}
    },
    methods: {},
    computed: {},
};
</script>

<style lang="scss" scoped>
.income {
    padding: 2vmin;
    margin: 4vmin 0;
    background: rgba(white, 0.03);
    border-radius: 1vmin;
    .income-title {
        font-weight: 700;
        font-size: 1.667vmin;
        color: #fff;
        margin-bottom: 0.5vmin;
    }
}
</style>