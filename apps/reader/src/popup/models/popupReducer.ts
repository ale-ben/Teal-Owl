import { ManifestType } from '@teal-owl/types';
import { Reducer } from 'react';
import { VerificationStatus, WMParagraph } from '../../models/parserTypes';

// Define the state interface
export interface State {
	// Define your state properties here
	validateButtonLabel: string;
	manifestStorage: ManifestType[];
	watermarkList: WMParagraph[];
}

// Define the initial state
export const initialState: State = {
	// Set initial values for your state properties here
	validateButtonLabel: 'Validate',
	manifestStorage: [
		{
			author: 'ale',
			document: 'doc',
			version: '1.0',
			hashList: ['hash1', 'hash2'],
			timestamp: '2021-05-05T15:00:00.000Z',
			notes: 'This is a note',
			source: 'www.google.com'
		},
		{
			author: 'ben',
			document: 'doc2',
			version: '1.0',
			hashList: ['hash1', 'hash2'],
			timestamp: '2023-04-18T09:45:00.000Z'
		}
	],
	watermarkList: [
		{
			id: '1',
			openTag: undefined,
			subTags: [
				{
					id: '1.1',
					openTag: undefined
				},
				{
					id: '1.2',
					openTag: undefined
				}
			],
			watermark: {
				author: 'ale',
				document: 'doc',
				verificationStatus: VerificationStatus.VALID
			}
		},
		{
			id: '2',
			openTag: undefined,
			subTags: [
				{
					id: '2.1',
					openTag: undefined
				}
			],
			watermark: {
				author: 'ben',
				document: 'doc2',
				verificationStatus: VerificationStatus.VALID
			}
		},
		{
			id: '3',
			openTag: undefined,
			subTags: [
				{
					id: '3.1',
					openTag: undefined
				},
				{
					id: '3.2',
					openTag: undefined
				},
				{
					id: '3.3',
					openTag: undefined
				}
			],
			watermark: {
				author: 'ale',
				document: 'doc',
				verificationStatus: VerificationStatus.INVALID
			}
		}
	]
};

// Define the action types
type Action = { type: 'CHANGE_VALIDATION_BUTTON_LABEL'; label: string };

// Define the reducer function
export const reducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'CHANGE_VALIDATION_BUTTON_LABEL':
			return {
				...state,
				validateButtonLabel: action.label
			};
		default:
			return state;
	}
};
