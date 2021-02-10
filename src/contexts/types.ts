export enum GameType {
	V75 = 'V75',
	V65 = 'V65',
	V64 = 'V64',
	V4 = 'V4',
}

export type GameInfo = {
	id: string;
	startTime: string; // YYYY-MM-DDThh:mm:ss
};

export interface IGameSchedule {
	betType?: string;
	upcoming?: Array<GameInfo>;
	results?: Array<GameInfo>;
}

export type GameResponse = {
	id: string;
	races: Array<GameRace>;
	status: string;
};

export type GameRace = {
	date: string;
	name: string;
	number: number;
	startTime: string;
	scheduledStartTime: string;
	starts: Array<RaceStart>;
};

export interface IPerson {
	firstName: string;
	lastName: string;
}

export type RaceStart = {
	number: number;
	driver: IPerson;
	horse: {
		name: string;
		trainer: IPerson;
		pedigree: {
			father: {
				name: string;
			};
		};
	};
};
