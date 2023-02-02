import { uuidv4 } from "@firebase/util";
import { get, onValue, ref, set } from "firebase/database";
import { createSignal, For, Match, onMount, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { Title } from "solid-start";
import { db } from "~/util/firebase";

const [participants, setParticipants] = createStore([] as any[]);
const [voted, setVoted] = createSignal(false);
const [id, setId] = createSignal("");

function Waiting() {
	return (
		<main class="flex h-full w-full max-w-lg flex-col items-center justify-center gap-8 text-white">
			<div class="flex flex-col items-center justify-center">
				<p class="text-center text-3xl leading-8">
					Priere de <br /> <span class="text-primary">patienter</span>
					. <br />
				</p>
				<svg
					class="mt-2"
					xmlns="http://www.w3.org/2000/svg"
					width="2em"
					height="2em"
					viewBox="0 0 36 36">
					<path
						fill="#FFCC4D"
						d="M20 6.042c0 1.112-.903 2.014-2 2.014s-2-.902-2-2.014V2.014C16 .901 16.903 0 18 0s2 .901 2 2.014v4.028z"
					/>
					<path
						fill="#FFAC33"
						d="M9.18 36c-.224 0-.452-.052-.666-.159a1.521 1.521 0 0 1-.667-2.027l8.94-18.127c.252-.512.768-.835 1.333-.835s1.081.323 1.333.835l8.941 18.127a1.52 1.52 0 0 1-.666 2.027a1.482 1.482 0 0 1-1.999-.676L18.121 19.74l-7.607 15.425A1.49 1.49 0 0 1 9.18 36z"
					/>
					<path
						fill="#58595B"
						d="M18.121 20.392a.985.985 0 0 1-.702-.295L3.512 5.998c-.388-.394-.388-1.031 0-1.424s1.017-.393 1.404 0L18.121 17.96L31.324 4.573a.985.985 0 0 1 1.405 0a1.017 1.017 0 0 1 0 1.424l-13.905 14.1a.992.992 0 0 1-.703.295z"
					/>
					<path
						fill="#DD2E44"
						d="M34.015 19.385c0 8.898-7.115 16.111-15.894 16.111c-8.777 0-15.893-7.213-15.893-16.111c0-8.9 7.116-16.113 15.893-16.113c8.778-.001 15.894 7.213 15.894 16.113z"
					/>
					<path
						fill="#E6E7E8"
						d="M30.041 19.385c0 6.674-5.335 12.084-11.92 12.084c-6.583 0-11.919-5.41-11.919-12.084C6.202 12.71 11.538 7.3 18.121 7.3c6.585-.001 11.92 5.41 11.92 12.085z"
					/>
					<path
						fill="#FFCC4D"
						d="M30.04 1.257a5.899 5.899 0 0 0-4.214 1.77l8.429 8.544A6.064 6.064 0 0 0 36 7.299c0-3.336-2.669-6.042-5.96-6.042zm-24.08 0a5.9 5.9 0 0 1 4.214 1.77l-8.429 8.544A6.064 6.064 0 0 1 0 7.299c0-3.336 2.668-6.042 5.96-6.042z"
					/>
					<path
						fill="#414042"
						d="M23 20h-5a1 1 0 0 1-1-1v-9a1 1 0 0 1 2 0v8h4a1 1 0 1 1 0 2z"
					/>
				</svg>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="8em"
				height="8em"
				viewBox="0 0 36 36">
				<path
					fill="#CCD6DD"
					d="M31 32a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v28z"
				/>
				<path
					fill="#99AAB5"
					d="M27 24a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1zm-16 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h4a1 1 0 0 1 1 1zM27 8a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h20a1 1 0 0 1 1 1zm0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1zm0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1zm0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1z"
				/>
				<path
					fill="#66757F"
					d="M31 6.272c-.827-.535-1.837-.579-2.521-.023l-.792.646l-1.484 1.211l-.1.08l-2.376 1.938l-11.878 9.686c-.437.357-.793 1.219-1.173 2.074c-.378.85-.969 2.852-1.443 4.391c-.148.25-1.065 1.846-.551 2.453c.52.615 2.326.01 2.568-.076c1.626-.174 3.731-.373 4.648-.58c.924-.211 1.854-.395 2.291-.752c.008-.006.01-.018.017-.023l11.858-9.666l.792-.646l.144-.118V6.272z"
				/>
				<path
					fill="#D99E82"
					d="M18.145 22.526s-1.274-1.881-2.117-2.553c-.672-.843-2.549-2.116-2.549-2.116c-.448-.446-1.191-.48-1.629-.043c-.437.438-.793 1.366-1.173 2.291c-.472 1.146-1.276 4.154-1.768 5.752c-.083.272.517-.45.503-.21c-.01.187.027.394.074.581l-.146.159l.208.067c.025.082.05.154.068.21l.159-.146c.187.047.394.084.58.074c.24-.014-.483.587-.21.503c1.598-.493 4.607-1.296 5.752-1.768c.924-.381 1.854-.736 2.291-1.174c.439-.435.406-1.178-.043-1.627z"
				/>
				<path
					fill="#EA596E"
					d="M25.312 4.351a2.238 2.238 0 0 0 0 3.168l3.167 3.168a2.242 2.242 0 0 0 3.168 0l3.169-3.168a2.242 2.242 0 0 0 0-3.168l-3.169-3.168a2.24 2.24 0 0 0-3.168 0l-3.167 3.168z"
				/>
				<path
					fill="#FFCC4D"
					d="m11.849 17.815l3.17 3.17l3.165 3.166l11.881-11.879l-6.337-6.336l-11.879 11.879z"
				/>
				<path
					fill="#292F33"
					d="M11.298 26.742s-2.06 1.133-2.616.576c-.557-.558.581-2.611.581-2.611s1.951.036 2.035 2.035z"
				/>
				<path
					fill="#CCD6DD"
					d="m23.728 5.935l3.96-3.96l6.336 6.337l-3.96 3.96z"
				/>
				<path
					fill="#99AAB5"
					d="m26.103 3.558l.792-.792l6.336 6.335l-.792.792zM24.52 5.142l.791-.791l6.336 6.335l-.792.792z"
				/>
			</svg>
		</main>
	);
}

function Vote() {
	const [selected, setSelected] = createSignal("");

	function addVote() {
		set(ref(db, "/votes/" + selected()), {
			name: selected(),
			voter: id(),
		});
	}

	return (
		<main class="flex h-full w-full max-w-lg flex-col items-center justify-center gap-8 p-6 text-white">
			<Title>Hello World</Title>

			<div class="flex flex-col items-center justify-center">
				<p class="text-center text-3xl leading-8">
					Vote pour ton <br />{" "}
					<span class="text-primary">tchamseur</span>
					. <br />
				</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="2em"
					height="2em"
					viewBox="0 0 36 36">
					<path
						fill="#DD2E44"
						d="M33.885 15.764A8.764 8.764 0 0 0 25.121 7A8.747 8.747 0 0 0 18 10.667A8.747 8.747 0 0 0 10.879 7a8.764 8.764 0 0 0-8.764 8.764c0 .685.087 1.35.236 1.99C3.568 25.315 11.975 33.292 18 35.482c6.024-2.19 14.432-10.167 15.647-17.728c.151-.64.238-1.304.238-1.99z"
					/>
					<path
						fill="#FDCB58"
						d="M1.499 11.042a1 1 0 0 1-.893-1.448c1.016-2.031 3.793-5.195 7.283-5.588a1 1 0 0 1 .223 1.988c-2.679.302-4.928 2.917-5.717 4.495c-.176.35-.529.553-.896.553zm-.458-5.417a.999.999 0 0 1-.827-1.561c.936-1.381 2.895-2.909 4.682-3.021a.994.994 0 0 1 1.06.936a1 1 0 0 1-.935 1.061C4.06 3.1 2.617 4.082 1.87 5.186a1.002 1.002 0 0 1-.829.439zm33.46 5.417a1 1 0 0 1-.896-.553c-.789-1.578-3.039-4.193-5.718-4.495a1 1 0 0 1 .224-1.988c3.489.393 6.267 3.557 7.282 5.588a1 1 0 0 1-.892 1.448zm.458-5.417a1 1 0 0 1-.829-.439c-.747-1.104-2.19-2.086-3.151-2.146a1 1 0 0 1-.935-1.061a.993.993 0 0 1 1.06-.936c1.788.112 3.747 1.64 4.683 3.021a1 1 0 0 1-.828 1.561z"
					/>
				</svg>
			</div>
			<div class="my-3 flex h-auto w-full flex-col items-center justify-center gap-6">
				<For each={participants}>
					{(participant) => {
						const { name } = participant;
						return (
							<button
								onclick={() => {
									if (selected() === name) {
										setSelected("");
									} else setSelected(name);
								}}
								class={`flex min-h-[4.5rem] w-full items-center justify-around rounded-xl border-2 text-3xl transition  ${
									selected() === name
										? "border-none bg-primary text-white"
										: "border-gray bg-darkgray text-gray"
								}`}>
								<p>{name}</p>
							</button>
						);
					}}
				</For>
			</div>
			<button
				disabled={selected() === ""}
				onclick={() => addVote()}
				class="h-[4.5rem] w-full rounded-xl bg-primary text-3xl text-white transition disabled:bg-gray  disabled:text-black">
				Voter
			</button>
		</main>
	);
}

function Thanks() {
	return (
		<main class="flex h-full w-full max-w-lg flex-col items-center justify-center gap-8 text-white">
			<div class="flex flex-col items-center justify-center">
				<p class="text-center text-3xl leading-8">
					Merci d'avoir <br /> <span class="text-primary">participé</span>
					. <br />
				</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 36 36"><path fill="#FFCC4D" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"/><path fill="#664500" d="M16 18c-.419 0-.809-.265-.949-.684C14.848 16.717 14.034 15 13 15c-1.062 0-1.888 1.827-2.051 2.316a1 1 0 1 1-1.897-.633C9.177 16.307 10.356 13 13 13s3.823 3.307 3.949 3.684A1 1 0 0 1 16 18zm10 0a.999.999 0 0 1-.948-.684C24.849 16.717 24.033 15 23 15c-1.062 0-1.889 1.827-2.052 2.316a1 1 0 0 1-1.897-.633C19.177 16.307 20.355 13 23 13s3.823 3.307 3.948 3.684A1 1 0 0 1 26 18zm-8 4c-3.623 0-6.027-.422-9-1c-.679-.131-2 0-2 2c0 4 4.595 9 11 9c6.404 0 11-5 11-9c0-2-1.321-2.132-2-2c-2.973.578-5.377 1-9 1z"/><path fill="#FFF" d="M9 23s3 1 9 1s9-1 9-1s-1.344 6.75-9 6.75S9 23 9 23z"/><path fill="#664500" d="M18 27.594c-3.596 0-6.272-.372-7.937-.745l-.825-1.871c.823.312 3.889.897 8.763.897c4.954 0 8.037-.616 8.864-.938l-.701 1.842c-1.634.38-4.419.815-8.164.815z"/></svg>
			</div>
<svg xmlns="http://www.w3.org/2000/svg" width="8em" height="8em" viewBox="0 0 36 36"><path fill="#90603E" d="M32.302 24.347c-.695-1.01-.307-2.47-.48-4.082c-.178-2.63-1.308-5.178-3.5-7.216l-7.466-6.942s-1.471-1.369-2.841.103c-1.368 1.471.104 2.84.104 2.84l3.154 2.934l2.734 2.542s-.685.736-3.711-2.078l-10.22-9.506s-1.473-1.368-2.842.104c-1.368 1.471.103 2.84.103 2.84l9.664 8.989c-.021-.02-.731.692-.744.68L5.917 5.938s-1.472-1.369-2.841.103c-1.369 1.472.103 2.84.103 2.84L13.52 18.5c.012.012-.654.764-.634.783l-8.92-8.298s-1.472-1.369-2.841.103c-1.369 1.472.103 2.841.103 2.841l9.484 8.82c.087.081-.5.908-.391 1.009l-6.834-6.356s-1.472-1.369-2.841.104c-1.369 1.472.103 2.841.103 2.841L11.896 30.71c1.861 1.731 3.772 2.607 6.076 2.928c.469.065 1.069.065 1.315.096c.777.098 1.459.374 2.372.934c1.175.72 2.938 1.02 3.951-.063l3.454-3.695l3.189-3.412c1.012-1.082.831-2.016.049-3.151z"/><path fill="#FA743E" d="M1.956 35.026a.999.999 0 0 1-.707-1.707L4.8 29.77a.999.999 0 1 1 1.414 1.414l-3.551 3.55a.996.996 0 0 1-.707.292zm6.746.922a.999.999 0 0 1-.944-1.33l.971-2.773a1 1 0 1 1 1.887.66l-.971 2.773a1 1 0 0 1-.943.67zm-7.667-7.667a1.001 1.001 0 0 1-.333-1.943l2.495-.881a1 1 0 1 1 .666 1.886l-2.495.881a1.001 1.001 0 0 1-.333.057zm29.46-21.767a1 1 0 0 1-.707-1.708l3.552-3.55a1 1 0 0 1 1.414 1.415l-3.552 3.55a.993.993 0 0 1-.707.293zm-4.164-1.697a1 1 0 0 1-.944-1.331l.97-2.773a1 1 0 0 1 1.888.66l-.97 2.773a1 1 0 0 1-.944.671zm6.143 5.774a1.001 1.001 0 0 1-.333-1.943l2.494-.881a1 1 0 1 1 .666 1.886l-2.494.881a1.001 1.001 0 0 1-.333.057z"/><path fill="#AF7E57" d="M35.39 23.822c-.661-1.032-.224-2.479-.342-4.096c-.09-2.634-1.133-5.219-3.255-7.33l-7.228-7.189s-1.424-1.417-2.843.008c-1.417 1.424.008 2.842.008 2.842l3.054 3.039l2.646 2.632s-.71.712-3.639-2.202c-2.931-2.915-9.894-9.845-9.894-9.845s-1.425-1.417-2.843.008c-1.418 1.424.007 2.841.007 2.841l9.356 9.31c-.02-.02-.754.667-.767.654L9.64 4.534s-1.425-1.418-2.843.007c-1.417 1.425.007 2.842.007 2.842l10.011 9.962c.012.012-.68.741-.66.761L7.52 9.513s-1.425-1.417-2.843.008s.007 2.843.007 2.843l9.181 9.135c.084.083-.53.891-.425.996l-6.616-6.583s-1.425-1.417-2.843.008s.007 2.843.007 2.843l10.79 10.732c1.802 1.793 3.682 2.732 5.974 3.131c.467.081 1.067.101 1.311.14c.773.124 1.445.423 2.34 1.014c1.15.759 2.902 1.118 3.951.07l3.577-3.576l3.302-3.302c1.049-1.05.9-1.99.157-3.15z"/></svg>
		</main>
	);
}
export default function Home() {
	function getParticipants() {
		const participantsRef = ref(db, "/participants/");
		onValue(participantsRef, (snapshot) => {
			setParticipants([]);
			snapshot.forEach((participant) => {
				setParticipants([...participants, participant.val()]);
			});
		});
	}

	function getId() {
		let temp = uuidv4();

		if (localStorage.getItem("id")) {
			setId(localStorage.getItem("id") as string);
			console.log("Found ID in localStorage", id());
		} else if (sessionStorage.getItem("id")) {
			setId(sessionStorage.getItem("id") as string);
			console.log("Found ID in sessionStorage", id());
		} else {
			setId(temp);
			localStorage.setItem("id", temp);
			sessionStorage.setItem("id", temp);
			console.log("Setting ID to", id());
		}
	}

  function getVoted() {
    const votesRef = ref(db, "/votes/");
		onValue(votesRef, (snapshot) => {
			setVoted(false);
			snapshot.forEach((vote) => {
        if(vote.val().voter == id()) {
          setVoted(true)
        }
      });
		});
  }

	onMount(() => {
		getId();
    getVoted()
		getParticipants();
	});

	return (
		<Switch fallback={<Waiting />}>
			<Match when={voted()}>
				<Thanks />
			</Match>
			<Match when={participants.length > 0}>
				<Vote />
			</Match>
		</Switch>
	);
}
