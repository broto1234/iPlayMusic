const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

export default function LoginPage() {
	return (
		<div className="h-60 flex flex-col items-center justify-center bg-black">
			<a
			href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=playlist-read-private`}
			className="px-4 py-2 bg-blue-900 text-2xl text-white"
			>
				Log in with Spotify
			</a>
		</div>
	);
}