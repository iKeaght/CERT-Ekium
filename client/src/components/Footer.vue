<template>
<v-bottom-navigation v-model="value">
    <a>
        <img
        @click="gotoExternalPage_Ekium()"
        :src="require('@/assets/logoEkium.png')"
        alt="logo"
        height="50"
        width="50"
        >
    </a>
<v-spacer>
<h3>2021-Ekium</h3>
</v-spacer>
</v-bottom-navigation>
</template>
<script>
 export default {
    data: () => ({ value: 'recent' }),
    methods: {
    gotoExternalPage_Ekium() {
        window.open('http://www.ekium.eu', '_blank')
        }
}
}
</script>
<style>
</style>
