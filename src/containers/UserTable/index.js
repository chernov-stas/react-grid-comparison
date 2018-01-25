import React, {Component, Fragment} from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {populateMockData} from '../../helpers/mockUtils';

class UserTable extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            nextPage: null,
        };
    }

    componentDidMount() {
        // this.loadSomeData();

        this.setState({data: populateMockData(100000)});
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
                        data: [...state.data, ...res.results],
                        loading: false,
                    };
                });
                console.log(res.results);
            });
    };

    render() {
        const {data, loading} = this.state;

        const genderFilterMethod = (filter, row) => {
            switch (filter.value) {
                case 'all':
                    return true;
                default:
                    return row[filter.id] === filter.value;
            }
        };

        const GenderFilter = ({filter, onChange}) => (
            <select
                onChange={event => onChange(event.target.value)}
                style={{width: '100%'}}
                value={filter ? filter.value : 'all'}
            >
                <option value="all">Show All</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="n/a">n/a</option>
            </select>
        );

        const GenderCell = row => (
            <span
                style={{
                    color:
                        row.value === 'male'
                            ? '#34af05'
                            : row.value === 'female' ? '#d50967' : '#1f6fa6',
                    transition: 'all .3s ease',
                }}
            >
                &#x25cf; {row.value}
            </span>
        );

        const columns = [
            {
                Header: 'Personal info',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Gender',
                        id: 'gender',
                        accessor: d => d.gender,
                        Cell: GenderCell,
                        filterMethod: genderFilterMethod,
                        Filter: GenderFilter,
                    },
                    {
                        Header: 'Birth year',
                        accessor: 'birth_year',
                    },
                ],
            },
            {
                Header: 'Appearance',
                columns: [
                    {
                        Header: 'Skin',
                        accessor: 'skin_color',
                    },
                    {
                        Header: 'Hair',
                        accessor: 'hair_color',
                    },
                ],
            },
        ];

        return (
            <Fragment>
                <ReactTable
                    data={data}
                    columns={columns}
                    filterable
                    showPagination={true}
                    loading={loading}
                    defaultPageSize={10 /*data.length*/}
                    minRows={5}
                    className="-striped -highlight"
                />
                <button onClick={this.loadSomeData}>Load more</button>
            </Fragment>
        );
    }
}

export default UserTable;
