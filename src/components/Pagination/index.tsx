import React from 'react';
import _ from 'lodash';
import { useLocation, useHistory } from 'react-router-dom';
import { SelectOption } from '../SelectOptions';
import './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import MaterialPagination, { PaginationRenderItemParams } from '@material-ui/lab/Pagination';
import { PaginationItem } from '@material-ui/lab';

const queryString = require('query-string');

const useStyles = makeStyles((theme) => ({
	ul: {
		flexWrap: 'initial',
		[theme.breakpoints.down('sm')]: {
			flexWrap: 'wrap',
		},
	},
	selected: {
		backgroundColor: '#007bff !important',
		color: '#fff',
	},
}));

interface IProps {
	defaultSize?: number;
	options?: { id: number; text: string }[];
	total?: number;
}

const defaultOptions = [
	{ id: 10, text: '10' },
	{ id: 20, text: '20' },
	{ id: 30, text: '30' },
	{ id: 40, text: '40' },
	{ id: 50, text: '50' },
	{ id: 60, text: '60' },
	{ id: 70, text: '70' },
	{ id: 80, text: '80' },
	{ id: 90, text: '90' },
	{ id: 100, text: '100' },
];

export const PaginationUrl = (props: IProps) => {
	const { defaultSize = 50, total = 1, options = defaultOptions } = props;
	const classes = useStyles();
	const { search, pathname } = useLocation();
	const currentSearch = queryString.parse(search);
	const history = useHistory();
	const { page = 1, size = defaultSize } = queryString.parse(search);

	const totalPage = Math.ceil(total / size);
	const check = _.find(options, (s) => s.id === defaultSize);
	let data = [...options];
	if (!check) {
		data = [{ id: defaultSize, text: String(defaultSize) }, ...options];
	}
	const onSelect = (event: any) => {
		currentSearch['page'] = 1;
		currentSearch['size'] = event.target.value;
		const queries = queryString.stringify(currentSearch);
		history.push(pathname + '?' + queries);
	};
	const handleChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
		currentSearch['page'] = value;
		currentSearch['size'] = size;
		const queries = queryString.stringify(currentSearch);
		history.push(pathname + '?' + queries);
	};
	const renderItem = (item: PaginationRenderItemParams) => {
		return <PaginationItem {...item} classes={{ selected: classes.selected }} />;
	};
	return (
		<div className='bo-pagination display-row'>
			<SelectOption data={data} onChange={onSelect} value={size} label={'Rows per page'} />
			<div className='bo-navigation display-row'>
				<MaterialPagination
					classes={{ ul: classes.ul }}
					count={totalPage}
					page={Number(page)}
					showFirstButton
					showLastButton
					onChange={handleChangePage}
					renderItem={renderItem}
				/>
			</div>
		</div>
	);
};

interface INoChangeProps {
	limit: number;
	options?: { id: number; text: string }[];
	total?: number;
	page: number;
	handleChangePage: (event: any, pageNext: number) => void;
	handleChangeRowInPage: (value: any) => void;
}

export const Pagination = (props: INoChangeProps) => {
	const { limit = 20, total = 1, options = defaultOptions, handleChangePage, handleChangeRowInPage, page } = props;
	const classes = useStyles();
	const totalPage = Math.ceil(total / limit);
	const check = _.find(options, (s) => s.id === limit);
	let data = [...options];
	if (!check) {
		data = [{ id: limit, text: String(limit) }, ...options];
	}
	const renderItem = (item: PaginationRenderItemParams) => {
		return <PaginationItem {...item} classes={{ selected: classes.selected }} />;
	};
	return (
		<div className='bo-pagination display-row'>
			<SelectOption data={data} onChange={handleChangeRowInPage} value={limit} label={'Rows per page'} />
			<div className='bo-navigation display-row'>
				<MaterialPagination
					classes={{ ul: classes.ul }}
					count={totalPage}
					page={Number(page)}
					showFirstButton
					showLastButton
					onChange={handleChangePage}
					renderItem={renderItem}
				/>
			</div>
		</div>
	);
};
