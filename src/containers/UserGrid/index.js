import React, {Component, Fragment} from 'react';

// workaround for react-data-grid not supporting react 16
import '../../helpers/add-create-class';
import '../../helpers/add-prop-types';

import ReactDataGrid from 'react-data-grid';
import {Toolbar, Data} from 'react-data-grid-addons';

import {populateMockData} from '../../helpers/mockUtils';

class UserTable extends Component {
    constructor() {
        super();
        this.state = {
            originalData: [],
            rows: [],
            filters: {},
            loading: false,
            nextPage: null,
        };
    }

    componentDidMount() {
        // this.loadSomeData();
        const rows = populateMockData(100000);
        this.setState({
            rows,
            originalData: rows.slice(0),
        });
    }

    loadSomeData = () => {
        this.setState({loading: true});
        const url = this.state.nextPage ? this.state.nextPage : 'https://swapi.co/api/people/';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState(state => {
                    return {
                        nextPage: res.next,
                        rows: [...state.rows, ...res.results],
                        originalData: [...state.originalData, ...res.results],
                        loading: false,
                    };
                });
                console.log(res.results);
            });
    };

    getRows = () => {
        return Data.Selectors.getRows(this.state);
    };

    getSize = () => {
        return this.getRows().length;
    };

    rowGetter = i => {
        let rows = this.getRows();
        return rows[i];
    };

    handleGridSort = (sortColumn, sortDirection) => {
        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
                return a[sortColumn] > b[sortColumn] ? 1 : -1;
            } else if (sortDirection === 'DESC') {
                return a[sortColumn] < b[sortColumn] ? 1 : -1;
            }
        };

        const rows =
            sortDirection === 'NONE'
                ? this.state.originalData.slice(0)
                : this.state.rows.sort(comparer);

        this.setState({rows});
    };

    handleFilterChange = filter => {
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }
        this.setState({filters: newFilters});
    };

    onClearFilters = () => {
        this.setState({filters: {}});
    };

    render() {
        const columns = [
            {
                key: 'id',
                name: '#',
                resizable: true,
                width: 60,
                sortable: true,
            },
            {
                key: 'name',
                name: 'Name',
                resizable: true,
                sortable: true,
                filterable: true,
            },
            {
                key: 'gender',
                name: 'Gender',
                resizable: true,
                sortable: true,
                filterable: true,
            },
            {
                key: 'birth_year',
                name: 'Birth year',
                resizable: true,
                sortable: true,
                filterable: true,
            },
            {
                key: 'skin_color',
                name: 'Skin',
                resizable: true,
                sortable: true,
                filterable: true,
            },
            {
                key: 'hair_color',
                name: 'Hair',
                resizable: true,
                sortable: true,
                filterable: true,
            },
        ];

        return (
            <Fragment>
                <ReactDataGrid
                    columns={columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.getSize()}
                    headerRowHeight={40}
                    minHeight={500 /*35 * this.getSize() + 40*/}
                    rowHeight={35}
                    toolbar={<Toolbar enableFilter={true} />}
                    onGridSort={this.handleGridSort}
                    onAddFilter={this.handleFilterChange}
                    onClearFilters={this.onClearFilters}
                />
                <button onClick={this.loadSomeData}>Load more</button>
            </Fragment>
        );
    }
}

export default UserTable;
