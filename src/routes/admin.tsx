import { onValue, ref, remove, set } from "firebase/database";
import {
	batch,
	createEffect,
	createSignal,
	For,
	JSX,
	onMount,
	Show,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Title } from "solid-start";
import { db } from "~/util/firebase";
import { Participant } from "..";
import {} from "solid-icons";
const [password, setPassword] = createSignal("");
import { ImCancelCircle } from "solid-icons/im";

function Wizard() {
	const [input, setInput] = createSignal("");
	createEffect(() => console.log(input()));
	return (
		<main class="flex min-h-full w-full max-w-lg flex-col items-center justify-center gap-8 p-6 text-white">
			<Title>Hello World</Title>

			<div class="flex flex-col items-center justify-center">
				<p class="text-center text-3xl leading-8">
					Passage
					<br /> <span class="text-primary">secret</span>
					. <br />
				</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="2em"
					height="2em"
					viewBox="0 0 36 36">
					<path
						fill="#8CCAF7"
						d="M34.5 24.995c0 2.209-1.791 2-4 2h-25c-2.209 0-4 .209-4-2L3.5 11c.293-1.75 1-2 2-2h25c1 0 1.791.208 2 2l2 13.995z"
					/>
					<path
						fill="#292F33"
						d="M28.5 16.5A1.5 1.5 0 0 1 27 18H9a1.5 1.5 0 1 1 0-3h18a1.5 1.5 0 0 1 1.5 1.5z"
					/>
					<path
						fill="#FFD983"
						d="M26.25 17.188v-14a2 2 0 0 0-2-2h-13a2 2 0 0 0-2 2v14h17z"
					/>
					<path
						fill="#5DADEC"
						d="M34.5 25a2 2 0 0 0-2-2h-29a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h29a2 2 0 0 0 2-2v-8z"
					/>
					<path
						fill="#4289C1"
						d="M13.5 23v6a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-6h-9z"
					/>
					<path
						fill="#5DADEC"
						d="M22.5 23v-1a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v1h9zm-3 4.5a1.5 1.5 0 0 1-3 0v-1a1.5 1.5 0 1 1 3 0v1z"
					/>
					<path
						fill="#C1694F"
						d="M24 5a.5.5 0 0 1-.5.5H16a.5.5 0 0 1 0-1h7.5a.5.5 0 0 1 .5.5m0 4a.5.5 0 0 1-.5.5H16a.5.5 0 0 1 0-1h7.5a.5.5 0 0 1 .5.5m0 4a.5.5 0 0 1-.5.5H16a.5.5 0 0 1 0-1h7.5a.5.5 0 0 1 .5.5"
					/>
					<g fill="#C1694F">
						<circle cx="13" cy="5" r="1" />
						<circle cx="13" cy="9" r="1" />
						<circle cx="13" cy="13" r="1" />
					</g>
				</svg>
			</div>

			<input
				name="password"
				type="password"
				placeholder="Mot de passe"
				value={input()}
				oninput={(e: Event) =>
					setInput((e.target as HTMLInputElement).value)
				}
				class="h-14 w-full rounded-xl bg-gray  text-center text-2xl tracking-widest text-black placeholder:tracking-normal placeholder:text-black placeholder:opacity-30"
			/>

			<button
				disabled={input().length == 0}
				onclick={() => setPassword(input())}
				class="h-14 w-full rounded-xl bg-primary text-2xl text-white disabled:bg-gray  disabled:text-black">
				Accéder
			</button>
		</main>
	);
}

function Manage() {
	const [input, setInput] = createSignal("");
	const [participants, setParticipants] = createStore([] as any[]);
	const [votes, setVotes] = createStore([] as any[]);

	createEffect(() => {
		participants.forEach((el) => console.log(el));
	});

	function addParticipant() {
		const participant: Participant = {
			name: input(),
		};
		set(ref(db, "/participants/" + participant.name), participant);
	}

	function resetState() {
		remove(ref(db, "/participants"));
	}

	function getParticipants() {
		const participantsRef = ref(db, "/participants/");
		onValue(participantsRef, (snapshot) => {
			setParticipants([]);
			snapshot.forEach((participant) => {
				setParticipants([...participants, participant.val()]);
			});
		});
	}

	function getVotes() {
		const votesRef = ref(db, "/votes/");
		onValue(votesRef, (snapshot) => {
			setVotes([]);
			snapshot.forEach((vote) => {
				setVotes([...votes, vote.val()]);
			});
		});
	}

	function deleteParticipant(name: string) {
		const participantsRef = ref(db, "/participants/" + name);
		const votesRef = ref(db, "/votes/" + name);
		remove(participantsRef);
		remove(votesRef);
	}

	onMount(() => {
		getParticipants();
		getVotes();
	});

	return (
		<main class="flex min-h-full w-full max-w-lg flex-col items-center justify-around gap-8 overflow-y-scroll p-8 text-white">
			<Title>Hello World</Title>

			<div class="flex flex-col items-center justify-center">
				<p class="text-center text-3xl leading-8">
					Centre de
					<br /> <span class="text-primary">contrôle</span>
					. <br />
				</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="2em"
					height="2em"
					viewBox="0 0 36 36">
					<path
						fill="#8CCAF7"
						d="M34.5 24.995c0 2.209-1.791 2-4 2h-25c-2.209 0-4 .209-4-2L3.5 11c.293-1.75 1-2 2-2h25c1 0 1.791.208 2 2l2 13.995z"
					/>
					<path
						fill="#292F33"
						d="M28.5 16.5A1.5 1.5 0 0 1 27 18H9a1.5 1.5 0 1 1 0-3h18a1.5 1.5 0 0 1 1.5 1.5z"
					/>
					<path
						fill="#FFD983"
						d="M26.25 17.188v-14a2 2 0 0 0-2-2h-13a2 2 0 0 0-2 2v14h17z"
					/>
					<path
						fill="#5DADEC"
						d="M34.5 25a2 2 0 0 0-2-2h-29a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h29a2 2 0 0 0 2-2v-8z"
					/>
					<path
						fill="#4289C1"
						d="M13.5 23v6a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-6h-9z"
					/>
					<path
						fill="#5DADEC"
						d="M22.5 23v-1a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v1h9zm-3 4.5a1.5 1.5 0 0 1-3 0v-1a1.5 1.5 0 1 1 3 0v1z"
					/>
					<path
						fill="#C1694F"
						d="M24 5a.5.5 0 0 1-.5.5H16a.5.5 0 0 1 0-1h7.5a.5.5 0 0 1 .5.5m0 4a.5.5 0 0 1-.5.5H16a.5.5 0 0 1 0-1h7.5a.5.5 0 0 1 .5.5m0 4a.5.5 0 0 1-.5.5H16a.5.5 0 0 1 0-1h7.5a.5.5 0 0 1 .5.5"
					/>
					<g fill="#C1694F">
						<circle cx="13" cy="5" r="1" />
						<circle cx="13" cy="9" r="1" />
						<circle cx="13" cy="13" r="1" />
					</g>
				</svg>
			</div>

			<div class="flex h-auto w-full flex-col items-center justify-center gap-6">
				<input
					name="name"
					type="text"
					placeholder="Participant"
					value={input()}
					oninput={(e: Event) =>
						setInput((e.target as HTMLInputElement).value)
					}
					class="h-14 w-full rounded-xl bg-gray  text-center text-2xl text-black placeholder:tracking-normal placeholder:text-black placeholder:opacity-30"
				/>

				<button
					disabled={input().length == 0}
					onclick={() =>
						batch(() => {
							addParticipant();
							setInput("");
						})
					}
					class="h-14 w-full rounded-xl bg-primary text-2xl text-white disabled:bg-gray  disabled:text-black">
					Ajouter
				</button>
			</div>

			<div class="my-3 flex h-auto w-full flex-col items-center justify-center gap-6">
				<Show
					when={participants.length !== 0}
					fallback={
						<div class="flex flex-col items-center justify-center gap-4 text-2xl">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="4em"
								height="4em"
								viewBox="0 0 36 36">
								<path
									fill="#A6D388"
									d="M6.401 28.55c5.006 5.006 16.502 11.969 29.533-.07c-7.366-1.417-8.662-10.789-13.669-15.794c-5.006-5.007-11.991-6.139-16.998-1.133c-5.006 5.006-3.873 11.99 1.134 16.997z"
								/>
								<path
									fill="#77B255"
									d="M24.684 29.81c6.128 1.634 10.658-.738 11.076-1.156c0 0-3.786 1.751-10.359-1.476c.952-1.212 3.854-2.909 3.854-2.909c-.553-.346-4.078-.225-6.485 1.429a37.028 37.028 0 0 1-3.673-2.675l.84-.871c3.25-3.384 6.944-2.584 6.944-2.584c-.638-.613-5.599-3.441-9.583.7l-.613.638a54.727 54.727 0 0 1-1.294-1.25l-1.85-1.85l1.064-1.065c3.321-3.32 8.226-3.451 8.226-3.451c-.626-.627-6.863-2.649-10.924 1.412l-.736.735l-8.292-8.294c-.626-.627-1.692-.575-2.317.05c-.626.626-.677 1.691-.051 2.317l8.293 8.293l-.059.059C4.684 21.924 6.37 28.496 6.997 29.123c0 0 .468-5.242 3.789-8.562l.387-.388l3.501 3.502c.057.057.113.106.17.163c-2.425 4.797 1.229 10.34 1.958 10.784c0 0-1.465-4.723.48-8.635c1.526 1.195 3.02 2.095 4.457 2.755c.083 2.993 2.707 5.7 3.344 5.931c0 0-.911-3.003-.534-4.487l.135-.376z"
								/>
								<path
									fill="#5DADEC"
									d="M22.083 10a1.001 1.001 0 0 1-.375-1.927c.166-.068 4.016-1.698 4.416-6.163a1 1 0 1 1 1.992.178c-.512 5.711-5.451 7.755-5.661 7.839a.978.978 0 0 1-.372.073zm5 4a1 1 0 0 1-.334-1.942c.188-.068 4.525-1.711 5.38-8.188a.99.99 0 0 1 1.122-.86a.998.998 0 0 1 .86 1.122c-1.021 7.75-6.468 9.733-6.699 9.813c-.109.037-.22.055-.329.055zm3.001 6a1.001 1.001 0 0 1-.483-1.876c.027-.015 2.751-1.536 3.601-3.518a1 1 0 0 1 1.837.788c-1.123 2.62-4.339 4.408-4.475 4.483a1.003 1.003 0 0 1-.48.123z"
								/>
							</svg>
							<p>Aucun participant.</p>
						</div>
					}>
					<For each={participants}>
						{(participant) => {
							const { name } = participant;
							return (
								<button
									onClick={() => deleteParticipant(name)}
									class="flex min-h-[3.5rem] w-full items-center justify-around rounded-xl border-2 text-gray  border-gray bg-darkgray text-2xl">
									<p>{name}</p>
									<p>
										{
											votes.filter(
												(vote) => vote.name === name
												).length
											}
									</p>
								</button>
							);
						}}
					</For>
				</Show>
			</div>
		</main>
	);
}

export default function Home() {
	return (
		<>
			<Show when={password() == "lechkibidi"} fallback={<Wizard />}>
				<Manage />
			</Show>
		</>
	);
}
