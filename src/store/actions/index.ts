export const resetData = (type: string): any => {
	return {
		type: `${type}_SUCCESS`,
		data: null,
	};
};

export * from './admin';
export * from './rate';
export * from './group-master';
export * from './transaction';
export * from './exchange';
export * from './follower';
export * from './master';