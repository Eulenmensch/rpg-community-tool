<script lang="ts">
    import {  slide} from 'svelte/transition'
    export let data
    $: pathname = data.pathname
</script>
 
<slot />
