<script lang="ts">
    export let type: "password" | "number" | "text" | "email"
    export let name: string
    export let label: string
    export let value: any
    export let placeholder: string = label
    export let minlength: number = 0

    // We need to set the node type explicitly to make use of two way binding
    function typeAction(node : any) {
        node.type = type;
    }

</script>


<div class="flex flex-col gap-1">
    <label for={name} class="font-medium">{label}</label>
    <input
        use:typeAction
        bind:value={value}
        {name}
        {placeholder}
        class="outline-primary border-gray border-2 rounded-sm px-3 py-2 w-72"
        required
        {minlength}
    />
</div>