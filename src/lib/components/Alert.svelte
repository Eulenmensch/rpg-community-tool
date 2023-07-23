<script lang="ts">
	export let showAlert: Boolean;
	export let text: string;
	export let color: 'bg-green-500' | 'bg-red-500';
</script>

<div
	class={`absolute right-10  ${color} px-4 py-1 transition-all duration-500 rounded-full ease-in-out text-white ${
		showAlert ? 'top-20 opacity-100' : 'top-0 opacity-0'
	}`}
>
	{text}
</div>
