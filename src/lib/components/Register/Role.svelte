<script lang="ts">
</script>

<h1 class="text-xl font-bold mb-4">Pick your role</h1>
<div class="flex gap-4 my-8">
	<div class="bg-gray-200 p-6 rounded-2xl w-72 flex flex-col">
		<button class="bg-primary text-white rounded-full mx-auto hover:bg-primary-400 py-3 px-8"
			>I am a Player</button
		>
		<ul class="py-4 flex flex-col gap-3 my-auto">
			<li class="">join a campaign</li>
			<li class="">create and customize your character</li>
		</ul>
	</div>
	<div class="bg-gray-200 p-6 rounded-2xl w-72 flex flex-col h-72">
		<button class="bg-primary text-white rounded-full mx-auto hover:bg-primary-400 py-3 px-8"
			>I am a GM</button
		>
		<div class="py-4 flex flex-col gap-3 my-auto">
			<ul class="">
				<li class="">join a campaign</li>
			</ul>
			<p class="text-primary font-bold">or</p>
			<ul class="">
				<li class="">create and customize your own campaign</li>
			</ul>
		</div>
	</div>
</div>

<style>
	li {
		list-style-type: disc;
		margin-left: 24px;
	}
</style>
