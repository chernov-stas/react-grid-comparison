import {COUNTER_INCREMENT, COUNTER_DECREMENT} from '../../actions/counter';

const initialState = {
    val: 10,
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case COUNTER_INCREMENT:
            return {
                val: state.val + payload,
            };

        case COUNTER_DECREMENT:
            return {
                val: state.val - payload,
            };

        default:
            return state;
    }
};
