import React from 'react';
import SampleForm from '../../components/SampleForm';

const AddUser = () => {
    const sub = e => {
        console.log(e);
    };

    return (
        <SampleForm
            initialValues={{
                name: 'userName',
                email: 'userName@exapmle.com',
            }}
            onSubmit={sub}
        />
    );
};

export default AddUser;
