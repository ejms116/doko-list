'use client'

import { useState, useEffect, useMemo, useRef, act } from "react";

import GameRow from "./game-row";
import { GameRowProps } from "./game-row";
import { PlayerProps } from "./game-row";
import GreenRedCellSum from "../../../../ui/green-red-cell-sum";
import Modal from "../../../../ui/modal";

import PlayerColumn from "./player-column";
import ResultColumn from "./result-column";
import AnsagenColumn from "./ansagen-column";
import SonderpunkteColumn from "./sonderpunkte-column";

import { AnsagenColumnProps } from "./ansagen-column";
import { PlayerColumnProps } from "./player-column";
import { PlayerData } from "./player-column";

import Spinner from "@/app/ui/Spinner";

import { PARTY, Party } from "../../../../models/general/Constants";

import { Session } from "../../../../models/general/Session";
import { GameResponse, Game, SeatScores, Sopo } from "../../../../models/general/Game";

import { Checkbox } from "../../../../ui/cards";
import { SessionPlayer } from "../../../../models/composite/SessionPlayer";

import { SeatScore } from "../../../../models/general/Game";

import { GAME_TYPE, GameType } from "../../../../models/general/Constants";
import { formatString } from "../../../../models/general/Util";

import { SopoType, SOPO_TYPE } from "../../../../models/general/Constants";

import Link from "next/link";

import useApiClient from "@/app/auth/useApiClient";
import { AuthContext } from "@/app/auth/AuthContext";
import { useContext } from "react";


import LineChart from "@/app/ui/LineChart";
import { ChartData, ChartDataset, ChartType, ChartOptions, DatasetController } from 'chart.js';

type DatasetsType = ChartDataset<'line'>[];

const SessionPage = ({ params }: {
	params: {
		groupId: string,
		sessionId: string
	}
}) => {

	const { authToken } = useContext(AuthContext);
	const apiClient = useApiClient();

	const [gameDetailOpen, setGameDetailOpen] = useState(false)
	const [createNewGame, setCreateNewGame] = useState<boolean>(false);

	const [sessionData, setSessionData] = useState<Session | null>(null);
	const [gameData, setGameData] = useState<Game[] | null>(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<unknown>();

	const isRequesting = useRef(false);

	const [modalGameId, setModalGameId] = useState<number | null>(null);
	const [modalPlayers, setModalPlayers] = useState<PlayerData[]>([]);
	const [modalGameType, setModalGameType] = useState<GameType>(GAME_TYPE.NORMAL)
	const [modalBockCount, setModalBockCount] = useState<number>(0);
	const [modalBock, setModalBock] = useState<boolean>(false);
	const [modalMoreBock, setModalMoreBock] = useState<boolean>(false);
	const [modalSoloCheckboxDisabled, setModalSoloCheckboxDisabled] = useState<boolean>(true);

	const [modalResultParty, setModalResultParty] = useState<Party>(PARTY.Inaktiv);
	const [modaelResultValue, setModalResultValue] = useState<number>(120);

	const [modalAnsageRe, setModalAnsageRe] = useState<boolean>(false);
	const [modalAnsageReVorab, setModalAnsageReVorab] = useState<boolean>(false);
	const [modalAnsageContra, setModalAnsageContra] = useState<boolean>(false);
	const [modalAnsageContraVorab, setModalAnsageContraVorab] = useState<boolean>(false);

	const [modalweitereAnsagenParty, setModalWeitereAnsagenParty] = useState<Party>(PARTY.Inaktiv);
	const [modalweitereAnsagenPartyVorab, setModalWeitereAnsagenPartyVorab] = useState<Party>(PARTY.Inaktiv); // only for frontend
	const [modalAnsage, setModalAnsage] = useState<number>(120);
	const [modalAnsageVorab, setModalAnsageVorab] = useState<number>(120);

	const [modalSopoReFuchsGefangen, setModalSopoReFuchsGefangen] = useState<boolean[]>([false, false]);
	const [modalSopoContraFuchsGefangen, setModalSopoContraFuchsGefangen] = useState<boolean[]>([false, false]);

	const [modalSopoFuchsjagdGeschafft, setModalSopoFuchsjagdGeschafft] = useState<Party>(PARTY.Inaktiv);
	const [modalSopoFuchsjagdFehlgeschlagen, setModalSopoFuchsjagdFehlgeschlagen] = useState<Party>(PARTY.Inaktiv);
	const [modalSopoFuchsAmEnd, setModalSopoFuchsAmEnd] = useState<Party>(PARTY.Inaktiv);
	const [modalSopoDulleGefangen, setModalSopoDulleGefangen] = useState<Party>(PARTY.Inaktiv);
	const [modalSopoCharlie, setModalSopoCharlie] = useState<Party>(PARTY.Inaktiv);
	const [modalSopoCharlieGefangen, setModalSopoCharlieGefangen] = useState<Party[]>([PARTY.Inaktiv, PARTY.Inaktiv]);

	const [modalSopoReDoppelkopf, setModalSopoReDoppelkopf] = useState<boolean[]>([false, false, false, false]);
	const [modalSopoContraDoppelkopf, setModalSopoContraDoppelkopf] = useState<boolean[]>([false, false, false, false]);

	const [gameResponse, setGameResponse] = useState<GameResponse | null>(null);

	const generateNumberArray = (n: number): number[] => Array.from({ length: n + 1 }, (_, i) => i);

	const [sessionDataReady, setSessionDataReady] = useState<boolean>(false);
	const [totalGames, setTotalGames] = useState<number>(0);
	const [maxAbsValue, setMaxAbsValue] = useState<number>(20);
	const [chartDataset, setChartDataset] = useState<DatasetsType>([]);

	const data: ChartData<'line'> = {
		labels: generateNumberArray(Math.max(4, totalGames)),
		datasets: chartDataset,
	};



	const calculateMaxAbsValue = () => {
		const val =
			Math.ceil(
				Math.max(
					0, // Add a fallback to avoid -Infinity
					...(
						data?.datasets?.flatMap((dataset) =>
							dataset.data.map((value) => Math.abs(value as number))
						) ?? []
					)
				) / 10 + 1 
			) * 10;

		setMaxAbsValue(Math.max(20, val));
	}

	const addCumulativeScores = () => {
		if (chartDataset.length === 0) return;
		if (!gameData) return;
		setChartDataset((prevDataset) =>
			prevDataset.map((dataset, index) => {
				let cumulativeData = [0];

				gameData.forEach((game) => {
					const seatScore = game.seatScores[index];
					if (seatScore) {
						const lastCumulativeScore = cumulativeData[cumulativeData.length - 1];
						cumulativeData.push(lastCumulativeScore + seatScore.score);
					} else {
						const lastCumulativeScore = cumulativeData[cumulativeData.length - 1];
						cumulativeData.push(lastCumulativeScore);
					}
				});

				return {
					...dataset,
					data: cumulativeData,
				};
			})
		);
	};



	useEffect(() => {
		setTotalGames(gameData?.length ?? 0);

		addCumulativeScores();

	}, [sessionDataReady, gameData]);


	useEffect(() => {
		calculateMaxAbsValue();

	}, [chartDataset]);


	useEffect(() => {
		if (gameDetailOpen) {
			updateModalPlayersFromSessionData();
		}

		if (chartDataset.length === 0 && sessionData) {
			initChartData()
		}

		addCumulativeScores()

	}, [sessionData])


	const initChartData = () => {
		const colors = ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'];

		const output: DatasetsType = sessionData?.sessionPlayers.map((sessionPlayer, index) => {

			return {
				label: sessionPlayer.player.name,
				data: [0],
				borderColor: colors[index % colors.length],
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
			};
		});


		setChartDataset(output);
		setSessionDataReady(true);
	}


	const handleModalGameTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setModalGameType(event.target.value);
		if (event.target.value === GAME_TYPE.NORMAL) {
			clearSoloFlag()
		}
	};

	const clearSoloFlag = () => {
		setModalPlayers((prevPlayers) => {
			return prevPlayers.map(player => {

				return {
					...player,
					solo: false
				};
			})

		})
	}

	useEffect(() => {
		if (modalGameType !== GAME_TYPE.HOCHZEIT) {
			setModalSoloCheckboxDisabled(true)
		} else {
			setModalSoloCheckboxDisabled(false)
		}
	}, [modalGameType])



	const fetchData = async () => {
		if (!authToken) {
			return
		}
		try {
			setLoading(true);

			const sessionRequest = apiClient.get(`/groups/sessions/${params.sessionId}`);
			const gamesRequest = apiClient.get(`/groups/sessions/${params.sessionId}/games`);

			Promise.all([sessionRequest, gamesRequest])
				.then(([sessionResponse, gamesResponse]) => {
					console.log(sessionResponse.data)
					setSessionData(sessionResponse.data);
					setGameData(gamesResponse.data);

				})
				.catch((error) => {
					//throw new Error('Failed to fetch data');
				})


		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err);
			}
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [params.sessionId, authToken]);


	useEffect(() => {
		if (sessionData && modalPlayers.length === 0) {
			const playerDataArray: PlayerData[] = sessionData.sessionPlayers.map((sessionPlayer: SessionPlayer) => ({
				id: sessionPlayer.id.playerId,
				name: sessionPlayer.player.name,
				seat: sessionPlayer.seat,
				party: PARTY.Inaktiv,
				score: 0,
				solo: false,
				dealer: true,
				lead: false,
			}));

			setModalPlayers(playerDataArray);
		}
	}, [sessionData, modalPlayers])

	const processedGameData: GameRowProps[] = useMemo(() => {
		if (!gameData) return [];
		return gameData.map((game, index) => {

			let ansRe: string = '';
			let ansReV: string = '';
			if (game.ansageReVorab) {
				ansReV = 'ReV';
			} else if (game.ansageRe) {
				ansRe = 'Re';
			}

			let ansCo: string = '';
			let ansCoV: string = '';
			if (game.ansageContraVorab) {
				ansCoV = 'CoV';
			} else if (game.ansageContra) {
				ansCo = 'Co';
			}

			let weitereAns: string = '';
			let weitereAnsV: string = '';

			if (game.ansageVorab !== 120) {
				weitereAnsV = `${game.ansageVorab}V`;
			}

			if (game.ansageVorab === 120 || game.ansage < game.ansageVorab) {
				// weitereAns = `${weitereAns},${game.ansage}`;
				weitereAns = `${game.ansage}`;
			}

			if (game.weitereAnsagenParty == PARTY.Re) {
				// ansRe = `${ansRe},${weitereAns}`;
				if (weitereAnsV !== '') {
					ansReV = weitereAnsV;
				}
				if (weitereAns !== '') {
					ansRe = weitereAns;
				}
			} else if (game.weitereAnsagenParty == PARTY.Contra) {
				// ansCo = `${ansCo},${weitereAns}`;
				if (weitereAnsV !== '') {
					ansCoV = weitereAnsV;
				}
				if (weitereAns !== '') {
					ansCo = weitereAns;
				}
			}




			const processedGame = {
				...game,
				displayNumber: index + 1,
				played: game.played.toLocaleString(),
				ansageRe: [ansReV, ansRe].filter(Boolean).join(','),
				ansageContra: [ansCoV, ansCo].filter(Boolean).join(','),
				reWin: game.winParty == PARTY.Re ? true : false,
				sopoRe: '0',
				sopoContra: '0',
			};
			return processedGame;
		});
	}, [gameData]);



	const sumGameData: SeatScore[] = useMemo(() => {
		if (!processedGameData || !sessionData) return [];

		return calculateCumulativeSeatScores(processedGameData, sessionData)

	}, [sessionData, processedGameData])

	function calculateCumulativeSeatScores(gameRows: GameRowProps[], sd: Session): SeatScore[] {
		const cumulativeScores: { [seatNumber: string]: SeatScore } = {};

		sd.sessionPlayers.map((sp) => {
			cumulativeScores[sp.seat] = { score: 0, party: PARTY.Inaktiv };
		})

		gameRows.forEach((gameRow) => {

			Object.entries(gameRow.seatScores).forEach(([seatNumber, seatScore]) => {

				if (!cumulativeScores[seatNumber]) {
					cumulativeScores[seatNumber] = { score: 0, party: seatScore.party };
				}

				cumulativeScores[seatNumber].score += seatScore.score;

			});
		});

		return Object.values(cumulativeScores);
	}

	const updateSoloCheckbox = (playerId: number) => {
		setModalPlayers((prevPlayers) => {
			return prevPlayers.map((player, index) => {

				return {
					...player,
					solo: player.id === playerId ? true : false
				};
			})

		})
	}

	const setFirstFalseToTrue = (arr: boolean[]): boolean[] => {
		// Find the index of the first false value
		const index = arr.indexOf(false);

		// If there's no false value, return the array as is
		if (index === -1) return arr;

		// Create a new array with the first false value set to true
		return arr.map((value, i) => (i === index ? true : value));
	}

	const setAllToFalse = (arr: boolean[]): boolean[] => {
		return arr.map(() => false);
	}

	const resetToFalse = () => {
		setModalSopoContraDoppelkopf(() => [false, false, false, false]);
	};

	function createBooleanArray(x: number, y: number): boolean[] {
		return Array.from({ length: y }, (_, index) => index < x);
	}



	// diese Funktion ist für die "Edit buttons" in jeder Game row
	const updateModalData = (gameId: number) => {
		setCreateNewGame(false);
		let editGame = gameData?.find(game => game.id == gameId);

		if (!editGame) return;
		setModalGameId(gameId);
		setModalBockCount(0);

		setModalSopoFuchsjagdGeschafft(PARTY.Inaktiv);
		setModalSopoFuchsjagdFehlgeschlagen(PARTY.Inaktiv);
		setModalSopoFuchsAmEnd(PARTY.Inaktiv);
		setModalSopoDulleGefangen(PARTY.Inaktiv);
		setModalSopoCharlie(PARTY.Inaktiv);
		//setModalSopoCharlieGefangen([PARTY.Inaktiv, PARTY.Inaktiv]);


		let reDoppolkopfCount = 0;
		let contraDoppolkopfCount = 0;
		let reFuchsCount = 0;
		let contraFuchsCount = 0;

		let sopoCharlieGefangenTemp: Party[] = []

		editGame.sonderpunkte.map((sopo: Sopo) => {
			switch (sopo.type) {
				case SOPO_TYPE.DOPPELKOPF:
					if (sopo.dokoParty === PARTY.Re) {
						reDoppolkopfCount++;
					} else if (sopo.dokoParty === PARTY.Contra) {
						contraDoppolkopfCount++;
					}
					break;
				case SOPO_TYPE.FUCHS_GEFANGEN:
					if (sopo.dokoParty === PARTY.Re) {
						reFuchsCount++;
					} else if (sopo.dokoParty === PARTY.Contra) {
						contraFuchsCount++;
					}
					break;
				case SOPO_TYPE.FUCHSJAGD_GESCHAFFT:
					setModalSopoFuchsjagdGeschafft(sopo.dokoParty);
					break;
				case SOPO_TYPE.FUCHSJAGD_FEHLGESCHLAGEN:
					setModalSopoFuchsjagdFehlgeschlagen(sopo.dokoParty);
					break;
				case SOPO_TYPE.FUCHS_AM_END:
					setModalSopoFuchsAmEnd(sopo.dokoParty);
					break;
				case SOPO_TYPE.DULLE_GEFANGEN:
					setModalSopoDulleGefangen(sopo.dokoParty);
					break;
				case SOPO_TYPE.CHARLIE:
					setModalSopoCharlie(sopo.dokoParty);
					break;
				case SOPO_TYPE.CHARLIE_GEFANGEN:
					if (sopo.dokoParty !== undefined) {
						sopoCharlieGefangenTemp.push(sopo.dokoParty);
					}

					break;
				default:
					console.log("type not found")

			}
		})
		setModalSopoReDoppelkopf(createBooleanArray(reDoppolkopfCount, 4));
		setModalSopoContraDoppelkopf(createBooleanArray(contraDoppolkopfCount, 4));

		setModalSopoReFuchsGefangen(createBooleanArray(reFuchsCount, 2));
		setModalSopoContraFuchsGefangen(createBooleanArray(contraFuchsCount, 2));

		// Hier werden zwei Inaktiv hinzugefügt und dann alle bis auf die ersten beiden Elemente abgeschnitten
		// wir bekommen also immer genau zwei Werte zurück
		sopoCharlieGefangenTemp.push(PARTY.Inaktiv);
		sopoCharlieGefangenTemp.push(PARTY.Inaktiv);

		sopoCharlieGefangenTemp.splice(2, sopoCharlieGefangenTemp.length - 2,)
		setModalSopoCharlieGefangen(sopoCharlieGefangenTemp);

		setModalPlayers((prevPlayers) => {
			return prevPlayers.map((player, index) => {
				const seatScore = editGame.seatScores[index];
				if (seatScore) {
					return {
						...player,
						score: seatScore.score,
						party: seatScore.party,
						solo: editGame.soloPlayer === index ? true : false,
						dealer: editGame.dealer === index ? true : false,
						lead: editGame.lead === index ? true : false,
					};
				}
				return player;
			})

		})

		setModalGameType(editGame.dokoGameType);
		setModalBock(editGame.bock);
		setModalMoreBock(editGame.moreBock);

		setModalResultParty(editGame.resultParty);
		setModalResultValue(editGame.resultValue);

		setModalAnsageRe(editGame.ansageRe);
		setModalAnsageReVorab(editGame.ansageReVorab);
		setModalAnsageContra(editGame.ansageContra);
		setModalAnsageContraVorab(editGame.ansageContraVorab);

		setModalWeitereAnsagenParty(editGame.weitereAnsagenParty);
		if (editGame.ansageVorab < 120) {
			setModalWeitereAnsagenPartyVorab(editGame.weitereAnsagenParty);
		} else {
			setModalWeitereAnsagenPartyVorab(PARTY.Inaktiv);
		}


		setModalAnsage(editGame.ansage);
		setModalAnsageVorab(editGame.ansageVorab);

		setGameDetailOpen(true);

	}

	const updateModalPlayersFromSessionData = () => {
		if (sessionData) {
			setModalPlayers((prevPlayers) => {
				return prevPlayers.map((player, index) => {
					return {
						...player,
						score: 0,
						party: (4 < sessionData?.sessionPlayers.length && player.seat === sessionData?.nextDealer) ? PARTY.Inaktiv : PARTY.Contra,
						solo: false,
						dealer: sessionData?.nextDealer === index ? true : false,
						lead: sessionData?.nextDealer + 1 === index ? true : false,
					};


				})

			})
		}
	}



	const openModalNewGame = () => {
		setCreateNewGame(true);

		updateModalPlayersFromSessionData();

		setModalGameId(null);

		setModalSopoFuchsjagdGeschafft(PARTY.Inaktiv);
		setModalSopoFuchsjagdFehlgeschlagen(PARTY.Inaktiv);
		setModalSopoFuchsAmEnd(PARTY.Inaktiv);
		setModalSopoDulleGefangen(PARTY.Inaktiv);
		setModalSopoCharlie(PARTY.Inaktiv);
		setModalSopoCharlieGefangen([PARTY.Inaktiv, PARTY.Inaktiv]);

		setModalSopoReDoppelkopf([false, false, false, false]);
		setModalSopoContraDoppelkopf([false, false, false, false]);

		setModalSopoReFuchsGefangen([false, false]);
		setModalSopoContraFuchsGefangen([false, false]);

		setModalGameType(GAME_TYPE.NORMAL);
		setModalBock(false);
		setModalBockCount(sessionData?.bockRemaining ?? 0);
		setModalMoreBock(false);

		setModalResultParty(PARTY.Inaktiv);
		setModalResultValue(120);

		setModalAnsageRe(false);
		setModalAnsageReVorab(false);
		setModalAnsageContra(false);
		setModalAnsageContraVorab(false);

		setModalWeitereAnsagenParty(PARTY.Inaktiv);
		setModalWeitereAnsagenPartyVorab(PARTY.Inaktiv);

		setModalAnsage(120);
		setModalAnsageVorab(120);

		setGameDetailOpen(true);
	}

	const postGame = async (actuallyPost: boolean) => {
		if (isRequesting.current) {
			return;
		}
		isRequesting.current = true;

		const seatScores: { [key: number]: { score: number; party: string } } = {};
		let soloPlayerIndex: number = -1;

		modalPlayers.forEach((player, index) => {
			// Populate seatScores object
			seatScores[index] = {
				score: player.score,
				party: player.party,
			};

			// Find the index of the player with solo attribute true
			if (player.solo) {
				soloPlayerIndex = index;
			}
		});

		let sonderpunkte: Sopo[] = []

		modalSopoReDoppelkopf.filter(val => val).forEach(() => {
			sonderpunkte.push({
				dokoParty: PARTY.Re,
				type: SOPO_TYPE.DOPPELKOPF,
			})
		})

		modalSopoContraDoppelkopf.filter(val => val).forEach(() => {
			sonderpunkte.push({
				dokoParty: PARTY.Contra,
				type: SOPO_TYPE.DOPPELKOPF,
			})
		})

		modalSopoReFuchsGefangen.filter(val => val).forEach(() => {
			sonderpunkte.push({
				dokoParty: PARTY.Re,
				type: SOPO_TYPE.FUCHS_GEFANGEN,
			})
		})

		modalSopoContraFuchsGefangen.filter(val => val).forEach(() => {
			sonderpunkte.push({
				dokoParty: PARTY.Contra,
				type: SOPO_TYPE.FUCHS_GEFANGEN,
			})
		})



		if (modalSopoFuchsjagdGeschafft !== PARTY.Inaktiv) {
			sonderpunkte.push({
				dokoParty: modalSopoFuchsjagdGeschafft,
				type: SOPO_TYPE.FUCHSJAGD_GESCHAFFT,
			})
		}

		if (modalSopoFuchsjagdFehlgeschlagen !== PARTY.Inaktiv) {
			sonderpunkte.push({
				dokoParty: modalSopoFuchsjagdFehlgeschlagen,
				type: SOPO_TYPE.FUCHSJAGD_FEHLGESCHLAGEN,
			})
		}

		if (modalSopoFuchsAmEnd !== PARTY.Inaktiv) {
			sonderpunkte.push({
				dokoParty: modalSopoFuchsAmEnd,
				type: SOPO_TYPE.FUCHS_AM_END,
			})
		}

		if (modalSopoDulleGefangen !== PARTY.Inaktiv) {
			sonderpunkte.push({
				dokoParty: modalSopoDulleGefangen,
				type: SOPO_TYPE.DULLE_GEFANGEN,
			})
		}

		if (modalSopoCharlie !== PARTY.Inaktiv) {
			sonderpunkte.push({
				dokoParty: modalSopoCharlie,
				type: SOPO_TYPE.CHARLIE,
			})
		}

		modalSopoCharlieGefangen.filter(val => val === PARTY.Re || val === PARTY.Contra).forEach((party: Party) => {
			sonderpunkte.push({
				dokoParty: party,
				type: SOPO_TYPE.CHARLIE_GEFANGEN,
			})
		})

		let editGame = gameData?.find(game => game.id == modalGameId);


		const requestBody = {
			writeToDb: actuallyPost,
			sessionId: sessionData?.id,
			dealer: editGame !== undefined ? editGame.dealer : sessionData?.nextDealer,
			soloPlayer: soloPlayerIndex,
			moreBock: modalMoreBock,
			bock: modalBock, // only required for update
			dokoGameType: modalGameType,
			winParty: PARTY.Inaktiv, // is also calculated in the backend
			resultParty: modalResultParty,
			resultValue: modaelResultValue,
			ansageRe: modalAnsageRe,
			ansageReVorab: modalAnsageReVorab,
			ansageContra: modalAnsageContra,
			ansageContraVorab: modalAnsageContraVorab,
			weitereAnsagenParty: modalweitereAnsagenParty,
			weitereAnsagenPartyVorab: modalweitereAnsagenPartyVorab,
			ansage: modalAnsage,
			ansageVorab: modalAnsageVorab,
			seatScores: seatScores,
			sonderpunkte: sonderpunkte,
		}

		let url = '';

		if (modalGameId !== null) {
			url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/groups/sessions/games/${modalGameId}/update`;
		} else {
			url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/groups/sessions/games/create`;
		}

		console.log(`url: ${url}`);

		try {
			const gameRequest = apiClient.post(url, requestBody);

			Promise.all([gameRequest])
				.then(([gameResponse]) => {
					console.log(gameResponse)
					console.log(gameResponse.data)
					setGameResponse(gameResponse.data)

					setModalPlayers((prevPlayers) => {
						return prevPlayers.map((player, index) => {
							const seatScore = gameResponse.data.dokoGame.seatScores[index];
							if (seatScore) {
								return {
									...player,
									score: seatScore.score,
								};
							}
							return player;
						})

					})

					setError("");

					if (actuallyPost || gameResponse.data.errors.length > 0) {
						fetchData();
					}
					if (gameResponse.data.errors.length === 0 && actuallyPost) {
						setGameDetailOpen(false);
						setGameResponse(null);
					}

				})
				.catch((error) => {
					setGameResponse(error.response.data)
				})

		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unknown error occurred");
			}
		} finally {
			setTimeout(() => {
				isRequesting.current = false;
			}, 500); // 500ms delay

		}

	}

	const closeModal = () => {
		setGameDetailOpen(false)
		setGameResponse(null);
	}

	// Example data





	// Example options
	const options: ChartOptions<'line'> = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Punkte',
			},
		},
		scales: {
			x: {
				ticks: {
					display: true,
				},
			},
			y: {
				ticks: {
					display: true,
				},
				min: -maxAbsValue,
				max: maxAbsValue,
			},
		},
	};

	if (loading || !sessionData || !gameData || !modalPlayers) return <Spinner text="Lade Daten zum Abend..." />

	const playedDate: Date = new Date(sessionData.played);

	return (
		<div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
			{/* <h1>GroupId: {params.groupId}, SessionId: {params.sessionId} </h1>
			<h1>List games...</h1> */}

			{/* <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4"> */}
			<div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
				<h2 className="text-2xl font-semibold text-gray-300">{`Doppelkopf bei ${sessionData.location} am ${playedDate.toLocaleString()}`}</h2>
				<Link href={`/groups/${params.groupId}`}>
					<button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
						Zurück zur Gruppe
					</button>
				</Link>

				<button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={openModalNewGame}>
					Neues Spiel hinzufügen
				</button>

				{/* <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={() => alert("hi")}>
						Alle Spiele neu berechnen
					</button> */}
			</div>

			<div className="flex w-full h-screen">
				{/* <div className="flex w-full h-screen"> */}
				<div className="w-2/3 overflow-x-auto">

					{/* <div className="w-2/3 flex-1 overflow-y-auto"> */}
					<table className="border-collapse min-w-full table-auto bg-[#2A2A3C]">
						<thead className="sticky top-0 bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
							<tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
								<th className="text-center"></th>
								<th className="text-center"></th>
								<th className="text-center"></th>
								<th className="text-center"></th>

								{sessionData.sessionPlayers.map((sp: SessionPlayer) => {
									return (
										<th key={sp.id.playerId} className="px-6 text-center">{sp.player.name}</th>
									)
								})}

								<th className="text-center"></th>
								<th className="text-center"></th>
								<th className="text-center"></th>
								<th className="text-center"></th>
							</tr>
							<tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
								<th className="text-center">#</th>
								<th className="text-center">Typ</th>
								<th className="text-center">H</th>
								<th className="text-center">B</th>
								{Object.entries(sumGameData).map(([seatNumber, seatScore]) => (
									<GreenRedCellSum key={seatNumber} score={seatScore.score} />
								))}

								<th className="text-center">Ergebnis</th>
								<th className="text-center">Ansagen</th>
								<th className="text-center">Sopo</th>
								<th className="text-center">Edit</th>
							</tr>
						</thead>
						<tbody className="text-gray-300 text-sm">
							{processedGameData.map((game: GameRowProps) => {
								return (
									<GameRow key={game.id} game={game} showGameDetail={updateModalData} />
								)
							})}

						</tbody>
					</table>
				</div>
				<div className="w-1/3 overflow-x-auto">
					{!chartDataset ? (
						<Spinner text="Lade Grafik..." />
					) : (
						<LineChart data={data} options={options} />
					)}
				</div>
			</div>


			<Modal open={gameDetailOpen} onClose={closeModal} title={createNewGame ? 'Spiel hinzufügen' : 'Spiel ändern'} >
				<div className='grid py-4'>
					{/* <h1 className='text-lg font-bold py-2'>{createNewGame ? 'Spiel hinzufügen' : 'Spiel ändern'}</h1> */}
					<div className='flex place-items-center gap-3'>
						<div className='flex place-items-center gap-3'>
							<span>Spieltyp</span>
							<select
								id="options"
								value={modalGameType}
								className="block w-full bg-[#1E1E2C] border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 max-w-[150px]"
								onChange={handleModalGameTypeChange}
							>

								<option value={GAME_TYPE.NORMAL}>{formatString(GAME_TYPE.NORMAL)}</option>
								<option value={GAME_TYPE.BUBEN_SOLO}>{formatString(GAME_TYPE.BUBEN_SOLO)}</option>
								<option value={GAME_TYPE.DAMEN_SOLO}>{formatString(GAME_TYPE.DAMEN_SOLO)}</option>
								<option value={GAME_TYPE.TRUMPF_SOLO}>{formatString(GAME_TYPE.TRUMPF_SOLO)}</option>
								<option value={GAME_TYPE.HOCHZEIT}>{formatString(GAME_TYPE.HOCHZEIT)}</option>
								<option value={GAME_TYPE.HOCHZEIT_STILL}>{formatString(GAME_TYPE.HOCHZEIT_STILL)}</option>

							</select>
						</div>

						<div className="flex place-items-center gap-3">
							<div
								onClick={() => setModalMoreBock(!modalMoreBock)}
								className={`cursor-pointer ${modalMoreBock ? 'bg-red-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md text-center min-w-[80px]`}
							>
								{String.fromCodePoint(0x1F49E)} Herz rum?
							</div>
						</div>

						{!createNewGame && <div className="flex place-items-center gap-3">
							<div
								onClick={() => setModalBock(!modalBock)}
								className={`cursor-pointer ${modalBock ? 'bg-red-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md text-center min-w-[80px]`}
							>
								{String.fromCodePoint(0x1F410)} Bock
							</div>
						</div>}

						{modalBockCount > 0 && <div className={`bg-red-500 text-white font-bold px-2 py-1 rounded-md text-center min-w-[80px]`}> {String.fromCodePoint(0x1F410)} Bock verbleibend: {modalBockCount}</div>}
					</div>
				</div>

				<div className="grid grid-cols-[auto_auto_auto_auto_auto] gap-4 bg-[#2A2A3C] text-gray-200 items-start">
					{/* Headers */}

					<PlayerColumn data={modalPlayers} setPlayers={setModalPlayers} soloCheckboxDisabled={modalSoloCheckboxDisabled} setSoloCheckbox={updateSoloCheckbox} />
					<ResultColumn resultParty={modalResultParty} setResultParty={setModalResultParty} resultValue={modaelResultValue} setResultValue={setModalResultValue} />
					<AnsagenColumn
						title="Ansagen"
						ansageRe={modalAnsageRe}
						setAnsageRe={setModalAnsageRe}
						ansageContra={modalAnsageContra}
						setAnsageContra={setModalAnsageContra}
						weitereAnsagenParty={modalweitereAnsagenParty}
						setWeitereAnsagenParty={setModalWeitereAnsagenParty}
						ansage={modalAnsage}
						setAnsage={setModalAnsage}
					/>
					<AnsagenColumn
						title="Vorab"
						ansageRe={modalAnsageReVorab}
						setAnsageRe={setModalAnsageReVorab}
						ansageContra={modalAnsageContraVorab}
						setAnsageContra={setModalAnsageContraVorab}
						weitereAnsagenParty={modalweitereAnsagenPartyVorab}
						setWeitereAnsagenParty={setModalWeitereAnsagenPartyVorab}
						ansage={modalAnsageVorab}
						setAnsage={setModalAnsageVorab}
					/>
					<SonderpunkteColumn
						reFuchsGefangen={modalSopoReFuchsGefangen}
						setReFuchsGefangen={setModalSopoReFuchsGefangen}
						contraFuchsGefangen={modalSopoContraFuchsGefangen}
						setContraFuchsGefangen={setModalSopoContraFuchsGefangen}

						fuchsjagdGeschafft={modalSopoFuchsjagdGeschafft}
						setFuchsjagdGeschafft={setModalSopoFuchsjagdGeschafft}
						fuchsjagdFehlgeschlagen={modalSopoFuchsjagdFehlgeschlagen}
						setFuchsjagdFehlgeschlagen={setModalSopoFuchsjagdFehlgeschlagen}
						fuchsAmEnd={modalSopoFuchsAmEnd}
						setFuchsAmEnd={setModalSopoFuchsAmEnd}
						dulleGefangen={modalSopoDulleGefangen}
						setDulleGefangen={setModalSopoDulleGefangen}
						charlie={modalSopoCharlie}
						setCharlie={setModalSopoCharlie}
						charlieGefangen={modalSopoCharlieGefangen}
						setCharlieGefangen={setModalSopoCharlieGefangen}

						reDoppelkopf={modalSopoReDoppelkopf}
						setReDoppelkopf={setModalSopoReDoppelkopf}
						contraDoppelkopf={modalSopoContraDoppelkopf}
						setContraDoppelkopf={setModalSopoContraDoppelkopf}

					/>

				</div>
				{gameResponse && (
					<div>
						<ul>
							{gameResponse.infos && gameResponse.infos.map((err, index) => (
								<li key={`info-${index}`} className='text-green-500 text-sm'>
									{err}
								</li>
							))}
							{gameResponse.warnings && gameResponse.warnings.map((err, index) => (
								<li key={`warning-${index}`} className='text-yellow-500 text-sm'>
									{err}
								</li>
							))}
							{gameResponse.errors && gameResponse.errors.map((err, index) => (
								<li key={`error-${index}`} className='text-red-500 text-sm'>
									{err}
								</li>
							))}
						</ul>
					</div>
				)}

				<div className='flex justify-end items-end space-x-4 mt-4'>
					<div className='space-x-4'>
						<button className='bg-blue-600 text-white py-1 px-3 p-2 rounded hover:bg-blue-700' onClick={() => postGame(false)}>Eingaben überprüfen</button>
						<button className='bg-blue-600 text-white py-1 px-3 p-2 rounded hover:bg-blue-700' onClick={() => postGame(true)}>{createNewGame ? 'Spiel hinzufügen' : 'Spiel ändern'}</button>

					</div>
				</div>

			</Modal>
		</div>

	);
}

export default SessionPage;