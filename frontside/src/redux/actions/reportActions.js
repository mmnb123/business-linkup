import { postDataApi } from '../../utils/fetchDataApi';
import { ALERT_TYPES } from './alertActions';

export const reportPost = (data) => async (dispatch) => {
    try {
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: { loading: true }
        });

        const res = await postDataApi('report', data);

        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: { success: res.data.msg }
        });
    } catch (err) {
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: { error: err.response.data.msg }
        });
    }
};