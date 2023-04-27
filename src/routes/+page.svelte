<script>
	import logo from '$lib/images/logo.svg';
</script>

<div class="container">
	<button class="signUpButton">Sign Up</button>
	<img alt="The project logo" src={logo} />
	<div class="innerContainer">
		<div class="inputContainer">
			<label for="">Email</label>
			<input name="email" type="email" />
		</div>
		<div class="inputContainer">
			<label for="">Password</label>
			<input name="password" type="password" />
		</div>
	</div>
	<button class="signInButton">Sign In</button>
</div>

<style>
	.container {
		background: white;
		width: 100vw;
		height: 100vh;
		color: black;
		text-align: center;
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		padding-bottom: 40px;
	}
	.innerContainer {
		margin-top: 40px;
		margin-bottom: 16px;
		gap: 16px;
		display: flex;
		flex-direction: column;
	}
	.inputContainer {
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 300px;
	}
	.signInButton {
		padding: 12px 32px;
		background-color: black;
		outline: none;
		border: none;
		color: white;
		border-radius: 2px;
	}
	.signUpButton {
		position: absolute;
		top: 32px;
		right: 32px;
		padding: 12px 32px;
		background-color: #276a78;
		outline: none;
		border: none;
		color: white;
		border-radius: 2px;
	}
	input {
		padding: 12px 8px;
		outline-color: #276a78;
		border-color: #dbdbdb;
	}
	img {
		width: 550px;
	}
</style>
